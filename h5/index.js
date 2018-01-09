function getIOSVersion() {
  const ua = navigator.userAgent;

  if (ua.indexOf('iPhone') === -1 && ua.indexOf('iPad') === -1 && ua.indexOf('iPod') === -1) {
    return false;
  }

  const i = ua.indexOf(' OS ') + 4;
  return ua.substring(i, ua.indexOf(' ', i)).replace(/_/g, '.');
};

/**
 * 打开 辅导 app
 */
function openApp({
  id = '',
}) {
  if (window.mqq) {
    const mqq = window.mqq;
    const packageName = {
      name: mqq.iOS ? 'tencentk12' : 'com.tencent.k12',
    };
    const appDownloadUrl = `${location.protocol}//fudao.qq.com/mobile_download.html?qudao=${id}`;
    if (mqq.iOS) {
      if (parseInt(getIOSVersion(), 10) >= 9) {
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

export { openApp, getIOSVersion };
// module.export = { openApp, getIOSVersion };
