/**
 * 深拷贝
 * @memberof module:tencent/imutils
 * @param {object} target 目标对象
 * @param {object} source 需要复制的源
 * @return {object} 深拷贝后的object
 */
function deepAssign() {
  let options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }

  if (typeof target !== 'object' && !(target instanceof Function)) {
    target = {};
  }

  if (length === i) {
    target = this;
    --i;
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy) {
          continue;
        }

        copyIsArray = copy instanceof Array;
        if (
          deep &&
          copy &&
          (copy instanceof Object || copyIsArray) &&
          !(copy instanceof Function)
        ) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && src instanceof Array ? src : [];
          } else {
            clone = src;
          }

          target[name] = deepAssign(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

/**
 * @memberof module:tencent/imutils
 */
const str = {
  trim(s = '') {
    return s.replace(/(^\s*)|(\s*$)/g, '');
  },
};

/**
 * 添加事件
 * @memberof module:tencent/imutils
 * @param {any} target
 * @param {any} eventType
 * @param {any} callback
 * @param {any} capture
 */
function addEvent(target, eventType, callback, capture) {
  if (window.addEventListener) {
    target.addEventListener(eventType, callback, capture);
  } else if (window.attachEvent) {
    target.attachEvent(`on${eventType}`, callback);
  } else {
    target[`on${eventType}`] = callback;
  }
}


/**
 * 删除事件
 * @memberof module:tencent/imutils
 * @param {any} target
 * @param {any} eventType
 * @param {any} callback
 * @param {any} capture
 */
function removeEvent(target, eventType, callback, capture) {
  if (window.removeEventListener) {
    target.removeEventListener(eventType, callback, capture);
  } else if (window.detachEvent) {
    target.detachEvent(`on${eventType}`, callback);
  } else {
    target[`on${eventType}`] = null;
  }
}

/**
 * 获取字符串的长度
 * @memberof module:tencent/imutils
 * @param {any} strTemp
 * @returns {any}
 */
function getStrLength(strTemp) {
  let sum = 0;
  for (let i = 0; i < strTemp.length; i++) {
    if (strTemp.charCodeAt(i) >= 0 && strTemp.charCodeAt(i) <= 255) {
      sum += 1;
    } else {
      sum += 2;
    }
  }
  return sum;
}


/**
 * 获取富文本字符串的长度
 * @memberof module:tencent/imutils
 * @param {any} s
 * @returns {any}
 */
function getRichStrLength(s) {
  return s.replace(/<img[^\>]*>/g, '^').replace(/&nbsp;/g, '^').length;
}

/**
 * @memberof module:tencent/imutils
 * @todo TODO 跟上面的 str 重复了
 * @ignore
 */
function trim(s) {
  return s.replace(/^(\s|&nbsp;)*|(\s|&nbsp;)*$/g, '');
}

/**
 * 替换链接
 * @memberof module:tencent/imutils
 * @param {any} str
 * @returns {any}
 */
function replaceLink(str) {
  return str
    .replace(
      /[-a-zA-Z0-9:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g,
      (all) => {
        if (/(p\.qpic\.cn|[789]\.url\.cn)/.test(all)) {
          return all;
        }
        if (all.indexOf('http') === -1) {
          return `<a href="//${all}" target="_blank">${all}</a>`;
        }
        return `<a href="${all}" target="_blank">${all}</a>`;
      }
    )
    .replace(
      /([Tt]encent:\/\/[A-Za-z0-9-_]+\/\??[A-Za-z0-9-_%&@\?\/.=]+)([\s]*[^\w]*)/g,
      '<a href="$1" target="_blank">$1</a>$2'
    );
}

const reBlank = /[\r\n\t]/g;
const reRichText = /(<\/?img[^>]*>)|(<\/?[^>]*>)/gi; // img + 文本


/**
 * richTextFilter
 * @memberof module:tencent/imutils
 * @param {any} s
 * @returns {any}
 */
function richTextFilter(s) {
  return s.replace(reBlank, '').replace(reRichText, (all) => {
    if (/<\/?img/i.test(all)) {
      return all;
    }
    return '';
  });
}

/**
 * @memberof module:tencent/imutils
 * @todo 重构
 */
function loadScript(url, readyCondition, readyCb) {
  if (typeof readyCondition !== 'function') {
    console.error('需要一个判断加载完成的条件, 类型为函数');
  }
  let tid = 0,
    beginTime = new Date();

  function createScript(url) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = url;
    head.appendChild(script);
  }

  function check() {
    if (readyCondition()) {
      readyCb && readyCb();
    } else {
      if (!tid) {
        url && createScript(url); // url可以为空,比如说异步加载又不在模块内的jquery
      }
      if (+new Date() - beginTime > 10000) {
        return;
      } // timeout

      tid = setTimeout(() => {
        check();
      }, 50);
    }
  }
  check();
}


/**
 * jsonp?
 * @memberof module:tencent/imutils
 * @param {any} url
 * @param {any} callback
 * @param {any} [opt={}]
 */
function jsonp(url, callback, opt = {}) {
  const id = `jsonp${Math.random() * new Date()}`.replace('.', '');
  const script = document.createElement('script');
  const callbackstr = opt.callback || 'callback';
  script.type = 'text/javascript';
  if (url.indexOf('?') > -1) {
    url = `${url}&${callbackstr}=${id}`;
  } else {
    url = `${url}?${callbackstr}=${id}`;
  }
  script.src = url;
  document.body.appendChild(script);
  script.onload = function () {
    document.body.removeChild(script);
  };
  window[id] = function (data) {
    if (callback) {
      callback(data);
    }
    delete window[id];
  };
}

/**
 * @memberof module:tencent/imutils
 * @ignore
 */
function fillZero(v) {
  if (v < 10) {
    return `0${v}`;
  }
  return v;
}

export {
  deepAssign,
  str,
  trim,
  addEvent,
  removeEvent,
  getStrLength,
  getRichStrLength,
  replaceLink,
  richTextFilter,
  loadScript,
  jsonp,
  fillZero,
};
