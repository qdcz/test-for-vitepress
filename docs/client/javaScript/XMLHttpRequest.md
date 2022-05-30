
## 概念
XMLHttpRequest 是一种创建ajax请求的JavaScriptApi 提供游览器与服务器之间的发送请求的能力

## 使用

```js
const ajax = (url, param, option = { type: "get" }) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = xhr.responseText		// 接收响应信息
                resolve(data)
            }
        }
        // 传输失败
        xhr.addEventListener("error", (err) => {
            reject(err)
        });

        xhr.open(option.type, url, true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        xhr.send(param)
    })
}
```

## 监听事件

### readystatechange

属性发生变化时，触发

```js
xhr.addEventListener("readystatechange", (e)=>{});
```

也可以使用 `onreadystatechange` 属性。 

```js
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = xhr.responseText		// 接收响应信息
        resolve(data)
    }
}
```

### abort

 当 request 被停止时触发，例如当程序调用 

```js
xhr.addEventListener('abort', handleEvent);
```

 也可以使用 `onabort` 属性。 

```js
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.onabort = function () {
  console.log('** 请求被中止');
};
xmlhttp.send();
//..
xmlhttp.abort(); // 这将会调用我们上面定义的 onabort 回调函数
```

### error

 当 request 遭遇错误时触发。 

```js
xhr.addEventListener('error', handleEvent);
```

 也可以使用 `onerror` 属性。 

```js
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.onerror = function () {
  console.log("** An error occurred during the transaction");
};
xmlhttp.send();
```

### load

 当请求结束时触发, 无论请求成功或者失败

```js
xhr.addEventListener('load', handleEvent);
```

 也可以使用 `onload` 属性。 

```js
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.onload = function () {
  console.log("** ");
};
xmlhttp.send();
```

### loadstart

  接收到响应数据时触发。 

```js
xhr.addEventListener('loadstart', handleEvent);
```

 也可以使用 `onloadstart` 属性。 

```js
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.onloadstart = function () {
  console.log("Download underway");
};
xmlhttp.send();
```

### progress

 当请求接收到更多数据时，周期性地触发。 

```js
xhr.addEventListener('progress', handleEvent);
```

 也可以使用 `onprogress` 属性。 

```js
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.onprogress = function () {
  //do something
};
xmlhttp.send();
```

### timeout

 在预设时间内没有接收到响应时触发。   请求超时回调。

```js
xhr.addEventListener('timeout', handleEvent);
```

 也可以使用 `ontimeout` 属性。 

```js
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.ontimeout = function () {
  //do something
};
xmlhttp.send();
```



## 属性

### readyState[`只读`]

|  值  |        状态        | 描述                                                |
| :--: | :----------------: | --------------------------------------------------- |
| `0`  |      `UNSENT`      | 代理被创建，但尚未调用 open() 方法。                |
| `1`  |      `OPENED`      | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  |     `LOADING`      | 下载中； `responseText` 属性已经包含部分数据。      |
| `4`  |       `DONE`       | 下载操作已完成。                                    |

### response[`只读`]

 响应的正文 

```js
var data = xhr.response		// 接收响应信息
```

### responseText[`只读`]

 在一个请求被发送后，从服务器端返回文本。 

```js
var data = xhr.responseText		// 接收响应信息
```

### responseType

 响应数据中包含的数据类型 

类型有： "" 、 "arraybuffer" 、 "blob" 、 "document" 、 "json" 、 "text" 、 "ms-stream" 

```js
var type = xhr.type	
```

### responseURL[`只读`]

响应的序列化URL，如果URL为空则返回空字符串。如果URL有锚点，则位于URL # 后面的内容会被删除。如果URL有重定向， `responseURL` 的值会是经过多次重定向后的最终 URL 。 

```js
xhr.open('GET', 'http://example.com/test', true);
xhr.onload = function () {
  console.log(xhr.responseURL); // http://example.com/test
};
```

### status[`只读`]

 返回了`XMLHttpRequest` 响应中的数字状态码。`status` 的值是一个`无符号短整型`。在请求完成前，`status`的值为`0`。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。 

