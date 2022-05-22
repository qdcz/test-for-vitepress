## index.js文件

```js

const http = require('http');
const { WebSocketServer, Server } = require('ws')
const { parse } = require('url');
const qs = require("querystring");
const uuid = require('uuid');
const {generateCookie,setSession,checkSession} = require('./utils/session');
const fs = require("fs");

const _map = new Map();
const clients = new Array();




// 不需要鉴权的接口
const noAuth = [
'/client.html',
'/favicon.ico',
'/hyw/chat/login'
]

/**
* 创建一个http服务
  */
  const server = http.createServer(async function (req, res) {
  RequestHeaderProcessing(req,res);   // 请求头处理
  const { pathname } = parse(req.url);
  // 登录接口
  if (pathname === "/hyw/chat/login" && req.method === "POST") {
  let postData = "";
  req.on("data", (chunk) => postData += chunk);
  req.on('end', () => {
  const token = uuid.v4();
  postData = JSON.parse(postData);
  let { userName, userPassword } = postData
  _map.set(userName, token);
  // 设置缓存的session
  setSession(res,{ expires: Date.now() + 1000*60*30 })
  res.end(JSON.stringify({
  code: 200,
  msg: "登陆成功",
  token,
  }))
  })
  return
  }
  CookieHandle(req,res);  // cookie处理
  if(noAuth.findIndex(i=>i==pathname)==-1){
  const isUseful = checkSession(req.connectSid);
  if(isUseful === false){
  res.end(JSON.stringify({
  code: 400,
  msg: "session过期，请重新登录"
  }))
  return
  }
  }


    if(pathname === "/hyw/chat/info" && req.method === "POST"){
        let postData = "";
        req.on("data", (chunk) => postData += chunk)
        req.on('end', () => {


            res.end(JSON.stringify({
                code: 200,
                msg: "查询成功"
            }))
        })
        return
    }else if(pathname === "/client.html" && req.method === "GET"){  // 访问本地文件
        fs.readFile("./" + "client.html", (err, data) => {
            // body
            if (err) {
                console.log(err);
                res.writeHead(404, {"Content-Type": "text/html"});
            } else {
                res.setHeader("Content-Type","text/html");
                res.write(data.toString());
            }
            res.end();
        });
        return;
    }


    // 过OPTIONS请求
    if (pathname == '/favicon.ico' || pathname == '/') {
        res.end("hyw主页系统！！!");
    } else {
        res.end(JSON.stringify({ code: 404, msg: "您访问的url地址非法或者不存在" }));
    }
});


/**
* 中间代理  鉴权等操作
* @param req
* @param res
  */
  const RequestHeaderProcessing = function (req,res){
  // 设置cors 允许客户端进行跨域
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  }

/**
* 权限检验
* @param req
* @param res
  */
  const CookieHandle = function (req,res,next){
  const cookie = req.headers.cookie || '';
  if(cookie){
  cookie.split(';').forEach((item,index) => {
  const arr = item.split('=')
  const key = arr[0].trim()
  if(index==0){
  req['connectSid'] = arr[1].trim()
  }else{
  req.cookie[key] = arr[1].trim()
  }
  })
  }
  }




/**
* 创建websocket服务
  */
  const wss = new WebSocketServer({ noServer: true });
  const wss2 = new WebSocketServer({ noServer: true });

/**
* http请求升级为socket
  */
  server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);
  try {
  if (pathname === '/hyw/socket/dev') {
  /**
  * 身份校验
    */

           // console.log("有用户想连接进来-IP地址为:", request.socket.remoteAddress)
           // let queryStr = parse(request.url).search;
           // queryStr = queryStr.slice(1);
           // let queryObj = queryStr.split("&").reduce((T, C) => {
           //     T[C.split("=")[0]] = C.split("=")[1]
           //     return T
           // }, {})
           // const { AAPID, token } = queryObj
           // if (AAPID != 'cxy') return console.log("APPID错误或不存在");
           // if (!token) return console.log("token不存在");
           //
           // let arr = [];
           // let mapProxy = _map.values()
           // let val = mapProxy.next().value;
           // while (val) {
           //     arr.push(val)
           //     val = mapProxy.next().value;
           // }
           // mapProxy = undefined;
           // val = undefined;
           // if (arr.findIndex(i => i == token) == -1) return console.log("token错误");
           // arr = undefined;


           /**
            * 创建了服务器，并且在内部调用了handleUpgrade方法，
            * 因此您需要通知WebSocket服务器忽略服务器启动部分，并继续使用现有资源，同时将选项指定为{ noServer: true }
            */
           wss.handleUpgrade(request, socket, head, function done(ws) {
               wss.emit('connection', ws, request);
           });
    } else if (pathname === '/hyw/prod') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
    wss2.emit('connection', ws, request);
    });
    } else {
    socket.write('HTTP/1.1 404 not find\r\n\r\n');
    socket.destroy();
    return;
    }
    } catch (e) {
    console.log("upgrade函数处理错误", e)
    }
    });


/**
* socket实例监听
  */
  wss.on('connection', function connection(ws, request) {
  clients.push({})
  console.log("用户连接成功!", request.socket.remoteAddress,request.cookie,request.cookies)
  ws.on('message', function message(data,a,b) {
  console.log('服务端接受到的消息:', data.toString());
  ws.send('Binary Message',data);
  });
  });

// 关闭未激活的
// const interval = setInterval(function ping() {
//     wss.clients.forEach(function each(ws) {
//         console.log(ws.isAlive)
//         // if (ws.isAlive === false) return ws.terminate();
//
//         // ws.isAlive = false;
//         // ws.ping();
//     });
// }, 1000);

wss.on('close', function close() {
clearInterval(interval);
});









/**
* 监听http服务端口
  */
  server.listen(8080, function listening() {
  console.log('服务器启动成功！');
  });
```


