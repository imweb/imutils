import { setCookie } from './util_03_cookie';

// 实在没有名字的
function getBitMapValue(v, map) {
  const ret = [];
  let val;

  if (!map || !map.length) {
    return ret;
  }

  for (let i = map.length - 1; i > -1; --i) {
    val = Math.pow(2, i);
    if (v >= val) {
      ret.unshift(map[i]);
      v -= val;
    }
  }

  return ret;
}

function showTips(text) {
  var div = document.createElement("div");
  div.className = 'util_tips';
  div.style.cssText = 'position:fixed; bottom:60px; width:100%; text-align:center;z-index:100;';
  div.style.opacity = '0';

  var span = document.createElement("span");
  span.className = "util_tips_text";
  span.innerText = text;
  span.style.cssText = 'padding:5px 10px; background-color:rgba(0,0,0,0.4); color:#fff; border-radius:6px;';

  div.appendChild(span);
  document.body.appendChild(div);
  appear();

  function appear() {
    var pointer = setInterval(function () {
      var op = Math.round(+div.style.opacity * 10) / 10;
      if (op === 1) {
        clearInterval(pointer);
        setTimeout(function () {
          disappear();
        }, 2000);
      } else {
        div.style.opacity = String(op + 0.1);
      }
    }, 20);
  }

  function disappear() {
    var pointer = setInterval(function () {
      var op = Math.round(+div.style.opacity * 10) / 10;
      if (op === 0) {
        clearInterval(pointer);
        document.body.removeChild(div);
      } else {
        div.style.opacity = String(op - 0.1);
      }
    }, 20);
  }
}

function hideTips() {
  [...document.querySelectorAll('.util_tips')].forEach((tipsDom) => {
    document.body.removeChild(tipsDom);
  });
}

function showTopTips(text) {
  const div = document.createElement('div');
  div.className = 'top-tips';
  div.innerHTML = text;
  div.style.cssText = 'width:100%; height: 24px; text-align:center; background-color: #f6f6cc; line-height: 24px;';
  document.body.insertBefore(div, document.body.firstChild);
}

function setPlCache(pl) { // pagelocation cache
  setCookie({ name: 'plCache', value: pl });
}

// 比较版本号
function versionfunegt(ver1, ver2) {
  const version1pre = parseFloat(ver1);
  const version2pre = parseFloat(ver2);
  const version1next = Number(ver1.replace(version1pre + '.', ''));
  const version2next = Number(ver2.replace(version2pre + '.', ''));
  if (version1pre > version2pre) {
    return true;
  } else if (version1pre < version2pre) {
    return false;
  } else {
    if (version1next >= version2next) {
      return true;
    } else {
      return false;
    }
  }
}

function getImgUrl(url = '') {
  return url.replace(/^https?:/, '');
}

function getCourseUrl(cid) {
  let protocol = 'https:';
  if (typeof location !== 'undefined') {
    protocol = location.protocol;
  }
  return protocol + '//fudao.qq.com/course.html?_bid=2379&course_id=' + cid;
}

function getTeacherUrl(tid) {
  let protocol = 'https:';
  if (typeof location !== 'undefined') {
    protocol = location.protocol;
  }
  return protocol + '//fudao.qq.com/teacher.html?_bid=2379&tid=' + tid;
}

let last = Date.now();
function clickLock(callback) {
  const now = Date.now();
  if ((now - last) > 1000) {
    callback();
  }
  last = now;
}

// 这是什么鬼，都放到 util 里面了
const photoProgress = {
  hasAddEventListener: false,
  onPhotoProgressCbs: {},
  on: function(name, fn) {
    let onPhotoProgressCbs = this.onPhotoProgressCbs;

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
            onPhotoProgressCbs[fnName].forEach((fn) => {
              fn(data);
            });
          }
        });
      });
    }
  },
  off: function(name) {
    delete this.onPhotoProgressCbs[name];
  },
};

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
};
