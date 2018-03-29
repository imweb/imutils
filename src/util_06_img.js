import storage from './util_05_storage';

const IMGCACHEKEY = 'LAZYLOADIMGS';

/**
 * 缓存，跟 webp 相关的
 * @memberof module:tencent/imutils
 * @TODO fix 放这个模块不合适
 */
function imgHashCache(src, useWebP, isSupported) {
  const imgCache = storage.get(IMGCACHEKEY) || {};
  if (useWebP && isSupported) {
    const postfix = src.indexOf('?') !== -1 ? '&' : '?';
    src = `${src}${postfix}tp=webp`;
  }
  // 缓存30天
  if (imgCache[src] && ((new Date()) - imgCache[src] < 2592000 * 1000)) {
    return src;
  }
  return false;
}

export {
  imgHashCache,
};
