import { setCookie } from './util_03_cookie';
import { isWX, isMQQ, isFudaoApp, getAppVersion } from './util_04_ua';
import { weiXinApply } from './util_11_wx';
import { openAppPage } from './util_15_app';
/**
 * getBitMapValue
 * @memberof module:tencent/imutils
 * @param {string} v
 * @param {Array} map
 * @returns {string}
 */
function getBitMapValue(v, map) {
  const ret = [];
  let val;

  if (!map || !map.length) {
    return ret;
  }

  for (let i = map.length - 1; i > -1; --i) {
    // 相关讨论见这里 https://github.com/airbnb/javascript/issues/1392
    // eslint-disable-next-line
    val = Math.pow(2, i);
    if (v >= val) {
      ret.unshift(map[i]);
      v -= val;
    }
  }

  return ret;
}

/**
 * 根据传入的text生成tips
 * @memberof module:tencent/imutils
 * @param {string} text 需要生成tips的text
 */
function showTips(text) {
  const div = document.createElement('div');
  div.className = 'util_tips';
  div.style.cssText = 'position:fixed; bottom:60px; width:100%; text-align:center;z-index:100;';
  div.style.opacity = '0';

  const span = document.createElement('span');
  span.className = 'util_tips_text';
  span.innerText = text;
  span.style.cssText = 'padding:5px 10px; background-color:rgba(0,0,0,0.4); color:#fff; border-radius:6px;';

  div.appendChild(span);
  document.body.appendChild(div);
  // eslint-disable-next-line
  appear();

  function appear() {
    const pointer = setInterval(() => {
      const op = Math.round(+div.style.opacity * 10) / 10;
      if (op === 1) {
        clearInterval(pointer);
        setTimeout(() => {
          // eslint-disable-next-line
          disappear();
        }, 2000);
      } else {
        div.style.opacity = String(op + 0.1);
      }
    }, 20);
  }

  function disappear() {
    const pointer = setInterval(() => {
      const op = Math.round(+div.style.opacity * 10) / 10;
      if (op === 0) {
        clearInterval(pointer);
        if (div && document.body.contains(div)) {
          document.body.removeChild(div);
        }
      } else {
        div.style.opacity = String(op - 0.1);
      }
    }, 20);
  }
}

/**
 * 隐藏Tips
 * @memberof module:tencent/imutils
 */
function hideTips() {
  [...document.querySelectorAll('.util_tips')].forEach((tipsDom) => {
    if (tipsDom && document.body.contains(tipsDom)) {
      document.body.removeChild(tipsDom);
    }
  });
}

/**
 * 显示顶部的tips
 * @param {string} text 需要在顶部显示的text
 * @memberof module:tencent/imutils
 */
function showTopTips(text) {
  const div = document.createElement('div');
  div.className = 'top-tips';
  div.innerHTML = text;
  div.style.cssText = 'width:100%; height: 24px; text-align:center; background-color: #f6f6cc; line-height: 24px;';
  document.body.insertBefore(div, document.body.firstChild);
}

/**
 * 设置name为plCache的Cookie
 * @memberof module:tencent/imutils
 * @ignore
 */
function setPlCache(pl) { // pagelocation cache
  setCookie({ name: 'plCache', value: pl });
}

/**
 * 比较版本号
 * @memberof module:tencent/imutils
 * @param {string} ver1 版本1
 * @param {string} ver2 版本2
 * @returns {bool} 如果版本1大于版本2则为true，否则返回false
 */
function versionfunegt(ver1, ver2) {
  const version1pre = parseFloat(ver1);
  const version2pre = parseFloat(ver2);
  const version1next = Number(ver1.replace(`${version1pre}.`, ''));
  const version2next = Number(ver2.replace(`${version2pre}.`, ''));
  if (version1pre > version2pre) {
    return true;
  } else if (version1pre < version2pre) {
    return false;
  }
  if (version1next >= version2next) {
    return true;
  }
  return false;
}

/**
 * 获取ImgUrl
 * @memberof module:tencent/imutils
 * @param {string} url 需要获取Img的URl
 * @return {string}
 */
function getImgUrl(url = '') {
  return url.replace(/^https?:/, '');
}

/**
 * 根据cid获取课程的URl
 * @param {number | string } cid
 * @memberof module:tencent/imutils
 * @return {string} 当前cid的课程Url
 */
function getCourseUrl(cid) {
  let protocol = 'https:';
  if (typeof window.location !== 'undefined') {
    protocol = window.location.protocol;
  }
  return `${protocol}//fudao.qq.com/course.html?_bid=2379&course_id=${cid}`;
}

/**
 * 获取老师的Url
 * @param {number | string } tid
 * @memberof module:tencent/imutils
 * @return {string} 老师的Url
 */
function getTeacherUrl(tid) {
  let protocol = 'https:';
  if (typeof window.location !== 'undefined') {
    protocol = window.location.protocol;
  }
  return `${protocol}//fudao.qq.com/teacher.html?_bid=2379&tid=${tid}`;
}

let last = Date.now();

/**
 * 点击锁定？
 * @param {function} callback 回调函数
 * @memberof module:tencent/imutils
 */
function clickLock(callback) {
  const now = Date.now();
  if ((now - last) > 1000) {
    callback();
  }
  last = now;
}

/**
 * @memberof module:tencent/imutils
 * @ignore
 */
