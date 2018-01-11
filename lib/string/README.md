# 字符串相关的一些操作方法
<!-- TOC -->

- [字符串相关的一些操作方法](#字符串相关的一些操作方法)
  - [replaceAll](#replaceall)
  - [camelize](#camelize)
  - [decamelize](#decamelize)
  - [camelizeKeys](#camelizekeys)
  - [decamelizeKeys](#decamelizekeys)

<!-- /TOC -->


## replaceAll

参数说明：

- str：字符串
- search：需要替换的内容
- replace：新内容
- escape：正则是否需要转义，默认为false

```js
const str = 'hello the world, world is beauty';
const strNew = replaceAll(str, 'world', 'imweb'); // 'hello the imweb, imweb is beauty'

const str2 = 'hello the world, what, why';
const strNew2 = replaceAll(str, /h.?/, 'hi'); // 'hillo thi world, whit, whi'
```

## camelize

参数说明：

- string：要转换的字符串
- firstUpperCase：是否将首字母也转换为大写

```js
const str = camelize('hello_the-world'); // 'helloTheWorld'
const str2 = camelize('hello_the-world', true); // 'HelloTheWorld'
```

## decamelize

参数说明：

- string：要转换的字符串
- options: 对象
  - separator：连接符
  - split：分割符

```js
const str = decamelize('helloTheWorld'); // 'hello_the_world'
const str2 = decamelize('helloTheWorld', { separator: '-' }); // 'hello-the-world'
const str3 = decamelize('hello_the_world', { separator: '-', split: '_' }); // 'hello-the-world'
```

## camelizeKeys

参数说明：

- object：需要格式key值的数组或对象
- option：对象，可传入自定义函数

```js
const object = { attr_one: 'foo', attr_two: 'bar' };
const objectNew = camelizeKeys(object); // { attrOne: 'foo', attrTwo: 'bar' }

const array = [{ attr_one: 'foo' }, { attr_one: 'bar' }];
const arrayNew = camelizeKeys(array); // [{ attrOne: 'foo' }, { attrOne: 'bar' }]
```

## decamelizeKeys

参数说明：

- object：需要格式key值的数组或对象
- option：对象，可传入自定义函数，或需要转的 separator (连接符)

```js
const object = { attrOne: 'foo', attrTwo: 'bar' };
const objectNew = decamelizeKeys(object); // { attr_one: 'foo', attr_two: 'bar' }

const array = [{ attrOne: 'foo' }, { attrOne: 'bar' }];
const arrayNew = decamelizeKeys(array); // [{ attr_one: 'foo' }, { attr_one: 'bar' }]
```