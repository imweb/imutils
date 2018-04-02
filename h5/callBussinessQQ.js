import { isFudaoApp, isMQQ } from './index';
import getAppVersion from './getAppVersion';
import callService from './callService';
import openAppPage from './openAppPage';


/**
 * 尝试呼起企业QQ
 * @param {string} serviceQQ 企业QQ号
 */
function callBussinessQQ(serviceQQ) {
  const url = 'http://q.url.cn/s/qy5XyFm?_type=wpa&isKfuin=1';
  if (isFudaoApp()) {
    if (window.mqq.android && getAppVersion() < 37) {
      callService(serviceQQ);
    } else {
      openAppPage('webview', {
        url: encodeURIComponent(url),
      });
    }
  } else if (isMQQ()) {
    window.mqq.ui.openUrl({
      url,
      target: 1,
    });
  } else {
    location.href = url;
  }
}

export default callBussinessQQ;
