# Stream

## 概念

流(Stream) 是在 node.js 中处理数据流的抽象接口



Node.js 中有四种基本的流类型：

- [`Writable`](http://nodejs.cn/api/stream.html#class-streamwritable): 可以写入数据的流（例如，[`fs.createWriteStream()`](http://nodejs.cn/api/fs.html#fscreatewritestreampath-options)）。

- [`Readable`](http://nodejs.cn/api/stream.html#class-streamreadable): 可以从中读取数据的流（例如，[`fs.createReadStream()`](http://nodejs.cn/api/fs.html#fscreatereadstreampath-options)）。

- [`Duplex`](http://nodejs.cn/api/stream.html#class-streamduplex): `Readable` 和 `Writable` 的流（双工流）（例如，[`net.Socket`](http://nodejs.cn/api/net.html#class-netsocket)）。

- [`Transform`](http://nodejs.cn/api/stream.html#class-streamtransform): 可以在写入和读取数据时修改或转换数据的 `Duplex` 流（例如，[`zlib.createDeflate()`](http://nodejs.cn/api/zlib.html#zlibcreatedeflateoptions)）。

  转换流是基于双向流的，可以在读或者写的时候被用来更改或者转换数据。一个例子是 zlib.createGzip 使用 gzip 算法压缩数据。你可以将转换流想象成一个函数，它的输入是可写流，输出是可读流。你或许也听过将转换流成为“通过流（through streams）”。
  
  

## 对象模式

 Node.js API 创建的所有流都只对字符串和 `Buffer`（或 `Uint8Array`）对象进行操作 ，

 流的实例在创建流时使用 `objectMode` 选项切换到对象模式。 尝试将现有的流切换到对象模式是不安全的。 



## 缓冲

 [`Writable`](http://nodejs.cn/api/stream.html#class-streamwritable) 和 [`Readable`](http://nodejs.cn/api/stream.html#class-streamreadable) 流都将数据存储在内部缓冲区中 ，缓冲的数量取决于流的构造函数的highWaterMark选项。

对于普通流： `highWaterMark`  用于指定字节的总数

对于对象模式： `highWaterMark`  用于指定对象的总数



## 可写流(writable)

可写流是      数据写入目标的抽象

常见的可写流有：

- 客户端上http请求、
- 服务器上的http响应、
- 文件系统写入流、
- 压缩流、加密流、
- TCP套接字、
- 子进程的标准输入、
- process.stdout、
- process.stderr



### 创建可写流

**createWriteStream**:是fs模块的一个api，参数如下：

```js
fs.createWriteStream(path[, options])

path <string> | <Buffer> | <URL>
options <string> | <Object>
    start <integer>
    flags <string> 默认值: 'w'。  详见下 附表1
    encoding <string> 默认值: 'utf8'
    fd <integer> | <FileHandle> 默认值: null
    mode <integer> 默认值: 0o666
    autoClose <boolean> 默认值: true
    emitClose <boolean> 默认值: true
    
    fs <Object> | <null> 默认值: null
```

- path一般使用路径
- start 选项，以允许在文件开头的某个位置写入数据，允许的值在 [0, Number.MAX_SAFE_INTEGER] 范围内。 修改文件而不是替换它可能需要将 flags 选项设置为 r+ 而不是默认的 w。 encoding 可以是 Buffer接受的任何一种。
- autoClose 设置为 true（默认行为），则在 'error' 或 'finish' 时文件描述符将自动关闭。 如果 autoClose 为 false，则即使出现错误，文件描述符也不会关闭。 关闭它并确保没有文件描述符泄漏是应用程序的责任。

- 默认情况下，流将在销毁后触发 'close' 事件。 将 emitClose 选项设置为 false 以更改此行为。

- 通过提供 fs 选项，可以覆盖 open、write、writev 和 close 的相应 fs 实现。 在没有 writev() 的情况下覆盖 write() 会降低性能，因为某些优化 (_writev()) 将被禁用。 当提供了 fs 选项时，则至少需要覆盖 write 和 writev 之一。 如果没有提供 fd 选项，则还需要覆盖 open。 如果 autoClose 是 true，则还需要覆盖 close。

- 与 <fs.ReadStream> 一样，如果指定了 fd，则 <fs.WriteStream> 将忽略 path 参数并使用指定的文件描述符。 这意味着不会触发 'open' 事件。 fd 应该是阻塞的；非阻塞 fd 应该传给 <net.Socket>。

### 示例

```js
let fs = require("fs");

let txt = fs.createWriteStream("./这是一个可写流创建的文件.txt",{
    flags:"w",
    encoding:"utf8"
})

txt.write("这是一串使用 utf8 编码写入的文本数据",'UTF8')

// 标记文件末尾
txt.end();

txt.on('finish', function() {
    console.log("写入完成。");
});

txt.on('error', function(err){
   console.log(err.stack);
});

console.log("运行完此脚本  在当前目录下会创建一个   这是一个可写流创建的文件.txt  的文件");
```

### 事件

对于`writable` 类它拥有诸多事件

- **close** 事件		

  写入流被关闭时触发

- **drain **事件		

  如果对 stream.write(chunk) 的调用返回 false，则 'drain' 事件将在适合继续将数据写入流时触发。

- **error** 事件		

  写入或管道数据时发生错误触发

- **finish **事件	   

  调用writable.end()后，并且所有数据都已刷新到底层系统触发

- **pipe **事件		

  调用writable.pipe()后触发

```js
writable.on('pipe', (src) => {
  // 管道到此可写流的源流
  console.log(src)
});
```

- **unpipe** 事件	

  调用writable.unpipe()后触发

```js
writable.on('unpipe', (src) => {
  // 取消管道此可写流的源流
  console.log(src)
});
```



### 方法

对于`writable` 类它也有拥有诸多方法

- **writable.cork()**		

  方法强制所有写入的数据都缓存在内存中。 当调用 writable.uncork() 或 writable.end() 方法时，缓冲的数据将被刷新。（主要目的是适应将几个小块快速连续写入流的情况）详见文档

- **writable.destroy()** 

  销毁流 可选地触发 'error' 事件

```js
const { Writable } = require('stream');
const myStream = new Writable();
const fooErr = new Error('foo error');
myStream.destroy(fooErr);
myStream.on('error', (fooErr) => console.error(fooErr.message)); // foo error
```

```js
const { Writable } = require('stream');

const myStream = new Writable();

myStream.destroy();
myStream.on('error', function wontHappen() {});
```

```js
const { Writable } = require('stream');

const myStream = new Writable();
myStream.destroy();

myStream.write('foo', (error) => console.error(error.code));
// ERR_STREAM_DESTROYED
```

- **writable. destroyed()** 

   在调用 `writable.destro 之后是 `true`。 

```js
const { Writable } = require('stream');

const myStream = new Writable();

console.log(myStream.destroyed); // false
myStream.destroy();
console.log(myStream.destroyed); // true
```

- **writable. end()**

  调用 writable.end() 方法表示不再有数据写入 Writable

```js
// 语法：
writable.end([chunk[, encoding]][, callback])

chunk:可选的要写入的数据。 对于不在对象模式下操作的流，chunk 必须是字符串、Buffer 或 Uint8Array。 对于对象模式的流，chunk 可以是除 null 之外的任何 JavaScript 值
encoding:编码
callback:流结束时的回调
```

```js
// 写入 'hello, ' 然后以 'world!' 结尾。
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// 现在不允许写入更多！
```

- **writable.setDefaultEncoding ()**

  设置默认的编码(encoding)

- **writable.uncork()**

   `writable.uncork()` 方法会刷新自调用 `stream.cork()` 以来缓冲的所有数据。 

  当使用 [`writable.cork()`](http://nodejs.cn/api/stream.html#writablecork) 和 `writable.uncork()` 管理写入流的缓冲时，建议使用 `process.nextTick()` 延迟对 `writable.uncork()` 的调用。 这样做允许对在给定 Node.js 事件循环阶段中发生的所有 `writable.write()` 调用进行批处理。

  ```js
  stream.cork();
  stream.write('some ');
  stream.write('data ');
  process.nextTick(() => stream.uncork());
  ```

  如果在一个流上多次调用 [`writable.cork()`](http://nodejs.cn/api/stream.html#writablecork) 方法，则必须调用相同数量的 `writable.uncork()` 调用来刷新缓冲的数据。

  ```js
  stream.cork();
  stream.write('some ');
  stream.cork();
  stream.write('data ');
  process.nextTick(() => {
    stream.uncork();
    // 在第二次调用 uncork() 之前不会刷新数据。
    stream.uncork();
  });
  ```

  另见: [`writable.cork()`](http://nodejs.cn/api/stream.html#writablecork)。
  
-  **writable.write(chunk[, encoding][, callback])** 

   将数据写入流中，返回Boolean， 如果流希望调用代码在继续写入其他数据之前等待 `'drain'` 事件被触发，则为 `false`；否则为 `true`。 

   chunk：要写入的数据

   encoding：字节编码

   callback：当刷新此块数据时的回调

```js
let fs = require("fs");
let txt = fs.createWriteStream("./这是一个可写流创建的文件.txt",{
    flags:"w",
    encoding:"utf8"
})
function write(data, cb) {
    if (!txt.write(data,'UTF8')) {  //  .write()返回true表示能继续写入
        txt.once('drain', cb);
    } else {
        process.nextTick(cb);
    }
}
// 在执行任何其他写入之前等待回调被调用。
write('这是一串使用 utf8 编码写入的文本数据,并且做了防止背压的操作', () => {
    console.log('完成写入，现在就进行更多写入。');
});


// 标记文件末尾
txt.end();

txt.on('finish', function() {
    console.log("写入完成。");
});

txt.on('close', function(){
    console.log("写入流已经被关闭。");
 });

txt.on('error', function(err){
   console.log(err.stack);
});

txt.on('pipe', function(){
    console.log("pipe");
 });

console.log("程序执行完毕");
```



### 属性

对于`writable` 类它也有拥有诸多属性

-  **writable.writable**

  如果调用 `writable.write()` 是安全的，则为 `true`，这意味着流没有被销毁、出错或结束。 

- **writable.writableEnded**

   在调用 [`writable.end()`](http://nodejs.cn/api/stream.html#writableendchunk-encoding-callback) 之后是 `true`。 此属性不指示数据是否已刷新，为此则使用 [`writable.writableFinished`](http://nodejs.cn/api/stream.html#writablewritablefinished) 代替。 

-  **writable.writableCorked**

    需要调用 [`writable.uncork()`](http://nodejs.cn/api/stream.html#writableuncork) 以完全解开流的次数。 

-  **writable. writableFinished**

    在触发 [`'finish'`](http://nodejs.cn/api/stream.html#event-finish) 事件之前立即设置为 `true`。 

-   **writable.writableHighWaterMark** 

    返回创建此 `Writable` 时传入的 `highWaterMark` 的值。 

-   **writable.writableLength** 

    此属性包含队列中准备写入的字节数（或对象数）。 该值提供有关 `highWaterMark` 状态的内省数据。 

-   **writable.writableNeedDrain** 

    如果流的缓冲区已满并且流将触发 `'drain'`，则为 `true`。 

-   **writable.writableObjectMode** 

    给定 `Writable` 流的属性 `objectMode` 的获取器。 











## 可读流(readable)

可读流是对消费的数据来源的抽象

常见的可读流有：

- 客户端上的 HTTP 响应
- 服务器上的 HTTP 请求
- 文件系统读取流
- 压缩流
- 加密流
- TCP 套接字
- 子进程的标准输出和标准错误
- process.stdin

### 两种读取模式

`readable`又两种模式之一有效的运行：流动和暂停。这些模式和对象模式是分开的。`readable`流可以处于或不处于对对象模式，无论是流动模式还是暂停模式。

- 在流动模式下，数据会自动从底层系统读取，并通过EventEmitter接口使用事件尽快提供给应用程序。
- 在暂停模式下，必须显式调用`stream.read()`方法从流中读取数据块。

所有的`readable`流都是以暂停模式开始的，可以 通过以下方式之一切换到流动模式： 

- 添加`data`事件监听
- 调用`stream.resume()`方法
- 调用`stream.pipe()`方法将数据发送到`writable`

 可以使用以下方法之一切换回暂停模式： 

- 如果没有管道目标，则通过调用 `stream.pause()` 方法。
- 如果有管道目标，则删除所有管道目标。 可以通过调用 `stream.unpipe()`方法删除多个管道目标。

 **要记住的重要概念是，在提供消费或忽略该数据的机制之前，`Readable` 不会产生数据。 如果消费机制被禁用或移除，则 `Readable` 将尝试停止产生数据。** 

出于向后兼容性的原因，删除 [`'data'`](http://nodejs.cn/api/stream.html#event-data) 事件句柄不会自动暂停流。 此外，如果有管道目标，则调用 [`stream.pause()`](http://nodejs.cn/api/stream.html#readablepause) 将不能保证一旦这些目标排空并要求更多数据，流将保持暂停状态。

如果 [`Readable`](http://nodejs.cn/api/stream.html#class-streamreadable) 切换到流动模式并且没有消费者可用于处理数据，则数据将被丢失。 例如，当调用 `readable.resume()` 方法而没有绑定到 `'data'` 事件的监听器时，或者当从流中删除 `'data'` 事件句柄时，就会发生这种情况。

添加 [`'readable'`](http://nodejs.cn/api/stream.html#event-readable) 事件句柄会自动使流停止流动，并且必须通过 [`readable.read()`](http://nodejs.cn/api/stream.html#readablereadsize) 来消费数据。 如果删除了 [`'readable'`](http://nodejs.cn/api/stream.html#event-readable) 事件句柄，则如果有 [`'data'`](http://nodejs.cn/api/stream.html#event-data) 事件句柄，流将再次开始流动。

### 三种状态

 `Readable` 流的操作的"两种模式"是对 `Readable` 流实现中发生的更复杂的内部状态管理的简化抽象。 

 具体来说，在任何给定的时间点，每个 `Readable` 都处于三种可能的状态之一： 

- `readable.readableFlowing === null` 
- `readable.readableFlowing === false`
- `readable.readableFlowing === true`

当 `readable.readableFlowing` 为 `null` 时，则不提供消费流数据的机制。 因此，流不会生成数据。 在此状态下，为 `'data'` 事件绑定监听器、调用 `readable.pipe()` 方法、或调用 `readable.resume()` 方法会将 `readable.readableFlowing` 切换到 `true`，从而使 `Readable` 在生成数据时开始主动触发事件。

调用`readable.pause()`、`readable.unpipe()`、或者接收背压都会导致 `readable.readableFlowing` 被设置为 `false`，暂时停止事件的流动，但不会停止数据的生成。 在此状态下，为 `'data'` 事件绑定监听器不会将 `readable.readableFlowing` 切换到 `true`。

```js
const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing 现在为 false。

pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok');  // 不会触发 'data'。
pass.resume();     // 必须调用才能使流触发 'data'。
```

### 选择一种接口风格

 虽然 `readable.readableFlowing` 是 `false`，但数据可能会在流的内部缓冲区中累积。 

`Readable` 流的 API 跨越多个 Node.js 版本的演进，并提供了多种消费流数据的方法。 一般情况下，开发者应该选择其中一种消费数据的方式，切忌使用多种方式消费单一流中的数据。 具体来说，使用 `on('data')`、`on('readable')`、`pipe()` 或异步迭代器的组合可能会导致不直观的行为。

建议大多数用户使用 `readable.pipe()` 方法，因为它已被实施以提供使用流数据的最简单方法。 需要对数据传输和生成进行更细粒度控制的开发者可以使用 [`EventEmitter`](http://nodejs.cn/api/events.html#class-eventemitter) 和 `readable.on('readable')`/`readable.read()` 或 `readable.pause()`/`readable.resume()` API。

### 创建可读流

### 示例

### 事件

对于`Readable` 类它拥有诸多事件

 `'close'` **事件** 

 `'data'` **事件** 

 `'end'` **事件** 

 `'error'` **事件** 

 `'pause'` **事件** 

 `'readable'` **事件** 

 `'resume'` **事件** 

### 方法

对于`Readable` 类它拥有诸多方法

 **readable.destroy([error])** 

 **readable.destroyed** 

 **readable.isPaused()** 

 **readable.pause()** 

 **readable.pipe(destination[, options])** 

 **readable.unpipe([destination])** 

 **readable.unshift(chunk[, encoding])** 

 **readable.read([size])** 

 **readable.resume()** 

 **readable.setEncoding(encoding)** 

 **eadable.wrap(stream)** 

### 属性

对于`Readable` 类它拥有诸多属性

 **readable.readable** 

 **readable.readableAborted** 

 **readable.readableDidRead** 

 **readable.readableEncoding** 

 **readable.readableEnded** 

 **readable.readableFlowing** 

 **readable.readableHighWaterMark** 

 **readable.readableLength** 

 **readable.readableObjectMode** 

```js
fs.createReadStream(path,{
    flags <string> 请参阅对文件系统 flags 的支持。 默认值: 'r'。
    encoding:'utf-8',	// 默认值: null
    fd <integer> | <FileHandle> 默认值: null 
    mode <integer> 默认值: 0o666
    autoClose <boolean> 默认值: true
    emitClose:true,	 // 默认值: true
    start:3,		// 从索引3开始读
    end:100,		// 读到索引为100的  包括结束
    highWaterMark:1000, // 默认值: 64 * 1024(64kb)
    fs <Object> | <null> 默认值: null
})
encoding 可以是 <Buffer> 接受的任何一种。
如果指定了 fd，则 ReadStream 将忽略 path 参数并使用指定的文件描述符。 这意味着不会触发 'open' 事件。 fd 应该是阻塞的；非阻塞 fd 应该传给 <net.Socket>。
如果 fd 指向仅支持阻塞读取的字符设备（例如键盘或声卡），则读取操作不会在数据可用之前完成。 这可以防止进程退出和流自然关闭。
默认情况下，流将在销毁后触发 'close' 事件。 将 emitClose 选项设置为 false 以更改此行为。
如果 autoClose 为 false，则即使出现错误，文件描述符也不会关闭。 关闭它并确保没有文件描述符泄漏是应用程序的责任。 如果 autoClose 设置为 true（默认行为），则在 'error' 或 'end' 时，文件描述符将自动关闭。
mode 设置文件模式（权限和粘滞位），但前提是文件已创建。
```

事件

```js
let a = createReadStream("./test.txt")

/*
** 方法
*/
a.pause()  // 将导致处于流动模式的流停止触发 'data' 事件，切换出流动模式。 任何可用的数据都将保留在内部缓冲区中
a.isPaused() // 方法返回 Readable(a) 的当前运行状态
a.destroy() // 销毁流状态，可选地触发 'error' 事件，并且触发 'close' 事件（除非 emitClose 设置为 false）在此调用之后，可读流将释放任何内部资源，随后对 push() 的调用将被忽略。
// 一旦 destroy() 被调用，任何进一步的调用都将是空操作，除了来自 _destroy() 的其他错误可能不会作为 'error' 触发。
a.resume() // 继续触发 'data' 事件 
a.destroyed() // 是否调用了destroy方法
a.pipe()      // 

// 虽然 readable.readableFlowing 是 false，但数据可能会在流的内部缓冲区中累积。
/*
** 事件
*/
// 监听数据流事件
a.on("data",function (param) {
    console.log("data",param)
})

// 从流中读取的数据或已到达流的末尾时触发
a.on("readable",function (param) {
    // 现在有一些数据要读取。
    let data;
    while (data = this.read()) {  // this.read() 可能为null
        console.log("readable",data)
    }
})

// 监听数据流结束事件
a.on("end",function (param) {
    console.log("end",param)
})

// 监听数据流错误事件
a.on("error",function (param) {
    console.log("error",param)
})

// 监听数据流打开事件
a.on("open",function (param) {
    a.pause(); // 如果有 'readable' 事件监听器，则 a.pause() 方法不起作用
    console.log("open",param)
    setTimeout(() => {
        console.log('Now data will start flowing again.');
        a.resume();
        // a.destroy();
    }, 1000);
})

// 监听数据流暂停事件
a.on("pause",function (param) {
    console.log("pause",param)
})

// 监听数据流关闭事件
a.on("close",function (param) {
    console.log("pause",param)
})

// 监听数据流关闭事件 === 当调用 stream.resume() 并且 readableFlowing 不是 true 时，则会触发 'resume' 事件。
a.on("resume",function (param) {
    console.log("resume",param)
})
```

> 一般来说，readable.pipe() 和 'data' 事件机制比 'readable' 事件更容易理解。 但是，处理 'readable' 可能会导致吞吐量增加。
> 如果同时使用 'readable' 和 'data'，则 'readable' 优先控制流，即只有在调用 stream.read() 时才会触发 'data'。 
> readableFlowing 属性将变为 false。 如果在移除 'readable' 时有 'data' 个监听器，则流将开始流动，即 'data' 事件将在不调用 .resume() 的情况下触发。





## 双工流()

## 转化流







## 附表1

- `'a'`: 打开文件进行追加。 如果文件不存在，则创建该文件。

- `'ax'`: 类似于 `'a'` 但如果路径存在则失败。

- `'a+'`: 打开文件进行读取和追加。 如果文件不存在，则创建该文件。

- `'ax+'`: 类似于 `'a+'` 但如果路径存在则失败。

- `'as'`: 以同步模式打开文件进行追加。 如果文件不存在，则创建该文件。

- `'as+'`: 以同步模式打开文件进行读取和追加。 如果文件不存在，则创建该文件。

- `'r'`: 打开文件进行读取。 如果文件不存在，则会发生异常。

- `'r+'`: 打开文件进行读写。 如果文件不存在，则会发生异常。

- `'rs+'`: 以同步模式打开文件进行读写。 指示操作系统绕过本地文件系统缓存。

  这主要用于在 NFS 挂载上打开文件，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。

  这不会将 `fs.open()` 或 `fsPromises.open()` 变成同步阻塞调用。 如果需要同步操作，应该使用类似 `fs.openSync()` 的东西。

- `'w'`: 打开文件进行写入。 创建（如果它不存在）或截断（如果它存在）该文件。

- `'wx'`: 类似于 `'w'` 但如果路径存在则失败。

- `'w+'`: 打开文件进行读写。 创建（如果它不存在）或截断（如果它存在）该文件。

- `'wx+'`: 类似于 `'w+'` 但如果路径存在则失败。

## 压背( Backpressure)

一般是指buffer达到上限，简单讲就是上游的生产速度大于下游的消费速度