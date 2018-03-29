import { isServer } from './util_00_env';
import { getCookie } from './util_03_cookie';
import {
  isWeixin,
  getQQUin,
} from './util_04_ua';

// 兼容微信和QQ
function getUin() {
  return isWeixin ? getCookie('uid_uin') || getQQUin() : getQQUin();
}

// 简易的本地存储
function getKey(key) {
  return (getUin() || 'a_') + key;
}

/**
 * @memberof module:tencent/imutils
 * @property {function} set - set(key, val)
 * @property {function} get - get(key)
 */
const storage = {
  set: function (key, value) {
    this.setGlobal(getKey(key), {
      v: value,
    });
  },
  get: function (key) {
    return (this.getGlobal(getKey(key)) || {}).v;
  },
  setGlobal: function (key, value) {
    if (isServer) return;
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        // error
      }
    }
  },
  getGlobal: function (key) {
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

export default storage;
