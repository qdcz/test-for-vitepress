# 进程

 process是一个全局对象，即global对象的属性，可以在任何地方直接访问到它而无需引入额外模块 



```js
let process = require('node:process');

process.title = 'I am A master process';  // 给进程指定名称

console.log("当前进程的环境变量",process.env)

console.log(`
    当前node版本:${process.version}
    当前CPU的架构:${process.arch}
    当前进程运行的操作系统平台:${process.platform}
    当前进程的内存使用情况，单位bytes:
        heapUsed(V8内存使用量):${process.memoryUsage().heapUsed}
        heapTotal(V8内存量):${process.memoryUsage().heapTotal}
        external(绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量):${process.memoryUsage().external}
        arrayBuffers(为 ArrayBuffer 和 SharedArrayBuffer 分配的内存，包括所有 Node.js Buffer):${process.memoryUsage().arrayBuffers}
        rss(常驻集大小，是进程在主内存设备（即总分配内存的子集）中占用的空间量，包括所有 C++ 和 JavaScript 对象和代码):${process.memoryUsage().rss}
    当前进程工作目录:${process.cwd()}
    当前进程id:${process.pid}
    当前进程对应的父进程:${process.ppid}
    当前进程已运行时间:${process.uptime()}
    当前进程高分辨时间:${process.hrtime()}
    当前进程的名称 :${process.title}
    Node.js 进程的可执行文件的绝对路径名:${process.execPath}
`);



/**
 * 如果是携带命令启动 node index.js name=cxy,sex=gg
 */

console.log(`
    获取启动该进程传入的参数:${process.argv}
    =>Node的execPath（一般用不到）:${process.argv[0]}
    =>被执行的JS文件路径（一般用不到）:${process.argv[1]}
    =>真实传入命令的参数:${process.argv[2]}   ${process.argv[3]}   ${process.argv[4]}
    =>真实传入命令的参数:${process.execArgv}
`)
```





## 属性

### .execArgv

process.execArgv

返回 Node.js 进程启动时传入的一组特定于 Node.js 的命令行选项。 这些选项不会出现在 process.argv 属性返回的数组中，也不包括 Node.js 可执行文件、脚本名称或脚本名称后面的任何选项。 这些选项可用于衍生与父进程具有相同执行环境的子进程。如下：



```js
console.log('真实传入命令的参数:'${process.execArgv})
```

```sh
node --harmony  index.js b=1 a=2
```

会打印出  `真实传入命令的参数:--harmony`

--harmony  标记：

>  Node.js上--harmony标志的当前行为是仅启用分段功能。毕竟，它现在是--es_staging的同义词。如上所述，这些是尚未被认为稳定的完整功能。如果您想安全玩耍，尤其是在生产环境中，请考虑删除此运行时标志，直到默认在V8上（因此，在Node.js上）将其发布。如果启用此功能，则在V8更改其语义以更严格地遵循标准的情况下，应该准备进一步进行Node.js升级以破坏代码。 

## 方法

### . stdin

