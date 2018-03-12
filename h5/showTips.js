const showTips = function (text, opt) {
  function disappear() {
    var pointer = setInterval(function () {
      var op = Math.round(+div.style.opacity * 10) / 10;
      if (op === 0) {
        clearInterval(pointer);
        document.body.removeChild(div);
      } else {
        div.style.opacity = String(op - 0.1);
      }
    }, 20);
  }

  function appear() {
    var pointer = setInterval(function () {
      var op = Math.round(+div.style.opacity * 10) / 10;
      if (op === 1) {
        clearInterval(pointer);
        setTimeout(function () {
          disappear();
        }, time || 2000);
      } else {
        div.style.opacity = String(op + 0.1);
      }
    }, 20);
  }

  const optType = typeof opt;
  let time;
  const defaultOpt = { bottom: '60px' };
  if (optType === 'number') {
    time = opt;
    opt = defaultOpt;
  } else {
    opt = Object.assign({}, defaultOpt, opt);
    time = opt.time || 2000;
  }

  const cssBuf = [];

  for (let k in opt) {
    cssBuf.push(k + ':' + opt[k]);
  }

  var div = document.createElement('div');
  div.className = 'util_tips';
  div.style.cssText = 'position:fixed;width:100%;text-align:center;z-index:100;' + cssBuf.join(';');
  div.style.opacity = '0';

  var span = document.createElement('span');
  span.className = 'util_tips_text';
  span.innerText = text;
  span.style.cssText =
    'padding:5px 10px; background-color:rgba(0,0,0,0.4); color:#fff; border-radius:6px;';

  div.appendChild(span);
  document.body.appendChild(div);
  appear();
};

export default showTips;
