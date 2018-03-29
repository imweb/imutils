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
 * @memberof module:tencent/imutils
 */
function decodeHtml(s) {
  return s ? s.replace(decodeReg, (all) => {
    return htmlDecodeDict[all];
  }) : s;
}

export { decodeHtml };
