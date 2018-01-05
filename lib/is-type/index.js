export function isFunction = function(obj) {
  return typeof obj === "function";
};

export function isObject = function(obj) {
  return obj === Object(obj);
};

// 可以使用es6的 Array.isArray()
export function isArray = function(obj) {
  return Array.isArray(obj);
  // return toString.call(obj) == "[object Array]";
};

export function isDate = function(obj) {
  return toString.call(obj) == "[object Date]";
};

export function isRegExp = function(obj) {
  return toString.call(obj) == "[object RegExp]";
};

export function isBoolean = function(obj) {
  return toString.call(obj) == "[object Boolean]";
};

// Performant way to determine if obj coerces to a number
export function isNumerical = function(obj) {
  obj = obj - 0;
  return obj === obj;
};
