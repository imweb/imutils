import * as common from '../index';
import weiXinApply from '../weiXinApply';
import versionfunegt from '../versionfunegt';
import openUrlByIframe from '../openUrlByIframe';

jest.mock('../weiXinApply');
//jest.mock('../versionfunegt');

describe('openUrlByIfram', () => {
  test('if wx version > 6.5.6, weiXinApply will be called and if callback return ok, do nothing', () => {
    common.getUa = jest.fn(() => 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/6.5.7');
    const mockfn = jest.fn();
    const url = 'http://fudao.qq.com';
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'ok' })),
    };
    weiXinApply.mockImplementation(cb => cb());
    openUrlByIframe(url, mockfn);
    expect(weiXinApply.mock.calls.length).toBe(1);
    expect(window.WeixinJSBridge.invoke.mock.calls[0][0]).toBe('launchApplication');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1]).toEqual({
      schemeUrl: url,
    });
  });

  test('if wx version > 6.5.6, weiXinApply will be called', () => {
    jest.clearAllMocks();
    common.getUa = jest.fn(() => 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/6.5.7');
    const mockfn = jest.fn();
    const url = 'http://fudao.qq.com';
    window.WeixinJSBridge = {
      invoke: jest.fn((a, b, cb) => cb({ err_msg: 'no' })),
    };
    weiXinApply.mockImplementation(cb => cb());
    openUrlByIframe(url, mockfn);
    expect(weiXinApply.mock.calls.length).toBe(1);
    expect(window.WeixinJSBridge.invoke.mock.calls[0][0]).toBe('launchApplication');
    expect(window.WeixinJSBridge.invoke.mock.calls[0][1]).toEqual({
      schemeUrl: url,
    });
    expect(mockfn.mock.calls.length).toBe(1);
  });
});
