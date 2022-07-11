
# child_process

child_process 模块提供了衍生子进程的能力, 简单来说就是执行cmd命令的能力

## .spawn()
适用于返回大量数据，例如图像处理，二进制数据处理。

## .exec()
适用于小量数据，maxBuffer 默认值为 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn

## .execFile()
类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为

## .fork()
衍生新的进程，进程之间是相互独立的，每个进程都有自己的 V8 实例、内存，系统资源是有限的，不建议衍生太多的子进程出来，
通长根据系统** CPU 核心数**设置。


异步创建进程

spawn、fork、exec、execFile都遵循异步编程模式，每个方法都返回childProcess实例。

## 方法

### exec()
 语法：

```html
options <Object>
    cwd <string> | <URL> 子进程的当前工作目录。 默认值: process.cwd()。
    env <Object> 环境变量键值对。 默认值: process.env。
    encoding <string> 默认值: 'utf8'
    shell <string> 用于执行命令的 shell。 请参阅 shell 的要求和默认的 Windows shell。 默认值: Unix 上是 '/bin/sh'，Windows 上是 process.env.ComSpec。
    signal <AbortSignal> 允许使用中止信号中止子进程。
    timeout <number> 默认值: 0
    maxBuffer <number> 标准输出或标准错误上允许的最大数据量（以字节为单位）。 如果超过，则子进程将终止并截断任何输出。 请参阅 maxBuffer 和 Unicode 的注意事项。 默认值: 1024 * 1024。
    killSignal <string> | <integer> 默认值: 'SIGTERM'
    uid <number> 设置进程的用户标识（参见 setuid(2)）。
    gid <number> 设置进程的群组标识（参见 setgid(2)）。
    windowsHide <boolean> 隐藏通常在 Windows 系统上创建的子进程控制台窗口。 默认值: false。
callback <Function> 当进程终止时使用输出调用。
    error <Error>
    stdout <string> | <Buffer>
    stderr <string> | <Buffer>
返回: <ChildProcess>
```
衍生 shell，然后在该 shell 中执行 command，缓冲任何生成的输出。 传给执行函数的 command 字符串由 shell 直接处理，
特殊字符（因 shell 而异）需要进行相应处理：

```js
const util = require('node:util');
const { exec } = require('node:child_process');
exec('echo "The \\$HOME variable is $HOME"');
// $HOME 变量在第一个实例中被转义，但在第二个实例中没有。


/**
 * 回调模式
 * 使用双引号，这样路径中的空格就不会被解释为多个参数的分隔符。
 */
exec('"/path/to/test file/test.sh" arg1 arg2', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});


/**
 * 异步转同步模式
 * 
 如果此方法作为其 util.promisify() 版本被调用，则其将为具有 stdout 和 stderr 属性的 Object 
 返回 Promise。返回的 ChildProcess 实例作为 child 属性附加到 Promise。 如果出现错误
 （包括任何导致退出码不是 0 的错误）,则将返回被拒绝的 promise,其具有与回调中给定相同的 error对象，
 但有两个额外的属性 stdout 和 stderr。
 */
const _exec = util.promisify(exec);
async function lsExample() {
    const { stdout, stderr } = await _exec('ls');
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
}
lsExample();


/**
 如果启用了 signal 选项，则在相应的 AbortController 上调用 .abort() 与在子进程上调用
 .kill() 类似，只是传给回调的错误将是 AbortError：
 */
const controller = new AbortController();
const { signal } = controller;
const child = exec('grep ssh', { signal }, (error) => {
    console.log(error); // 一个 AbortError
});
controller.abort();
```

如果 timeout 大于 0，则如果子进程运行时间超过 timeout 毫秒，父进程将发送由 killSignal 属性（默认为 'SIGTERM'）标识的信号。

### .execFile()

child_process.execFile() 函数与 child_process.exec() 类似，不同之处在于它默认不衍生 shell。 而是，指定的可执行文件 file 直接作为新进程衍生，使其比 child_process.exec() 略有效率。

支持与 child_process.exec() 相同的选项。 由于未衍生 shell，因此不支持 I/O 重定向和文件通配等行为。

```html
file <string> 要运行的可执行文件的名称或路径。
args <string[]> 字符串参数列表。
options <Object>
    cwd <string> | <URL> 子进程的当前工作目录。
    env <Object> 环境变量键值对。 默认值: process.env。
    encoding <string> 默认值: 'utf8'
    timeout <number> 默认值: 0
    maxBuffer <number> 标准输出或标准错误上允许的最大数据量（以字节为单位）。 如果超过，则子进程将终止并截断任何输出。 请参阅 maxBuffer 和 Unicode 的注意事项。 默认值: 1024 * 1024。
    killSignal <string> | <integer> 默认值: 'SIGTERM'
    uid <number> 设置进程的用户标识（参见 setuid(2)）。
    gid <number> 设置进程的群组标识（参见 setgid(2)）。
    windowsHide <boolean> 隐藏通常在 Windows 系统上创建的子进程控制台窗口。 默认值: false。
    windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。 在 Unix 上被忽略。 默认值: false。
    shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）
    signal <AbortSignal> 允许使用中止信号中止子进程。
callback <Function> 进程终止时使用输出调用。
    error <Error>
    stdout <string> | <Buffer>
    stderr <string> | <Buffer>
返回: <ChildProcess>
```