#### .stdin.td

 该属性指的是 `process.stdout` 的底层文件描述符的值。 该值固定为 `0`。 在 [`Worker`](http://nodejs.cn/api/worker_threads.html#class-worker) 线程中，该字段不存在。 

### .stdout.

#### .stdout.write()

console.log() 使用格式化调用 process.stdout.write 输出。

```js
Console.prototype.log = function() {
  process.stdout.write(util.format.apply(this, arguments) + '\n');
};
```
#### .stdout.fd

 该属性指的是 `process.stdout` 的底层文件描述符的值。 该值固定为 `1`。 在 [`Worker`](http://nodejs.cn/api/worker_threads.html#class-worker) 线程中，该字段不存在。 

### .stderr.

#### .stderr.write()

console.error() 使用格式化调用 process.stderr.write 输出。

```js
Console.prototype.error = function() {
  process.stderr.write(util.format.apply(this, arguments) + '\n');
};
```

#### .stderr.fd

 该属性指的是 `process.stdout` 的底层文件描述符的值。 该值固定为 `2`。 在 [`Worker`](http://nodejs.cn/api/worker_threads.html#class-worker) 线程中，该字段不存在。 

### .memoryUsage()

 描述 Node.js 进程的内存使用量（以字节为单位）的对象。 

```js
console.log(`
	当前进程的内存使用情况，单位bytes:
        heapUsed(V8内存使用量):${process.memoryUsage().heapUsed}
        heapTotal(V8内存量):${process.memoryUsage().heapTotal}
        external(绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量):${process.memoryUsage().external}
        arrayBuffers(为 ArrayBuffer 和 SharedArrayBuffer 分配的内存，包括所有 Node.js Buffer):${process.memoryUsage().arrayBuffers}
        rss(常驻集大小，是进程在主内存设备（即总分配内存的子集）中占用的空间量，包括所有 C++ 和 JavaScript 对象和代码):${process.memoryUsage().rss}
`)
```

```
heapUsed(V8内存使用量):3005432
heapTotal(V8内存量):5529600
external(绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量):1119580
arrayBuffers(V8内存量):18090
rss(常驻集大小，是进程在主内存设备（即总分配内存的子集）中占用的空间量，包括所有 C++ 和 JavaScript 对象和代码):22269952
```

此方法会 遍历每个页面以收集有关内存使用情况的信息，这可能会根据程序内存分配而变慢 

### .memoryUsage.rss()

 与 `process.memoryUsage()` 提供的 `rss` 属性值相同，但 `process.memoryUsage.rss()` 更快。 

## 事件

### exit

 当进程将要退出时触发 （一般是 事件循环不再需要执行任何额外的工作 或者被显示调用exit()）

```js
process.on('exit', function() {
    console.log('退出前执行');
});
```

### beforeExit

当 Node.js 清空其事件循环并且没有额外的工作要安排时，则会触发 `'beforeExit'` 事件。 通常情况下，当没有工作要调度时，Node.js 进程会退出，但是注册在 `'beforeExit'` 事件上的监听器可以进行异步的调用，从而使 Node.js 进程继续。 

```js
const process = require('node:process');
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
```



>  注意：如调用 [`process.exit()`](http://nodejs.cn/api/process.html#processexitcode) 或未捕获的异常，则不会触发 `'beforeExit'` 事件。 

### disconnect

 如果 Node.js 进程是使用 IPC 通道衍生（参见[子进程](http://nodejs.cn/api/child_process.html)和[集群](http://nodejs.cn/api/cluster.html)文档），则在 IPC 通道关闭时将触发 `'disconnect'` 事件。 

### message

如果 Node.js 进程是使用 IPC 通道衍生（参见[子进程](http://nodejs.cn/api/child_process.html)和[集群](http://nodejs.cn/api/cluster.html)文档），则每当子进程收到父进程使用 [`childprocess.send()`](http://nodejs.cn/api/child_process.html#subprocesssendmessage-sendhandle-options-callback) 发送的消息时，就会触发 `'message'` 事件。

消息经过序列化和解析。 结果消息可能与最初发送的消息不同。

如果在衍生进程时将 `serialization` 选项设置为 `advanced`，则 `message` 参数可以包含 JSON 无法表示的数据。 有关更多详细信息，请参阅[子进程的高级序列化](http://nodejs.cn/api/child_process.html#advanced-serialization)。

### rejectionHandled

 每当 `Promise` 被拒绝并且错误句柄被附加到它（例如使用 [`promise.catch()`](http://url.nodejs.cn/gMRBfK)）晚于一轮 Node.js 事件循环时，则 `'rejectionHandled'` 事件就会触发。 

比如

```js
process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandledRejection',promise, reason)
});
process.on('rejectionHandled', (promise) => {
    console.log('rejectionHandled',promise)
});
Promise.reject('Hello, asdas!');
function foo() {
    return Promise.reject('Hello, Fundebug!');
}
var r = foo();
setTimeout(() =>{
    r.catch(e =>{});
}, 5000);





// 打印如下：
unhandledRejection Promise { <rejected> 'Hello, asdas!' } Hello, asdas!
unhandledRejection Promise { <rejected> 'Hello, Fundebug!' } Hello, Fundebug!
unhandledRejection Promise { <rejected> 'Hello, Fundebug!' } Hello, Fundebug!
rejectionHandled Promise { <rejected> 'Hello, Fundebug!' }
```

`Promise` 对象会在 `'unhandledRejection'` 事件中先处理，但在处理过程中获得了拒绝句柄。

对于 `Promise` 链，没有始终可以处理拒绝的顶层概念。 由于本质上是异步的，`Promise` 拒绝可以在未来的某个时间点处理，可能比触发 `'unhandledRejection'` 事件所需的事件循环轮询要晚得多。

另一种表述方式是，与同步代码中未处理的异常列表不断增长不同，promise 中未处理的拒绝列表可能会不断增长和缩小。

在同步代码中，当未处理的异常列表增长时，会触发 `'uncaughtException'` 事件。

在异步代码中，当未处理的拒绝列表增长时，会触发 `'unhandledRejection'` 事件，当未处理的拒绝列表缩小时，会触发 `'rejectionHandled'` 事件。

```js
const process = require('node:process');
const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
```

### uncaughtException（未）

- `err` [](http://url.nodejs.cn/qZ873x) 未捕获的异常。
- `origin` [](http://url.nodejs.cn/9Tw2bK) 指示异常是源自未处理的拒绝还是源自同步错误。 可以是 `'uncaughtException'` 或 `'unhandledRejection'`。 后者用于在基于 `Promise` 的异步上下文中发生异常（或者如果 `Promise` 被拒绝）并且 [`--unhandled-rejections`](http://nodejs.cn/api/cli.html#--unhandled-rejectionsmode) 标志设置为 `strict` 或 `throw`（这是默认值）并且拒绝未处理，或者发生拒绝时 在命令行入口点的 ES 模块静态加载阶段。

当未捕获的 JavaScript 异常一直冒泡回到事件循环时，则会触发 `'uncaughtException'` 事件。 默认情况下，Node.js 通过将堆栈跟踪打印到 `stderr` 并以代码 1 退出，覆盖任何先前设置的 [`process.exitCode`](http://nodejs.cn/api/process.html#processexitcode) 来处理此类异常。 为 `'uncaughtException'` 事件添加句柄会覆盖此默认行为。 或者，更改 `'uncaughtException'` 处理程序中的 [`process.exitCode`](http://nodejs.cn/api/process.html#processexitcode)，这将导致进程以提供的退出码退出。 否则，在存在此类句柄的情况下，进程将以 0 退出。

##### 注意: 正确使用 'uncaughtException'[#](http://nodejs.cn/api/process.html#warning-using-uncaughtexception-correctly)

[中英对照](http://nodejs.cn/api/process/warning_using_uncaughtexception_correctly.html)

`'uncaughtException'` 是用于异常处理的粗略机制，仅用作最后的手段。 事件_不应该_用作 `On Error Resume Next` 的等价物。 未处理的异常本质上意味着应用程序处于未定义状态。 在没有从异常中正确恢复的情况下尝试恢复应用程序代码可能会导致其他不可预见和不可预测的问题。

从事件句柄中抛出的异常将不会被捕获。 而是，该进程将以非零退出码退出，并将打印堆栈跟踪。 这是为了避免无限递归。

尝试在未捕获异常后正常恢复类似于升级计算机时拔掉电源线。 十有八九，什么都没有发生。 但是第十次，系统损坏了。

`'uncaughtException'` 的正确用法是在关闭进程之前对分配的资源（例如文件描述符、句柄等）执行同步清理。 **在 `'uncaughtException'` 之后恢复正常操作是不安全的。**

为了以更可靠的方式重新启动崩溃的应用程序，无论 `'uncaughtException'` 是否触发，都应该在单独的进程中使用外部监视器来检测应用程序故障并根据需要恢复或重新启动。

### uncaughtExceptionMonitor

### unhandledRejection

### warning

 每当 Node.js 触发进程警告时，则会触发 `'warning'` 事件。 

 进程警告类似于错误，因为其描述了引起用户注意的异常情况。 但是，警告不是正常 Node.js 和 JavaScript 错误处理流程的一部分。 Node.js 可以在检测到可能导致次优应用程序性能、错误或安全漏洞的不良编码实践时触发警告。 

```js
const process = require('node:process');

process.on('warning', (warning) => {
  console.warn(warning.name);    // 打印警告名称
  console.warn(warning.message); // 打印警告信息
  console.warn(warning.stack);   // 打印堆栈跟踪
});
```

默认情况下，Node.js 会将进程警告打印到 `stderr`。 `--no-warnings` 命令行选项可用于抑制默认控制台输出，但 `'warning'` 事件仍将由 `process` 对象触发。

以下示例说明了在向事件添加过多监听器时打印到 `stderr` 的警告：

```shell
$ node
> events.defaultMaxListeners = 1;
> process.on('foo', () => {});
> process.on('foo', () => {});
> (node:38638) MaxListenersExceededWarning: Possible EventEmitter memory leak
detected. 2 foo listeners added. Use emitter.setMaxListeners() to increase limit
```

相比之下，以下示例关闭默认警告输出并向 `'warning'` 事件添加自定义句柄：

```shell
$ node --no-warnings
> const p = process.on('warning', (warning) => console.warn('Do not do that!'));
> events.defaultMaxListeners = 1;
> process.on('foo', () => {});
> process.on('foo', () => {});
> Do not do that!
```

`--trace-warnings` 命令行选项可用于使警告的默认控制台输出包括警告的完整堆栈跟踪。

使用 `--throw-deprecation` 命令行标志启动 Node.js 将导致自定义弃用警告作为异常抛出。

使用 `--trace-deprecation` 命令行标志将导致自定义弃用与堆栈跟踪一起打印到 `stderr`。

使用 `--no-deprecation` 命令行标志将抑制自定义弃用的所有报告。

`*-deprecation` 命令行标志仅影响使用名称 `'DeprecationWarning'` 的警告。

### worker

 创建新的 `Worker` 线程后会触发 `'worker'` 事件。 

### 信号事件

当 Node.js 进程收到信号时，则将触发信号事件。 有关标准 POSIX 信号名称（例如 `'SIGINT'`、`'SIGHUP'` 等）的列表，请参阅 [`signal(7)`](http://url.nodejs.cn/Fj3tfw)。

信号在 [`Worker`](http://nodejs.cn/api/worker_threads.html#class-worker) 线程上不可用。

信号句柄将接收信号的名称（`'SIGINT'`、`'SIGTERM'` 等）作为第一个参数。

每个事件的名称将是信号的大写通用名称（例如 `'SIGINT'` 表示 `SIGINT` 信号）。

```js
import process from 'node:process';

// 从标准输入开始读取，因此进程不会退出。
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

// 使用单个函数处理多个信号
function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
```

- `'SIGUSR1'` 由 Node.js 预留以启动[调试器](http://nodejs.cn/api/debugger.html)。 可以安装监听器，但这样做可能会干扰调试器。
- `'SIGTERM'` 和 `'SIGINT'` 在非 Windows 平台上具有默认的句柄，其在使用代码 `128 + signal number` 退出之前重置终端模式。 如果这些信号之一安装了监听器，则其默认行为将被删除（Node.js 将不再退出）。
- `'SIGPIPE'` 默认情况下忽略。 它可以安装监听器。
- `'SIGHUP'` 在 Windows 上是在关闭控制台窗口时生成，在其他平台上是在各种类似条件下生成。 参见 [`signal(7)`](http://url.nodejs.cn/Fj3tfw)。 它可以安装监听器，但是 Node.js 将在大约 10 秒后被 Windows 无条件地终止。 在非 Windows 平台上，`SIGHUP` 的默认行为是终止 Node.js，但一旦安装了监听器，则其默认行为将被删除。
- `'SIGTERM'` Windows 上不支持，可以监听。
- 所有平台都支持来自终端的 `'SIGINT'`，通常可以使用 Ctrl+C 生成（但是这是可配置的）。 当启用[终端原始模式](http://nodejs.cn/api/tty.html#readstreamsetrawmodemode)并使用 Ctrl+C 时不会生成它。
- `'SIGBREAK'` 在 Windows 上，当按下 Ctrl+Break 时会发送。 在非 Windows 平台上，它可以被监听，但无法发送或生成它。
- `'SIGWINCH'` 当调整控制台大小时会发送。 在 Windows 上，这只会发生在当光标移动时写入控制台，或者当在原始模式下使用可读的终端时。
- `'SIGKILL'` 不能安装监听器，它会无条件地终止所有平台上的 Node.js。
- `'SIGSTOP'` 不能安装监听器。
- `'SIGBUS'`、`'SIGFPE'`、`'SIGSEGV'` 和 `'SIGILL'`，当不使用 [`kill(2)`](http://url.nodejs.cn/KDV7jD) 人为引发时，本质上会使进程处于调用 JS 监听器不安全的状态。 这样做可能会导致进程停止响应。
- `0` 可以发送来测试进程是否存在，如果进程存在则没影响，如果进程不存在则抛出错误。

Windows 不支持信号，因此没有等价的使用信号来终止，但 Node.js 提供了一些对 [`process.kill()`](http://nodejs.cn/api/process.html#processkillpid-signal) 和 [`subprocess.kill()`](http://nodejs.cn/api/child_process.html#subprocesskillsignal) 的模拟：

- 发送 `SIGINT`、`SIGTERM`、和 `SIGKILL` 会导致目标进程无条件的终止，之后子进程会报告进程被信号终止。
- 发送信号 `0` 可以作为独立于平台的方式来测试进程是否存在。

# [......子进程](./child_process)
