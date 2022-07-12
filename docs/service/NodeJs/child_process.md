
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

child_process.fork() 方法是 child_process.spawn() 的特例，专门用于衍生新的 Node.js 进程。 与 child_process.spawn() 一样，
返回 ChildProcess 对象。 返回的 ChildProcess 将有额外的内置通信通道，允许消息在父进程和子进程之间来回传递。 详见 subprocess.send()。

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


### .spawn()

```html
command <string> 要运行的命令。
args <string[]> 字符串参数列表。
options <Object>
    cwd <string> | <URL> 子进程的当前工作目录。
    env <Object> 环境变量键值对。 默认值: process.env。
    argv0 <string> 显式设置发送给子进程的 argv[0] 的值。 如果未指定，这将设置为 command。
    stdio <Array> | <string> 子进程的标准输入输出配置（参见 options.stdio）。
    detached <boolean> 准备子进程独立于其父进程运行。 具体行为取决于平台，参见 options.detached。
    uid <number> 设置进程的用户标识（参见 setuid(2)）。
    gid <number> 设置进程的群组标识（参见 setgid(2)）。
    serialization <string> 指定用于在进程之间发送消息的序列化类型。 可能的值为 'json' 和 'advanced'。 有关更多详细信息，请参阅高级序列化。 默认值: 'json'。
    shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）
    windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。 在 Unix 上被忽略。 当指定了 shell 并且是 CMD 时，则自动设置为 true。 默认值: false。
    windowsHide <boolean> 隐藏通常在 Windows 系统上创建的子进程控制台窗口。 默认值: false。
    signal <AbortSignal> 允许使用中止信号中止子进程。
    timeout <number> 允许进程运行的最长时间（以毫秒为单位）。 默认值: undefined。
    killSignal <string> | <integer> 当衍生的进程将被超时或中止信号杀死时要使用的信号值。 默认值: 'SIGTERM'。
返回: <ChildProcess>
```

child_process.spawn() 方法使用给定的 command 和 args 中的命令行参数衍生新进程。 如果省略，args 默认为空数组。

如果启用了 shell 选项，则请勿将未经处理的用户输入传递给此函数。 任何包含 shell 元字符的输入都可用于触发任意命令执行。

使用 cwd 指定从中衍生进程的工作目录。 如果没有给定，则默认是继承当前工作目录。 如果给定，但路径不存在，则子进程会触发 ENOENT 错误并立即退出。 当命令不存在时，也会触发 ENOENT。

使用 env 指定对新进程可见的环境变量，默认为 process.env。

env 中的 undefined 值将被忽略。


```js
/**
 * 运行 ls -lh /usr、捕获 stdout、stderr 和退出码的示例：
 */
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});




/**
 * 示例：一种非常精细的运行 ps ax | grep ssh 的方式
 */
const { spawn } = require('node:child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
    grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
    console.error(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
    if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
    }
    grep.stdin.end();
});

grep.stdout.on('data', (data) => {
    console.log(data.toString());
});

grep.stderr.on('data', (data) => {
    console.error(`grep stderr: ${data}`);
});

grep.on('close', (code) => {
    if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
    }
});


/**
 * 某些平台（macOS、Linux）将使用 argv[0] 的值作为进程标题，而其他平台（Windows、SunOS）将使用 command。

 Node.js 当前在启动时用 process.execPath 覆盖 argv[0]，因此 Node.js 子进程中的 process.argv[0] 将不匹配从父进程传给 spawn 的 argv0 参数，而是使用 process.argv0 属性检索它。

 如果启用了 signal 选项，则在相应的 AbortController 上调用 .abort() 与在子进程上调用 .kill() 类似，只是传给回调的错误将是 AbortError：
 */

const { spawn } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
    // 如果控制器中止，则这将在 err 为 AbortError 的情况下被调用
});
controller.abort(); // 停止子进程
```


### options.detached

在 Windows 上，将 options.detached 设置为 true 可以让子进程在父进程退出后继续运行。 子进程将有自己的控制台窗口。 一旦为子进程启用，则它就不能被禁用。

在非 Windows 平台上，如果 options.detached 设置为 true，则子进程将成为新进程组和会话的领导者。 子进程可以在父进程退出后继续运行，不管它们是否分离。 有关详细信息，请参阅 setsid(2)。

