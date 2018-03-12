import * as common from '../index';
import callBussinessQQ from '../callBussinessQQ';
import callService from '../callService';
import getAppVersion from '../getAppVersion';
import openAppPage from '../openAppPage';

jest.mock('../showTips');
jest.mock('../weiXinApply');
jest.mock('../callService');
jest.mock('../getAppVersion');
jest.mock('../openAppPage');

describe('callBussinessQQ', () => {
  test('If it is fudao app and android, appvesion < 37, callService will be called', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: true,
    };
    getAppVersion.mockImplementation(() => 36);
    callBussinessQQ('12345');
    expect(callService.mock.calls.length).toBe(1);
  });

  test('If it is fudao app and not android, openAppPage will be called', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: false,
    };

    callBussinessQQ('12345');
    expect(openAppPage.mock.calls.length).toBe(1);
  });

  test('If it is fudao app and not android, openAppPage will be called', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: false,
    };

    callBussinessQQ('12345');
    expect(openAppPage.mock.calls.length).toBe(2);
  });
  
  test('If it is fudao app and version > 37, openAppPage will be called', () => {
    common.isFudaoApp = jest.fn(() => true);
    window.mqq = {
      android: true,
    };
    getAppVersion.mockImplementation(() => 38);
    callBussinessQQ('12345');
    expect(openAppPage.mock.calls.length).toBe(3);
  });

  test('If it is MQQ,  window.mqq.ui.openUrl will be called', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isMQQ = jest.fn(() => true);
    window.mqq.ui = {
      openUrl: jest.fn(),
    };

    callBussinessQQ('12345');
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl.mock.calls[0][0]).toEqual({
      url: 'http://q.url.cn/s/qy5XyFm?_type=wpa&isKfuin=1',
      target: 1,
    });
  });

  test('If it is not Fudao app and MQQ, jump to the url', () => {
    common.isFudaoApp = jest.fn(() => false);
    common.isMQQ = jest.fn(() => false);
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    callBussinessQQ('12345');
    expect(window.location.href).toBe('http://q.url.cn/s/qy5XyFm?_type=wpa&isKfuin=1');
  });
});
