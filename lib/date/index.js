// formateDate
// 年月日，时分秒，特定的分隔符
// formateDate("yyyy年MM月dd日 hh:mm:ss.S"); //输出: 2016年04月01日 10:41:08.133
// formateDate("yyyy-MM-dd hh:mm:ss"); //输出: 2016-04-01 10:41:08
// formateDate("yy-MM-dd hh:mm:ss"); //输出: 16-04-01 10:41:08
// formateDate("yy-M-d h:m:s"); //输出: 16-4-1 10:41:8
// formateDate("yy/MM/dd", "2018-01-02"); //输出: 18/01/02

export function formatDate(fmt, time) {
  const T = time ? new Date(time) : new Date();
  const o = {
    "y+": T.getFullYear(),
    "M+": T.getMonth() + 1, //月份
    "d+": T.getDate(),  //日
    "h+": T.getHours(), //小时
    "m+": T.getMinutes(), //分
    "s+": T.getSeconds(), //秒
    "q+": Math.floor((T.getMonth() + 3) / 3), //季度
    "S+": T.getMilliseconds(), //毫秒
  };

  // 星期几，感觉可以不用启用
  // const week = {
  //   "0": "\u65e5",
  //   "1": "\u4e00",
  //   "2": "\u4e8c",
  //   "3": "\u4e09",
  //   "4": "\u56db",
  //   "5": "\u4e94",
  //   "6": "\u516d"
  // };

  // if (/(E+)/.test(fmt)) {
  //   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[T.getDay() + ""]);
  // }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)){
      if(k == "y+"){
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if(k=="S+"){
        var lens = RegExp.$1.length;
        lens = lens==1?3:lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
      }
      else{
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}

// 传入秒数 得到天、时、分、秒
export function getTimeData(t) {
  const s = Math.floor(t % 60);
  const m = Math.floor((t / 60) % 60);
  const h = Math.floor((t / 3600) % 24);
  const d = Math.floor(t / (3600 * 24));
  return {
    time: t, // 传入的总时间
    seconds: s,
    minutes: m,
    hours: h,
    days: d,
  }
}

// 格式化时间
export function formatTime(t, fmt='hh:mm:ss') {
  const timeData = getTimeData(t);
  const o = {
    "d+": timeData.days,  //日
    "h+": timeData.hours, //小时
    "m+": timeData.minutes, //分
    "s+": timeData.seconds, //秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
}

// ycxu & avenwu
// 距离某个时间点 还有多久 天时分秒
// endTime 为标准结束时间戳且不能小于当前时间
// const countDown = new CountDown(endTime);
// countDown.onUpdate = (time) => {
//   console.log(time);
// }

export class CountDown {
  constructor(opts) {
    this.endTime = new Date(opts.endTime).getTime();
    this.timeInterval = null;

    this.onUpdate = opts.onUpdate; // 更新回调
    this.onStart = opts.onStart; // 开始回调
    this.onStop = opts.onStop; // 结束回调
    
    if (opts.isInit !== false) { // 是否一开始即计时
      this.init();
    }
  }

  init() {
    if (!this.timeInterval) {
      this.timeInterval = setInterval(() => {
        this.update();
        if (this.endTime - Date.now() <= 0) {
          clearInterval(this.timeInterval);
        } 
      }, 600);
      if (this.onStart) {
        this.onStart();
      }
    }
  }

  update() {
    const remainTime = this.getRemain();
    if (this.remainTime === remainTime) {
      return;
    }
    this.remainTime = remainTime;

    if (this.onUpdate) {
      this.onUpdate(remainTime);
    }
  }

  stop() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = null;
      if (this.onStop) {
        this.onStop(this.remainTime);
      }
    }
  }

  getRemain() {
    return Math.max(Math.floor((this.endTime - Date.now()) / 1000), 0);
  }
}

// 计时
// const timer = new Timer()
// timer.onUpdate = function(time){
//  console.log(time);
// }
// const timer2 = new Timer(32); // 初始化一个时间
export class Timer {
  constructor(opts) {
    this.time = opts.time;
    this.recordStart = Date.now(); // 记录每次暂停后的开始时间
    this.timeInterval = null;

    this.onStart = opts.onStart; // 计时开始回调函数
    this.onStop = opts.onStop; // 计时停止回调函数
    this.onUpdate = opts.onUpdate; // 计时更新回调函数

    if (opts.isInit !== false) {
      this.start();
    }
  }

  start() {
    if (!this.timeInterval) {
      this.recordStart = Date.now();
      this.timeInterval = setInterval(this.tick.bind(this), 1000);
      
      if (this.onStart) {
        this.onStart();
      }
    }
  }

  stop() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = null;

      if (this.onStop) {
        this.onStop(this.time);
      }
    }
  }

  tick() {
    this.time += Math.round(this.calculateOffset() / 1000);

    if (this.onUpdate) {
      this.onUpdate(this.time);
    }
  }

  calculateOffset() {
    const now = Date.now();
    const newOffset = now - this.recordStart;
    this.recordStart = now;
    return newOffset;
  }
}