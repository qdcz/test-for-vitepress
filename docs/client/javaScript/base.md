## 现代模式、严格模式

一般在代码的顶部声明 `use strict` 使整个脚本文件以现代模式进行工作

```js
"use strict"
console.log("开始代码编写")
```

## 变量

### 概念

变量是用来存储数据信息  如 姓名、年龄等，可以理解为是一个数据的命名存储

```js
let name;
name = 'cxy'   		// 字符串cxy 将保存在命名name中
console.log(name) 	// 将此变量在控制台中打印出来

let sex,age,
    address="厦门";  // 可以同时声明多个变量且赋值
```

### 声明方式

声明变量的三种关键字(方式)有 `var` `let` `const`

在现代编程中一般推荐使用 `let` 声明变量

使用 `var` 声明的变量，不是函数作用域就是全局作用域，它不存在声明块级作用域、而let声明的则是有块级作用域(也可全局)

```js
if(true){
   // 块级作用域
}

for(let i=0;i<10;i++){
    // 块级作用域
}

let fn = function(){
    // 函数作用域
}

// 全局作用域
```

使用`var` 声明变量允许重复声明，而let不允许(会报错)

```js
var a = 0;
var a = 1;
console.log(a)   // 1

let b;
let b; // SyntaxError: 'b' has already been declared
```

使用`var` 声明变量允许提前使用(变量提升)，而let不允许

因为在代码预编译的时候会将所以`var` `function`声明的变量提升到该作用域下的最顶部

```js
name = "cxy"
console.log(name) // cxy
var name;


let a;
console.log(a) // undefined
a=10
```

预编译工作原理（链接跳转）



### IIFE

ES6之前JavaScript只有`var`一种变量声明方式、为了满足块级作用域的使用发明`IIFE`写法

```js
(function() {
  var name = "cxy";
  console.log(name); // cxy
})();

console.log(name)  // cxy
```
### 保留字
一些指定的字段名称 在编程语言内已经使用过了并不适合来当变量名,比如 `class` `return` `Number` 等,
具体见 [保留字大全](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords)

```js
// 错误代码
let class = '这样声明会直接报错';
```

## 常量

常量一般是用于声明一些不变的变量 如

```JS
const COLOR_RED = '#F00';
const COLOR_BLUE = '#0F0';
```

::: tip 注意
常量所声明的无法重复赋值
:::

## 数据类型

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）
分别是 `String` `Number` `Boolean` `null` `undefined` `symbol` `bigInt` `Object`

### String

JavaScript 中的字符串必须被括在引号里。

文本数据被以字符串形式存储，单个字符没有单独的类型

