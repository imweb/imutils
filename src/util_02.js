const htmlDecodeDict = {
  '&quot;': '"',
  '&amp;': '&',
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
  '&#39;': '\'',
};

const arr = Object.keys(htmlDecodeDict);

const decodeReg = new RegExp(`(${arr.join('|')})`, 'g');

/**
 * 解码 html 字符
 * @memberof module:tencent/imutils
 * @param {string} s - 包含 &quot; 这样的 entity 字符
 * @return {string}
 */
function decodeHtml(s) {
  return s ? s.replace(decodeReg, (all) => {
    return htmlDecodeDict[all];
  }) : s;
}

export { decodeHtml };
