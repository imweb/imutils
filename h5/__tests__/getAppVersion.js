import * as common from '../index';
import getAppVersion from '../getAppVersion';

describe('getAppVersion', () => {
  test('if it is not in fudao App, will return 0', () => {
    common.isFudaoApp = jest.fn(() => false);
    const version = getAppVersion();
    expect(version).toBe(0);
  });

  test('if it is in fudao app, will return the version', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'VersionCode/26', writable: true });
    common.isFudaoApp = jest.fn(() => true);
    const version = getAppVersion();
    expect(version).toBe('26');
  });

  test('if it is in fudao app but appverion is not exits, will return the version', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'mozilla/5.0 (iPhone; cpu iPhone os 5_1_1 like mac os x) ', writable: true });
    common.isFudaoApp = jest.fn(() => true);
    const version = getAppVersion();
    expect(version).toBe(0);
  })
});