::: tip 注意
字符串的内部格式始终是 [UTF-16](https://en.wikipedia.org/wiki/UTF-16)，它不依赖于页面编码。 
:::

```js
let name = 'cxy';
let age = "18";
let sex = `男`
```

 反引号是 **功能扩展** 引号。它们允许我们通过将变量和表达式包装在 `${…}` 中，来将它们嵌入到字符串中  如：

```js
// 单行写法
let name = 'cxy';
console.log( `Hello, ${name}!` )

// 多行写法
let age = 18;
console.log(`
	Hello, my name is ${name}!,
	i am ${age}
` )
```

#### 字符串长度

length 属性表示字符串长度

#### 访问字符

```js
let str = `cxy`;
// 第一个字符
console.log( str[0] ); // c
console.log( str.charAt(0) ); // c

// 最后一个字符
console.log( str[str.length - 1] ); // y
```

 它们之间的区别是，如果没有找到字符，`[]` 返回 `undefined`，而 `charAt` 返回一个空字符串： 

#### 字符串是不可变的

```js
let str = 'Hi';
str[0] = 'h'; // error
console.log( str[0] ); // 无法运行
```

 解决方法是创建一个新的字符串，并将其分配给 `str` 而不是以前的字符串 

```js
let str = 'Hi';
str = 'h' + str[1];  // 替换字符串
alert( str ); // hi
```

#### 改变大小写

```js
console.log( 'Interface'.toUpperCase() ); // INTERFACE
console.log( 'Interface'.toLowerCase() ); // interface
```

#### 查找字符串

##### str.indexof

`str.indexOf(substr, pos)`
从给定位置 `pos` 开始，在 `str` 中查找 `substr`，如果没有找到，则返回 `-1`，否则返回匹配成功的位置 

```js
let str = 'Widget with id';
console.log( str.indexOf('Widget') ); // 0，因为 'Widget' 一开始就被找到
console.log( str.indexOf('widget') ); // -1，没有找到，检索是大小写敏感的
console.log( str.indexOf("id") ); // 1，"id" 在位置 1 处（……idget 和 id）

// 可选的第二个参数允许我们从一个给定的位置开始检索。
let str = 'Widget with id';
console.log( str.indexOf('id', 2) ) // 12
```

```js
// 小算法   寻找指定字符的整个字符串中出现的次数
let str = 'my name is na ha ha na namh na';
let pot = 0;
let searchStr = 'na';
let count = 0;
while(true){
    let newpot = str.indexOf(searchStr,pot);
    if(newpot==-1) break;
    count++
    pot = newpot + 1;
}
console.log(count)
```

##### 按位（bitwise）NOT 技巧

语法：请看以下示例：

```js
console.log(~5)     	// -(5+1)===-6
console.log(~-5)     	// -(-5+1)===4
console.log(~4)     	// -(4+1)===-5
console.log(~0)     	// -(0+1)===-1
console.log(~-1)     	// -(-1+1)===-0
```

```js
let str = "Widget";
if (~str.indexOf("Widget")) {
  console.log( 'Found it!' ); // 正常运行
}
```

##### includes

是否包含该字符/串

```js
"Widget with id".includes("Widget")  // true
```

#####  startsWith 

是否以该字符/串开始

```js
"Widget".startsWith("Wid")  // true
```

#####  endsWith 

是否以该字符/串结束

```js
"Widget".startsWith("ith")  // true
```

#### 获取字符串

#####   **substr** 

` str.substr(start [, length])`

返回字符串从 `start` 开始的给定 `length` 的部分。

与以前的方法相比，这个允许我们指定 `length` 而不是结束位置：

```js
let str = "stringify";
console.log( str.substr(2, 4) ); // 'ring'，从位置 2 开始，获取 4 个字符
console.log( str.substr(-4, 2) ); // 'gi'，从第 4 位获取 2 个字符
```

#####  substring 

`str.substring(start [, end])`

返回字符串在 `start` 和 `end` **之间** 的部分。

这与 `slice` 几乎相同，但它允许 `start` 大于 `end`。

```js
let str = "stringify";
// 这些对于 substring 是相同的
console.log( str.substring(2, 6) ); // "ring"
console.log( str.substring(6, 2) ); // "ring"

// ……但对 slice 是不同的：
console.log( str.slice(2, 6) ); // "ring"（一样）
console.log( str.slice(6, 2) ); // ""（空字符串）
```



#####  slice 

` str.slice(start [, end])`

 返回字符串从 `start` 到（但不包括）`end` 的部分。 

```js
let str = "stringify";
console.log( str.slice(0, 5) ); // 'strin'，从 0 到 5 的子字符串（不包括 5）
console.log( str.slice(0, 1) ); // 's'，从 0 到 1，但不包括 1，所以只有在 0 处的字符
console.log( str.slice(2) ); // 从第二个位置直到结束
console.log( str.slice(-4, -1) ); // 'gif'
```



#### 比较字符串

##### codePointAt

 `str.codePointAt(pos)`

返回在pos位置的字符代码

```js
// 不同的字母有不同的代码
console.log( "z".codePointAt(0) ); // 122
console.log( "Z".codePointAt(0) ); // 90
```

#####  fromCodePoint

 通过数字 `code` 创建字符 

```js
String.fromCodePoint(90) // Z
```

 还可以用 `\u` 后跟十六进制代码，通过这些代码添加 Unicode 字符： 

```js
// 在十六进制系统中 90 为 5a
alert( '\u005a' ); // Z
```

## Number

在现代 JavaScript 中，数字（number）有两种类型：

1. JavaScript 中的常规数字以 64 位的格式 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) 存储，也被称为“双精度浮点数”。这是我们大多数时候所使用的数字，我们将在本章中学习它们。
2. BigInt 数字，用于表示任意长度的整数。有时会需要它们，因为常规数字不能安全地超过 `253` 或小于 `-253`。由于仅在少数特殊领域才会用到 BigInt，因此我们在特殊的章节 [BigInt](https://zh.javascript.info/bigint) 中对其进行了介绍。

