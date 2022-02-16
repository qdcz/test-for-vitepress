# proxy代理模式

Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”

## 基本语法

```js
var pro = new Proxy(target,handle);
```

Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。 

​			new Proxy()表示生成一个Proxy实例，

​			target参数表示所要拦截的目标对象,

​			handler参 数也是一个对象，用来定制拦截行为。

## 代码解释一波

​		Proxy 可以理解成，在目标对象之前架设一层“拦截” ，外界对该对象的访问，都必须先通过这层拦截，因此 提供了一种机制，可以对外界的访问进行过滤和改写

```js
var pro = new Proxy({
    name:"前端开发"
},{
    get:function(target,property,receiver){  // get 的参数后面有写
        console.log(target)
        console.log(property)
        console.log(receiver)
    },
    set:function(target,property){
        return 35
    }
});
```

![image-20200517110720737](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110720737.png)

## 基本操作

```js
let obj = {
    name:"洋"
}
var pro = new Proxy(obj,{
    get:function(target,property){
        return target[property] + '我做了代理'
    },
    set:function(target,property){
        target[property]='无论你怎么修改，都会被代理模式改回来'
    }
});
```

![image-20200517110736555](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110736555.png)

## get操作

get方法用于拦截某个属性的读取操作，可以接受 三个参数，

目标对象

属性名

proxy 实 例本身

（严格地说，是操作行为所针对的对象,也就 是所谓的接收器），其中最后一个参数可选。

### 对象属性过滤

```js
let pro  = new Proxy({
    name:"yang"
},{
    get:function(target,name){
        if(name in target){
            return target[name]
        }else{
            throw new ReferenceError('该属性不存在')
        }
    }
})
```

![image-20200517110744334](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110744334.png)

### get方法可继承

```js
var pro = new Proxy({
    name:"前端开发"
},{
    get:function(target,property,receiver){
        return target[property] + '做了代理'
    },
    set:function(target,property){
        return 35
    }
});

let aaa = Object.create(pro)
aaa.name  //  "前端开发，做了代理"
```

### get操作经典示例之模拟链式操作

```js
var doubles = (n)=>n*2;
var doubles01 = (n)=>n*2;
var pow = n=> n*n;

let pipe = function(number){
    var pro = new Proxy({},{
        get:function(target,property){
            if(property=='stop') return number
            // 如果是let定义的就拿不到了window下的函数了
            return pipe(window[property](number))  
        }
    });
    return pro
}

let sum = pipe(3).doubles.doubles01.pow.stop
console.log(sum)  // 144
```

### get的第三个参数

```js
const pro = new Proxy({},{
    get:function(target,property,receiver){
        return receiver
    }
});

const d = Object.create(pro);
```

![image-20200517110757771](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110757771.png)

## set操作

set方法用来拦截某个属性的赋值操作，可以接受四个参数

```
1. 目标对象
2. 属性名
3. 属性值 
4. Proxy 实例本身 其中最后一个参数可选。
```

### 制作属性过滤器

```js
let pro  = new Proxy({
    name:"yang"
},{
    set:function(target,key,value){
        if(key in target){
            target[key] = value;
            return true
        }else{
            throw new ReferenceError('该属性不存在，无法设置')
        }
    }
})
pro.name = 666




// 代理函数，一样
let pro  = new Proxy(function(){
    this.name='其实也可以代理函数的，函数的原型也是对象'
},{
    set:function(target,key,value){
        console.log(key)
        // 判断属性是否定义存在过
        if(key in target){
            // 判断拿的是否是内部属性
            if(key.slice(0,1)==='_'){
                return console.log('内部属性不可读')
            }
            target[key] = value;
            return true
        }else{
            throw new ReferenceError('该属性不存在，无法设置')
        }
    }
})
pro.name = 666
```

### 完善之阻止用户获取内部对象

​		有时候我们希望自己写的内部对象不想被外部访问到，就可以使用set函数进行代理过滤

```js
let pro  = new Proxy({
    _name:"我是一个内部属性，我不想被看到或者获取到",
    name:"yang"
},{
    set:function(target,key,value){
        // 判断属性是否定义存在过
        if(key in target){
            // 判断拿的是否是内部属性
            if(key[0]==='_'){   	//注：key.slice(0,1) === key[0]
                return console.log('内部属性不可读')
            }
            target[key] = value;
            return true
        }else{
            throw new ReferenceError('该属性不存在，无法设置')
        }
    }
})
pro._name = 666
```

注意，严格模式下，set代理如果没有返回true，就会报错。  // 我上面返回true了 ，   随时返回true成为一种习惯

## apply操作

```js
apply:function(target, object, args)：{}
target			目标对象
object			目标对象的上下文对象（this） 
args 			目标对象的参数数组。
```

### 基本用法

```js
let proxyFn = function(){
    return '我是原函数'
}
let handler = {
    apply:function(target,ctx,arrs){
        return '我是代理处理过的！'
    }
}
let proxys = new Proxy(proxyFn,handler)
console.log(proxys())
```

