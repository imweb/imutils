# 日期相关的操作

## formatDate

格式化时间

参数说明：

- fmt：格式
- date：默认为当前时间，可传入标准格式时间戳

// 年月日，时分秒，特定的分隔符
// formateDate("yyyy年MM月dd日 hh:mm:ss.S"); //输出: 2016年04月01日 10:41:08.133
// formateDate("yyyy-MM-dd hh:mm:ss"); //输出: 2016-04-01 10:41:08
// formateDate("yy-MM-dd hh:mm:ss"); //输出: 16-04-01 10:41:08
// formateDate("yy-M-d h:m:s"); //输出: 16-4-1 10:41:8
// formateDate("yy/MM/dd", "2018-01-02"); //输出: 18/01/02

## getTimeData

通过秒数，得到天、时、分、秒

参数说明：

- time：总秒

```js
const timeObj = getTimeData(90425);
// 返回的对象
// {
//   days: 1,
//   hours: 1,
//   minutes: 7,
//   seconds: 5,
//   time: 90425,
// }
```

## formatTime

格式化天时分秒

参数说明：

- time：秒
- fmt：格式，默认为应为冒号

```js
const timeStr = formatTime(7800); // 02:10:00
const timeStr2 = formatTime(7800, 'h:m:s'); // 2:10:0
const timeStr3 = formatTime(7800, 'h/m/s'); // 2/10/0
```

## CountDown

倒计时，距离某个时间点还有多少天时分秒

参数说明：

- endTime： 为标准结束时间戳且不能小于当前时间
- onStart：开始回调
- onUpdate：每次更新回调
- onPause：暂停回调
- onEnd: 结束回调
- isInit：默认 new 对象的时候即开始计数，如传入false，则需要手动调用 `init` 方法开始计时

```js
const countDown = new CountDown({
  endTime: 'Thu Jan 11 2019 21:00:35',
  onStart: () => {},
  onUpdate: (remainTime) => {},
  onPause: (remainTime) => {},
  onEnd: () => {},
  isInit: false, 
});

countDown.init(); // 调用 onStart，onUpdate
countDown.pause(); // 调用 onPause 函数
// 如果到了截至时间会调用 onEnd 函数
```

## Timer

计时器

参数说明：

- onStart：开始回调
- onUpdate：每次更新回调
- onPause：暂停回调
- isInit：默认 new 对象的时候即开始计数，如传入false，则需要手动调用 `init` 方法开始计时

```js
const timer = new Timer({
  onStart: () => {},
  onUpdate: (time) => {},
  onPause: (time) => {},
  isInit: false,
});

timer.init(); // 调用 onStart，onUpdate
timer.pause(); // 调用 onPause 函数

// new 的时候就已经开启计时
// 调用 onStart，onUpdate
const timer2 = new Timer({
  onStart: () => {},
  onUpdate: (time) => {},
  onPause: (time) => {},
});
```