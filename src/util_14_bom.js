import {
  isMQQ,
  isFudaoApp,
  getAppVersion,
} from './util_04_ua';

/**
 * addPageShowListener
 * 部分手机，'webkitvisibilitychange' in document === false，但是是支持 document.addEventListener('webkitvisibilitychange') 的
 * ref: https://stackoverflow.com/a/2877424
 * payton 测试了兼容性，请继续补充
 * |-----------+----------+------------------|
 * | 浏览器    | pageshow | visibilitychange |
 * |-----------+----------+------------------|
 * | ios  微信 | y        | n                |
 * |-----------+----------+------------------|
 * | ios  自带 | y        | n                |
 * |-----------+----------+------------------|
 * | vivo 微信 | ?        | ?                |
 * |-----------+----------+------------------|
 * | vivo 自带 | n        | y                |
 * |-----------+----------+------------------|
 * | 魅族 微信 | y        | n                |
 * |-----------+----------+------------------|
 * | 魅族 自带 | n        | n                |
 * |-----------+----------+------------------|
 *
 * @memberof module:tencent/imutils
 * @param {function} listener 监听的函数
 * @return {null}
 */
function addPageShowListener(listener) {
  const isAndroid = window.mqq && window.mqq.android;
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
  } else if (isAndroid) {
    const f = (e) => {
      const hidden = document.hidden === false || e.hidden === false;
      if (hidden) {
        listener();
      }
    };
    // android visibilitychange 的行为是正确的，历史返回 android 会触发，ios 不会
    if ('onvisibilitychange' in document) {
      document.addEventListener('visibilitychange', f);
    } else {
      document.addEventListener('webkitvisibilitychange', f);
    }
  } else {
    // ios 必须用 pageshow 事件
    window.addEventListener('pageshow', () => {
      listener();
    });
  }
}

// eslint-disable-next-line
export { addPageShowListener };
