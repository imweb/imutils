// import { isServer } from './util_00_env';
import { getCookie } from './util_03_cookie';

const isClient = typeof window === 'object' && window && typeof document !== 'undefined';

// 获取ua
const UA = !isClient ? '' : (navigator.userAgent.toLowerCase() || '');

/**
 * 是否微信环境
 * @memberof module:tencent/imutils
 */
const isWeixin = UA.indexOf('micromessenger') !== -1;
/**
 * 是否QQ环境
 * @memberof module:tencent/imutils
 */
const isQQ = UA.indexOf('mqqbrowser') !== -1;

/**
 * 是否QQ登陆
 * @constant
 * @memberof module:tencent/imutils
 */
const isQQLogin = parseInt(getCookie('uid_type'), 10) === 0;

/**
 * 获取qq uin
 * @memberof module:tencent/imutils
 * @return {string} 返回QQ的uin
 */
function getQQUin() {
  const uin = getCookie('p_uin') || getCookie('uin');
  const realUin = (uin.length > 14) ? uin : parseInt(uin.replace(/[^\d]/g, ''), 10);
  return !realUin ? '' : realUin;
}

/**
 * 获取用户 uin，兼容微信和QQ
 * @memberof module:tencent/imutils
 * @return {string} 返回QQ或者微信的uin
 */
function getUin() {
  return (!isQQLogin) ? getCookie('uid_uin') || getQQUin() : getQQUin();
}

/**
 * 获取登录态字段
 * @memberof module:tencent/imutils
 * @return {string}  返回登录态字段
 */
function getAuth() {
  return (!isQQLogin) ? getCookie('uid_a2') || getSkey() : getSkey();
}

/**
 * 优先使用p_skey
 * @memberof module:tencent/imutils
 * @return {string}  返回p_skey
 */
function getSkey() {
  return getCookie('p_skey') || getCookie('skey');
}

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

/**
 * 获取bkn
 * @memberof module:tencent/imutils
 * @return {string} - get encryped auth info from cookie
 */
function getBkn() {
  return encryptSkey(getAuth());
}

/**
 * 是否是PC环境
 * @memberof module:tencent/imutils
 * @return {bool} 是否是PC环境
 */
function isPC() {
  return !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
}

/**
 * @memberof module:tencent/imutils
 * @return {bool}
 * @TODO 删除这个方法
 * @ignore
 */
function isWX() {
  return isWeixin;
}

/**
 * 目前只有在微信，safari，uc，手Q中可以调起微信登录，否则只能调起QQ登录
 * @memberof module:tencent/imutils
 * @return {bool}
 */
function isSupportWXLogin() {
  return / micromessenger\//i.test(UA)
      || (/(iphone)+[\S|\s]*(version\/)[\S|\s]*safari\//i.test(UA))
      || / mqqbrowser\//i.test(UA) // 手Q可以调起微信，但微信授权完毕后跳不回手Q了，所以先屏蔽手Q调起微信登录的功能
      || (/(iphone)+[\S|\s]*uc/i.test(UA))
      || (/(android)+[\S|\s]*uc/i.test(UA));
}

/**
 * 是否是MQQ
 * @memberof module:tencent/imutils
 * @return {bool} 是否是MQQ
 */
function isMQQ() {
  return /qq\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase());
}

const REGEXP_FUDAO_APP = /EducationApp/;
/**
 * 是否是辅导的APP
 * @memberof module:tencent/imutils
 * @return {bool} 是否是辅导APP
 */
function isFudaoApp() {
  return REGEXP_FUDAO_APP.test(navigator.userAgent);
}

/**
 * 判断 version code 是不是 0
 * @memberof module:tencent/imutils
 * @return {bool}
 * @TODO 这个用在什么场景下？
 */
function versionCodeZero() {
  return /VersionCode\/0/.test(navigator.userAgent);
}

/**
 * 获取当前辅导APP的版本
 * @memberof module:tencent/imutils
 * @returns {number | string} 如果不是在辅导APP的环境下就返回0，否则返回版本号
 */
function getAppVersion() {
  if (!isFudaoApp()) {
    return 0;
  }
  const version = (/VersionCode\/(\d+)/.exec(navigator.userAgent) || [])[1];
  return version || 0;
}

/**
 * 获取当前环境如：IOS、Android、H5
 * @memberof module:tencent/imutils
 * @return {string} ios/android/h5
 */
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

/**
 * 获取在哪个环境下的H5
 * @memberof module:tencent/imutils
 * @return {string} ios_h5/android_h5/pc_h5/h5
 */
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

/**
 * 获取当前平台的code代码
 * @return {number} 1、2、3
 */
function getPlatformCode() {
  if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
    return 1;
  } else if (/Android/i.test(navigator.userAgent)) {
    return 2;
  }
  return 3;
}

