import { isFudaoApp, isMQQ } from './index';
import openAppPage from './openAppPage';

function jumpToNativePage(url) {
  if (isFudaoApp()) {
    openAppPage('webview', {
      url: encodeURIComponent(url),
    });
  } else if (isMQQ()) {
    window.mqq.ui.openUrl({
      url,
      target: 1,
    });
  } else {
    location.href = url;
  }
}
export default jumpToNativePage;
