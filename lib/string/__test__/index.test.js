import { replaceAll, camelize, decamelize, camelizeKeys, decamelizeKeys } from '../index';

describe('replaceAll', () => {
  test('普通字符串', () => {
    const str = 'hello the world, world is beauty';
    const strNew = replaceAll(str, 'world', 'imweb');
    expect(strNew).toBe('hello the imweb, imweb is beauty');
  });
  test('正则匹配1', () => {
    const str = 'hello the world, hello';
    const strNew = replaceAll(str, /^hello/, 'hi');
    expect(strNew).toBe('hi the world, hello');
  });
  test('正则匹配2', () => {
    const str = 'hello the world, what, why';
    const strNew = replaceAll(str, /h.?/, 'hi');
    expect(strNew).toBe('hillo thi world, whit, whi');
  });
});

describe('camelize', () => {
  test('将下划线或中划线转成驼峰式', () => {
    const str = camelize('hello_the-world');
    expect(str).toBe('helloTheWorld');
  });

  test('首字母也转大写', () => {
    const str = camelize('hello_the-world', true);
    expect(str).toBe('HelloTheWorld');
  });
});

describe('decamelize', () => {
  test('将下划线或中划线转成驼峰式', () => {
    const str = decamelize('helloTheWorld');
    expect(str).toBe('hello_the_world');
  });

  test('首字母大写不影响结果', () => {
    const str = decamelize('HelloTheWorld');
    expect(str).toBe('hello_the_world');
  });

  test('转换为中划线连接', () => {
    const str = decamelize('helloTheWorld', { separator: '-' });
    expect(str).toBe('hello-the-world');
  });

  test('转下划线为中划线连接', () => {
    const str = decamelize('hello_the_world', { separator: '-', split: '_' });
    expect(str).toBe('hello-the-world');
  });
});

describe('camelizeKeys', () => {
  test('对象keys', () => {
    const object = { attr_one: 'foo', attr_two: 'bar' };
    const objectNew = camelizeKeys(object);
    expect(objectNew).toEqual({ attrOne: 'foo', attrTwo: 'bar' });
  });
  test('数组中item对象的keys', () => {
    const array = [{ attr_one: 'foo' }, { attr_one: 'bar' }];
    const arrayNew = camelizeKeys(array);
    expect(arrayNew).toEqual([{ attrOne: 'foo' }, { attrOne: 'bar' }]);
  });
});

describe('decamelizeKeys', () => {
  test('对象keys', () => {
    const object = { attrOne: 'foo', attrTwo: 'bar' };
    const objectNew = decamelizeKeys(object);
    expect(objectNew).toEqual({ attr_one: 'foo', attr_two: 'bar' });
  });
  test('数组中item对象的keys', () => {
    const array = [{ attrOne: 'foo' }, { attrOne: 'bar' }];
    const arrayNew = decamelizeKeys(array);
    expect(arrayNew).toEqual([{ attr_one: 'foo' }, { attr_one: 'bar' }]);
  });
});

