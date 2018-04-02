/**
 * @description 转换价格为方便阅读的格式
 * @param {number}  num 需要转换的数字
 * @memberof module:tencent/imutils
 * @return {number}
 */
function formatShortSignUpNum(num) {
  if (num >= 1e7) {
    return `${Math.floor(num / 1e7)}千万`;
  } else if (num >= 1e6) {
    return `${Math.floor(num / 1e6)}百万`;
  } else if (num >= 1e4) {
    return `${Math.floor(num / 1e4)}万`;
  }
  return num;
}

/**
 * @memberof module:tencent/imutils
 * @description 价格展示，如果是 0，则展示免费
 * @example
 * price(0)           // => 免费
 * price(1000)        // => ￥10.00
 * price(1000, false) // => 10.00
 * @deprecated 不建议放到 imutils
 * @todo 移除此方法
 */
function price(price, nounit) {
  return price === 0 ? '免费' : (!price ? '' : (nounit ? '' : '￥') + (price / 100).toFixed(2));
}

/**
 * 价格格式化
 * @memberof module:tencent/imutils
 * @param {number[]} prices - 价格
 * @return {string}
 * @deprecated 不建议放到 imutils
 * @ignore
 * @todo 移除此方法
 */
function prices(prices) {
  const min = prices[0];
  const max = prices[prices.length - 1];

  // TODO 格式化怎么还包含了 html 标签
  return `${min ? `&yen;${(min / 100).toFixed(2)}` : '<em class="z-free">免费</em>'}-${
    min ? '' : '&yen;'}${(max / 100).toFixed(2)}`;
}

/**
 * 日期格式化
 * @memberof module:tencent/imutils
 * @param {String} pattern - 日期格式 (格式化字符串的符号参考w3标准 http://www.w3.org/TR/NOTE-datetime)
 * @param {Date} date - 待格式化的日期对象
 * @return {String} - 格式化后的日期字符串
 * @example
 * const now = new Date();
 * formatDate("YYYY-MM-DD hh:mm:ss", now);
 */
function formatDate(pattern, date) {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  function formatNumber(data, format) { // 3
    format = format.length;
    data = data || 0;
    // return format == 1 ? data : String(Math.pow(10,format)+data).substr(-format); // IE6有bug
    // return format == 1 ? data : (data=String(Math.pow(10,format)+data)).substr(data.length-format);
    return format === 1 ? data : String(Math.pow(10, format) + data).slice(-format);
  }

  return pattern.replace(/([YMDhsm])\1*/g, (format) => {
    switch (format.charAt()) {
      case 'Y':
        return formatNumber(date.getFullYear(), format);
      case 'M':
        return formatNumber(date.getMonth() + 1, format);
      case 'D':
        return formatNumber(date.getDate(), format);
      case 'w':
        return date.getDay() + 1;
      case 'h':
        return formatNumber(date.getHours(), format);
      case 'm':
        return formatNumber(date.getMinutes(), format);
      case 's':
        return formatNumber(date.getSeconds(), format);
    }
  });
}

/**
 * 格式化任务的时间
 * @memberof module:tencent/imutils
 * @param {number} time - 单位是 s
 * @param {string} type - 不知道怎么描述
 * @return {string}
 * @deprecated 请使用 formatDate
 */
function formatTaskTime(time, type = 'short') {
  const date = new Date(time * 1000);
  let dateStr = '';
  let h = date.getHours();
  let m = date.getMinutes();
  h = h >= 10 ? h : `0${h}`;
  m = m >= 10 ? m : `0${m}`;
  if (type === 'short') {
    dateStr = `${h}:${m}`;
  } else if (type === 'middle') {
    dateStr = `${date.getMonth() + 1}月${date.getDate()}日 ${h}:${m}`;
  } else {
    dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${h}:${m}`;
  }
  return dateStr;
}

function formatTime(m) {
  return m < 10 ? `0${m}` : m;
}

/**
 * 格式化时间戳
 * @memberof module:tencent/imutils
 * @param {number} time - 单位是 s
 * @return {string}
 * @deprecated 请使用 formatDate
 */
function translateTimeStamp(time) {
  time = new Date(time * 1000);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return `${y}-${formatTime(m)}-${formatTime(d)} ${formatTime(h)}:${formatTime(mm)}:${formatTime(s)}`;
}

export {
  formatShortSignUpNum,
  formatDate,
  formatTaskTime,
  price,
  prices,
  translateTimeStamp,
};
