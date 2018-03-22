import * as common from '../index';
import weiXinApply from '../weiXinApply';
import showTips from '../showTips';
import callService from '../callService';

jest.mock('../showTips');
jest.mock('../weiXinApply');

describe('callService', () => {
  // beforeEach(() => {
  //   window.mqq = {
  //     invoke: jest,
  //     app: {
  //       launchApp: jest.fn(),
  //     },
  //     ui: {
  //       openUrl: jest.fn(),
  //     },
  //   };
  // });

  test('If it is fudao app and android, jump to the url directly', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: true,
    };
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callService('12345');
    expect(window.location.href).toBe('mqqapi://im/chat?chat_type=wpa&version=1&uin=12345&src_type=web&web_src=fudao.qq.com');
  });

  test('If it is fudao app ,not android and QQWxInstalled is true, jump to url', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: false,
      invoke: jest.fn((a, b, c, cb) => cb('{ "isQQInstalled": true }')),
    };
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callService('12345');
    expect(window.location.href).toBe('mqqapi://im/chat?chat_type=wpa&version=1&uin=12345&src_type=web&web_src=fudao.qq.com');
  });

  test('If it is fudao app ,not android and QQWxInstalled is not  true, jump to url', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: false,
      invoke: jest.fn((a, b, c, cb) => cb('{ "isQQInstalled": false }')),
    };
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callService('12345');
    expect(showTips.mock.calls.length).toBe(1);
  });

  test('If it is WX and ios,packageUrl will be mqqwpa.', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isWX = jest.fn(() => true);
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'yes' })),
    };
    window.mqq = {
      iOS: true,
    };
    weiXinApply.mockImplementation(cb => cb());
    callService('12345');
    expect(window.WeixinJSBridge.invoke.mock.calls.length).toBe(1);
    expect(window.WeixinJSBridge.invoke.mock.calls[0][0]).toBe('getInstallState');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1].packageUrl).toBe('mqqwpa://');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1].packageName).toBe('mqqwpa');
  });

  test('If it is WX and not ios,packageUrl will be com.tencent.mobileqq.', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isWX = jest.fn(() => true);
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'yes' })),
    };
    window.mqq = {
      iOS: false,
    };
    weiXinApply.mockImplementation(cb => cb());
    callService('12345');
    expect(window.WeixinJSBridge.invoke.mock.calls.length).toBe(1);
    expect(window.WeixinJSBridge.invoke.mock.calls[0][0]).toBe('getInstallState');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1].packageUrl).toBe('com.tencent.mobileqq://');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1].packageName).toBe('com.tencent.mobileqq');
  });

  test('If it is WX and getInstallState return true, jump to the url .', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isWX = jest.fn(() => true);
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'yes' })),
    };
    window.mqq = {
      iOS: false,
    };
    weiXinApply.mockImplementation(cb => cb());
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callService('12345');
    expect(window.location.href).toBe('mqqapi://im/chat?chat_type=wpa&version=1&uin=12345&src_type=web&web_src=fudao.qq.com');
  });

  test('If it is WX and getInstallState return true, jump to the url .', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isWX = jest.fn(() => true);
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'false' })),
    };
    window.mqq = {
      iOS: false,
    };
    weiXinApply.mockImplementation(cb => cb());
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callService('12345');
    expect(showTips.mock.calls.length).toBe(2);
  });

  test('If it is not fudao and wx, jump to the url .', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isWX = jest.fn(() => false);
    weiXinApply.mockImplementation(cb => cb());
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callService('12345');
    expect(window.location.href).toBe('mqqapi://im/chat?chat_type=wpa&version=1&uin=12345&src_type=web&web_src=fudao.qq.com');
  });
});