>  status码是标准的[HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

```js
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.status);

xhr.open('GET', '/server', true);
console.log('OPENED', xhr.status);

xhr.onprogress = function () {
  console.log('LOADING', xhr.status);
};

xhr.onload = function () {
  console.log('DONE', xhr.status);
};

xhr.send(null);

/**
 * 输出如下：
 *
 * UNSENT（未发送） 0
 * OPENED（已打开） 0
 * LOADING（载入中） 200
 * DONE（完成） 200
 */

```

### statusText[`只读`]

返回了`XMLHttpRequest` 请求中由服务器返回的一个[`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) 类型的文本信息，这则信息中也包含了响应的数字状态码。不同于使用一个数字来指示的状态码`XMLHTTPRequest.status`，这个属性包含了返回状态对应的文本信息，例如"OK"或是"Not Found"。如果请求的状态`readyState`的值为"UNSENT"或者"OPENED"，则这个属性的值将会是一个空字符串。

如果服务器未明确指定一个状态文本信息，则`statusText`的值将会被自动赋值为"OK"。

```js
var xhr = new XMLHttpRequest();
console.log('0 UNSENT', xhr.statusText);

xhr.open('GET', '/server', true);
console.log('1 OPENED', xhr.statusText);

xhr.onprogress = function () {
  console.log('3 LOADING', xhr.statusText);
};

xhr.onload = function () {
  console.log('4 DONE', xhr.statusText);
};

xhr.send(null);

/**
 * 输出如下:
 *
 * 0 UNSENT
 * 1 OPENED
 * 3 LOADING OK
 * 4 DONE OK
 */
```

### timeout

 是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。超时并不应该用在一个 [document environment](https://developer.mozilla.org/zh-CN/docs/Glossary/document_environment) 中的同步 XMLHttpRequests 请求中，否则将会抛出一个 `InvalidAccessError` 类型的错误。当超时发生， [timeout](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout_event) 事件将会被触发。 

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.timeout = 2000; // 超时时间，单位是毫秒

xhr.onload = function () {
  // 请求完成。在此进行处理。
};

xhr.ontimeout = function (e) {
  // XMLHttpRequest 超时。在此做某事。
};

xhr.send(null);
```

### withCredentials

 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site `Access-Control`）请求。在同一个站点下使用`withCredentials属性是无效的。` 

> 不同源请求要自动携带cookie，将此值设置为true

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```

## 方法

### .abort()

 终止该请求 

```js
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
xhr.open(method, url, true);

xhr.send();

if (OH_NOES_WE_NEED_TO_CANCEL_RIGHT_NOW_OR_ELSE) {
  xhr.abort();
}
```

### .getAllResponseHeaders()

 以字符串的形式返回所有用 [CRLF](https://developer.mozilla.org/zh-CN/docs/Glossary/CRLF) 分隔的响应头，如果没有收到响应，则返回 `null`。 

```js
xhr.getAllResponseHeaders();
```

返回示例

```http
date: Fri, 08 Dec 2017 21:04:30 GMT\r\n
content-encoding: gzip\r\n
x-content-type-options: nosniff\r\n
server: meinheld/0.6.1\r\n
x-frame-options: DENY\r\n
content-type: text/html; charset=utf-8\r\n
connection: keep-alive\r\n
strict-transport-security: max-age=63072000\r\n
vary: Cookie, Accept-Encoding\r\n
content-length: 6502\r\n
x-xss-protection: 1; mode=block\r\n
```

### .getResponseHeader(name)

 返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 `null`。 

```js
var client = new XMLHttpRequest();
client.open("GET", "somefile.txt", true);
client.send();
client.onreadystatechange = function() {
  if(this.readyState == this.HEADERS_RECEIVED) { //如果readyState表示响应头已返回
    var contentType=client.getResponseHeader("Content-Type"));//将此连接的Content-Type响应头项赋值到contentType。
    if(contentType != my_expected_type) {//如果这不是你的预期值
      client.abort();//终止连接
    }
  }
}
```

### .open()

 初始化一个请求。

```js
xhrReq.open(method, url);
xhrReq.open(method, url, async);
xhrReq.open(method, url, async, user);
xhrReq.open(method, url, async, user, password);
```

async：是否异步
user：用户名用于认证用途；默认为null。
password：密码用于认证用途；默认为null。

### .overrideMimeType(mimeType)

 覆写由服务器返回的 MIME 类型。 

`mimeType` : 一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 指定具体的MIME类型去代替有服务器指定的MIME类型. 如果服务器没有指定类型，那么 `XMLHttpRequest` 将会默认为 `"text/xml"`.

```js
req = new XMLHttpRequest();
req.overrideMimeType("text/plain");
req.addEventListener("load", callback, false);
req.open("get", url);
req.send();
```

### .send(body)

 用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。 

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.onload = function () {
   // 请求结束后,在此处写处理代码
};

xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob());
// xhr.send(new Int8Array());
// xhr.send(document);
```

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", '/server', true);

//发送合适的请求头信息
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onload = function () {
    // 请求结束后,在此处写处理代码
};
xhr.send("foo=bar&lorem=ipsum");
// xhr.send('string');
// xhr.send(new Blob());
// xhr.send(new Int8Array());
// xhr.send(document);
```

### .setRequestHeader()

 设置HTTP请求头部的方法 

 此方法必须在  [`open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open) 方法和 [`send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)  之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。 



myReq.setRequestHeader(header, value);

`header` : 属性的值。

`value` : 属性的值。

