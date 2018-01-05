import {isFunction, isArray, isObject, isDate, isRegExp, isBoolean, isNumerical } from 'is';

// 替换所有文本
//---------------------------------------------------
export function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function replaceAll(str, search, replace, escape = true) {
  if (escape) {
    return str.replace(new RegExp(escapeRegExp(search), "g"), replace);
  } else {
    return str.replace(new RegExp(search, "g"), replace);
  }
}

// 驼峰与下划线转换
//---------------------------------------------------

function processKeys (convert, obj, options) {
  if(!isObject(obj) || isDate(obj) || isRegExp(obj) || isBoolean(obj) || isFunction(obj)) {
    return obj;
  }

  var output,
      i = 0,
      l = 0;

  if(isArray(obj)) {
    output = [];
    for(l=obj.length; i<l; i++) {
      output.push(processKeys(convert, obj[i], options));
    }
  }
  else {
    output = {};
    for(var key in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, key)) {
        output[convert(key, options)] = processKeys(convert, obj[key], options);
      }
    }
  }
  return output;
};

// String conversion methods
function separateWords (string, options) {
  options = options || {};
  var separator = options.separator || '_';
  var split = options.split || /(?=[A-Z])/;

  return string.split(split).join(separator);
};

const toString = Object.prototype.toString;

// Sets up function which handles processing keys
// allowing the convert function to be modified by a callback
function processor (convert, options) {
  var callback = options && 'process' in options ? options.process : options;

  if(typeof(callback) !== 'function') {
    return convert;
  }

  return function(string, options) {
    return callback(string, convert, options);
  }
};

export function camelize (string) {
  if (isNumerical(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  // Ensure 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

export function pascalize (string) {
  var camelized = camelize(string);
  // Ensure 1st char is always uppercase
  return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
};

export function decamelize (string, options) {
  return separateWords(string, options).toLowerCase();
};

export function camelizeKeys(object, options) {
  return processKeys(processor(camelize, options), object);
},

export function decamelizeKeys(object, options) {
  return processKeys(processor(decamelize, options), object, options);
}

export function pascalizeKeys(object, options) {
  return processKeys(processor(pascalize, options), object);
}

export function depascalizeKeys(){
  return this.decamelizeKeys.apply(this, arguments);
}
