import { isFudaoApp, isWX } from './index';
import weiXinApply from './weiXinApply';
import showTips from './showTips';

function callService(serviceQQ) {
  const jumpUrl = `mqqapi://im/chat?chat_type=wpa&version=1&uin=${serviceQQ}&src_type=web&web_src=fudao.qq.com`;
  const noQQTip = '请先安装QQ，再进行咨询';
  if (isFudaoApp()) {
    // android端bug临时修复
    // 1.8版本后删掉分支判断使用else逻辑
    if (window.mqq && window.mqq.android) {
      window.location.href = jumpUrl;
    } else {
      window.mqq &&
        window.mqq.invoke('edu', 'isQQWxInstalled', {}, (data) => {
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
      name: window.mqq.iOS ? 'mqqwpa' : 'com.tencent.mobileqq',
    };

    weiXinApply(() => {
      window.WeixinJSBridge &&
        window.WeixinJSBridge.invoke(
          'getInstallState',
          {
            packageUrl: `${packageName.name}://`,
            packageName: packageName.name,
          },
          (res) => {
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
    setTimeout(() => {
      showTips(noQQTip);
    }, 1000);
  }
}

export default callService;