默认情况下，父进程将等待分离的子进程退出。 为了防止父进程等待给定的 subprocess 退出，则使用 subprocess.unref() 方法。 这样做会使父进程的事件循环不将子进程包括在其引用计数中，从而允许父进程独立于子进程退出，除非在子进程和父进程之间建立了 IPC 通道。

当使用 detached 选项启动长时间运行的进程时，进程在父进程退出后不会一直在后台运行，除非提供了未连接到父进程的 stdio 配置。 如果继承了父进程的 stdio，则子进程将保持与控制终端的连接。

长时间运行的进程的示例，通过分离并忽略其父进程的 stdio 文件描述符，以忽略父进程的终止：

```js
const { spawn } = require('node:child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore'
});

subprocess.unref();
```

或者，可以将子进程的输出重定向到文件中：

```js
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

const subprocess = spawn('prg', [], {
  detached: true,
  stdio: [ 'ignore', out, err ]
});

subprocess.unref();
```


### options.stdio

options.stdio 选项用于配置在父进程和子进程之间建立的管道。 默认情况下，子进程的标准输入、标准输出和标准错误被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。 这相当于将 options.stdio 设置为等于 ['pipe', 'pipe', 'pipe']。

为方便起见，options.stdio 可能是以下字符串之一：

否则，options.stdio 的值是一个数组，其中每个索引对应于子进程中的文件描述符。 文件描述符 0、1 和 2 分别对应于标准输入、标准输出和标准错误。 可以指定额外的文件描述符以在父进程和子进程之间创建额外的管道。 该值是以下之一：

```js
'pipe'：在子进程和父进程之间创建管道。 管道的父端作为 subprocess.stdio[fd] 的 child_process 对象的属性暴露给父进程。 为文件描述符 0、1 和 2 创建的管道也可分别用作 subprocess.stdin、subprocess.stdout 和 subprocess.stderr。 目前，这些不是实际的 Unix 管道，因此子进程不能通过它们的描述符文件使用它们，例如 /dev/fd/2 或 /dev/stdout。

'overlapped'：与 'pipe' 相同，只是在句柄上设置了 FILE_FLAG_OVERLAPPED 标志。 这对于子进程的标准输入输出句柄上的重叠 I/O 是必需的。 有关更多详细信息，请参阅文档。 这与非 Windows 系统上的 'pipe' 完全相同。

'ipc'：创建 IPC 通道，用于在父子进程之间传递消息/文件描述符。 一个 ChildProcess 最多可以有一个 IPC 标准输入输出文件描述符。 设置此选项将启用 subprocess.send() 方法。 如果子进程是 Node.js 进程，则 IPC 通道的存在将启用 process.send() 和 process.disconnect() 方法，以及子进程中的 'disconnect' 和 'message' 事件。

不支持以 process.send() 以外的任何方式访问 IPC 通道文件描述符、或者将 IPC 通道与非 Node.js 实例的子进程一起使用。

'ignore'：指示 Node.js 忽略子进程中的文件描述符。 虽然 Node.js 将始终为其衍生的进程打开文件描述符 0、1 和 2，但将文件描述符设置为 'ignore' 将导致 Node.js 打开 /dev/null 并将其附加到子进程的文件描述符。

'inherit'：通过相应的标准输入输出流传入/传出父进程。 在前三个位置，这分别相当于 process.stdin、process.stdout 和 process.stderr。 在任何其他位置，相当于 'ignore'。

<Stream> 对象：与子进程共享引用终端、文件、套接字或管道的可读或可写流。 流的底层文件描述符在子进程中复制到对应于 stdio 数组中的索引的文件描述符。 流必须有底层描述符（文件流在 'open' 事件发生之前没有）。

正整数：该整数值被解释为当前在父进程中打开的文件描述符。 它与子进程共享，类似于共享 <Stream> 对象的方式。 Windows 不支持传入套接字。

null、undefined：使用默认值。 对于标准输入输出文件描述符 0、1 和 2（换句话说，标准输入、标准输出和标准错误），创建管道。 对于文件描述符 3 及以上，默认值为 'ignore'。
```

值得注意的是，当父子进程之间建立了 IPC 通道，并且子进程是 Node.js 进程时，则子进程会在未引用 IPC 通道的情况下启动（使用 unref() ），直到子进程为 'disconnect' 事件或 'message' 事件注册事件句柄。 这允许子进程正常退出，而进程不会被打开的 IPC 通道保持打开状态。

