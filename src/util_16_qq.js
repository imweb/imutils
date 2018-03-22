import { showTips } from './util_07';

import {
  isFudaoApp,
  isWX,
  isMQQ,
  getAppVersion,
} from './util_04_ua';

import { weiXinApply } from './util_11_wx';

import { openUrlByIframe, openAppPage } from './util_15_app';

function callService(serviceQQ) {
  const jumpUrl =
    'mqqapi://im/chat?chat_type=wpa&version=1&uin=' +
    serviceQQ +
    '&src_type=web&web_src=fudao.qq.com';
  const noQQTip = '请先安装QQ，再进行咨询';
  if (isFudaoApp()) {
    // android端bug临时修复
    // 1.8版本后删掉分支判断使用else逻辑
    if (window.mqq && window.mqq.android) {
      window.location.href = jumpUrl;
    } else {
      window.mqq &&
      window.mqq.invoke('edu', 'isQQWxInstalled', {}, function(data) {
        const res = JSON.parse(data);
        if (+res.isQQInstalled) {
          window.location.href = jumpUrl;
        } else {
          showTips(noQQTip);
        }
      });
    }
  } else if (isWX()) {
    openUrlByIframe(jumpUrl, function() {
      showTips(noQQTip);
    });
  } else {
    window.location.href = jumpUrl;
    setTimeout(function() {
      showTips(noQQTip);
    }, 1000);
  }
}

// 尝试呼起企业QQ
function callBussinessQQ(serviceQQ) {
  const url = 'http://q.url.cn/s/qy5XyFm?_type=wpa&isKfuin=1';
  if (isFudaoApp()) {
    if (window.mqq.android && getAppVersion() < 37) {
      callService(serviceQQ);
    } else {
      openAppPage('webview', {
        url: encodeURIComponent(url),
      });
    }
  } else if (isMQQ()) {
    window.mqq.ui.openUrl({
      url,
      target: 1,
    });
  } else {
    location.href = url;
  }
}

function callQQGroup(url) {
  const jumpUrl = url;
  const noQQTip = '请先安装QQ，才能加群';

  if (isFudaoApp()) {
    // android端bug临时修复
    // 1.8版本后删掉分支判断使用else逻辑
    if (window.mqq && window.mqq.android) {
      window.location.href = jumpUrl;
    } else {
      window.mqq &&
      window.mqq.invoke('edu', 'isQQWxInstalled', {}, function(data) {
        const res = JSON.parse(data);
        if (+res.isQQInstalled) {
          window.location.href = jumpUrl;
        } else {
          showTips(noQQTip);
        }
      });
    }
  } else if (isWX()) {
    const packageName = {
      name: mqq.iOS ? 'mqqwpa' : 'com.tencent.mobileqq',
    };

    weiXinApply(function() {
      window.WeixinJSBridge &&
      window.WeixinJSBridge.invoke(
        'getInstallState', {
          packageUrl: packageName.name + '://',
          packageName: packageName.name,
        },
        function(res) {
          if (res.err_msg.match(/yes/gi)) {
            window.location.href = jumpUrl;
          } else {
            showTips(noQQTip);
          }
        }
      );
    });
  } else {
    window.location.href = jumpUrl;
    !isMQQ() && showTips(noQQTip);
  }
}

export {
  callService,
  callBussinessQQ,
  callQQGroup,
};
