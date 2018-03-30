/**
 * @memberof module:tencent/imutils
 * @namespace
 */
const selectionHandler = {
  /**
   *  保存光标
   * @return {null}
   */
  saveSelection() {
    try {
      if (typeof document !== 'undefined' && document.getSelection) {
        let sel = document.getSelection(),
          ranges = [];
        if (sel.rangeCount) {
          for (let i = 0, len = sel.rangeCount; i < len; i++) {
            ranges.push(sel.getRangeAt(i));
          }
        }
        return ranges;
      } else if (typeof document !== 'undefined' && document.selection && document.selection.createRange) {
        return document.selection.type.toLowerCase() !== 'none' ? document.selection.createRange() : null;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  },


  /**
   * 重置光标
   * @function
   */
  restoreSelection: (function () {
    if (typeof document !== 'undefined' && document.getSelection) {
      return function (savedSelection) {
        const sel = document.getSelection();
        sel.removeAllRanges();
        for (let i = 0, len = savedSelection.length; i < len; i++) {
          sel.addRange(savedSelection[i]);
        }
      };
    } else if (typeof document !== 'undefined' && document.selection) {
      return function (savedSelection) {
        if (savedSelection) {
          savedSelection.select();
        }
      };
    }
    return function (savedSelection) {};
  }()),


  /**
   * 替换光标内容
   * @param {any} content
   * @param {any} EditorSelectorID
   * @returns {any}
   */
  replaceSelection(content, EditorSelectorID) {
    if (!content) {
      return;
    }

    const dom = document.getElementById(EditorSelectorID);
    dom.focus();

    let range;
    const node = typeof content === 'string' ?
      document.createTextNode(content) : content;
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.collapse(false);
        range.insertNode(document.createTextNode(' '));
        range.insertNode(node);
        range.setStart(node, 0);

        setTimeout(() => {
          if (document.createRange) {
            range = document.createRange();
            range.setStartAfter(node);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          } else {
            const rangeObj = document.body.createTextRange();
            rangeObj.moveToElementText(node);
            rangeObj.select();
          }
        }, 0);
      } else {
        dom.innerHTML += node.outerHTML;
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (typeof content === 'string') {
        range.text = content;
      } else if (range.pasteHTML) {
        range.pasteHTML(content.outerHTML);
      } else {
        dom.innerHTML += node.outerHTML;
      }
    }
  },
};

/**
 * 检查元素是否可见
 * @memberof module:tencent/imutils
 * @param {Object} DOM 元素
 * @return {bool}
 */
function isVisible(el) {
  const rect = el.getBoundingClientRect();
  const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(
    rect.bottom < 0 ||
    rect.right > viewWidth + rect.width ||
    rect.bottom > viewHeight + rect.height ||
    rect.right < 0
  );
}

// helper for closest
function elementMatches(element, selector) {
  const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
  let index = 0;

  while (elements[index] && elements[index] !== element) {
    ++index;
  }

  return Boolean(elements[index]);
}

/**
 * @param {DOM} element
 * @param {string} selector 选择器
 * @memberof module:tencent/imutils
 * @returns {null|DOM}
 */
function closest(element, selector) {
  while (element && element.nodeType === 1) {
    if (elementMatches(element, selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return null;
}

/**
 * 保证元素可见
 * @param {DOM} elem DOM元素
 * @param {DOM} container 父container
 * @memberof module:tencent/imutils
 */
function ensureVisible(elem, container) {
  // jquery offset原生实现
  function offset(target) {
    let top = 0,
      left = 0;

    while (target.offsetParent) {
      top += target.offsetTop;
      left += target.offsetLeft;
      target = target.offsetParent;
    }

    return {
      top,
      left,
    };
  }
  // elem = $(elem);
  // container = $(container);
  let top = offset(elem).top - offset(container).top;
  if (!top) {
    return;
  }

  if (top < 0) {
    container.scrollTop(container.scrollTop + top - 2);
    return;
  }

  top += elem.offsetHeight - container.offsetHeight;
  if (top > 0) {
    container.scrollTop = container.scrollTop + top + 2;
  }
}

const PIXEL_STEP = 10;
const LINE_HEIGHT = 40;
const PAGE_HEIGHT = 800;

/**
 * 计算鼠标滑动动，导致的页面滚动量
 * @memberof module:tencent/imutils
 */
function normalizeWheel(event) {
  let sX = 0;
  let sY = 0; // spinX, spinY
  let pX = 0;
  let pY = 0; // pixelX, pixelY
  // Legacy
  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode === 1) { // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else { // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = (pX < 1) ? -1 : 1;
  }
  if (pY && !sY) {
    sY = (pY < 1) ? -1 : 1;
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY,
  };
}

export {
  selectionHandler,
  isVisible,
  closest,
  ensureVisible,
  normalizeWheel,
};
