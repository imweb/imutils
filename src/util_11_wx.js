/**
 * 微信什么？没看懂
 * @param {func} callback 回调函数
 * @memberof module:tencent/imutils
 */
function weiXinApply(callback) {
  if (typeof window.WeixinJSBridge === 'object' &&
      typeof window.WeixinJSBridge.invoke === 'function') {
    callback();
  } else {
    document.addEventListener('WeixinJSBridgeReady', callback, false);
  }
}

export { weiXinApply };
