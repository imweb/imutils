import {
  isWX,
  isFudaoApp,
  getIOSVersion,
  openApp,
  getAppVersion,
  isIphoneX,
  isMQQ,
} from '../index';

describe('isWX', () => {
  test('will return true if micromessenger in userAgent', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/5.0', writable: true });
    expect(isWX()).toBeTruthy();
  });

  test('will return false if micromessenger not in userAgent', () => {
    navigator.userAgent = 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206/5.0';
    expect(isWX()).toBeFalsy();
  });
});

describe('isMQQ', () => {
  test('if ua has qq, isMQQ will return true', () => {
    navigator.userAgent = 'qq/1.2mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206/5.0';
    isMQQ();
    expect(isMQQ()).toBeTruthy();
  });
  test("if ua doesn't have qq, isMQQ will return false", () => {
    navigator.userAgent = 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206/5.0';
    isMQQ();
    expect(isMQQ()).toBeFalsy();
  });
});

describe('getIOSVersion', () => {
  test('will return false if it is not IOS', () => {
    navigator.userAgent = 'Mozilla/5.0 (Linux; Android 4.4.4; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.89 Mobile Safari/537.36';
    const version = getIOSVersion();
    expect(version).toBeFalsy();
  });

  test('will return string version if it is IOS', () => {
    navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143';
    const version = getIOSVersion();
    expect(version).toBe('8.4');
  });
});

describe('isFudaoApp', () => {
  test('will return true if EducationApp in userAgent', () => {
    navigator.userAgent = 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 EducationApp';
    expect(isFudaoApp()).toBeTruthy();
  });

  test('will return false if EducationApp not in userAgent', () => {
    navigator.userAgent = 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46';
    expect(isFudaoApp()).toBeFalsy();
  });
});


describe('openApp', () => {
  beforeEach(() => {
    window.mqq = {
      iOS: true,
      app: {
        launchApp: jest.fn(),
      },
      ui: {
        openUrl: jest.fn(),
      },
    };
  });

  test('if it is IOS and version > 9, mqq.launchApp will be called once and openUrl will not be called', () => {
    navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143';
    openApp({ id: 3008 });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(0);
  });

  test('if it is IOS and version < 9, mqq.launchApp and openUrl will be called once', () => {
    navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143';
    openApp({ id: 3008 });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(1);
  });

  test('if it is IOS, mqq.app.launchApp will be called with argument tencentk12', () => {
    openApp({ id: 3008 });
    expect(window.mqq.app.launchApp).toBeCalledWith({ name: 'tencentk12' });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
  });

  test('if it is not IOS, mqq.app.launchApp will be called with argument com.tencent.k12', () => {
    window.mqq.iOS = false;
    openApp({ id: 3008 });
    expect(window.mqq.app.launchApp).toBeCalledWith({ name: 'com.tencent.k12' });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(0);
  });
});

describe('isIphoneX', () => {
  test('if the screen width is 375,and height is 812. will return ture', () => {
    window.screen = {
      width: 375,
      height: 812,
    };
    expect(isIphoneX()).toBeTruthy();
  });
});

