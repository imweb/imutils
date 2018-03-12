import * as common from '../index';
import openAppPage from '../openAppPage';
import jumpToNativePage from '../jumpToNativePage';

jest.mock('../openAppPage');

describe('jumpToNativePage', () => {
  test('If it is fudao app, openAppPage will be called with specific arguments', () => {
    common.isFudaoApp = jest.fn(() => true);
    const url = 'https//fudao.qq.com/class_score_desc.html?_bid=2379&is_get_system=1';
    jumpToNativePage(url);
    expect(openAppPage.mock.calls.length).toBe(1);
    expect(openAppPage).toBeCalledWith('webview', { url: encodeURIComponent(url) });
  });

  test('if it is MQQ, openUrl will be called', () => {
    window.mqq = {
      ui: { openUrl: jest.fn() },
    };
    common.isFudaoApp = jest.fn(() => false);
    common.isMQQ = jest.fn(() => true);
    const url = 'https//fudao.qq.com/class_score_desc.html?_bid=2379&is_get_system=1';
    jumpToNativePage(url);
    expect(window.mqq.ui.openUrl.mock.calls.length).toBe(1);
    expect(window.mqq.ui.openUrl).toBeCalledWith({
      url,
      target: 1,
    });
  });


  test('if it is not MQQ and fudao APP, jump to url directly', () => {
    window.mqq = {
      ui: { openUrl: jest.fn() },
    };
    common.isFudaoApp = jest.fn(() => false);
    common.isMQQ = jest.fn(() => false);
    Object.defineProperty(window.location, 'href', { value: '', writable: true });
    const url = 'https//fudao.qq.com/class_score_desc.html?_bid=2379&is_get_system=1';
    jumpToNativePage(url);
    expect(window.location.href).toBe(url);
  });
});

