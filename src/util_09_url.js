function getHash(n) {
  const m = window.location.hash.match(new RegExp('(#|&)' + n + '=([^&]*)(&|$)'));
  return !m ? '' : decodeURIComponent(m[2]);
};

function getQuery(n) {
  const m = window.location.search.match(new RegExp('(\\?|&)' + n + '=([^&]*)(&|$)'));
  return !m ? '' : decodeURIComponent(m[2]);
}

// TODO 跟 getQuery 重复了
function getParams(key) {
  return getQuery(key) || getHash(key);
}

function getUrlBaseAndSearch(url) {
  const i = url.indexOf('#');
  let hash = '';
  if (i > -1) {
    hash = url.substr(i);
    url = url.substr(0, i);
  }
  let base = url;
  let search = '';
  const j = url.indexOf('?');
  if (j > -1) {
    base = url.substr(0, j);
    search = url.substr(j + 1);
  }
  return {
    base,
    search,
    hash,
  };
}

function parseQueryString(url) {
  const { search } = getUrlBaseAndSearch(url);
  let arr = [];
  if (search.trim()) {
    arr = search.split('&');
  }
  const query = {};
  arr.forEach((item) => {
    const o = item.split('=');
    const k = o[0];
    const v = o[1];
    query[k] = v || '';
  });
  return query;
}

// helper for addQuickBackWV
function param(obj, sep) {
  const s = [];
  for (const x in obj) {
    s.push([x, '=', obj[x]].join(''));
  }
  return s.join(sep || '&');
}

// 统一给 url 添加 wv 值
// 手Q750-阅读内容与消息列表快捷切换
// eg.
// addQuickBackWV('http://m.ke.qq.com/index.html?_bid=1671')
// => http://m.ke.qq.com/index.html?_bid=1671&_wv=2147483648
// addQuickBackWV('http://m.ke.qq.com/index.html?_bid=1671#header')
// => http://m.ke.qq.com/index.html?_bid=1671&_wv=2147483648#header
// addQuickBackWV('http://m.ke.qq.com/index.html?_bid=1671&_wv=7')
// => http://m.ke.qq.com/index.html?_bid=1671&_wv=2147483655
// addQuickBackWV('http://m.ke.qq.com/index.html?_bid=1671&_wv=2181046767')
// => http://m.ke.qq.com/index.html?_bid=1671&_wv=2181046767
function addQuickBackWV(url) {
  const {
    base,
    hash,
  } = getUrlBaseAndSearch(url);
  const query = parseQueryString(url);
  const wv = parseInt(query._wv || 0, 10);
  const toAdd = 2147483648;
  // 检测是否包含了 2147483648 项
  if (wv < toAdd || wv & toAdd === 0) {
    query._wv = toAdd + wv;
  }
  const qs = param(query, '&');
  return `${base}?${qs}${hash}`;
}

export {
  getQuery,
  getParams,
  getHash,
  parseQueryString,
  addQuickBackWV,
};
