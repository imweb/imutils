const htmlDecodeDict = {
  '&quot;': '"',
  '&amp;': '&',
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
  '&#39;': "'",
};

const arr = Object.keys(htmlDecodeDict);

const decodeReg = new RegExp(`(${arr.join('|')})`, 'g');

/**
 * decode html
 * @param {string} s 需要decode的html代码
 * @memberof module:tencent/imutils
 * @return {string}
 */
function decodeHtml(s) {
  return s
    ? s.replace(decodeReg, (all) => {
        return htmlDecodeDict[all];
      })
    : s;
}


const htmlEncodeDict = {
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
  '<': '&lt;',
  '>': '&gt;',
};

const encodeReg = new RegExp(`(${Object.keys(htmlEncodeDict).join('|')})`, 'g');
/**
 * encode html
 * @param {string} s 需要encode的html代码
 * @memberof module:tencent/imutils
 * @return {string}
 */
function encodeHtml(text) {
  return text
    ? text.replace(encodeReg, (all) => {
        return htmlEncodeDict[all];
      })
    : text;
}
export { decodeHtml, encodeHtml };
