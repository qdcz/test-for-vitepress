
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

```shell
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

```shell
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