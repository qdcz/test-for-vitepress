基础

## 安装

```js
> npm install -g typescript
```

## 编译

 通常我们使用 **.ts** 作为 TypeScript 代码文件的扩展名。 

```shell
tsc index.ts
```

tsc 常用编译参数如下表所示：

| 序号 |                         编译参数说明                         |
| :--: | :----------------------------------------------------------: |
|  1.  |                    **--help**显示帮助信息                    |
|  2.  |                   **--module**载入扩展模块                   |
|  3.  |                  **--target**设置 ECMA 版本                  |
|  4.  | **--declaration**额外生成一个 .d.ts 扩展名的文件。`tsc ts-hw.ts --declaration`以上命令会生成 ts-hw.d.ts、ts-hw.js 两个文件。 |
|  5.  |              **--removeComments**删除文件的注释              |
|  6.  |         **--out**编译多个文件并合并到一个输出的文件          |
|  7.  | **--sourcemap**生成一个 sourcemap (.map) 文件。sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。 |
|  8.  | **--module noImplicitAny**在表达式和声明上有隐含的 any 类型时报错 |
|  9.  | **--watch**在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。 |

## 基础语法

### 模块

### 函数

### 变量

### 语句和表达式

### 注释

## 基础类型

| 数据类型   | 关键字    | 描述                                                         |
| :--------- | :-------- | :----------------------------------------------------------- |
| 任意类型   | any       | 声明为 any 的变量可以赋予任意类型的值。                      |
| 数字类型   | number    | 双精度 64 位浮点值。它可以用来表示整数和分数                 |
| 字符串类型 | string    | 一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。 |
| 布尔类型   | boolean   | 表示逻辑值：true 和 false。                                  |
| 数组类型   | 无        | 声明变量为数组。                                             |
| 元组       | 无        | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。 |
| 枚举       | enum      | 枚举类型用于定义数值集合。                                   |
| void       | void      | 用于标识方法返回值的类型，表示该方法没有返回值。             |
| null       | null      | 表示对象值缺失。                                             |
| undefined  | undefined | 用于初始化变量为一个未定义的值                               |
| never      | never     | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。 |

### any类型

```typescript
let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型
```

```typescript
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

### null类型

```js
// 启用 --strictNullChecks
let x: number;
x = 1; // 编译正确
x = undefined;    // 编译错误
x = null;    // 编译错误
```

 如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下： 

```js
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 编译正确
x = undefined;    // 编译正确
x = null;    // 编译正确
```

### never类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环） 

```js
// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

## 变量声明

### 变量声明

语法格式：

```
var [变量名] : [类型] = 值;
```

```js
var uname:string = "Runoob";
var score1:number = 50;
var score2:number = 42.50
var sum = score1 + score2
```

### 类型断言

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。

语法格式：

```typescript
<类型>值

或者

值 as 类型
```

断言出str是number类型或者any类型然后将值赋值给str2

如果可以很明确的知道str是String  可以直接  `var str2:number = <string> str`

```typescript
var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
```

### 类型推断

 当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。 

```js
var num = 2;    // 类型推断为 number
num = "12";    // 编译错误
```

### 变量作用域

变量作用域指定了变量定义的位置。

程序中变量的可用性由变量作用域决定。

TypeScript 有以下几种作用域：

- **全局作用域** − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
- **类作用域** − 这个变量也可以称为 **字段**。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
- **局部作用域** − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

## 函数

### 函数声明返回值

```typescript
function greet():string { // 返回一个字符串
    return "Hello World" 
} 
 
function caller() { 
    var msg = greet() // 调用 greet() 函数 
    console.log(msg) 
} 
 
```

### 带参函数

```typescript
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))
```

### 可选参数

 如果我们定义了两个参数，但是如果我们实际只需要传一个参数。咋整，使用可选参数

```typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}


 
let result1 = buildName("Bob");  // 正确
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确
```

### 默认参数

如果想在不传参数的时候使用默认参数

```typescript
function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
} 
calculate_discount(1000) 
calculate_discount(1000,0.30)
```

### 剩余参数

```typescript
function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("和为：",sum) 
 } 
 addNumbers(1,2,3) 
 addNumbers(10,10,10,10,10)
```

### 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表

>  **官方解释：**方法根据传入参数的不同会返回两种不同的类型。 如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。 如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢。 

```typescript
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
 
function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");
```

## 数组

```typescript
var sites:string[]; 
sites = ["Google","Runoob","Taobao"]

var numlist:number[] = [2,4,6,8]


// 作为返回值
function disp():string[] { 
        return new Array("Google", "Runoob", "Taobao", "Facebook");
} 
```

## 对象

```typescript
let myMap = new Map();
```

## 元组

 组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组 

```typescript
var mytuple = [10,"Runoob"];
```

## 联合类型

 联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。  **注意**：只能赋值指定的类型，如果赋值其它类型就会报错。 

```typescript
var val:string|number 

var arr:number[]|string[]; 
```

## 接口

 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。 

```typescript
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ") 
console.log(customer.firstName) 
console.log(customer.lastName) 
console.log(customer.sayHi())  
 
var employee:IPerson = { 
    firstName:"Jim",
    lastName:"Blakes", 
    sayHi: ():string =>{return "Hello!!!"} 
} 
 
console.log("Employee  对象 ") 
console.log(employee.firstName) 
console.log(employee.lastName)
```

接口未完待续....