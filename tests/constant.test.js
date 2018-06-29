import { getGradeNameStr } from '../index';

test('util_13_constant getGradeNameStr', () => {
  expect(getGradeNameStr('7001,7002,7002,7003,7004,7005,6003,6002,6001,5001,5002,5003'))
    .toBe('高一,高二,高三,初一,初二,初三,一年级,二年级,二年级,三年级,四年级,五年级');
  expect(getGradeNameStr('7001,7002,7002,6003,6002,5001,5002', true))
    .toBe('高中,初中,小学');
  expect(getGradeNameStr('7001,7002,6003,5001', true))
    .toBe('高一,初三,一年级,二年级');
  expect(getGradeNameStr('7001,7002,6003,5001', false, true))
    .toBe('全年级');
  expect(getGradeNameStr('7001,7002,6003,5001', true, true))
    .toBe('全年级');
  expect(getGradeNameStr('7001,7002', true, true))
    .toBe('小学');
  expect(getGradeNameStr('7001', true, true))
    .toBe('一年级');

  expect(getGradeNameStr(7001)).toBe('一年级');
  expect(getGradeNameStr(undefined)).toBe('');
  expect(getGradeNameStr(null)).toBe('');
});