```js
/**
 * 首例 回调方式
 */
const { execFile } = require('node:child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});



/**
 * 异步转同步模式
 */
const util = require('node:util');
const execFile = util.promisify(require('node:child_process').execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();




// 如果启用了 shell 选项，则请勿将未经处理的用户输入传递给此函数。 任何包含 shell 元字符的输入都可用于触发任意命令执行。
// 如果启用了 signal 选项，则在相应的 AbortController 上调用 .abort() 与在子进程上调用 .kill() 类似，只是传给回调的错误将是 AbortError：
const { execFile } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const child = execFile('node', ['--version'], { signal }, (error) => {
  console.log(error); // 一个 AbortError
});
controller.abort();
```


### .fork()

```html
modulePath <string> | <URL> 要在子进程中运行的模块。
args <string[]> 字符串参数列表。
options <Object>
    cwd <string> | <URL> 子进程的当前工作目录。
    detached <boolean> 准备子进程独立于其父进程运行。 具体行为取决于平台，参见 options.detached。
    env <Object> 环境变量键值对。 默认值: process.env。
    execPath <string> 用于创建子进程的可执行文件。
    execArgv <string[]> 传给可执行文件的字符串参数列表。 默认值: process.execArgv。
    gid <number> 设置进程的群组标识（参见 setgid(2)）。
    serialization <string> 指定用于在进程之间发送消息的序列化类型。 可能的值为 'json' 和 'advanced'。 有关更多详细信息，请参阅高级序列化。 默认值: 'json'。
    signal <AbortSignal> 允许使用中止信号关闭子进程。
    killSignal <string> | <integer> 当衍生的进程将被超时或中止信号杀死时要使用的信号值。 默认值: 'SIGTERM'。
    silent <boolean> 如果为 true，则子进程的标准输入、标准输出和标准错误将通过管道传输到父进程，否则它们将从父进程继承，有关详细信息，请参阅 child_process.spawn() 的 stdio 的 'pipe' 和 'inherit' 选项。 默认值: false。
    stdio <Array> | <string> 参见 child_process.spawn() 的 stdio。 提供此选项时，它会覆盖 silent。 如果使用数组变体，则它必须恰好包含一个值为 'ipc' 的条目，否则将抛出错误。 例如 [0, 1, 2, 'ipc']。
    uid <number> 设置进程的用户标识（参见 setuid(2)）。
    windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。 在 Unix 上被忽略。 默认值: false。
    timeout <number> 允许进程运行的最长时间（以毫秒为单位）。 默认值: undefined。
返回: <ChildProcess>
```

child_process.fork() 方法是 child_process.spawn() 的特例，专门用于衍生新的 Node.js 进程。 与 child_process.spawn() 一样，返回 ChildProcess 对象。 返回的 ChildProcess 将有额外的内置通信通道，允许消息在父进程和子进程之间来回传递。 详见 subprocess.send()。

请记住，衍生的 Node.js 子进程独立于父进程，除了两者之间建立的 IPC 通信通道。 每个进程都有自己的内存，具有自己的 V8 实例。 由于需要额外的资源分配，不建议衍生大量子 Node.js 进程。

默认情况下，child_process.fork() 将使用父进程的 process.execPath 衍生新的 Node.js 实例。 options 对象中的 execPath 属性允许使用替代的执行路径。

使用自定义 execPath 启动的 Node.js 进程将使用在子进程上使用环境变量 NODE_CHANNEL_FD 标识的文件描述符与父进程通信。

与 fork(2) POSIX 系统调用不同，child_process.fork() 不克隆当前进程。

child_process.fork() 不支持 child_process.spawn() 中可用的 shell 选项，如果设置将被忽略。

如果启用了 signal 选项，则在相应的 AbortController 上调用 .abort() 与在子进程上调用 .kill() 类似，只是传给回调的错误将是 AbortError：


```js
console.log("我被创建了N次")
if (process.argv[2] === 'child') {
    setTimeout(() => {
        console.log(`Hello from ${process.argv[2]}!`);
    }, 1_000);
} else {
    const { fork } = require('child_process');
    const controller = new AbortController();
    const { signal } = controller;
    const child = fork(__filename, ['child'], { signal });
    child.on('error', (err) => {
        // 如果控制器中止，则这将在 err 为 AbortError 的情况下被调用
    });
    controller.abort(); // 停止子进程
}
```

