![image-20200517110812332](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110812332.png)

## has操作

has方法用来拦截hasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。 典型的操作就是in运算符。

( 但是对for in的操作不起作用 )

```js
construct:function(target,propKey){}  拦截propKey in proxy的操作，返回一个布尔值。 
target			目标对象
propKey			需查询的属性名。
```

```js
let proxyFn = function(){
    this.name= 'yang'
    this.type="代理函数"
    this._name = '内部属性'
}
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}

// 代理函数和对象都一样
let handler = {
    has:function(target,propKey){
        if(propKey[0]=='_'){
            return console.log('内部对象不可读')
        }
        return propKey in target
    }
}
let proxys = new Proxy(proxyFn,handler)

console.log('_name' in proxys)
```

![image-20200517110824855](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110824855.png)

### has注意：

Proxy的has方法不判断一个属性是对 象自身的属性，还是继承的属性

跟Object对象下的has方法区别下

## construct操作

construct方法用于拦截new命令

```js
construct:function(target,args){}
target			目标对象
args			构造函数的参数对象

// construct方法返回的必须是一个对象，否则会报错。
```

### 代理对象（报错示例）

```js
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}
// 注意等等报错   
let handler = {
    construct:function(target,args){
        console.log(target,args)
        //return new target(...args)
        return { a:"66"}
    }
}
let proxys = new Proxy(proxyFn,handler)

let a = new proxys()
console.log(a)
```

![image-20200517110842033](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110842033.png)

### 代理构造函数

```js
let proxyFn = function(){
    this.name= 'yang'
    this.type="代理函数"
    this._name = '内部属性'
}


let handler = {
    construct:function(target,args){
        console.log(target,args)
        return new target    // construct方法返回的必须是一个对象，否则会报错。
    }
}
let proxys = new Proxy(proxyFn,handler)


let a = new proxys('参数')
console.log(a)
console.log(a.name)
console.log(a.type)
```

![image-20200517110851980](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110851980.png)

## deleteProperty操作

deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当 前属性就无法被delete命令删除。

```js
deleteProperty:function(target,key){}
target			目标对象
args			构造函数的参数对象
```

### 代理对象（函数不可用）

```js
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}

let handler = {
    get:function(target,keys){
        return target[keys]
    },
    deleteProperty:function(target,key){
        console.log('第一个参数',target)
        console.log('第二个参数',key)
        delete target[key]
        return true
    }
}
let proxys = new Proxy(proxyObj,handler)
```

![image-20200517110903940](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110903940.png)

### （应用之）禁止删除内部属性

```js
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}
let handler = {
    deleteProperty:function(target,key){
        if(key[0]==='_'){
            throw new Error('内部属性不可删除')
        }
        delete target[key]
        return true
    }
}
let proxys = new Proxy(proxyObj,handler)

delete proxys.name  // ok
delete proxys._name  // 报错
```

![image-20200517110913521](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110913521.png)

## defineProperty操作

defineProperty方法拦截了Object.defineProperty操作。

```js
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}
let handler = {
    defineProperty:function(target,key,descripter){
        console.log('属性描述',descripter) 
        return false
    }
}
let proxys = new Proxy(proxyObj,handler)

proxys.aaa= '666'
```

![image-20200517110922866](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110922866.png)

## getOwnPropertyDescriptor操作

```js
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}
let handler = {
    getOwnPropertyDescriptor:function(target,key){
        if(key[0]==='_'){
            return console.log('内部属性不可访问！')
        }
        console.log('代理的实例',target)
        console.log('属性描述',key)
        return Object.getOwnPropertyDescriptor(target,key)
    }
}
let proxys = new Proxy(proxyObj,handler)
```

![image-20200517110940904](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110940904.png)

## getPrototypeOf操作

getPrototypeOf方法主要用来拦截获取对象原型。

```js
let ojbk = {
    name:"001"
}

let handler = {
    getPrototypeOf:function(target){
        return ojbk    //注意，返回值必须是对象或者null，否 则报错。另外，如果目标对象不可扩展，必须返回目标对象的原型对象。
    }
}
let proxys = new Proxy(proxyObj,handler)
```

![image-20200517110949844](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110949844.png)

## isExtensible操作

isExtensible方法拦截Object.isExtensible操作。

```js
let proxys = new Proxy({},{
    isExtensible:function(target){
        return true
    }
})

Object.isExtensible(proxys)  // true
```

这个方法有一个强限制，它的返回值必须与目标对象的isExtensible 属性保持一致，否则就会抛出错误( 如下所示 )

```js
let proxys = new Proxy({},{
    isExtensible:function(target){
        return false   // 这边我改成false
    }
})

Object.isExtensible(proxys)  // 报错  解决如下下：
```

![image-20200517110958645](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517110958645.png)

