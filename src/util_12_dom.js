// 光标控制
const selectionHandler = {
  // 保存光标
  saveSelection: function () {
    try {
      if (typeof document !== 'undefined' && document.getSelection) {
        var sel = document.getSelection(), ranges = [];
        if (sel.rangeCount) {
          for (var i = 0, len = sel.rangeCount; i < len; i++) {
            ranges.push(sel.getRangeAt(i));
          }
        }
        return ranges;
      } else if (typeof document !== 'undefined' && document.selection && document.selection.createRange) {
        return document.selection.type.toLowerCase() !== 'none' ? document.selection.createRange() : null;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  },

  //重置光标
  restoreSelection: (function () {
    if (typeof document !== 'undefined' && document.getSelection) {
      return function (savedSelection) {
        var sel = document.getSelection();
        sel.removeAllRanges();
        for (var i = 0, len = savedSelection.length; i < len; i++) {
          sel.addRange(savedSelection[i]);
        }
      };
    } else if (typeof document !== 'undefined' && document.selection) {
      return function (savedSelection) {
        if (savedSelection) {
          savedSelection.select();
        }
      };
    } else {
      return function (savedSelection) {};
    }
  })(),
  // 替换光标内容
  replaceSelection: function (content, EditorSelectorID) {
    if (!content) {
      return;
    }

    var dom = document.getElementById(EditorSelectorID);
    dom.focus();

    var range;
    var node = typeof content === 'string' ?
               document.createTextNode(content) : content;
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.collapse(false);
        range.insertNode(document.createTextNode(' '));
        range.insertNode(node);
        range.setStart(node, 0);

        setTimeout(function () {
          if (document.createRange) {
            range = document.createRange();
            range.setStartAfter(node);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          } else {
            var rangeObj = document.body.createTextRange();
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
 * @param {Object} DOM 元素
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

function closest(element, selector) {
  while (element && element.nodeType === 1) {
    if (elementMatches(element, selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return null;
}

function ensureVisible(elem, container) {
  // jquery offset原生实现
  function offset(target) {
    var top = 0,
        left = 0

    while (target.offsetParent) {
      top += target.offsetTop
      left += target.offsetLeft
      target = target.offsetParent
    }

    return {
      top: top,
      left: left,
    };
  }
  // elem = $(elem);
  // container = $(container);
  var top = offset(elem).top - offset(container).top;
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

export {
  selectionHandler,
  isVisible,
  closest,
  ensureVisible,
};
