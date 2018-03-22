import openUrlByIframe from './openUrlByIframe';
import openAppPage from './openAppPage';
import versionfunegt from './versionfunegt';
import weiXinApply from './weiXinApply';
import isAppInstalled from './isAppInstalled';
import showTips from './showTips';
import callBussinessQQ from './callBussinessQQ';
import jumpToNativePage from './jumpToNativePage';

const isClient = typeof window === 'object' && window && typeof document !== 'undefined';
const isServer = !isClient;
// 获取ua
const getUa = () => {
  const ua = isServer ? '' : navigator.userAgent.toLowerCase() || '';
  return ua;
};

// 是否微信用户
const getIsWeixin = () => {
  const isWeixin = getUa().indexOf('micromessenger') !== -1;
  return isWeixin;
};

const isWX = function () {
  return getIsWeixin();
};

const isMQQ = function () {
  return /qq\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase());
};

/**
 * 得到ios的版本信息
*/
function getIOSVersion() {
  const ua = navigator.userAgent;
  if (ua.indexOf('iPhone') === -1 && ua.indexOf('iPad') === -1 && ua.indexOf('iPod') === -1) {
    return false;
  }

  const i = ua.indexOf(' OS ') + 4;
  return ua.substring(i, ua.indexOf(' ', i)).replace(/_/g, '.');
}

/**
 * 是否在辅导内
 */
const isFudaoApp = function () {
  const REGEXP_FUDAO_APP = /EducationApp/;
  if (typeof navigator !== 'undefined') {
    return REGEXP_FUDAO_APP.test(navigator.userAgent);
  }
  return false;
};

/**
 * 打开 辅导 app
 */
function openApp({
  id = '',
}) {
  if (window.mqq) {
    const mqq = window.mqq;
    const packageName = {
      name: mqq.iOS ? 'tencentk12' : 'com.tencent.k12',
    };
    const appDownloadUrl = `${location.protocol}//fudao.qq.com/mobile_download.html?qudao=${id}`;
    if (mqq.iOS) {
      if (parseInt(getIOSVersion(), 10) >= 9) {
        mqq.app.launchApp(packageName);
      } else {
        mqq.app.launchApp(packageName);
        mqq.ui.openUrl({
          url: appDownloadUrl,
          target: 1,
        });
      }
    } else {
      mqq.app.launchApp(packageName);
    }
  }
}

function isIphoneX() {
  return window.screen.width === 375 && window.screen.height === 812;
}

export {
  getUa,
  openApp,
  openAppPage,
  getIOSVersion,
  isAppInstalled,
  jumpToNativePage,
  callBussinessQQ,
  isIphoneX,
  isWX,
  isMQQ,
  isFudaoApp,
  versionfunegt,
  openUrlByIframe,
  weiXinApply,
};