## client.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>原生后端</title>
</head>

<body>
    <div>
        <button class="btn1">发生指令</button>
        <button class="btn2"></button>
        <button class="btn3"></button>
        <button class="btn4"></button>

    </div>
</body>
<script>
    // Example POST method implementation:
    async function postData(url = '', data = {}) {
        try {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            // return response.body
            return response.json(); // parses JSON response into native JavaScript objects
        } catch (e) {
            console.log("fetch接口请求错误", e)
            return { msg: "请求失败！", code: 500 }
        }
    }
    // Example POST method implementation:
    function postAjax(url = '', data = {}) {
        return new Promise((resolve,reject)=>{
            console.log(url)
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (){
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data = xhr.responseText		// 接收响应信息
                    resolve(data)
                }
            }
            xhr.open('POST', url, true)
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')	// 设置Content-type
            xhr.send(JSON.stringify(data))   //发送请求到服务器
        })
    }




    class WebSocketProxy {
        constructor(arg) {
            this.url = arg.url;
            this.socket = undefined;
            this.messages = [];
            this.heartPollTime = 1000 * 30;
            this.heartTimer = undefined;


            this.create()
        }
        // 初始化创建
        create() {
            if (!WebSocket) {
                console.log('Sorry! Your browser doesn\'t support WebSocket')
                return
            }
            if (this.socket) {
                console.log('Connection already exist')
                console.log(this.socket)
                return
            }
            try {
                this.log(`create socket with url: ${this.url}`)
                this.socket = new WebSocket(this.url, 'echo-protocol')
                const self = this
                // 连接成功后的回调函数
                this.socket.onopen = function (e) {
                    console.log('socket连接成功!');
                }
                // 连接失败后的回调函数
                this.socket.onerror = function (e) {
                    console.log('socket连接失败!');
                    self.close();
                }
                // 连接关闭后的回调函数
                this.socket.onclose = function (e) {
                    console.log('socket连接已断开!');
                    self.close();
                }


                // 消息通知
                this.socket.addEventListener("message", function (e) {
                    self.messages.push(e.data)
                    console.log(777, e);
                    console.log('[WebSocketProxy] ' + e.data)
                })

                // 心跳机制
                this.heartTimer = setInterval(() => {
                    // this.socket.send(JSON.stringify({ "event": "HeartBeat" }))
                }, this.heartPollTime)

            } catch (err) {
                console.log(err)
                this.close()
            }
        }
        // socket日志打印
        log(msg) {
            const prefix = '[WebSocketProxy] '
            console.log(`${prefix}${msg}`)
        }
        // 关闭socket连接
        close() {
            if (!this.socket) {
                this.log('socket doesn\'t exist')
                return
            }
            this.socket.close()
            this.reStartHeartBit()
            this.socket = undefined
            this.log('socket close!')
        }
        // 重新启动心跳状态
        reStartHeartBit() {
            clearInterval(this.heartTimer)
            this.heartTimer = undefined
            setTimeout(() => {
                this.create()
            }, 1000);
        }
        // 发生数据
        send(data) {
            try {
                /**
                 * event 
                 *      broadcast    广播
                 *      groupChat
                 *      pointToPoint 点对点
                 * 
                 *      
                 * 在发送的二进制数据中携带一些东西
                 *  比如身份验证也可  一旦时间过期 用一个action 通知用户重连
                 * */
                let value = {
                    "event": "broadcast", data: { "name": "666" }
                };
                const blob = new Blob([JSON.stringify(value)], { type: 'text/plain' })
                // console.log(this.socket.readyState);
                this.socket.send(blob)
            } catch (e) {
                console.error('消息发送失败', e)
                this.close()
            }
        }
    }

    postAjax('http://127.0.0.1:8080/hyw/chat/login', { userName: 'cxy', userPassword: "123456" }).then(data => {
        console.log(data);
        data = JSON.parse(data)
        postAjax('http://127.0.0.1:8080/hyw/chat/info', { userName: 'cxy', userPassword: "123456" }).then(ddd => {
            console.log(ddd);
        })



        if (data.code == 200) {
            window.websocket = new WebSocketProxy({
                url: "ws://127.0.0.1:8080/hyw/socket/dev?AAPID=cxy&token=" + data.token
                // url: "ws://127.0.0.1:8080/hyw/socket/dev?AAPID=cxy&token="
            })
            console.log(window.websocket)
        }
    });



    document.querySelector('.btn1').addEventListener('click', function (e) {

        /**
         * 
         *  CONNECTING — 正在连接中，对应的值为 0；
            OPEN — 已经连接并且可以通讯，对应的值为 1；
            CLOSING — 连接正在关闭，对应的值为 2；
            CLOSED — 连接已关闭或者没有连接成功，对应的值为 3。
         * */
        console.log("当前socket所处于的状态", window.websocket.socket.readyState)
        window.websocket.send()
    })

    /**
     * todo
     * 解析出token 发送指令的时候都是要携带token的
     * 
     * 根据token分发到各个分组上
     * 
     * 
     * 
     * **/

    // postAjax('http://127.0.0.1:8080/login', { userName: 'cxy', userPassword: "123456" }).then(data => {
    //     postAjax('http://127.0.0.1:8080/info').then(res=>{
    //         console.log(res)
    //     })
    //     window.websocket = new WebSocketProxy({
    //         url: "ws://127.0.0.1:8080/hyw/socket/dev?AAPID=cxy&token="
    //     })
    // });
