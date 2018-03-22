// TODO lint fix

function qqLogin(succUrl = location) {
  window.location.href = '//ui.ptlogin2.qq.com/cgi-bin/login?style=9' +
                         '&appid=716040006&s_url=' + encodeURIComponent(succUrl) + '&low_login=0&daid=444';
}

// TODO
function wxLogin() {

}

// TODO
function login() {

}

export {
  qqLogin,
  wxLogin,
  login,
};
