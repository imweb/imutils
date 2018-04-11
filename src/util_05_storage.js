import { getCookie } from './util_03_cookie';
import {
  isWeixin,
  getQQUin,
} from './util_04_ua';

const isClient = typeof window === 'object' && typeof document !== 'undefined';
const isServer = !isClient;

// 兼容微信和QQ
function getUin() {
  return isWeixin ? getCookie('uid_uin') || getQQUin() : getQQUin();
}

// 简易的本地存储
function getKey(key) {
  return (getUin() || 'a_') + key;
}

/**
 * @namespace
 * @memberof module:tencent/imutils
 * @property {function} set - set(key, val)
 * @property {function} get - get(key)
 */
export const storage = {

  /**
   * 存储变量
   * @param {any} key key值
   * @param {any} value 存储的值
   */
  set(key, value) {
    this.setGlobal(getKey(key), {
      v: value,
    });
  },


  /**
   * 通过key获取值
   * @param {any} key
   * @returns {any}
   */
  get(key) {
    return (this.getGlobal(getKey(key)) || {}).v;
  },

  /**
   * 设置全局变量
   * @param {any} key
   * @param {any} value
   * @returns {any}
   */
  setGlobal(key, value) {
    if (isServer) { return; }
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        // error
      }
    }
  },

  /**
   * 从全局上获取值
   * @param {any} key
   * @returns {any}
   */
  getGlobal(key) {
    if (isServer) {
      return;
    }
    if (window.localStorage) {
      const str = window.localStorage.getItem(key);
      let obj;
      if (str) {
        try {
          obj = JSON.parse(str);
          return obj;
        } catch (e) {
          return str;
        }
      }
    }
    return null;
  },
};