在类 Unix 操作系统上，child_process.spawn() 方法在将事件循环与子进程分离之前同步执行内存操作。 具有大量内存占用的应用程序可能会发现频繁的 child_process.spawn() 调用是一个瓶颈。 有关更多信息，请参阅 V8 问题 7381。

另见：child_process.exec() 和 child_process.fork()。


## 子类ChildProcess 事件

ChildProcess 的实例，表示衍生的子进程。

ChildProcess 的实例不是直接创建的。 而是，使用 child_process.spawn()、child_process.exec()、child_process.execFile() 或 child_process.fork() 方法来创建 ChildProcess 的实例。

### close

```html
code <number> 如果子进程自己退出，则为退出码。
signal <string> 终止子进程的信号。
```

在进程已结束并且子进程的标准输入输出流已关闭之后，则触发 'close' 事件。 
这与 'exit' 事件不同，因为多个进程可能共享相同的标准输入输出流。
'close' 事件将始终在 'exit' 或 'error'（如果子进程衍生失败）已经触发之后触发。

```js
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});
```


### disconnect

调用父进程中的 subprocess.~~disconnect~~() 方法或子进程中的 process.disconnect() 方法后会触发 'disconnect' 事件。 断开连接后就不能再发送或接收消息，且 subprocess.connected 属性为 false。


### error

```html
err <Error> 错误。
```

'error' 事件在以下情况下触发：

无法衍生该进程，或
进程无法终止，或
向子进程发送消息失败。
发生错误后，'exit' 事件可能会也可能不会触发。 在监听 'exit' 和 'error' 事件时，防止多次意外调用句柄函数。

另见 subprocess.kill() 和 subprocess.send()。


### exit

```html
code <number> 如果子进程自己退出，则为退出码。
signal <string> 终止子进程的信号。
```

'exit' 事件在子进程结束后触发。 如果进程退出，则 code 为最终的进程退出码，否则为 null。 如果进程因收到信号而终止，则 signal 是信号的字符串名称，否则为 null。 两者之一将始终是非 null。

当 'exit' 事件被触发时，子进程标准输入输出流可能仍处于打开状态。

Node.js 为 SIGINT 和 SIGTERM 建立信号句柄，且 Node.js 进程不会因为收到这些信号而立即终止。 而是，Node.js 将执行一系列清理操作，然后重新触发已处理的信号。


### message

```html
message <Object> 解析的 JSON 对象或原始值。
sendHandle <Handle> net.Socket 或 net.Server 对象、或未定义。
```

当子进程使用 process.send() 发送消息时，则触发 'message' 事件。

消息经过序列化和解析。 结果消息可能与最初发送的消息不同。

如果在衍生子进程时将 serialization 选项设置为 'advanced'，则 message 参数可以包含 JSON 无法表示的数据。 有关更多详细信息，请参阅高级序列化。


### spawn

```html
一旦子进程衍生成功，则会触发 'spawn' 事件。 如果子进程没有衍生成功，则不会触发 'spawn' 事件，而是触发 'error' 事件。

如果触发，则 'spawn' 事件在所有其他事件之前，且在通过 stdout 或 stderr 接收任何数据之前。

无论在衍生的进程内是否发生错误，'spawn' 事件都会触发。 例如，如果 bash some-command 衍生成功，则 'spawn' 事件将触发，尽管 bash 可能衍生 some-command 失败。 当使用 { shell: true } 时，此注意事项也适用。
```


## 属性

### subprocess.channel

```html
<Object> 代表到子进程的 IPC 通道的管道
```

subprocess.channel 属性是对子进程的 IPC 通道的引用。 如果当前不存在 IPC 通道，则此属性为 undefined。

### subprocess.channel.ref()

如果之前已调用过 .unref()，则此方法使 IPC 通道保持父进程的事件循环运行。

### subprocess.channel.unref()

此方法使 IPC 通道不保持父进程的事件循环运行，并且即使在通道打开时也让其结束。


### subprocess.connected

```html
<boolean> 调用 subprocess.disconnect() 后设置为 false。
```

subprocess.connected 属性指示是否仍然可以从子进程发送和接收消息。 当 subprocess.connected 为 false 时，不再可能发送或接收消息。


### subprocess.disconnect()

关闭父进程和子进程之间的 IPC 通道，一旦没有其他连接使其保持活动状态，则允许子进程正常退出。 调用此方法后，父子进程中的 subprocess.connected 和 process.connected 属性（分别）将设置为 false，进程之间将无法再传递消息。

