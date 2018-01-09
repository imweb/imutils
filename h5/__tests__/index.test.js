import * as m from '../index';

describe('getIOSVersion', () => {
  test('will return false if it is not IOS', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Linux; Android 4.4.4; HTC D820u Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.89 Mobile Safari/537.36', writable: true });
    const version = m.getIOSVersion();
    expect(version).toBeFalsy();
  });

  test('will return string version if it is IOS', () => {
    navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143';
    const version = m.getIOSVersion();
    expect(version).toBe('8.4');
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
    m.openApp({ id: 3008 });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(0);
  });

  test('if it is IOS and version < 9, mqq.launchApp and openUrl will be called once', () => {
    navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143';
    m.openApp({ id: 3008 });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(1);
  });

  test('if it is IOS, mqq.app.launchApp will be called with argument tencentk12', () => {
    m.openApp({ id: 3008 });
    expect(window.mqq.app.launchApp).toBeCalledWith({ name: 'tencentk12' });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
  });

  test('if it is not IOS, mqq.app.launchApp will be called with argument com.tencent.k12', () => {
    window.mqq.iOS = false;
    m.openApp({ id: 3008 });
    expect(window.mqq.app.launchApp).toBeCalledWith({ name: 'com.tencent.k12' });
    expect(window.mqq.app.launchApp.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(0);
  });
});

