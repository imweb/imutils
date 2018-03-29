import {
  isFudaoApp,
  isWeixin,
  isWX,
  isMQQ,
  getAppVersion,
  getIOSVersion,
} from './util_04_ua';
import { weiXinApply } from './util_11_wx';
import { versionfunegt } from './util_07';

/**
 * @memberof module:tencent/imutils
 */
function openUrlByIframe(url, onfail) {
  const ua = navigator.userAgent.toLowerCase();
  const wxVersion = (ua.match(/micromessenger\/(\d+\.\d+\.\d+)(\.\d+)?/i) || [])[1];
  if (versionfunegt(wxVersion, '6.5.6')) {
    weiXinApply(() => {
      window.WeixinJSBridge && window.WeixinJSBridge.invoke('launchApplication', {
        schemeUrl: url,
      }, (res) => {
        // launchApplication:ok or launchApplication:fail
        // alert(res.err_msg);
        if (res.err_msg.match(/ok/ig)) { // 成功
          // do nothing
        } else {
          onfail && onfail();
        }
      });
    });
    return;
  }

  const i = document.createElement('iframe');
  i.style.cssText = 'display:none;width:0px;height:0px;';
  i.onload = function() {
    i.parentNode.removeChild(i);
  };
  i.onerror = function() {};

  i.src = url;
  document.body.appendChild(i);
}


/**
 * @memberof module:tencent/imutils
 */
function openAppPage(page, params) {
  if (!window.mqq) {
    return;
  }

  params = params || {};

  var url = 'tencentk12://openpage/' + page + '?';
  for (var i in params) {
    if (params.hasOwnProperty(i)) {
      url = url + '&' + i + '=' + params[i];
    }
  }
  
  const isIos = window.mqq && window.mqq.iOS;
  const isAndroid = window.mqq && window.mqq.android;
  // 安卓11版本后支持openAppPage接口
  // 但是安卓openpage不存在延时问题
  // 只是为了保持接口一致，避免挖坑
  // || (isAndroid && getAppVersion() >= 11)
  if (isWX()) {
    openUrlByIframe(url);
  } else if (isFudaoApp() && (isIos && getAppVersion() >= 5)) {
    window.mqq.invoke('edu', 'openAppPage', {
      url,
    });
  } else {
    window.mqq.invokeSchema('tencentk12', 'openpage', page, params);
  }
}

/**
 * 打开 辅导 app
 * @memberof module:tencent/imutils
 */
function openApp({
  id = '',
}) {
  if (window.mqq) {
    const packageName = {
      name: mqq.iOS ? 'tencentk12' : 'com.tencent.k12',
    };
    const appDownloadUrl = location.protocol + '//fudao.qq.com/mobile_download.html?qudao=' + id;
    if (mqq.iOS) {
      if (parseInt(getIOSVersion()) >= 9) {
        mqq.app.launchApp(packageName);
      } else {
        mqq.app.launchApp(packageName);
        mqq.ui.openUrl({
          url: appDownloadUrl,
          target: 1,
        });
      }
    } else {
      mqq.app.launchApp(packageName);
    }
  }
}

/**
 * 检查 辅导 APP 是否已安装
 * @memberof module:tencent/imutils
 */
function isAppInstalled(callback) {
  if (window.mqq) {
    const packageName = {
      name: mqq.iOS ? 'tencentk12' : 'com.tencent.k12',
    };
    if (isWeixin) {
      weiXinApply(() => {
        // 微信 6.5.6 之前判断不准
        window.WeixinJSBridge.invoke('getInstallState', {
          packageUrl: packageName.name + '://',
          packageName: packageName.name
        }, (res) => {
          if (res.err_msg.match(/yes/ig)) { // 成功
            callback(true);
          } else {
            callback(false);
          }
        });
      });
    } else if (isMQQ()) {
      mqq.app.isAppInstalled(packageName.name, function(isInstalled) {
        callback(isInstalled);
      });
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * @memberof module:tencent/imutils
 */
function gotoNativePage(url, prefix = 'tencentk12://openpage/webview?url=') {
  const urlEnd = encodeURIComponent(url);
  if (isFudaoApp()) {
    location.href = prefix + urlEnd;
  } else if (isMQQ()) {
    if (window.mqq) {
      window.mqq.ui.openUrl({
        url,
        target: 1,
      });
    }
  } else {
    location.href = url;
  }
}

/**
 * @memberof module:tencent/imutils
 */
function jumpToNativePage(url) {
  if (isFudaoApp()) {
    openAppPage('webview', {
      url: encodeURIComponent(url),
    });
  } else if (isMQQ()) {
    window.mqq.ui.openUrl({
      url: url,
      target: 1,
    });
  } else {
    location.href = url;
  }
}


export {
  openUrlByIframe,
  openAppPage,
  openApp,
  isAppInstalled,
  gotoNativePage,
  jumpToNativePage,
};
