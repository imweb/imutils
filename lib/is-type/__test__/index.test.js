import { isFunction, isArray, isDate, isRegExp, isBoolean, isNumerical } from '../index';

describe('isType', () => {
  const num = 7800;
  const str = 'hello';
  const fn = () => 'hello';
  const bool = true;
  const arr = [1, 2];
  const obj = { name: 'hello' };
  const now = new Date();
  const reg = /^helo/;

  test('isFunction', () => {
    expect(isFunction(num)).toBeFalsy();
    expect(isFunction(str)).toBeFalsy();
    expect(isFunction(fn)).toBeTruthy();
    expect(isFunction(bool)).toBeFalsy();
    expect(isFunction(arr)).toBeFalsy();
    expect(isFunction(obj)).toBeFalsy();
    expect(isFunction(now)).toBeFalsy();
    expect(isFunction(reg)).toBeFalsy();
  });

  test('isArray', () => {
    expect(isArray(num)).toBeFalsy();
    expect(isArray(str)).toBeFalsy();
    expect(isArray(fn)).toBeFalsy();
    expect(isArray(bool)).toBeFalsy();
    expect(isArray(arr)).toBeTruthy();
    expect(isArray(obj)).toBeFalsy();
    expect(isArray(now)).toBeFalsy();
    expect(isArray(reg)).toBeFalsy();
  });

  test('isDate', () => {
    expect(isDate(num)).toBeFalsy();
    expect(isDate(str)).toBeFalsy();
    expect(isDate(fn)).toBeFalsy();
    expect(isDate(bool)).toBeFalsy();
    expect(isDate(arr)).toBeFalsy();
    expect(isDate(obj)).toBeFalsy();
    expect(isDate(now)).toBeTruthy();
    expect(isDate(reg)).toBeFalsy();
  });

  test('isRegExp', () => {
    expect(isRegExp(num)).toBeFalsy();
    expect(isRegExp(str)).toBeFalsy();
    expect(isRegExp(fn)).toBeFalsy();
    expect(isRegExp(bool)).toBeFalsy();
    expect(isRegExp(arr)).toBeFalsy();
    expect(isRegExp(obj)).toBeFalsy();
    expect(isRegExp(now)).toBeFalsy();
    expect(isRegExp(reg)).toBeTruthy();
  });

  test('isBoolean', () => {
    expect(isBoolean(num)).toBeFalsy();
    expect(isBoolean(str)).toBeFalsy();
    expect(isBoolean(fn)).toBeFalsy();
    expect(isBoolean(bool)).toBeTruthy();
    expect(isBoolean(arr)).toBeFalsy();
    expect(isBoolean(obj)).toBeFalsy();
    expect(isBoolean(now)).toBeFalsy();
    expect(isBoolean(reg)).toBeFalsy();
  });

  test('isNumerical', () => {
    expect(isNumerical(num)).toBeTruthy();
    expect(isNumerical(str)).toBeFalsy();
    expect(isNumerical(fn)).toBeFalsy();
    expect(isNumerical(bool)).toBeFalsy();
    expect(isNumerical(arr)).toBeFalsy();
    expect(isNumerical(obj)).toBeFalsy();
    expect(isNumerical(now)).toBeFalsy();
    expect(isNumerical(reg)).toBeFalsy();
  });
});
