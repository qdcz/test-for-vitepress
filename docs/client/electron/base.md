## 基础

 Electron 绑定了 GUI 库的 JavaScript ， 使用 web 页面作为它的 GUI ， 一个被 JavaScript 控制的，精简版的 Chromium 浏览器 。

他有两个进程：主进程和渲染进程

### 主进程

运行 `package.json` 里 `main` 脚本的进程被称为**主进程**。在主进程运行的脚本可以以创建 web 页面的形式展示 GUI。 

### 渲染进程

 每个 Electron 的页面都在运行着自己的进程，这样的进程我们称之为**渲染进程** ，且每个页面都支持与底层的io进行通信

> 注意： 由于在网页里管理原生 GUI 资源是非常危险而且容易造成资源泄露，所以在网页面调用 GUI 相关的 APIs 是不被允许的。如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。 

### 互相通信模块

ipc模块  remote

## 杂记

### 1、打开渲染进程的控制台

```js
const win = new BrowserWindow({
    width: 800,
    height: 600
})
win.loadFile('index.html')


win.webContents.openDevTools()  
```

### 2、预加载脚本

```js
const { app, BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, './preload.js')
  }
})
//...
```

因为预加载脚本[`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)与渲染器共享一个全局接口并且可以访问 Node.js API，它通过在`window`全局中公开任意 API 来增强渲染器，然后您的 Web 内容可以使用这些 API。

尽管预加载脚本`window`与它们所附加的渲染器共享一个全局变量，但`window`由于[`contextIsolation`](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation)默认设置，您不能直接将预加载脚本中的任何变量附加到。

```js
// preload.js
window.myAPI = {  desktop: true}
```

```js
// 渲染器.js
console.log(window.myAPI)// => undefined
```

上下文隔离意味着预加载脚本与渲染器的主要世界隔离，以避免将任何特权 API 泄漏到 Web 内容的代码中。

相反，请使用该[`contextBridge`](https://www.electronjs.org/zh/docs/latest/api/context-bridge)模块安全地完成此操作：

preload.js

```js
const { contextBridge } = require('electron')contextBridge.exposeInMainWorld('myAPI', {  desktop: true})
```

渲染器.js

```js
console.log(window.myAPI)// => { desktop: true }
```

此功能对于两个主要目的非常有用：

- 通过将[`ipcRenderer`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer)助手暴露给渲染器，您可以使用进程间通信 (IPC) 从渲染器触发主进程任务（反之亦然）。
- 如果您正在为托管在远程 URL 上的现有 Web 应用程序开发 Electron 包装器，则可以将自定义属性添加到渲染器的`window`全局变量中，该属性可用于 Web 客户端的纯桌面逻辑。

## 创建一个electron程序

创建一个文件夹  使用npm init 生成一个json包

然后 `npm install --save-dev electron`  安装依赖

创建index.html页面，创建index.js页面

```html
// index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>
```

```js
// index.js

const { app, BrowserWindow } = require('electron')

// 开启一个窗口（渲染进程）
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    // 加载本地页面
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})
```

这样一个简单的页面就出来了

## 打包一个electron程序

使用 ` npm install --save-dev @electron-forge/cli` 安装依赖

然后使用 ` npx electron-forge import `  添加 Electron Forge 作为应用程序的开发依赖项，并使用其`import`命令设置 Forge 的脚手架： 

```
✔ Checking your system
✔ Initializing Git Repository
✔ Writing modified package.json file
✔ Installing dependencies
✔ Writing modified package.json file
✔ Fixing .gitignore

We have ATTEMPTED to convert your app to be in a format that electron-forge understands.




✔ 检查你的系统
✔ 初始化Git存储库
✔ 写修改过的包。json文件
✔ 安装依赖项
✔ 写修改过的包。json文件
✔ 修理。gitignore
我们已尝试将您的应用程序转换为electron forge能够理解的格式。
```

使用 ` npm run make ` 去打包程序  会在out文件夹下输出

