import versionfunegt from '../versionfunegt';

describe('versionfunegt', () => {
  test('will return ture', () => {
    expect(versionfunegt('6.6.1', '6.5.6')).toBeTruthy();
  });

  test('will return false', () => {
    expect(versionfunegt('6.5.1', '6.5.6')).toBeFalsy();
  });

  test('will return false', () => {
    expect(versionfunegt('6.5.7', '6.5.6')).toBeTruthy();
  });
});