/**
 * 获取IOS的版本
 * @memberof module:tencent/imutils
 * @returns {bool | string} 返回当前IOS的版本号，如果不是IOS则返回false
 */
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

/**
 * helper for getTencentURL
 * @param {string} k
 * @ignore
 * @returns {string}
 */
function encodeParam(k) {
  k += '';
  const f = [];
  for (let i = 0; i < k.length; i++) {
    f.push(k.charCodeAt(i).toString(16).toUpperCase());
  }
  return f.join('');
}

/**
 *  helper for getTencentURL
 * @param {string} h
 * @param {string} g
 * @param {string} k
 * @param {string} fuin
 * @returns {string}
 * @ignore
 */
function getURL(h, g, k, fuin) {
  if (!h) {
    return '';
  }
  return `tencent://${h}/?subcmd=${g}&param=${k}${fuin ? `&fuin=${fuin}` : ''}`;
}

/**
 *  helper for getTencentURL
 * @param {string} h
 * @param {string} g
 * @param {string} k
 * @param {string} fuin
 * @returns {string}
 * @ignore
 */
function getEncodedURL(h, g, k, fuin) {
  if (!h) {
    return '';
  }
  k = encodeParam(k);
  return getURL(h, g, k, fuin);
}

/**
 * @memberof module:tencent/imutils
 * @description 获取tencent串
 * @param {string} type
 * @param {object} obj
 * @param {string} obj.gc
 * @param {string} obj.guin
 * @param {string} obj.appId
 * @param {string} obj.courseId
 * @return {string}
 * @TODO 看着晕，重构
 */
function getTencentURL(type, obj) {
  let h,
      g,
      k;
  let t;
  switch (type) {
    case 'all': // 'all'+gc: 打开群  限制:公开群不在群内, 无法直接打开aio, 而是会弹加群窗口
      h = 'groupwpa';
      g = 'all';
      k = `{"groupUin":${obj.gc}, "timeStamp":1383552440}`;
      break;
    case 'OpenGroup': // appid 0 打开公开群  限制:非公开群不再群内不会弹加群窗口,而是会弹"群主已将此群设置为非公开，加群后才能继续访问."
      h = 'groupwpa';
      g = 'OpenGroup';
      var appid = obj.appId || 0;
      k = `{"ExtParam":{"appId":${appid}},"groupUin":${obj.guin},"visitor":1}`;
      break;
    case 'VisitPublicGroup': // 5.1以上才支持  限制:几乎无限制, 公开群/非公开群都表现正常(非公开群不在群内打开加群窗口,其他情况都能打开)
      h = 'VisitPublicGroup';
      g = 'VisitPublicGroup';
      k = `{"ExtParam":{"appId":"0"},"groupUin":${obj.gc},"visitor":1}`;
      // k = '{"ExtParam":{"appId":""},"groupUin":' + obj.gc + ',"groupuin":'+ obj.gc +',"visitor":1}';
      break;
    case 'CourseLive': // 5.2以上才支持??
      h = 'VisitPublicGroup';
      g = 'VisitPublicGroupEx';
      k = `{"ExtParam":{"appId":"21","appParam":"{\\"CourseId\\":${obj.courseId}}"},"groupUin":${obj.gc},"visitor":1}`;
      break;
  }
  if (h) {
    const fuin = getCookie('uin') || void (0);
    return getEncodedURL(h, g, k, fuin);
  }
  return '';
}

/**
 * 获取IE版本号
 * @memberof module:tencent/imutils
 * @see https://codepen.io/gapcode/pen/vEJNZN
 * @returns {bool | string} 如果是IE就返回IE的版本号，否则返回false
 */
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

/**
 * 获取safari版本号
 * @memberof module:tencent/imutils
 * @returns {bool | string} 如果是safari就返回safari的版本号，否则返回false
 */
function getSafariVer() {
  const matchVer = navigator.userAgent.match(/Version\/([\d\.]+).*Safari/);

  if (matchVer) {
    return parseInt(matchVer[1], 10);
  }

  return false;
}

/**
 * 获取Firefox版本号
 * @memberof module:tencent/imutils
 * @returns {bool | string} 如果是Firefox就返回Firefox的版本号，否则返回false
 */
function getFirefoxVer() {
  const matchVer = navigator.userAgent.match(/Firefox\/([0-9]+)\./);
  if (matchVer) {
    return parseInt(matchVer[1], 10);
  }
  return false;
}

/**
 * 获取老师端的版本号
 * @memberof module:tencent/imutils
 * @return {number | string} 版本号
 */
function getTeacherClient() {
  const version = (/TXK12\/(\d+)/.exec(navigator.userAgent) || [])[1];
  return version || 0;
}

/**
 * 检测是否是iPhone X
 * @memberof module:tencent/imutils
 * @return {bool} 是否是iPhone X
 */
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
  isPC,
  isWX,
  isQQ,
  isSupportWXLogin,
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
  getTeacherClient,
  isIphoneX,
};
