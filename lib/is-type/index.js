
const toString = Object.prototype.toString;

export function isFunction(obj) {
  return typeof obj === 'function';
}

// 可以使用es6的 Array.isArray()
export function isArray(obj) {
  return Array.isArray(obj);
  // return toString.call(obj) == '[object Array]';
}

export function isDate(obj) {
  return toString.call(obj) === '[object Date]';
}

export function isRegExp(obj) {
  return toString.call(obj) === '[object RegExp]';
}

export function isBoolean(obj) {
  return toString.call(obj) === '[object Boolean]';
}

export function isNumerical(obj) {
  return obj === obj - 0;
}

