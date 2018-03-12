import openAppPage from '../openAppPage';
import openUrlByIframe from '../openUrlByIframe';
import * as common from '../index';

jest.mock('../openUrlByIframe');
// jest.mock('../index', () => ({
//   isWX: jest.fn(() => true),
// }));

// jest.mock('../index');

describe('openAppPage', () => {
  beforeEach(() => {
    window.mqq = {
      iOS: true,
      app: {
        launchApp: jest.fn(),
      },
      ui: {
        openUrl: jest.fn(),
      },
      invoke: jest.fn(),
      invokeSchema: jest.fn(),
    };
    jest.resetModules();
  });

  test('if it is WeiXin, then openUrlByIframe will be called Once', () => {
    // jest.doMock('../index', () => ({
    //   isWX: jest.fn(() => true),
    // }));
    // const { isWX, isFudaoApp, getAppVersion } = require('../index');
    // isWX.mockImplementation(() => true);
    // expect(isWX()).toBeTruthy();
    // const { isWX  }
    // jest.mock('../index', () => ({
    //   isWX: jest.fn(() => true),
    // }));
    common.isWX = jest.fn(() => true);
    // m.isWX.mockImplementation(() => true);
    openAppPage('react', { modulename: 'index' });
    expect(openUrlByIframe.mock.calls.length).toBe(1);
  });

  test('if it is ios FudaoApp and verion > 6, window.mqq.invoke will be called Once with certain args', () => {
    jest.clearAllMocks();
    common.isWX = jest.fn(() => false);
    common.isFudaoApp = jest.fn(() => true);
    common.getAppVersion = jest.fn(() => 6);
    openAppPage('react', { modulename: 'index' });
    expect(openUrlByIframe.mock.calls.length).toBe(0);
    expect(window.mqq.invoke.mock.calls.length).toBe(1);
    expect(window.mqq.invoke).toBeCalledWith('edu', 'openAppPage', { url: 'tencentk12://openpage/react&modulename=index' });
  });

  test('if other cases,window.mqq.invokeSchema will be called once with certain args', () => {
    jest.clearAllMocks();
    common.isWX = jest.fn(() => false);
    common.isFudaoApp = jest.fn(() => false);
    openAppPage('react', { modulename: 'index' });
    expect(window.mqq.invokeSchema.mock.calls.length).toBe(1);
    expect(window.mqq.invokeSchema).toBeCalledWith('tencentk12', 'openpage', 'react', { modulename: 'index' });
  });
});
