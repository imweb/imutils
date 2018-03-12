import weiXinApply from './weiXinApply';
import { getUa } from './index';
import versionfunegt from './versionfunegt';

function openUrlByIframe(url, onfail) {
  const wxVersion = (getUa().match(/micromessenger\/(\d+\.\d+\.\d+)(\.\d+)?/i) || [])[1];
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
  i.onload = function () {
    i.parentNode.removeChild(i);
  };
  i.onerror = function () { };

  i.src = url;
  document.body.appendChild(i);
}

export default openUrlByIframe;
