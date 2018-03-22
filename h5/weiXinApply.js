// 微信内置API WeixinJSBridge
const weiXinApply = function (callback) {
  if (
    typeof window.WeixinJSBridge === 'object' &&
    typeof window.WeixinJSBridge.invoke === 'function'
  ) {
    callback();
  } else {
    document.addEventListener('WeixinJSBridgeReady', callback, false);
  }
};

export default weiXinApply;
