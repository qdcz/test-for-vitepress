# openssl

## 什么是openssl

SSL是Secure Sockets Layer（安全套接层协议）的缩写，可以在Internet上提供秘密性传输。Netscape公司在推出第一个Web浏览器的同时，提出了SSL协议标准。其目标是保证两个应用间通信的保密性和可靠性,可在服务器端和用户端同时实现支持。已经成为Internet上保密通讯的工业标准。

## 对称加密

...待补充

## 非对称加密（RSA）

非对称加密算法是需要两个密钥，即公钥和私钥。他们是一对，如果使用公钥进行对数据加密，只有对应的私钥才能解密。因为是使用加密和解密两种密钥，所以称为非对称加密。

**一般的工作原理是**
```
A和B之间要互相通信，需生成两个密钥对。A与B的私钥自己保存,A的公钥给B,B的公钥给A

在通信的时候:
A给B发消息 需要用B的公钥进行加密。B收到A的消息需要用自己的私钥进行解密。
B给A发消息 需要用A的公钥进行加密。A收到B的消息需要用自己的私钥进行解密。
```


**其中的数学原理:**
    在数学上有这样一个现象：给两个质数，很容易算出他们的乘积，但是给你一个很大的数，你很难分解出两个质数，让他们的乘积正好等于这个很大的数。
    具体自行google


**用途：** 加密关键性的、核心的机密数据

**优点**：算法复杂，安全性高。通信双方不需要通过建立一个安全信道来进行密钥的交换，密钥空间小，降低了密钥管理的难度

**缺点**：

- 加解密速度慢，不适合通信负荷较重的情况

- 客户端用自己的公钥加密数据发送到服务端，服务端无法断定是谁发送的；

- 用私钥加密的数据，任何知道公钥的人都能解密数据。


## 哈希函数

通过一个函数，把任意长度的数据转换为一个长度固定的数据串（通常用16进制的字符串表示）。
摘要（digest）：将长度不固定的消息作为输入，通过运行hash函数，生成固定长度的输出，这段输出就叫做摘要。

**常见的摘要算法 与 对应的输出位数如下：**
- MD5：128位
- SHA-1：160位
- SHA256 ：256位
- SHA512：512位

**用途**：检测消息或者密钥等信息对象中的任何微小的变化, 应用到数字签名中。还有一致性验证，安全访问认证等。

**优点**：单向加密算法，算法不可逆

**缺点**：可以通过碰撞法破解,
md5和sha256都是密码散列函数，加密不可逆。虽然都不能防止碰撞，但是相对而言，md5比较容易碰撞，安全性没有sha256高。


### MD5算法

md5是一种被广泛使用的密码散列函数，对于任意长度的消息，MD5都会产生一个128bit长的哈希值，称做消息摘要。

