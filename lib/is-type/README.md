# 判断类型

- isFunction
- isArray
- isDate
- isRegExp
- isBoolean
- isNumerical

以 `isFunction` 为例：

```js
const num = 7800;
const str = 'hello';
const fn = () => 'hello';
const bool = true;
const arr = [1, 2];
const obj = { name: 'hello' };
const now = new Date();
const reg = /^helo/;

// isFunction
isFunction(num); // false
isFunction(str); // false
isFunction(fn); // true
isFunction(bool); // false
isFunction(arr); // false
isFunction(obj); // false
isFunction(now); // false
isFunction(reg); // false
```