const photoProgress = {
  hasAddEventListener: false,
  onPhotoProgressCbs: {},
  on(name, fn) {
    const { onPhotoProgressCbs } = this;

    if (!onPhotoProgressCbs[name]) {
      onPhotoProgressCbs[name] = fn;
    } else {
      if (typeof onPhotoProgressCbs[name] === 'function') {
        onPhotoProgressCbs[name] = [onPhotoProgressCbs[name]];
      }
      onPhotoProgressCbs[name].push(fn);
    }

    if (!this.hasAddEventListener && window.mqq) {
      this.hasAddEventListener = true;
      window.mqq.addEventListener('photoProgress', (data) => {
        Object.keys(onPhotoProgressCbs).forEach((fnName) => {
          if (typeof onPhotoProgressCbs[fnName] === 'function') {
            onPhotoProgressCbs[fnName](data);
          } else {
            onPhotoProgressCbs[fnName].forEach((f) => {
              f(data);
            });
          }
        });
      });
    }
  },
  off(name) {
    delete this.onPhotoProgressCbs[name];
  },
};

/**
 * 设置分享的信息
 * @memberof module:tencent/imutils
 * @param {string} title 标题
 * @param {string} desc 描述
 * @param {string} link 链接
 * @param {string} imgUrl 图片地址
 */
function setShareInfomation(title, desc, link, imgUrl) {
  const opt = {
    title,
    desc,
    link,
    imgUrl,
  };
  if (isWX()) {
    let s;
    if (typeof wx === 'undefined') {
      s = document.createElement('script');
      s.setAttribute('src', '//res.wx.qq.com/open/js/jweixin-1.0.0.js');
      document.head.appendChild(s);
    }
    s.onload = function () {
      if (window.wx) {
        const { wx } = window;
        wx.config({
          debug: false,
          appId: 'wx90cb6dfbfe2d68df',
          timestamp: new Date().getTime(),
          nonceStr: 'fuckTheNoncestr',
          signature: 'k12',
          jsApiList: ['ready', 'onMenuShareAppMessage'],
        });
        wx.ready(() => {
          wx.onMenuShareAppMessage(opt);
          wx.onMenuShareTimeline(opt);
          wx.onMenuShareQQ(opt);
          wx.onMenuShareQZone(opt);
        });
      }
    };
  } else if (isMQQ()) {
    if (window.mqq) {
      window.mqq.data.setShareInfo(opt);
    }
  }
}


let lastNetworkType;

/**
 * 微信和APP里获取网络类型
 * @memberof module:tencent/imutils
 * @param {string} callback异步回调函数
 * @return {string} 网络类型：'', 'wifi', '2G', '3G', '4G'
 */
function getNetworkType(cb) {
  const callback = (res) => {
    const resArr = ['', 'wifi', '2g', '3g', '4g', 'cable'];
    lastNetworkType = resArr[res] || '';
    cb(lastNetworkType);
  }

  if (typeof lastNetworkType === 'undefined') {
    // 如果是微信的话
    if (isWX()) {
      weiXinApply(() => {
        window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
          lastNetworkType = '';
          switch (res.err_msg) {
            case 'network_type:edge':
              lastNetworkType = '2g';
              break;
            case 'network_type:wwan':
              lastNetworkType = '3g';
              break;
            case 'network_type:wifi':
              lastNetworkType = 'wifi';
              break;
              // case: 'fail': lastNetworkType = -1;
            default:
              break;
          }
          cb(lastNetworkType);
        });
      });
    } else if (isFudaoApp() && window.mqq) {
      window.mqq.invoke('edu', 'getNetworkType', callback);
    } else if (isMQQ() && window.mqq) {
      window.mqq.device.getNetworkInfo((res = {}) => {callback(res.type)});
    } else {
      lastNetworkType = '';
      cb(lastNetworkType);
    }
  } else {
    cb(lastNetworkType);
  }
}




/**
 * 各种环境下打开页面
 * @memberof module:tencent/imutils
 * @param {string} url需要打开的页面链接
 * @param {object} obj可选参数，当前只支持属性target：'new' - 新开窗口（默认）, 'self' - 替换当前窗口
 * @reurn {void}
*/
const NEW = 'new';
const SELF = 'self';
function openUrl(url, params = {}) {
  const { mqq, location } = window;
  const { target = NEW } = params;

  if (isFudaoApp()) {
    params = { url: encodeURIComponent(url) };
    if (target === SELF) {
      // ios 2.2不用调closepPage关闭当前页，调openAppPage的时候传removecnt: 1，会在进入下个页面的时候帮关闭当前页
      if (mqq.android || (mqq.iOS && getAppVersion() < 17)) {
        mqq.invoke('edu', 'closePage');
      } else {
        params.removecnt = 1;
      }
    }
    openAppPage('webview', params);
  } else if (+mqq.QQVersion !== 0) {
    mqq.ui.openUrl({ url, target: target === NEW ? 1 : 0 });
  } else if (target === SELF) {
    location.replace(url);
  } else {
    location.href = url;
  }
}

export {
  getBitMapValue,
  showTips,
  hideTips,
  showTopTips,
  setPlCache,
  versionfunegt,
  getImgUrl,
  getCourseUrl,
  getTeacherUrl,
  clickLock,
  photoProgress,
  setShareInfomation,
  getNetworkType,
  openUrl,
};