当接收过程中没有消息时，将触发 'disconnect' 事件。 这通常会在调用 subprocess.disconnect() 后立即触发。

当子进程是 Node.js 实例（例如使用 child_process.fork() 衍生）时，则可以在子进程中调用 process.disconnect() 方法来关闭 IPC 通道。

### subprocess.exitCode

```html
<integer>
```

subprocess.exitCode 属性表示子进程的退出码。 如果子进程仍在运行，则该字段将为 null。

### subprocess.kill([signal])

```html
signal <number> | <string>
返回: <boolean>
```

subprocess.kill() 方法向子进程发送信号。 如果没有给定参数，则进程将被发送 'SIGTERM' 信号。 有关可用信号的列表，请参阅 signal(7)。 如果 kill(2) 成功，则此函数返回 true，否则返回 false。

```js
const { spawn } = require('node:child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// 发送 SIGHUP 到进程。
grep.kill('SIGHUP');
```

如果信号无法传达，则 ChildProcess 对象可能会触发 'error' 事件。 向已经退出的子进程发送信号不是错误，但可能会产生不可预见的结果。 具体来说，如果进程标识符 (PID) 已重新分配给另一个进程，则信号将传给该进程，而这可能会产生意外结果。

虽然该函数被称为 kill，但传给子进程的信号实际上可能不会终止该进程。

请参阅 kill(2) 以供参考。

在不存在 POSIX 信号的 Windows 上，signal 参数将被忽略，并且进程将被强制且突然地终止（类似于 'SIGKILL'）。 有关更多详细信息，请参阅信号事件。

在 Linux 上，子进程的子进程在试图杀死其父进程时不会被终止。 当在 shell 中运行新进程或使用 ChildProcess 的 shell 选项时，可能会发生这种情况：

```js
'use strict';
const { spawn } = require('node:child_process');

const subprocess = spawn(
  'sh',
  [
    '-c',
    `node -e "setInterval(() => {
      console.log(process.pid, 'is alive')
    }, 500);"`,
  ], {
    stdio: ['inherit', 'inherit', 'inherit']
  }
);

setTimeout(() => {
  subprocess.kill(); // 不会终止 shell 中的 Node.js 进程。
}, 2000);
```


### subprocess.killed

```html
<boolean> 使用 subprocess.kill() 成功发送信号给子进程后设置为 true。
```

subprocess.killed 属性指示子进程是否成功接收到来自 subprocess.kill() 的信号。 killed 属性并不表示子进程已终止。

### subprocess.pid

```html
<integer> | <undefined>
```

返回子进程的进程标识符 (PID)。 如果子进程由于错误而无法衍生，则该值为 undefined 并触发 error。

```js
const { spawn } = require('node:child_process');
const grep = spawn('grep', ['ssh']);

console.log(`Spawned child pid: ${grep.pid}`);
grep.stdin.end();
```

### subprocess.ref()

在调用 subprocess.unref() 后调用 subprocess.ref() 将为子进程恢复删除的引用计数，迫使父进程在退出之前等待子进程退出。

```js
const { spawn } = require('node:child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore'
});

subprocess.unref();
subprocess.ref();
```


### subprocess.send(message[, sendHandle[, options]][, callback])

```html
message <Object>
sendHandle <Handle>
options <Object> options 参数（如果存在）是用于参数化某些类型句柄的发送的对象。 options 支持以下属性：
keepOpen <boolean> 当传入 net.Socket 实例时可以使用的值。 当为 true 时，套接字在发送过程中保持打开状态。 默认值: false。
callback <Function>
返回: <boolean>
```

当父进程和子进程之间建立了 IPC 通道时（即当使用 child_process.fork() 时），可以使用 subprocess.send() 方法向子进程发送消息。 当子进程是 Node.js 实例时，可以通过 'message' 事件接收这些消息。

消息经过序列化和解析。 结果消息可能与最初发送的消息不同。

例如，在父进程脚本中：

```js
const cp = require('node:child_process');
const n = cp.fork(`${__dirname}/sub.js`);

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

// 引起子进程打印：CHILD got message: { hello: 'world' }
n.send({ hello: 'world' });
```

然后子进程脚本 'sub.js' 可能如下所示：

```js
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});

