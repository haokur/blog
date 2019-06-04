# javascript中的数据类型

> 程序中的 `变量` 就像是原材料，而 `方法` 就像是加工机器，输入原材料，经过机器加工，然后输出成品或半成品。

### 变量

js 中变量分基本类型和引用类型，基本类型为实值，不可更改，每次赋值都是覆盖上一个值；引用类型为内存堆中的引用值，对其更改的，为对内存中的操作。

基本类型包括：string，number，boolean，undefined，null，symbol

引用类型：object

分别从以下几方面总结几种数据类型：

- 怎么创建对应的类型？
- 怎么判断值是某一个类型？
- 当前类型与其他类型之间的转化？
- 当前类型有哪些操作方法？

#### String

- 创建方式

```js
/* 字面量 */
var str1 = 'hello world';
var name = 'kitty';
var str2 = `hello ${name}`;

/*包装对象*/
var str3 = new String('hello');
str3==='hello'; // false
str3 == 'hello'; // true

// 包装对象取值
str3+''; // 'hello'
str3.toString(); // 'hello'
str3.valueOf(); // 'hello'
```

> 其中 `str3=='hello'` 进行不全等，`str3+''` 字符串拼接时，都实际隐式调用了 `str3.toString()` 方法。

- 判断变量值为字符串

```js
var str1 = 'hello';
var str2 = new String('hello');

// typeof 
typeof str1 ; // 'string'
typeof str2 ; // 'object'

// instanceof 
str1 instanceof String ; // true
str2 instanceof String ; // true
```

> 其中通过 `String` 包装类生成的字符串，返回的是 `String` 的一个实例，是一个对象。

- 转化成其他类型

```js
/* string => number */
// 数字字符串时
var str1 = '10';
var num1 = str1*1 ; // 10
var num2 = +str1 ; // 10
var num3 = Number(str1); // 10
var num4 = parseInt(str1); // 10
var num5 = parseFloat(str1); // 10

// 非数字字符串时
var str2 = 'hello10';
str2*1 ; +str2 ; Number(str2); parseInt(str2); parseFloat(str2); // NaN

// 首位非字母时
var str3 = '10hello';
str3*1 ; +str3 ; Number(str3); // NaN
parseInt(str3); // 10
parseFloat(str3); // 10


/* string => boolean */
var str4 = 'world';
var bol1 = Boolean(str4); // true
var bol2 = !!str4; // true

// 字符串只有空串判断为false
var str5 = '';
var bol3 = !!str5; // false

/* string => object */
var str6 = 'to object';
var obj1 = new String(str6); 
var obj2 = Object(str6); 

/* string => array */
var str7 = 'abbaccdd';
var arr = str7.split(''); 
arr ; // ["a", "b", "b", "a", "c", "c", "d", "d"]
```

- 常用操作方法

```js
// 都以 str 为例
var str = 'hello wolrd';
```

| 方法名      | 用法                  | 参数说明                      | 对原数据的影响             | 返回类型 | 示例              | 示例值 |
| ----------- | --------------------- | ----------------------------- | -------------------------- | -------- | ----------------- | ------ |
| charAt      | str.charAt(index)     | index：字符串索引位置(number) | 返回字符串特定位置的值     | string   | str.charAt(0);    | 'h'    |
| charCodeAt  | str.charCodeAt(index) | index：字符串索引位置(number) | 返回字符串特定位置的code码 | number   | str.charCodeAt(0) | 104    |
| concat      |                       |                               |                            |          |                   |        |
| endsWith    |                       |                               |                            |          |                   |        |
| includes    |                       |                               |                            |          |                   |        |
| indexOf     |                       |                               |                            |          |                   |        |
| lastIndexOf |                       |                               |                            |          |                   |        |
| match       |                       |                               |                            |          |                   |        |
| matchAll    |                       |                               |                            |          |                   |        |
| normalize   |                       |                               |                            |          |                   |        |
| padEnd      |                       |                               |                            |          |                   |        |
| padStart    |                       |                               |                            |          |                   |        |
| repeat      |                       |                               |                            |          |                   |        |
| replace     |                       |                               |                            |          |                   |        |
| search      |                       |                               |                            |          |                   |        |
| slice       |                       |                               |                            |          |                   |        |
| split       |                       |                               |                            |          |                   |        |
| startsWith  |                       |                               |                            |          |                   |        |
| substr      |                       |                               |                            |          |                   |        |
| substring   |                       |                               |                            |          |                   |        |
| toLowerCase |                       |                               |                            |          |                   |        |
| toString    |                       |                               |                            |          |                   |        |
| toUpperCase |                       |                               |                            |          |                   |        |
| trim        |                       |                               |                            |          |                   |        |
| trimEnd     |                       |                               |                            |          |                   |        |
| trimLeft    |                       |                               |                            |          |                   |        |
| trimRight   |                       |                               |                            |          |                   |        |
| trimStart   |                       |                               |                            |          |                   |        |
| valueOf     |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |
|             |                       |                               |                            |          |                   |        |


























