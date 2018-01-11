import { formatDate, getTimeData, formatTime, CountDown, Timer } from '../index';

describe('formatDate', () => {
  test('格式化当前时间', () => {
    const dateStr = formatDate('yyyy年MM月dd日 hh:mm:ss');
    const now = new Date();
    const year = now.getFullYear();
    expect(dateStr).toMatch(new RegExp(`(${year})`));
  });
  test('格式化年月日，时分秒', () => {
    const dateStr = formatDate('yyyy年MM月dd日 hh:mm:ss', 'Wed Jan 10 2018 19:50:30');
    expect(dateStr).toBe('2018年01月10日 19:50:30');
  });
  test('格式化年月日', () => {
    const dateStr = formatDate('yyyy-MM-dd', 'Wed Jan 10 2018 19:50:30');
    expect(dateStr).toBe('2018-01-10');
  });
  test('格式化时分秒', () => {
    const dateStr = formatDate('h/m/s', 'Wed Jan 10 2018 07:06:30');
    expect(dateStr).toBe('7/6/30');
  });
});

test('getTimeData', () => {
  const timeObj = getTimeData(90425);
  expect(timeObj).toEqual({
    days: 1,
    hours: 1,
    minutes: 7,
    seconds: 5,
    time: 90425,
  });
});

describe('formatTime', () => {
  test('格式化时分秒', () => {
    const timeStr = formatTime(7800);
    expect(timeStr).toBe('02:10:00');
  });
  test('格式化时分秒，传入格式1', () => {
    const timeStr = formatTime(7800, 'h:m:s');
    expect(timeStr).toBe('2:10:0');
  });
  test('格式化时分秒，传入格式2', () => {
    const timeStr = formatTime(7800, 'h/m/s');
    expect(timeStr).toBe('2/10/0');
  });
});

jest.useFakeTimers();

test('CountDown', () => {
  const countDown = new CountDown({ isInit: false });
  countDown.init();

  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 600);
});

// test('Timer', () => {
//   const timer = new Timer({ isInit: false });
//   timer.start();

//   expect(setInterval).toHaveBeenCalledTimes(1);
//   expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
// });
