import { isFunction, isDate, isRegExp, isBoolean } from '../is-type';

// 替换所有文本
//---------------------------------------------------
export function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

export function replaceAll(str, search, replace, escape = false) {
  if (escape) {
    return str.replace(new RegExp(escapeRegExp(search), 'g'), replace);
  }

  return str.replace(new RegExp(search, 'g'), replace);
}

// 驼峰与下划线转换
// https://www.npmjs.com/package/humps
//---------------------------------------------------

function processKeys(convert, obj, options) {
  if (obj !== Object(obj) || isDate(obj) || isRegExp(obj) || isBoolean(obj) || isFunction(obj)) {
    return obj;
  }

  let output;
  let i = 0;
  let l = 0;

  if (Array.isArray(obj)) {
    output = [];
    for (l = obj.length; i < l; i++) {
      output.push(processKeys(convert, obj[i], options));
    }
  } else {
    output = {};
    Object.keys(obj).forEach((item) => {
      output[convert(item, options)] = processKeys(convert, obj[item], options);
    });
  }

  return output;
}

// String conversion methods
export function separateWords(string, options) {
  options = options || {};
  const separator = options.separator || '_';
  const split = options.split || /(?=[A-Z])/;

  return string.split(split).join(separator);
}

// Sets up function which handles processing keys
// allowing the convert function to be modified by a callback
function processor(convert, options) {
  const callback = options && 'process' in options ? options.process : options;

  if (typeof (callback) !== 'function') {
    return convert;
  }

  return function (string) {
    return callback(string, convert, options);
  };
}

export function camelize(string, firstUpperCase = false) {
  if (string === string - 0) { // 如果是数字直接返回
    return string;
  }
  string = string.replace(/[-_\s]+(.)?/g, (match, chr) => {
    return chr ? chr.toUpperCase() : '';
  });

  // 首字母小写
  if (!firstUpperCase) {
    return string.substr(0, 1).toLowerCase() + string.substr(1);
  }
  // 首字母大写
  return string.substr(0, 1).toUpperCase() + string.substr(1);
}

export function decamelize(string, options) {
  return separateWords(string, options).toLowerCase();
}

export function camelizeKeys(object, options) {
  return processKeys(processor(camelize, options), object);
}

export function decamelizeKeys(object, options) {
  return processKeys(processor(decamelize, options), object, options);
}
