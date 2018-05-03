// TODO lint fix

import { delCookie } from './util_03_cookie';
import { isFudaoApp, isSupportWXLogin, isWeixinMinProgram } from './util_04_ua';
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
 * 微信登录
 * @memberof module:tencent/imutils
 */
function wxLogin(succUrl = location) {
  location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90cb6dfbfe2d68df&redirect_uri=' +
                  encodeURIComponent(window.location.protocol +
                                     '//fudao.qq.com/cgi-bin/uidaccount/k12/login?normal_login=1&ttype=4&account_type=2' +
                                     '&buz_id=122051800&appid=wx90cb6dfbfe2d68df&redirect_uri=' +
                                     encodeURIComponent(succUrl)) +
                  '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
}

/**
 * 跳转到登录页
 * @memberof module:tencent/imutils
 */
function login(succUrl = location) {
  const isTestLogin = /(\?|&)testlogin=1/.test(window.location.href);
  const supportWXLogin = isSupportWXLogin();
  const loginPage = `https://fudao.qq.com/login.html?back_url=${encodeURIComponent(succUrl)}`;

  // 微信小程序
  if (isWeixinMinProgram) {
    wxLogin();
    return;
  }

  // 灰度测试
  if (!isTestLogin) {
    if (isFudaoApp()) {
      openAppPage('login');
    } else {
      qqLogin(succUrl);
    }
    return;
  }

  if (!supportWXLogin) {
    qqLogin(succUrl);
  } else if (isFudaoApp()) {
    openAppPage('login');
  } else {
    window.open(loginPage, '_self');
  }
}


/**
 * 退出登录
 * @memberof module:tencent/imutils
 */
function logout(callback) {
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

        // delete weixin related cookie
        ['uid_a2', 'uid_type', 'uid_uin', 'uid_appid', 'openid'].forEach((name) => {
          delCookie({
            name,
            value: '',
            domain: '.fudao.qq.com',
          });
        });
        ['uid_a2', 'uid_type', 'uid_uin', 'uid_appid', 'openid'].forEach((name) => {
          delCookie({
            name,
            value: '',
            domain: '.qq.com',
          });
        });

        if (callback) {
          callback();
        }
      });
    }
  });
}

/**
 * 重新登录
 * @memberof module:tencent/imutils
 */
function reLogin(jumpUrl = location) {
  logout(() => {
    login(location);
  });
}

function toLogin(succUrl = location) {
  if (isFudaoApp()) {
    openAppPage('login');
  } else {
    qqLogin(succUrl);
  }
}

export {
  qqLogin,
  wxLogin,
  login,
  logout,
  reLogin,
  toLogin,
};
