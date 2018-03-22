import { isWX, isMQQ } from './index';
import weiXinApply from './weiXinApply';

/**
 * 检查 辅导 APP 是否已安装
 */
function isAppInstalled(callback) {
  if (window.mqq) {
    const packageName = {
      name: window.mqq.iOS ? 'tencentk12' : 'com.tencent.k12',
    };
    if (isWX()) {
      weiXinApply(() => {
        // 微信 6.5.6 之前判断不准
        window.WeixinJSBridge.invoke('getInstallState', {
          packageUrl: `${packageName.name}://`,
          packageName,
        }, (res) => {
          if (res.err_msg.match(/yes/ig)) { // 成功
            callback(true);
          } else {
            callback(false);
          }
        });
      });
    } else if (isMQQ()) {
      window.mqq.app.isAppInstalled(packageName.name, (isInstalled) => {
        callback(isInstalled);
      });
    } else {
      callback();
    }
  } else {
    callback();
  }
}

export default isAppInstalled;
