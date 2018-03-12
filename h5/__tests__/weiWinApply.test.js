import weiXinApply from '../weiXinApply';

describe('weiXinApply', () => {
  test('if WeixinJSBridge.invoke is a function, callback will be called', () => {
    window.WeixinJSBridge = {
      invoke: jest.fn(),
    };

    const mockCallback = jest.fn();
    weiXinApply(mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('', () => {
    window.WeixinJSBridge.invoke = null;
    document.addEventListener = jest.fn();
    const mockCallback = jest.fn();
    weiXinApply(mockCallback);
    expect(document.addEventListener.mock.calls.length).toBe(1);
  });
});