**[算法原理](https://www.jianshu.com/p/93a8ab5bfeb9)**

### SHA算法

SHA-1是一种密码散列函数，对于任意长度的消息，SHA-1都会产生一个160bit长的哈希值，称做消息摘要。

SHA256是一种密码散列函数，对于任意长度的消息，SHA256都会产生一个256bit长的哈希值，称做消息摘要。

SHA512是一种密码散列函数，对于任意长度的消息，SHA512都会产生一个512bit长的哈希值，称做消息摘要。

...

SHA家族的五个算法，分别是SHA-1、SHA-224、SHA-256、SHA-384，和SHA-512

**[算法原理](https://blog.csdn.net/qq_51473302/article/details/124851177)**

## 混合加密
因为对称加密速度快，但很难保证密钥传输的安全性，非对称加密加解最大的优点是事先不需要传输密钥，但速度慢，因此实际应用中，经常采取混合密码体制。
即同时使用对称密码和非对称密码的体制。假如A要向B传输数据，工作过程如下：

1. A选取一个随机数，做为对称加密的密钥，即会话密钥；
2. A用上面的会话密钥加密通信内容，再用B的公钥加密会话密钥后，一并发送给B;
3. B收到数据后，先用自己的私钥解密出会话密钥，然后用会话密钥解密出通信内容。

## 数字签名

> 数字签名（又称公钥数字签名）是只有信息的发送者才能产生的别人无法伪造的一段数字串，这段数字串同时也是对信息的发送者发送信息真实性的一个有效证明。它是一种类似写在纸上的普通的物理签名，但是在使用了公钥加密领域的技术来实现的，用于鉴别数字信息的方法。一套数字签名通常定义两种互补的运算，一个用于签名，另一个用于验证。
>


`数字签名` 综合使用了`消息摘要`和`非对称加密`技术，可以保证接受者能够核实发送者对报文的签名，发送者事后不抵赖报文的签名，接受者不能篡改报文内容和伪造对报文的签名。

将报文使用一定的HASH算法算出一个固定位数的摘要信息，然后用私钥将摘要加密，连同原来的报文一起，发送给接收者，接受者通过公钥将摘要解出来，也通过HASH算法算出报文摘要，如果两个摘要一致，说明数据未被篡改，数据是完整的。
因为接收者是使用公钥解出的数据，如果数据完整，证明发送数据的人持有私钥，就能证明发送者的身份，因此数字签名具有证明发送者身份和防篡改的功能。

发送报文时，发送方用一个哈希函数从报文文本中生成报文摘要，然后用发送方的私钥对这个摘要进行加密，这个加密后的摘要将作为报文的数字签名和报文一起发送给接收方，接收方首先用与发送方一样的哈希函数从接收到的原始报文中计算出报文摘要，接着再公钥来对报文附加的数字签名进行解密，如果这两个摘要相同、那么接收方就能确认该报文是发送方的。 [5] 
数字签名有两种功效：一是能确定消息确实是由发送方签名并发出来的，因为别人假冒不了发送方的签名。二是数字签名能确定消息的完整性。因为数字签名的特点是它代表了文件的特征，文件如果发生改变，数字摘要的值也将发生变化。不同的文件将得到不同的数字摘要。 一次数字签名涉及到一个哈希函数、接收者的公钥、发送方的私钥。 [5] 

**综合讲就是 散列 签名 验证**

### 获取公钥私钥

```shell
# 使用git自带的openssl生成私钥和公钥
openssl
# 颁发私钥  1024指私钥长度
> openssl genrsa -out rsa_private_key.pem 1024  
# 根据私钥生成公钥
> openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```
### **NodeJs示例代码:**

```js
const crypo = require('crypto');
const fs = require('fs');

const getPublicKey = function () {
    return fs.readFileSync("./ca/public.key", 'utf8');
}

const getPrivateKey = function () {
    return fs.readFileSync("./ca/private.key", 'utf8');
}


/**
 * 签名过程
 */
// 创建签名 返回sign对象
let sign = crypo.createSign('RSA-SHA256');
// 指定加密数据
sign.update('Hello, world');
// 用私钥对数据进行签名
let signature = sign.sign(getPrivateKey(), 'base64');
console.log("这是一串数字签名：", signature)



/**
 * 校验过程  验证签名是否有被篡改
 */
// 创建签名验证 返回verify对象
let verify = crypo.createVerify('RSA-SHA256');
// 指定需要被验证的数据
verify.update('Hello, world');
let verifyResult = verify.verify(getPublicKey(), signature, 'base64');
console.log("验证数据签名是否一致", verifyResult)
```

### 常见问题

- **在运行的时候如果遇到这种报错,需要将你在电脑安装的openssl程序给卸载调，然后也需要将openssl的环境变量给抹除**

```shell
Error: error:25078067:DSO support routines:win32_load:could not load the shared library
    at Sign.sign (internal/crypto/sig.js:110:29)
    at Object.sign (F:\xxxxx\Koa\node_modules\jwa\index.js:152:45)
    at Object.jwsSign [as sign] (F:\xxxxx\Koa\node_modules\jws\lib\sign-stream.js:32:24)
    at Object.module.exports [as sign] (F:\xxxxx\Koa\node_modules\jsonwebtoken\sign.js:204:16)
    at Object.<anonymous> (F:\xxxxx\Koa\jwt.js:4:17)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12) {
  opensslErrorStack: [
    'error:0E076071:configuration file routines:module_run:unknown module name',
    'error:0E07506E:configuration file routines:module_load_dso:error loading dso',
    'error:25070067:DSO support routines:DSO_load:could not load the shared library'
  ],
  library: 'DSO support routines',
  function: 'win32_load',
  reason: 'could not load the shared library',
  code: 'ERR_OSSL_DSO_COULD_NOT_LOAD_THE_SHARED_LIBRARY'
}

```

## 数字证书

由CA颁发给网站的身份证书，里面包含了该网站的公钥，有效时间，网站的地址，CA的数字签名等。
所谓的CA数字签名，实际上就是使用了CA的私钥将网站的公钥等信息进行了签名，当客户端请求服务器的时候，网站会把证书发给客户端，客户端首先可以通过CA的数字签名校验CA的身份，也能证明证书的真实完整性（之前说了，数字签名拥有证明身份和防篡改的功能）。

客户端有没有可能到一个假冒的CA去校验数字证书呢？不太可能，因为CA的地址是内嵌在浏览器中的，很难被篡改。

## ctypro模块

### [Hash算法]代码示例

```js
const crypto = require('crypto')
const hash = crypto.createHash('md5')

// 指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
let val = hash.digest('hex');
console.log(val)
```

### [Hmac算法（加盐）]代码示例
```js
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
let val = hmac.digest('hex')
console.log(val)
```

### [AES算法(对称加密)]代码示例

```js
var crypto = require('crypto');
//加密
function encrypt(str,secret){
    var cipher = crypto.createCipher('aes192',secret);  //
    var enc = cipher.update(str,'utf8','hex');
    enc += cipher.final('hex');
    return enc;
}

//解密
function decrypt(str,secret){
    var decipher = crypto.createDecipher('aes192',secret);
    var dec = decipher.update(str,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

var data = 'Hello, this is a secret message!'
var key = 'Password!'
var encrypted = encrypt(data, key)
var decrypted = decrypt(encrypted, key)

console.log('Plain text: ' + data)
console.log('Encrypted text: ' + encrypted)
console.log('Decrypted text: ' + decrypted)
```

### [RSA算法(非对称加密)]代码示例

```js
const fs = require('fs'), 
      crypto = require('crypto');

// 从文件加载key:
function loadKey(file) {
    // key实际上就是PEM编码的字符串:
    return fs.readFileSync(file, 'utf8');
}

let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

// 使用私钥加密:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));

// 使用公钥解密
let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));

// 使用公钥加密:
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

// 使用私钥解密:
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));
```
通过输出结果，我们可以看出，无论是私钥加密，公钥解密，还是公钥加密，私钥解密，解密后的消息都与原始消息相同。

### 数字签名-代码示例

如上 ：数字签名

### 椭圆曲线签名

椭圆曲线加密算法，即：Elliptic Curve Cryptography，简称ECC，是基于椭圆曲线数学理论实现的一种非对称加密算法。
相比RSA，ECC优势是可以使用更短的密钥，来实现与RSA相当或更高的安全。

原理
椭圆曲线加解密原理：
公开密钥算法总是要基于一个数学上的难题。比如RSA依据的是：给定两个素数p、q 很容易相乘得到n，而对n进行因式分解却相对困难。
那椭圆曲线上有什么难题呢？考虑如下等式：

K=kG [其中K,G为Ep(a,b)上的点，k为小于n（n是点G的阶）的整数]

给定k和G，根据加法法则，计算K很容易；但给定K和G，求k就相对困难了。这就是椭圆曲线加密算法采用的难题。

我们把点G称为基点（base point），k（k<n，n为基点G的阶）称为私有密钥（privte key），K称为公开密钥（public key)。

k = 2，K为G的2倍点;
k = 3，K为G的3倍点;
k = 4，K为G的4倍点;
…

如果给定椭圆曲线上K为G的一个倍点，如何计算K为G的多少倍？
直观上理解，正向计算一个倍点是容易的，反向计算一个点K是G的几倍点则困难的多。
因此在椭圆曲线算法中，将倍数k做为私钥，将K做为公钥。

椭圆曲线数字签名原理:椭圆曲线数字签名算法（ECDSA）是使用椭圆曲线密码（ECC）对数字签名算法（DSA）的模拟。

secp256k1曲线
比特币使用椭圆曲线算法生成公钥和私钥，选择的是secp256k1曲线。
具体使用过程是，先随机生成一个私钥，然后通过椭圆曲线加密算法（ECC）得到一个公钥，然后再使用椭圆曲线签名算法（ECDSA）和私钥结合进行签名

```js
const { randomBytes } = require('crypto');
const secp256k1 = require('secp256k1');
const ecdsa = require('ecdsa');

// 随机生成一个数, 作为通信内容
const data = randomBytes(32);
console.log(data);

// 随机产生一个私钥
let privKey
do {
  privKey = randomBytes(32);
  console.log(privKey);
} while (!secp256k1.privateKeyVerify(privKey));

// 根据私钥导出公钥
const pubKey = secp256k1.publicKeyCreate(privKey);
console.log(pubKey);

// 签名
const signature = ecdsa.sign(data, privKey);
console.log(sig);

// 验签
console.log(ecdsa.verify(data, signature, pubKey));//核查签名是否正确
// => true
```