// 引起父进程打印：PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });
```

子 Node.js 进程将拥有自己的 process.send() 方法，允许子进程将消息发送回父进程。

当发送 {cmd: 'NODE_foo'} 消息时是一种特殊情况。 在 cmd 属性中包含 NODE_ 前缀的消息是 Node.js 核心预留使用的，不会在子进程的 'message' 事件中触发。 而是，此类消息使用 'internalMessage' 事件触发，并由 Node.js 在内部使用。 应用程序应避免使用此类消息或监听 'internalMessage' 事件，因为它可能随时更改，恕不另行通知。

可以传给 subprocess.send() 的可选 sendHandle 参数用于将 TCP 服务器或套接字对象传给子进程。 子进程将接收该对象作为传给在 'message' 事件上注册的回调函数的第二个参数。 在套接字中接收和缓冲的任何数据都不会发送给子进程。

可选的 callback 函数将在消息发送之后但在子进程可能接收到它之前调用。 该函数使用单个参数调用：成功时为 null，失败时为 Error 对象。

如果没有提供 callback 函数且无法发送消息，则 ChildProcess 对象将触发 'error' 事件。 例如，当子进程已经退出时，就会发生这种情况。

如果通道已关闭或未发送消息的积压超过阈值（这使得发送更多消息是不明智的），则 subprocess.send() 将返回 false。 否则，该方法返回 true。 callback 函数可用于实现流量控制


示例：发送服务器对象
```js
例如，可以使用 sendHandle 参数将 TCP 服务器对象的句柄传给子进程，如下例所示：

const subprocess = require('node:child_process').fork('subprocess.js');

// 打开服务器对象并发送句柄。
const server = require('node:net').createServer();
server.on('connection', (socket) => {
socket.end('handled by parent');
});
server.listen(1337, () => {
subprocess.send('server', server);
});
然后子进程将收到服务器对象：

process.on('message', (m, server) => {
if (m === 'server') {
server.on('connection', (socket) => {
socket.end('handled by child');
});
}
});
一旦服务器现在在父进程和子进程之间共享，则一些连接可以由父进程处理，一些连接由子进程处理。
虽然上面的示例使用使用 node:net 模块创建的服务器，但 node:dgram 模块服务器使用完全相同的工作流程，
除了监听 'message' 事件而不是 'connection' 和使用 server.bind() 而不是 server.listen()。 
但是，目前仅在 Unix 平台上支持。
```

示例：发送套接字对象

同样，sendHandler 参数可用于将套接字的句柄传给子进程。 下面的例子产生了两个子进程，每个子进程都处理具有“normal”或“special”优先级的连接：
```js
const { fork } = require('node:child_process');
const normal = fork('subprocess.js', ['normal']);
const special = fork('subprocess.js', ['special']);

// 打开服务器并将套接字发送给子进程。
// 使用 pauseOnConnect 防止套接字在发送到子进程之前被读取。
const server = require('node:net').createServer({ pauseOnConnect: true });
server.on('connection', (socket) => {

    // 如果这是 special 优先级...
    if (socket.remoteAddress === '74.125.127.100') {
        special.send('socket', socket);
        return;
    }
    // 这是 normal 优先级。
    normal.send('socket', socket);
});
server.listen(1337);
```
subprocess.js 将接收套接字句柄作为传给事件回调函数的第二个参数：
```js
process.on('message', (m, socket) => {
  if (m === 'socket') {
    if (socket) {
      // 检查客户端套接字是否存在。
      // 套接字可能会在发送和在子进程中接收到它之间关闭。
      socket.end(`Request handled with ${process.argv[2]} priority`);
    }
  }
});
```

不要在已传给子进程的套接字上使用 .maxConnections。 父进程无法跟踪套接字何时被销毁。

子进程中的任何 'message' 句柄都应验证 socket 是否存在，因为在将连接发送到子进程所需的时间内，连接可能已关闭。

### subprocess.signalCode

```html
<string> | <null>
```

subprocess.signalCode 属性表示子进程接收到的信号（如果有），否则为 null。

### subprocess.spawnargs

```html
<Array>
```

subprocess.spawnargs 属性表示子进程启动时使用的命令行参数的完整列表。

### subprocess.spawnfile

```html
<string>
```

subprocess.spawnfile 属性表示启动的子进程的可执行文件名。

对于 child_process.fork()，其值将等于 process.execPath。 对于 child_process.spawn()，它的值将是可执行文件的名称。 对于 child_process.exec()，它的值将是启动子进程的 shell 的名称。

### subprocess.stderr

```html
<stream.Readable>
```

代表子进程的 stderr 的 Readable Stream。

如果子进程衍生时 stdio[2] 设置为 'pipe' 以外的任何值，则此将是 null。

subprocess.stderr 是 subprocess.stdio[2] 的别名。 这两个属性将引用相同的值。

如果无法成功衍生子进程，则 subprocess.stderr 属性可能是 null。


### subprocess.stdin

```html
<stream.Writable>
```

代表子进程的 stdin 的 Writable Stream。

如果子进程等待读取其所有输入，则在通过 end() 关闭此流之前，子进程将不会继续。

如果子进程衍生时 stdio[0] 设置为 'pipe' 以外的任何值，则此将是 null。

subprocess.stdin 是 subprocess.stdio[0] 的别名。 这两个属性将引用相同的值。

如果无法成功衍生子进程，则 subprocess.stdin 属性可能是 undefined。


### subprocess.stdout

```html
<stream.Readable>
```

代表子进程的 stdout 的 Readable Stream。

如果子进程衍生时 stdio[1] 设置为 'pipe' 以外的任何值，则此将是 null。

subprocess.stdout 是 subprocess.stdio[1] 的别名。 这两个属性将引用相同的值。

```js
const { spawn } = require('node:child_process');

