// module 格式化
function formatShortSignUpNum(num) {
  if (num >= 1e7) {
    return Math.floor(num / 1e7) + '千万';
  } else if (num >= 1e6) {
    return Math.floor(num / 1e6) + '百万';
  } else if (num >= 1e4) {
    return Math.floor(num / 1e4) + '万';
  }
  return num;
}

function price(price, nounit) {
  return price === 0 ? '免费' : (!price ? '' : (nounit ? '' : '￥') + (price / 100).toFixed(2));
}

// TODO 不推荐多层嵌套的 3 元运算

// TODO 加个还有复数？
function prices(prices) {
  const min = prices[0];
  const max = prices[prices.length - 1];

  // TODO 格式化怎么还包含了 html 标签
  return (min ? '&yen;' + (min / 100).toFixed(2) : '<em class="z-free">免费</em>') + '-' +
        (min ? '' : '&yen;') + (max / 100).toFixed(2);
}

/**
 * @日期格式化
 *
 * @param {String} pattern 日期格式 (格式化字符串的符号参考w3标准 http://www.w3.org/TR/NOTE-datetime)
 * @param {Date Object} date 待格式化的日期对象
 * @return {String} 格式化后的日期字符串
 * @example
 *      formatDate("YYYY-MM-DD hh:mm:ss", (new Date()));
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

export {
  formatShortSignUpNum,
  formatDate,
  price,
  prices,
};
