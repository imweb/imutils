import { storage } from './util_05_storage';

/**
 * @description 是否是浏览器环境
 * @memberof module:tencent/imutils
 * @constant
 * @returns {Bool}
 */
const isClient = typeof window === 'object' && window && typeof document !== 'undefined';


/**
 * @description 是否是NodeJs服务器环境
 * @memberof module:tencent/imutils
 */
const isServer = !isClient;

// 检测是否支持webp ===========
let supportedWebPIsLoading;
let supportedWebP;
const KEYFORISSUPPORTEDWEBP = 'ISSUPPORTEDWEBP';

/** @ignore */
function doCheckIsSupportedWebP() {
  // 正在检测
  if (supportedWebPIsLoading) {
    return;
  }
  // 已检测过
  if (typeof supportedWebP !== 'undefined') {
    return;
  }
  const src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
  const img = new Image();
  supportedWebPIsLoading = true;

  img.onload = function () {
    supportedWebP = this.width === 2 && this.height === 1;
    supportedWebPIsLoading = false;
    storage.setGlobal(KEYFORISSUPPORTEDWEBP, supportedWebP);
  };
  img.onerror = function () {
    supportedWebP = false;
    supportedWebPIsLoading = false;
    storage.setGlobal(KEYFORISSUPPORTEDWEBP, supportedWebP);
  };
  img.src = src;
}


/**
 * @description 检测当前环境是否支持WebP
 * @memberof module:tencent/imutils
 * @return {Bool} Is this environment support WebP
 */
function isSupportedWebP() {
  if (isServer) {
    return false;
  }

  const isSupported = storage.getGlobal(KEYFORISSUPPORTEDWEBP);
  if (isSupported) {
    return true;
  } else if (isSupported !== false) {
    // 从本地读取不存在该字段，则异步检测一次。
    setTimeout(doCheckIsSupportedWebP, 1000);
    return false;
  }
}

/**
 * 是否为 IE 浏览器
 * @memberof module:tencent/imutils
 * @param {number} ver IE 版本号 6 7 8 9
 * @return {bool}
 */
function isIE(ver) {
  const b = document.createElement('b');
  b.innerHTML = `<!--[if IE ${ver}]><i></i><![endif]-->`;
  return b.getElementsByTagName('i').length === 1;
}

export {
  isClient,
  isServer,
  isSupportedWebP,
  isIE,
};
