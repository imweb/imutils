export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isObject(obj) {
  return obj === Object(obj);
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

// Performant way to determine if obj coerces to a number
export function isNumerical(obj) {
  // obj = obj - 0;
  return obj === obj - 0;
}

