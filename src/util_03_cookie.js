const isClient = typeof window === 'object' && window && typeof document !== 'undefined';
const isServer = !isClient;

/**
 * 获取cookie，会对 cookie value 进行 decodeURIComponent
 * @memberof module:tencent/imutils
 * @param {string} name
 * @return {string}
 */
function getCookie(name) {
  if (isServer) {
    return '';
  }
  const m = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
  return !m ? '' : decodeURIComponent(m[2]);
}

/**
 * @typedef {Object} cookieOption
 * @property {string} name - nameof cookie
 * @property {string} value - value of cookie
 * @property {timestamp} time - expire time of cookie
 * @property {domain} domain - cookie目标域名
 */

/**
 * 设置 cookie
 * @memberof module:tencent/imutils
 * @param {cookieOption} opt
 * @return {void}
 */
function setCookie(opt) {
  if (isServer) {
    return '';
  }
  // 此 cookie 将被保存 30 天
  const Days = 30;
  const exp = new Date();
  exp.setTime(exp.getTime() + (Days * 24 * 60 * 60 * 1000));
  document.cookie = `${opt.name}=${encodeURIComponent(opt.value)};expires=${opt.time}` || `${exp.toGMTString()};domain=${opt.domain}` || 'qq.com' + ';path=/';
}

/**
 * 删除 cookie
 * @param {string} name cookie的name
 * @param {string} domain cookie的域
 * @param {string} path cookie的path
 * @memberof module:tencent/imutils
 * @param {string} name - name of cookie
 * @param {string} domain - domain of cookie
 * @param {string} path - path of cookie
 * @return {void}
 */
function delCookie(name, domain, path) {
  if (isServer) {
    return '';
  }
  document.cookie = `${name}=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=${path || '/'}; ${
    domain ? (`domain=${domain};`) : ''}`;
}

export {
  getCookie,
  setCookie,
  delCookie,
};