```js
let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性'
}
Object
let handler = {
    isExtensible:function(target){
        return false
    }
}
let proxys = new Proxy(proxyObj,handler)
Object.preventExtensions(proxyObj)   // ES5语法 我在JS对象内写过
```

![image-20200517111006268](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111006268.png)

## ownKeys操作

ownKeys方法用来拦截对象自身属性的读取操作

```js
//  阻止遍历访问私有属性

let proxyObj = {
    name : 'yang',
    type:"代理对象",
    _name : '内部属性',
    [Symbol.for('yang')]:"symbol属性"
}

Object.defineProperty(proxyObj,'bukemeiju',{
    enumerable:false,
    value:"static",
    writable:true,
    configurable:true
})

let handler = {
    ownKeys:function(target){
        // 手动将内部——属性过滤了
        return Object.getOwnPropertyNames(target).filter(i=>i[0]!='_')
    }
}
let proxys = new Proxy(proxyObj,handler)
```

![image-20200517111014300](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111014300.png)

### 运行解释

```
使用Object.keys方法时，有三类属性会被ownKeys方法自 动过滤，不会返回。
1. 目标对象上不存在的属性 2. 属性名为 Symbol 值 3. 不可遍历（enumerable）的属性


返回不存在的属性、Symbol 值（Symbol.for('yang')）、不可遍历的属性（bukemeiju），结果都被自动过滤掉。
```

再看以下运行都是不行的，逐条运行了

```js
let proxys = new Proxy({},{
    ownKeys:function(target){
        return [1,null,true,undefined,{},[]]
    }
})
```

![image-20200517111053044](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111053044.png)

## preventExtensions操作

preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否 则会被自动转为布尔值。

```js
let proxys = new Proxy({},{
    preventExtensions:function(target){
        Object.preventExtensions(target)  // 先调用一次防止出现下面描述的问题
        return true
    }
})
```

![image-20200517111118498](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111118498.png)

这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false） ，proxy.preventExtensions才能返回true，否则会报错。

![image-20200517111128043](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111128043.png)

## setPrototypeOf操作

setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法

```js
let Fn_test = function(){}
let obj_test = {}

let proxys = new Proxy(Fn_test,{
    setPrototypeOf:function(target,proto){
        console.log('setPrototypeOf的第二参：',proto);
        throw new Error('chang to fail')
    }
})

let change = {}
Object.setPrototypeOf(proxys,change)
```

只要修改target的原型对象，就会报错。

![image-20200517111136228](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111136228.png)

注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（nonextensible），setPrototypeOf方法不得改变目标对象的原型。

## Proxy.revocable()操作

Proxy.revocable方法返回一个可取消的 Proxy 实例。

使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结 束，就收回代理权，不允许再次访问。

```js
let Fn_test = function(){}
let obj_test = {}

let revocables = Proxy.revocable(obj_test,{
    set:function(target,key,val){
        target[key] = val
        return true
    }
})

console.log(revocables)

let {proxy, revoke} = revocables

console.log("proxy对象：",proxy)
console.log("revoke函数：",revoke)

proxy.name = '只给一次代理机会'
console.log(proxy.name)

revoke()
proxy.name = '只给一次代理机会'  // 报错
```

![image-20200517111145714](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111145714.png)

## Proxy支持的所有拦截操作方法(一共13种)

```js
➢ get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。 



➢ set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或 proxy['foo'] = v，返回一个布尔值。 



➢ has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。



 ➢ deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。



 ➢ ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、 Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组 。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的 可遍历属性。 



➢ getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。



➢ defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。



 ➢ preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。 



➢ getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。 ➢ isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。



 ➢ setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔 值。如果目标对象是函数，那么还有两种额外操作可以拦截。



 ➢ apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、 proxy.call(object, ...args)、proxy.apply(...)。 ➢ construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new 
```



## Proxy的this问题

代码运行解释this指向问题

```js
let obj_test = {
    thisss:function(){
        console.log(this)
        console.log(this===obj_test)
    }
}
obj_test.thisss()

let revocables = Proxy.revocable(obj_test,{})
let {proxy, revoke} = revocables
proxy.thisss()
```

![image-20200517111156402](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111156402.png)

### 产生的问题？？

有些原生对象的内部属性，只有通过正确的this才能拿到 ，所以 Proxy 也无法代理这些原生对象的属性。

直接贴图：

```js
let date_test = new Date()
console.log(date_test.getFullYear())  // 2020

let revocables = Proxy.revocable(date_test,{})
let {proxy, revoke} = revocables

proxy.getMonth() // 报错
```

![image-20200517111210130](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111210130.png)

解决：将this指向改回来

直接撸代码：

```js
let date_test = new Date()
console.log(date_test.getFullYear())  // 2020

let revocables = Proxy.revocable(date_test,{
    get:function(target,name){
        return target[name].bind(target)
    }
})
let {proxy, revoke} = revocables
console.log(proxy.getFullYear())  // 2020
```

![image-20200517111325601](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200517111325601.png)

