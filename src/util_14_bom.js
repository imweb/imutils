import {
  isMQQ,
  isFudaoApp,
  getAppVersion,
} from './util_04_ua';

function addPageShowListener(listener) {
  if (isFudaoApp()) {
    if (window.mqq && window.mqq.iOS && getAppVersion() >= 6) {
      window.mqq.removeEventListener('viewWillAppear');
      window.mqq.addEventListener('viewWillAppear', () => {
        listener();
      });
    } else if (window.mqq && window.mqq.android) { // android
      window.mqq.removeEventListener('onWebPageResume');
      window.mqq.addEventListener('onWebPageResume', () => {
        listener();
      });
    } else {
      document.addEventListener('webkitvisibilitychange', () => {
        if (document.hidden === false) {
          listener();
        }
      }, false);
    }
  } else if (isMQQ()) { // 手机QQ
    document.addEventListener('qbrowserVisibilityChange', (e) => {
      if (!e.hidden) {
        listener();
      }
    });
  } else { // 微信或浏览器
    window.addEventListener('pageshow', () => {
      listener();
    });
  }
}

export {
  addPageShowListener,
};
