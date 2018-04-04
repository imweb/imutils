// TODO lint fix

import { delCookie } from './util_03_cookie';
import { isFudaoApp } from './util_04_ua';
import { loadScript } from './util_10_lang';
import { openAppPage } from './util_15_app';

/**
 * QQ登录的地址
 * @param {string} succUrl  成功登录的回调地址
 * @memberof module:tencent/imutils
 */
function qqLogin(succUrl = location) {
  window.location.href = `${'//ui.ptlogin2.qq.com/cgi-bin/login?style=9' +
                         '&appid=716040006&s_url='}${encodeURIComponent(succUrl)}&low_login=0&daid=444`;
}

/**
 * 还未实现
 * @memberof module:tencent/imutils
 */
function wxLogin() {

}

/**
 * 还未实现
 * @memberof module:tencent/imutils
 */
function login() {

}

/**
 * 重新登录
 * @memberof module:tencent/imutils
 */
function reLogin() {
  const hostDomain = (location.hostname.match(/(\.\w+){2}$/) || [`.${location.hostname}`])[0];
  const isLoaded = function () {
    return typeof window.pt_logout !== 'undefined';
  };
  loadScript('https://ui.ptlogin2.qq.com/js/ptloginout.js', isLoaded, () => {
    if (window.pt_logout) {
      window.pt_logout.logout(() => {
        delCookie('uin', hostDomain);
        delCookie('skey', hostDomain);
        delCookie('lskey', hostDomain);
        qqLogin(location.href);
      });
    }
  });
}

function toLogin() {
  if (isFudaoApp()) {
    openAppPage('login');
  } else {
    qqLogin(location.href);
  }
}

export {
  qqLogin,
  wxLogin,
  login,
  reLogin,
  toLogin,
};
