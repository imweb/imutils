import * as common from '../index';
import weiXinApply from '../weiXinApply';
import isAppInstalled from '../isAppInstalled';

jest.mock('../weiXinApply');

describe('isAppInstalled', () => {
  test('if window.mqq is not exits, callback will be called directly', () => {
    window.mqq = undefined;

    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('if it is weixin and IOS, return success msg', () => {
    window.mqq = { iOS: true };
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'yes' })),
    };
    common.isWX = jest.fn(() => true);
    weiXinApply.mockImplementation(cb => cb());
    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(window.WeixinJSBridge.invoke.mock.calls.length).toBe(1);
    expect(window.WeixinJSBridge.invoke.mock.calls[0][0]).toBe('getInstallState');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1].packageUrl).toBe('tencentk12://');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback).toBeCalledWith(true);
  });

  test('if it is weixin and IOS, return err', () => {
    window.mqq = { iOS: true };
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: '' })),
    };
    common.isWX = jest.fn(() => true);
    weiXinApply.mockImplementation(cb => cb());
    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(window.WeixinJSBridge.invoke.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback).toBeCalledWith(false);
  });

  test('if it is weixin and not IOS, return success msg', () => {
    window.mqq = { iOS: false };
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'yes' })),
    };
    common.isWX = jest.fn(() => true);
    weiXinApply.mockImplementation(cb => cb());
    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(window.WeixinJSBridge.invoke.mock.calls.length).toBe(1);
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1].packageUrl).toBe('com.tencent.k12://');
  });

  test('it it is MQQ and ios', () => {
    window.mqq = { iOS: true };
    window.mqq.app = {
      isAppInstalled: jest.fn((a, cb) => cb('return')),
    };
    common.isWX = jest.fn(() => false);
    common.isMQQ = jest.fn(() => true);
    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(window.mqq.app.isAppInstalled.mock.calls[0][0]).toBe('tencentk12');
    expect(mockCallback.mock.calls[0][0]).toBe('return');
  });

  test('it it is MQQ and not IOS', () => {
    window.mqq = { iOS: false };
    window.mqq.app = {
      isAppInstalled: jest.fn((a, cb) => cb('return')),
    };
    common.isWX = jest.fn(() => false);
    common.isMQQ = jest.fn(() => true);
    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(window.mqq.app.isAppInstalled.mock.calls[0][0]).toBe('com.tencent.k12');
    expect(mockCallback.mock.calls[0][0]).toBe('return');
  });

  test('The mqq exists, but not MQQ and WX', () => {
    window.mqq = { iOS: false };
    common.isWX = jest.fn(() => false);
    common.isMQQ = jest.fn(() => false);
    const mockCallback = jest.fn();
    isAppInstalled(mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
