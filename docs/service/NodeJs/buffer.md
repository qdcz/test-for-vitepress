# Buffer

 `Buffer` 对象用于表示固定长度的字节序列。 许多 Node.js API 都支持 `Buffer`。 

`Buffer` 类是 JavaScript [`Uint8Array`](http://url.nodejs.cn/ZbDkpm) 类的子类，并使用涵盖额外用例的方法对其进行扩展。 Node.js API 在支持 `Buffer` 的地方也接受普通的 [`Uint8Array`](http://url.nodejs.cn/ZbDkpm)。

虽然 `Buffer` 类在全局作用域内可用，但仍然建议通过 import 或 require 语句显式地引用它。

## 杂

### buffer转string

buffer数据对象.toString()