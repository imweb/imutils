// module UA

import { isServer } from './util_00_env';
import { getCookie } from './util_03_cookie';

// 获取ua
const UA = isServer ? '' : (navigator.userAgent.toLowerCase() || '');

// 是否微信用户
const isWeixin = UA.indexOf('micromessenger') !== -1;
const isQQ = UA.indexOf('mqqbrowser') !== -1;

// 是否QQ登陆
const isQQLogin = Number.parseInt(getCookie('uid_type'), 10) === 0;

// 获取qq uin
function getQQUin() {
  const uin = getCookie('p_uin') || getCookie('uin');
  const realUin = (uin.length > 14) ? uin : parseInt(uin.replace(/[^\d]/g, ''), 10);
  return !realUin ? '' : realUin;
}

// 兼容微信和QQ
function getUin() {
  return isWeixin ? getCookie('uid_uin') || getQQUin() : getQQUin();
}

// 获取登录态字段
function getAuth() {
  return (!isQQLogin) ? getCookie('uid_a2') || getSkey() : getSkey();
}

// 优先使用p_skey
function getSkey() {
  return getCookie('p_skey') || getCookie('skey');
}

// 生成bkn
function encryptSkey(str) {
  if (!str) {
    return '';
  }
  let hash = 5381;
  for (let i = 0, len = str.length; i < len; ++i) {
    hash += (hash << 5) + str.charAt(i).charCodeAt(); // jshint ignore:line
  }
  return hash & 0x7fffffff;
}

// 获取bkn
function getBkn() {
  return encryptSkey(getAuth());
}

// TODO 删除这个方法
function isWX() {
  return isWeixin;
}

function isMQQ() {
  return /qq\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase());
}

const REGEXP_FUDAO_APP = /EducationApp/;
function isFudaoApp() {
  return REGEXP_FUDAO_APP.test(navigator.userAgent);
}

// TODO 这个是做什么的？
function versionCodeZero() {
  return /VersionCode\/0/.test(navigator.userAgent);
}

function getAppVersion() {
  if (!isFudaoApp()) {
    return 0;
  }
  const version = (/VersionCode\/(\d+)/.exec(navigator.userAgent) || [])[1];
  return version || 0;
}

function getPlatForm() {
  if (isFudaoApp()) {
    if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
      return 'ios';
    } else if (/Android/i.test(navigator.userAgent)) {
      return 'android';
    }
  } else if (/win|macintel/i.test(navigator.platform)) {
    return navigator.platform;
  } else {
    return 'h5';
  }
}

function getTerminal() {
  if (isFudaoApp()) {
    if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
      return 'ios_h5';
    } else if (/Android/i.test(navigator.userAgent)) {
      return 'android_h5';
    }
  } else if (/win|macintel/i.test(navigator.platform)) {
    return 'pc_h5';
  } else {
    return 'h5';
  }
}

function getPlatformCode() {
  if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
    return 1;
  } else if (/Android/i.test(navigator.userAgent)) {
    return 2;
  } else {
    return 3;
  }
}

function getIOSVersion() {
  const { userAgent = '' } = navigator;
  if (userAgent.indexOf('iPhone') === -1 &&
      userAgent.indexOf('iPad') === -1 &&
      userAgent.indexOf('iPod') === -1) {
    return false;
  }
  const i = userAgent.indexOf(' OS ') + 4;
  return userAgent.substring(i, userAgent.indexOf(' ', i)).replace(/_/g, '.');
}

// helper for getTencentURL
function encodeParam(k) {
  k += '';
  const f = [];
  for (let i = 0; i < k.length; i++) {
    f.push(k.charCodeAt(i).toString(16).toUpperCase());
  }
  return f.join('');
}

// helper for getTencentURL
function getURL(h, g, k, fuin) {
  if (!h) {
    return '';
  }
  return "tencent://" + h + "/?subcmd=" + g + "&param=" + k + (fuin ? "&fuin=" + fuin : '');
}

// helper for getTencentURL
function getEncodedURL(h, g, k, fuin) {
  if (!h) {
    return '';
  }
  k = encodeParam(k);
  return getURL(h, g, k, fuin);
}

/**
 * TODO 重构
 * appid:
 * 0           直接打开群aio
 * 21          群视频
 * 1101123802  群课程表
 */
function getTencentURL(type, obj) {
  var h, g, k;
  var t;
  switch (type) {
    case 'all': // 'all'+gc: 打开群  限制:公开群不在群内, 无法直接打开aio, 而是会弹加群窗口
      h = 'groupwpa';
      g = 'all';
      k = '{"groupUin":' + obj.gc + ', "timeStamp":1383552440}';
      break;
    case 'OpenGroup': // appid 0 打开公开群  限制:非公开群不再群内不会弹加群窗口,而是会弹"群主已将此群设置为非公开，加群后才能继续访问."
      h = 'groupwpa';
      g = 'OpenGroup';
      var appid = obj.appId || 0;
      k = '{"ExtParam":{"appId":' + appid + '},"groupUin":' + obj.guin + ',"visitor":1}';
      break;
    case 'VisitPublicGroup': // 5.1以上才支持  限制:几乎无限制, 公开群/非公开群都表现正常(非公开群不在群内打开加群窗口,其他情况都能打开)
      h = 'VisitPublicGroup';
      g = 'VisitPublicGroup';
      k = '{"ExtParam":{"appId":"0"},"groupUin":' + obj.gc + ',"visitor":1}';
      // k = '{"ExtParam":{"appId":""},"groupUin":' + obj.gc + ',"groupuin":'+ obj.gc +',"visitor":1}';
      break;
    case 'CourseLive': // 5.2以上才支持??
      h = 'VisitPublicGroup';
      g = 'VisitPublicGroupEx';
      k = '{"ExtParam":{"appId":"21","appParam":"{\\"CourseId\\":' + obj.courseId + '}"},"groupUin":' + obj.gc + ',"visitor":1}';
      break;
  }
  if (h) {
    var fuin = getCookie('uin') || void (0);
    return getEncodedURL(h, g, k, fuin);
  }
  return '';
}

// 获取IE版本号
// from https://codepen.io/gapcode/pen/vEJNZN
function getIEVer() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

// 获取safari版本号
function getSafariVer() {
  const matchVer = navigator.userAgent.match(/Version\/([\d\.]+).*Safari/);

  if (matchVer) {
    return parseInt(matchVer[1], 10);
  }

  return false;
}

// 获取Firefox版本号
function getFirefoxVer() {
  const matchVer = navigator.userAgent.match(/Firefox\/([0-9]+)\./);
  if (matchVer) {
    return parseInt(matchVer[1], 10);
  }
  return false;
}

function isIphoneX() {
  return window.screen.width === 375 && window.screen.height === 812;
}

export {
  getUin,
  getQQUin,
  getSkey,
  getAuth,
  getBkn,
  isWeixin,
  isWX,
  isQQ,
  isMQQ,
  isFudaoApp,
  versionCodeZero,
  getPlatForm,
  getTerminal,
  getAppVersion,
  getPlatformCode,
  getIOSVersion,
  getTencentURL,
  getIEVer,
  getSafariVer,
  getFirefoxVer,
  isIphoneX,
};
