import { isWX, isFudaoApp, getAppVersion } from './index';
import openUrlByIframe from './openUrlByIframe';

/**
 * 跳转到辅导app中的native页面
 * @param {*对应文档对应页面openpage的后面} page
 * @param {*参数为openpage query所对应的object} params
 */
function openAppPage(page, params) {
  if (!window.mqq) {
    return;
  }

  params = params || {};

  let url = `tencentk12://openpage/${page}`;
  for (const i in params) {
    if (params.hasOwnProperty(i)) {
      url = url + '&' + i + '=' + params[i];
    }
  }

  const isIos = window.mqq && window.mqq.iOS;
  // const isAndroid = window.mqq && window.mqq.android;
  // 安卓11版本后支持openAppPage接口
  // 但是安卓openpage不存在延时问题
  // 只是为了保持接口一致，避免挖坑
  // || (isAndroid && getAppVersion() >= 11)
  if (isWX()) {
    openUrlByIframe(url);
  } else if (isFudaoApp() && (isIos && getAppVersion() >= 5)) {
    window.mqq.invoke('edu', 'openAppPage', {
      url,
    });
  } else {
    window.mqq.invokeSchema('tencentk12', 'openpage', page, params);
  }
}

export default openAppPage;