</script>

</html>
```

## utils.session.js
```js
const signature = require("./signature");
const uuid = require('uuid');

const options = {
    saveUninitialized: false,
    secret: '$CxyZrhZyw',
    HttpOnly:true,
    Expires:1000*60*30
}
const Sessions = {
    // "xxx":{
    //     views:0  // 访问次数
    // }
};
/**
 * 获取当前缓存的cookie
 */
const getSession = function (cookie){
    return Sessions[cookie];
}

/**
 * 设置cookie
 */
const setSession = function (req,opt){
    const { expires } = opt;
    let preStr = 'connect.sid=';
    let sessionId = signature.sign(uuid.v4(),options.secret);
    let suffixStr = '; Path=/; HttpOnly';
    Sessions[sessionId] = {
        view:1,
        expires
    }
    req.setHeader('Set-Cookie',preStr + sessionId + suffixStr)
}


/**
 * 检查session是否过期
 */
const checkSession = function (cookie){
    const session = Sessions[cookie];
    if(!session) return false;
    // 检查是否过过期
    const {expires,view} = session;
    if(expires){
        session.view++
        return Date.now() <= expires
    }else{
        delete Sessions[cookie]
        return false
    }
}


/**
 * session过期自检
 */
setInterval(()=>{
    console.log(Sessions);
},5000)

exports.getSession = getSession
exports.setSession = setSession
exports.checkSession = checkSession

```

## utils.signature.js
```js
/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */

exports.sign = function(val, secret){
    if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
    if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
    return  val + '.' + crypto
        .createHmac('sha256', secret)
        .update(val)
        .digest('base64')
        .replace(/\=+$/, '');
};

/**
 * Unsign and decode the given `val` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */

exports.unsign = function(val, secret){
    if ('string' != typeof val) throw new TypeError("Signed cookie string must be provided.");
    if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
    var str = val.slice(0, val.lastIndexOf('.'))
        , mac = exports.sign(str, secret);

    return sha1(mac) == sha1(val) ? str : false;
};

/**
 * Private
 */

function sha1(str){
    return crypto.createHash('sha1').update(str).digest('hex');
}

```