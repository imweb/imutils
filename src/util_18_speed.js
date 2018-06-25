/**
 * 测速上报
 * @param  {object} speed 测速数据，为了结构化，key为易理解的字符串，数字索引在opts.map中
 * @param  {object} opts  参数
 * @param  {string} [opts.isdFlags]     页面标志位，格式：flag1-flag2-flag3
 * @param  {number} [opts.appid]        产品id，默认为企鹅辅导20466
 * @param  {boolean} [opts.notReportPerformance] 是否不上报performance timing点
 * @param  {object} [opts.map]          speed测速数据的key的数字索引表
 * @param  {string} [opts.startKey]     speed测速数据的基准点的key
 *
 * @example
 * speed.report({
 *     pageStart: 123,
 *     pageCSSReady: 156,
 *     pageJsReady: 177
 * }, {
 *     isdFlags: '1-2-3',
 *     startKey: 'pageStart',
 *     map: {
 *         pageCSSReady: 20,
 *         pageJsReady: 21
 *     }
 * });
 *
 * speed.report({
 *     1: 10,
 *     2: 20,
 *     3: 30
 * }, {
 *     isdFlags: '1-2-4'
 * });
 * @reurn {void}
 */

import { isClient } from './util_00_env';
import { getNetworkType } from './util_07';
import { objectToQueryString } from './util_09_url';

const cfg = {
  isd: {
    // 每个测速点都有一个key value 标志
    unloadEventStart: 1,
    unloadEventEnd: 2,
    redirectStart: 3,
    redirectEnd: 4,
    fetchStart: 5,
    domainLookupStart: 6,
    domainLookupEnd: 7,
    connectStart: 8,
    connectEnd: 9,
    requestStart: 10,
    responseStart: 11,
    responseEnd: 12,
    domLoading: 13,
    domInteractive: 14,
    domContentLoadedEventStart: 15,
    domContentLoadedEventEnd: 16,
    domComplete: 17,
    loadEventStart: 18,
    loadEventEnd: 19,
  },
  appid: 20466, // 产品id 固定
  platform: '',
  apn: '',
};

if (isClient) {
  if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
    cfg.platform = 'ios';
  } else if (/Android/i.test(navigator.userAgent)) {
    cfg.platform = 'android';
  } else if (/win|macintel/i.test(navigator.platform)) {
    cfg.platform = 'pc';
  }
}

const reportCgi = '//report.huatuo.qq.com/report.cgi?';
const testIsdFlagsReg = /\d+-\d+-\d+/;

function getParams(opts) {
  const ret = [];
  Object.keys(cfg).forEach((key) => {
    if (key === 'isd') {
      return;
    }
    if (!!opts[key] || !!cfg[key]) {
      ret.push(`${key}=${opts[key] || cfg[key]}`);
    }
  });

  return ret.join('&');
}


function report(speed, opts) {
  const reportDict = {};
  let params;
  let flags;
  let timing;
  let start = -1;
  let map;
  let time;
  // let key;

  // console.log('huatuo report:', speed, opts);
  if (!testIsdFlagsReg.test(opts.isdFlags)) {
    console.log(`the option: isdFlags[${opts.isdFlags}] is wrong!`); // eslint-disable-line no-console
    return;
  }

  getNetworkType((type) => {
    // set apn
    cfg.apn = type;

    params = getParams(opts);

    // process flags
    flags = opts.isdFlags.split('-');
    reportDict.flag1 = flags[0];
    reportDict.flag2 = flags[1];
    reportDict.flag3 = flags[2];

    if (opts.isReportTiming && window.performance && window.performance.timing) {
      timing = window.performance.timing;
      start = timing.navigationStart;
      map = cfg.isd;
      /* eslint-disable no-restricted-syntax */
      for (const key in timing) {
        if (map[key]) {
          time = timing[key] - start;
          reportDict[map[key]] = time > 0 ? time : 0;
        }
      }
    }

    // process page reports
    if (speed) {
      map = opts.map || {};

      // start = 0;
      if (opts.startKey && opts.startKey in speed) {
        start = speed[opts.startKey];
      } else if (start === -1) {
        // 如果start !== -1，说明start = timing.navigationStart
        start = 0;
      }

      Object.keys(speed).forEach((key) => {
        if (opts.startKey && key === opts.startKey) {
          return;
        }

        time = speed[key] - start;
        if (opts.filterTime) {
          time = opts.filterTime(key, start, time);
        }
        reportDict[map[key] || key] = time > 0 ? time : 0;
      });
    }

    new Image().src = `${reportCgi + params}&speedparams=${encodeURIComponent(objectToQueryString(reportDict))}`;
  });
}

const speed = {
  cfg,
  report,
};

export { speed }; // eslint-disable-line import/prefer-default-export
