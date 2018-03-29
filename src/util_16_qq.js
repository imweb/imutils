import { showTips } from './util_07';

import {
  isFudaoApp,
  isWX,
  isMQQ,
  getAppVersion,
} from './util_04_ua';

import { weiXinApply } from './util_11_wx';

import { openUrlByIframe, openAppPage } from './util_15_app';

/**
 * @memberof module:tencent/imutils
 */
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

/**
 * 尝试呼起企业QQ
 * @memberof module:tencent/imutils
 */
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

/**
 * @memberof module:tencent/imutils
 */
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

// dialog 提示
// TODO 移除，这里引入了第三方的 dialog 了
function showDialog(tipText, option) {
  const defaultOption = {
    okBtnText: '我知道了',
    title: '提示',
    onConfirmCb() {},
  };

  // option = $.extend(defaultOption, option);
  option = { ...defaultOption, ...option };

  if (isMQQ() && window.mqq) {
    const { mqq } = window;
    setTimeout(() => {
      mqq.ui.showDialog({
        title: option.title,
        text: tipText,
        needOkBtn: true,
        needCancelBtn: !!option.cancelBtnText,
        okBtnText: option.okBtnText,
        cancelBtnText: option.cancelBtnText,
      }, (result) => {
        if (result.button === 0) {
          option.onConfirmCb();
        }
      });
    }, 0);
  } else {
    // setTimeout(() => {
    //   // TODO
    //   dialog.show({
    //     title: option.title,
    //     content: tipText,
    //     confirm: option.okBtnText,
    //     cancel: option.cancelBtnText,
    //     textAlign: 'center',
    //     onConfirm() {
    //       option.onConfirmCb();
    //     },
    //   });
    // }, 0);
  }
}

export {
  callService,
  callBussinessQQ,
  callQQGroup,
};
