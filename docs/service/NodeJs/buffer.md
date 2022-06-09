# Buffer

 `Buffer` 对象用于表示固定长度的字节序列。 许多 Node.js API 都支持 `Buffer`。 

`Buffer` 类是 JavaScript [`Uint8Array`](http://url.nodejs.cn/ZbDkpm) 类的子类，并使用涵盖额外用例的方法对其进行扩展。 Node.js API 在支持 `Buffer` 的地方也接受普通的 [`Uint8Array`](http://url.nodejs.cn/ZbDkpm)。

虽然 `Buffer` 类在全局作用域内可用，但仍然建议通过 import 或 require 语句显式地引用它。



上面是官方解释：

在我的理解看来：js中处理数据都是已字符串的形式，对于二进制的数据不便于处理，所以才有了buffer，buffer是可以直接操作二进制的。他是一个全局的变量，有诸多方法对二进制进行操作。



什么是base64？



在这里总结一个坑

上传文件传到后端 如果是base64的话。记得要把base64的前缀去掉，

## 杂

### buffer转string

buffer数据对象.toString()

