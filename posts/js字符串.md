# js字符串

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
var str = 'hello world';
```

| 方法名      | 用法                        | 参数说明                                                     | 功能解释                                                     | 返回类型 |
| ----------- | --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- |
| charAt      | str.charAt(index)           | index：字符串索引位置(number)                                | 返回字符串特定位置的值                                       | string   |
|             |                             | str.charAt(0); // 'h'                                        | str.charAt(100); // ''                                       |          |
| charCodeAt  | str.charCodeAt(index)       | index：字符串索引位置(number)                                | 返回字符串特定位置的code码                                   | number   |
|             |                             | str.charCodeAt(0); // 104                                    | str.charCodeAt(100); // NaN                                  |          |
| concat      | str.concat(data)            | Data：可为字符串，或数组                                     | 字符串拼接                                                   | string   |
|             |                             | str.concat('123'); // 'hello world123'                       | str.concat(['123']); // 'hello world123'                     |          |
| endsWith    | str.endsWith(string)        | string: 字符或字符串                                         | 字符串是否以字符/字符串结尾                                  | boolean  |
|             |                             | str.endsWith('d'); // true                                   | str.endsWith('ld'); // true                                  |          |
| includes    | str.includes(string)        | string：字符或字符串                                         | 字符串是否包含字符串                                         | boolean  |
|             |                             | str.includes('h'); // true                                   | str.includes('hello'); // true                               |          |
| indexOf     | str.indexOf(string)         | string：字符或字符串                                         | 传入字符在字符串中第一次出现的位置索引                       | number   |
|             | str.indexOf('z'); // -1     | str.indexOf('o'); // 4                                       | str.indexOf('el'); // 1                                      |          |
| lastIndexOf | str.lastIndexOf(string)     | string：字符或字符串                                         | 传入字符在字符串中最后一次出现的位置索引                     | number   |
|             | str.lastIndexOf('z'); // -1 | str.lastIndexOf('o'); // 7                                   | str.lastIndexOf('lo'); // 3                                  |          |
| match       |                             |                                                              |                                                              |          |
| matchAll    |                             |                                                              |                                                              |          |
| normalize   |                             |                                                              |                                                              |          |
| padEnd      | str.padEnd(len,string)      | len：最后返回的值的长度；string：用来填充的字符串            | 在字符串的后面以传入的参数填充到对应的长度，不传 `string` 则以空格填充 | string   |
|             |                             | str.padEnd(20)；                                             | str.padEnd(20,'xy')                                          |          |
| padStart    | str.padStart(len,string)    | len：最后返回的值的长度；string：用来填充的字符串            | 在字符串的前面以传入的参数填充到对应的长度，不传 `string` 则以空格填充 | string   |
|             |                             | str.padStart(20);                                            | str.padStart(20,'xy');                                       |          |
| repeat      | str.repeat(n);              | n：重复的数量，为正整数(负数和1/0报错，小数向下取整)         | 将字符串重复 `n` 遍并返回                                    | string   |
| replace     | str.replace(x,y)            | x: 正则表达式或字符串；y：要替换成的值或者函数               | 将字符串中特定字符替换，并返回                               | string   |
| search      | str.search(regexp)          | regexp：正则表达式                                           | 搜索对应正则表达式所在的位置                                 | number   |
| slice       | str.slice(start[,end])      | start ：开始切割位置可为负数；end：结束切割位置，可为负数(可选) | 从原字符串中切割一块下来并返回，不影响原数据，为负数，则是从字符串末尾往前数 | string   |
| split       | str.split(separator,limit)  | separator：切割的标识；limit：限制返回的数量                 | 将原字符串用`separator` 切开，且不包含 `separator` ，返回切割后的数组 | array    |
| startsWith  | str.startsWith(string,pos)  | string：要检索的字符串；pos：对应的检索位置                  | 返回对应位置是否是以什么字符串开始的                         | boolean  |
| substr      | str.substr(start,len);      | start: 起始切割位置；len：切割的长度                         | 从字符串中切出特定长度的字符串                               | string   |
| substring   | str.substring(start,end);   | start : 起始切割位置；end：结束切割位置                      | 按位置切割出一段字符串                                       | string   |
| toLowerCase | str.toLowerCase()           | -                                                            | 字符串变小写                                                 | string   |
| toString    | str.toString();             | -                                                            | 取字符串的值                                                 | string   |
| toUpperCase | str.toUpperCase();          | -                                                            | 字符串变大写                                                 | string   |
| trim        | str.trim();                 | -                                                            | 去除两端空格                                                 | string   |
| trimEnd     | str.trimEnd();              | -                                                            | 去除末尾空格                                                 | string   |
| trimLeft    | str.trimLeft();             | -                                                            | 去除开始空格                                                 | string   |
| trimRight   | str.trimRight();            | -                                                            | 去除末尾空格                                                 | string   |
| trimStart   | str.trimStart();            | -                                                            | 去除开始空格                                                 | string   |
| valueOf     | str.valueOf();              | -                                                            | 取字符串的值                                                 | string   |

> 以上操作，都对原字符串没有任何影响。

[配套字符串在线操作演示](https://haokur.github.io/demos/web/string.html)

以上的方法都比较好理解，几个不定参，参数可为负，功能类似的几个切割函数，容易搞混。

`slice` ，`substr` ，`substring` 

- slice(start,end)
  - （0参）start 和 end 都可以不传
  - （1参）可传 start 不传 end ， end 则默认为字符串长度；
  - start 和 end 都可以为负数

```js
var str = 'hello world'
str.slice(); // 'hello world'
str.slice(1); // 'ello world'
str.slice(1,2); // 'e'
str.slice(-4); // 'orld'
str.slice(-4,-1); // 'orl'
```

> 想象一字排开的字符串，然后你拿到标尺去测量这字符串去打标记然后切割，你照着 `start` 定位到第一点开始的位置，没有 `start` 则默认从最左端开始，切割一刀，把之前的丢掉。然后照 `end` 找第二个点，没有 `end` ，则提前下班，把切下来的交工，若有第二点，则找到第二点开始的位置，切一刀。而字符串操作和这个区别在于字符串的切割不影响原来的字符串。
>
> - 定位的点为开始的位置，所以左包含右不包含，也就是包含 `start` 位置的值不包含 `end` 位置的值。
> - 直接找到第一点切掉了，第一点之前的扔掉了，然后再找到下一点如果在第一点左边，则切割失败，返回空，第二点在第一点右边，则可以顺利切割返回。也就是当有两个参数时，`end` 需要大于 `start` 。
> - 两个参数的作用，只是为了确定切割点。

>  一些方法的灵活性，让一些理解变得苦难和迷惑，容易衍生出一些bug，以及写代码时的不确定感，所以在写代码的时候需要衡量，默认参数的使用，以及传参不同时导致的表现不一致的复杂度。`slice` 的函数理解的混淆在于没把握它的最核心原理，我认为核心原理，各种参数的变化，都是围绕一个核心点，找到起始切割位置，切割完事。多样的是确定切割位置的多样表达。

```js
// 以上功能的实现，都可以用同一种方式实现
// 原则：强制使用两个参数，参数都必须不为负，于是
var str = 'hello world'; 
str.slice(0,0); // =》 str.slice()
str.slice(1,str.length); // str.slice(1)
str.slice(1,2); // 
str.slice(str.length-4,str.length); // str.slice(-4)
str.slice(str.length-4,str.length-1); // str.slice(-4,-1)
```

> 而可以观察规律，认为 slice 内部就是对两个参数做了一步处理。
>
> start = start >=-1? start : start+str.length
>
> end = end>=-1?end:end+str.length
>
> 然后就可以按照两个完整正数参数来理解了。
>
> 而切割的长度，Math.max(Math.min(end,str.length) - start ,0)

**有时候灵活也会失控，使得捉摸不定，难以把控**

- substr(start,length)
  - (0参)
  - 只传 start，可为负
  - Start 可为负，length 需为正数

```js
var str = 'hello world';
str.substr(); // 'hello world'
str.substr(1); // 'ello world'
str.substr(1,2); // 'el'
str.substr(-3); // 'rld'
str.substr(-3,1); // 'r'
```

> 一个头两个大，切割方法两三种，参数形式三四种。

> 类似 `slice` ，找到起始点，然后切 `length` 长度；没有起始点，从索引0开始，没有截取长度，最最大限度截取。

- substring(start,end)
  - 0参
  - 只传start
  - start 和 end 的位置可以互换
  - 负数无效，负数则和0的效果一致

```js
var str = 'hello world';
str.substring(); // 'hello world'
str.substring(3); // 'lo world'
str.substring(3,5); // 'lo'
str.substring(5,3); // 'lo'
str.substring(5,0); // 'hello'
```

> OMG
>
> 概括下：slice 是从第一个参数切到第二个参数位置，可以用负数表示从右边往左边数；substr 是从第一个参数开始切第二个参数的长度，第一个参数可为负即可以从右边开始数；substring 是以两个参数最小的为起始点，大的为终止点，取负时和0效果一致。