const subprocess = spawn('ls');

subprocess.stdout.on('data', (data) => {
  console.log(`Received chunk ${data}`);
});
```

### subprocess.stdio

```html
<Array>
```

到子进程的稀疏管道数组，对应于传给 child_process.spawn() 的 stdio 选项中的位置，这些位置已设置为值 'pipe'。 subprocess.stdio[0]、subprocess.stdio[1] 和 subprocess.stdio[2] 也可分别用作 subprocess.stdin、subprocess.stdout 和 subprocess.stderr。

在下面的例子中，只有子进程的文件描述符 1 (标准输出) 被配置为管道，所以只有进程的 subprocess.stdio[1] 是流，数组中的所有其他值都是 null。

```js
const assert = require('node:assert');
const fs = require('node:fs');
const child_process = require('node:child_process');

const subprocess = child_process.spawn('ls', {
  stdio: [
    0, // 为子进程使用父进程的标准输入。
    'pipe', // 管道子进程的标准输出到父进程。
    fs.openSync('err.out', 'w'), // 将子进程的标准错误定向到文件。
  ]
});

assert.strictEqual(subprocess.stdio[0], null);
assert.strictEqual(subprocess.stdio[0], subprocess.stdin);

assert(subprocess.stdout);
assert.strictEqual(subprocess.stdio[1], subprocess.stdout);

assert.strictEqual(subprocess.stdio[2], null);
assert.strictEqual(subprocess.stdio[2], subprocess.stderr);
```

如果无法成功衍生子进程，则 subprocess.stdio 属性可能是 undefined。


### subprocess.unref()

默认情况下，父进程将等待分离的子进程退出。 为了防止父进程等待给定的 subprocess 退出，则使用 subprocess.unref() 方法。 这样做会使父进程的事件循环不将子进程包括在其引用计数中，从而允许父进程独立于子进程退出，除非在子进程和父进程之间建立了 IPC 通道。

```html
const { spawn } = require('node:child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore'
});

subprocess.unref();
```


## maxBuffer 和 Unicode

maxBuffer 选项指定 stdout 或 stderr 上允许的最大字节数。 如果超过此值，则终止子进程。 这会影响包含多字节字符编码（例如 UTF-8 或 UTF-16）的输出。 例如，console.log('中文测试') 将向 stdout 发送 13 个 UTF-8 编码字节，尽管只有 4 个字符。

## shell 的要求

shell 应该理解 -c 开关。 如果 shell 是 'cmd.exe'，则应该理解 /d /s /c 开关，并且命令行解析应该是兼容的。

## 默认的 Windows shell

尽管微软指定 %COMSPEC% 必须包含根环境中到 'cmd.exe' 的路径，但子进程并不总是受到相同的要求。 因此，在可以衍生 shell 的 child_process 函数中，如果 process.env.ComSpec 不可用，则使用 'cmd.exe' 作为后备。

## 高级序列化

新增于: v13.2.0, v12.16.0
子进程支持 IPC 的序列化机制，该机制基于 node:v8 模块的序列化 API，基于 HTML 结构化克隆算法。 这通常功能更强大，支持更多内置的 JavaScript 对象类型，例如 BigInt、Map 和 Set、ArrayBuffer 和 TypedArray、Buffer、Error、RegExp 等。