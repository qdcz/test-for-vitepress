

# HTML知识点总结

## SEO优化

设置页面描述：

```html
<meta name="Description" content="网易是中国领先的互联网技术公司，为用户提供免费邮箱。。。。。。。。。网聚人的力量。" />
```

定义关键词：

```html
<meta name="Keywords" content="网易,邮箱,游戏,新闻,体育,娱乐,女性,亚运,论坛,短信" />
```

title也是有助于SEO搜索引擎优化的

```html
<title>洋盘</title>
```

## 块元素

```
p-段落,
table-表格
blockquote-引用
center-居中对齐
dir-目录列表
div-常用块级标签,
form-表单
h1-标题（6个级别）
hr-水平分割线
isindex- input prompt
menu-菜单列表
ol-排序列表
pre-格式化文本
ul-无序列表
```

## 内联元素

```
abbr-缩写
acronym-首字
b-粗体
big-大字体
br-换行
cite-引用
code-引用代码
dfn -定义字段
em-强调
i-斜体
img-图片
input-输入框
label-表格标签
q-行内引用
s-中划线
select-项目选择
small-小字体
span -常用内联容器，定义文本内区块,
strike-中划线
strong-粗体强调
sub -下标
sup-上标
a-锚点
```



## 杂知识点

### 主流浏览器内核私有属性 css 前缀？

```
 mozilla 内核 （firefox,flock 等）    -moz
 webkit  内核 （safari,chrome 等）   -webkit
 opera   内核 （opera 浏览器）        -o
 trident 内核 （ie 浏览器）           -ms
```

### 介绍一下你对浏览器内核的理解？

主要分成两部分：渲染引擎(Layout Engine或Rendering Engine)和JS引擎。

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。
JS引擎：解析和执行javascript来实现网页的动态效果。



### 不使用 border 画出1px高的线，在不同浏览器的Quirks mode和CSS Compat模式下都能保持同一效果

```css
<div style="height:1px;overflow:hidden;background:red"></div>
```



### HTML5 新增的表单元素有？

```
 datalist 规定输入域的选项列表，通过 option 创建！ 
 
 keygen 提供一种验证用户的可靠方法，密钥对生成器，私钥存于客户端，公钥发到服务器，用于之后验证客户端证书！
 
 output 元素用于不同类型的输出！
```

### 在 HTML5 中，哪个方法用于获得用户的当前位置？

```
 getCurrentPosition()
```



### 如何滚动位置图片懒加载

看外面的 `面试题demo` 文件夹的   1.

### 如何找到当前页面出现次数最多的HTML标签

```JS
let tags = [...document.querySelectorAll('*')].map(i => i = i.tagName).reduce((count, CurrentValue) => {
    count[CurrentValue] = count[CurrentValue] ? count[CurrentValue] + 1 : 1
    return count
}, {})
let result = Object.entries(tags).reduce((accumulator, currentValue, currentIndex, array) => {
    if (accumulator[1] <= array[currentIndex][1]) {
        accumulator = currentValue
    }
    return accumulator
})
console.log(result)
/*
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

reduce为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：
    accumulator 累计器
    currentValue 当前值
    currentIndex 当前索引
    array 数组

回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；
如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。
*/
console.warn(tags)
```



## 游览器按照最佳的相关规范

```html
<!DOCTYPE html> 
```

没加这个会产生怪异模式IE 



## element.dataset

属性返回元素的类名，作为DOMTokenList 对象。

classList 属性是只读的，但你可以使用add() 和 remove() 方法修改它

```

```

## contenteditable

是一个枚举属性，表示元素是否可被用户编辑。 如果可以，浏览器会修改元素的部件以允许编辑

```html
<div contenteditable="true">-- Write your own name here</div>
```

## canvas画布

```html
<canvas id="canvasss" width="150" height="150"></canvas>
```

```js
var canvas = document.getElementById('canvasss')
if (canvas.getContext){ 
  var ctx = canvas.getContext('2d');  // 创建画布上下文
  // 操作
} else {
  // 画布不存在的时候操作
}
```

### 绘制矩形

#### fillRect

绘制一个填充的矩形   fillRect(x, y, width, height)

#### strokeRect

绘制一个矩形的边框   strokeRect(x, y, width, height)

按物理渲染的边框应该是1px的

```js
ctx.strokeRect(20, 10, 160, 100); // 边框渲染会在9.5-10.5之间
ctx.strokeRect(10.5, 10.5, 160, 100); // 边框渲染会在10-11之间
```

#### clearRect

清除指定矩形区域，让清除部分完全透明。   clearRect(x, y, width, height)

### 绘制路径

#### 样式

##### lineWidth

是 Canvas 2D API 设置线段厚度的属性（即线段的宽度）。

值：        0、 负数、 Infinity和 NaN会被忽略。

```js
ctx.lineWidth = 15;
```

##### fillStyle 

是Canvas 2D API 使用内部方式描述颜色和样式的属性。默认值是 `#000` （黑色）

```js
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);
```

##### strokeStyle 

是 Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性。默认值是 `#000` (black)

```js
ctx.strokeStyle = "blue";
ctx.strokeRect(10, 10, 100, 100);
```

##### font

描述绘制文字时，当前字体样式的属性。 使用和 [CSS font](https://developer.mozilla.org/en-US/docs/Web/CSS/font) 规范相同的字符串值。

### canvas中的变换

#### translate(x,y)

通过在网格中移动 canvas 和 canvas 原点 x 水平方向、原点 y 垂直方向，添加平移变换的方法。

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.translate(50, 50);
ctx.fillRect(0,0,100,100);

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

在canvas中可以累加

```js
ctx.translate(50, 50);
ctx.translate(100, 100);   
ctx.fillRect(0,0,100,100);            //等价于    ctx.fillRect(150,150,100,100);
```

#### rotate(angle)

在变换矩阵中增加旋转的方法。角度变量表示一个顺时针旋转角度并且用弧度表示。

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.rotate(45 * Math.PI / 180);
ctx.fillRect(70,0,100,30);

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

在canvas中可以累加

```js
ctx.rotate(45 * Math.PI / 180);
ctx.rotate(45 * Math.PI / 180);        //等价于   ctx.rotate(90 * Math.PI / 180)
ctx.fillRect(0,0,100,100);           
```

#### scale(x,y)

根据 x 水平方向和 y 垂直方向，为canvas 单位添加缩放变换的方法。

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.scale(2, 2);
ctx.fillRect(10,10,10,10);

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

在canvas中可以累加

```js
ctx.scale(2, 2);
ctx.scale(2, 2);        //等价于   ctx.scale(4, 4)
ctx.fillRect(10,10,10,10);
```

### 引入图片，设置背景

#### drawImage

在Canvas上绘制图像。

```js
void ctx.drawImage(image, dx, dy);  // 图片源，在画布上的坐标X，在画布上的坐标Y
void ctx.drawImage(image, dx, dy, dWidth, dHeight);
// 图片源，在画布上的坐标X，在画布上的坐标Y      图片的宽度，图片的高度
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
// 图片源，裁剪图片大小的X坐标，裁剪图片大小的Y坐标   在画布上的坐标X，在画布上的坐标Y    图片的宽度，图片的高度
```

```js
var img = new Image()
img.src='aaa.png'
img.onload = function(){
    draw()
}
function draw(){
    ctx.drawImage(img,100,100,img.width,img.height)
}
```

#### createPattern

在canvas中设置背景

```js
CanvasPattern ctx.createPattern(image, repetition);
// 图片源，指定如何重复图像（repeat，repeat-x，repeat-y，no-repeat）
```

```js
var img = new Image()
img.src='aaa.png'
img.onload = function(){
    draw()
}
function draw(){
    var pattern = ctx.createPattern(img,'repeat')
    ctx.fillStyle = pattern  // 一般情况下都会将createPattern返回的对象作为fillStyle的值
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
```

### 获取画布像素点

#### getImageData

返回一个[`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为*(sx, sy)、*宽为*sw、*高为sh。

```js
let ImageData = ctx.getImageData(sx, sy, sw, sh);
sx // 将要被提取的图像数据矩形区域的左上角 x 坐标。
sy // 将要被提取的图像数据矩形区域的左上角 y 坐标。
sw // 将要被提取的图像数据矩形区域的宽度。
sh // 将要被提取的图像数据矩形区域的高度。
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.rect(10, 10, 100, 100);
ctx.fill();

console.log(ctx.getImageData(50, 50, 100, 100));
// ImageData { width: 100, height: 100, data: Uint8ClampedArray[40000] }
```

#### putImageData

将数据从已有的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象绘制到位图的方法

```js
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);

imageData // ImageData ，包含像素值的数组对象。

dx // 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
dy // 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
dirtyX 可选 // 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
dirtyY 可选 // 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
dirtyWidth 可选 // 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
dirtyHeight 可选 // 在源图像数据中，矩形区域的高度。默认是图像数据的高度。
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function putImageData(ctx, imageData, dx, dy,
    dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  var data = imageData.data;
  var height = imageData.height;
  var width = imageData.width;
  dirtyX = dirtyX || 0;
  dirtyY = dirtyY || 0;
  dirtyWidth = dirtyWidth !== undefined? dirtyWidth: width;
  dirtyHeight = dirtyHeight !== undefined? dirtyHeight: height;
  var limitBottom = dirtyY + dirtyHeight;
  var limitRight = dirtyX + dirtyWidth;
  for (var y = dirtyY; y < limitBottom; y++) {
    for (var x = dirtyX; x < limitRight; x++) {
      var pos = y * width + x;
      ctx.fillStyle = 'rgba(' + data[pos*4+0]
                        + ',' + data[pos*4+1]
                        + ',' + data[pos*4+2]
                        + ',' + (data[pos*4+3]/255) + ')';
      ctx.fillRect(x + dx, y + dy, 1, 1);
    }
  }
}

// Draw content onto the canvas
ctx.fillRect(0,0,100,100);
// Create an ImageData object from it
var imagedata = ctx.getImageData(0,0,100,100);
// use the putImageData function that illustrates how putImageData works
putImageData(ctx, imagedata, 150, 0, 50, 50, 25, 25);
```

#### createImageData

创建一个新的、空白的、指定大小的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象， 所有的像素在新对象中都是透明的。（默认都是0，0，0，0）

```js
ImageData ctx.createImageData(width, height);
ImageData ctx.createImageData(imagedata);

width // ImageData 新对象的宽度。
height // ImageData 新对象的高度。
imagedata // 从现有的 ImageData 对象中，复制一个和其宽度和高度相同的对象。图像自身不允许被复制
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.rect(10, 10, 100, 100);
ctx.fill();

console.log(ctx.createImageData(100, 100)); 
// ImageData { width: 100, height: 100, data: Uint8ClampedArray[40000] }
```

![image-20200112153200158](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200112153200158.png)

### 绘制文字

#### fillText

```js
void ctx.fillText(text, x, y [, maxWidth]);   //maxWidth 可选  绘制最大宽度
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "48px serif";
ctx.fillText("Hello world", 50, 100);
```

#### strokeText设置渐变

```js
void ctx.strokeText(text, x, y [, maxWidth]);
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
js
ctx.font = "48px serif";
ctx.strokeText("Hello world", 50, 100);
```

#### font

描述绘制文字时，当前字体样式的属性

```js
ctx.font = value;    //认字体是 10px sans-serif。
```

#### textAlign 

决定文字水平方向的对齐方式。

跟css的是不一样的

```js
ctx.textAlign = "left" || "right" || "center" || "start" || "end";

left  //文本左对齐。
right //文本右对齐。
center //文本居中对齐。
start //文本对齐界线开始的地方 （左对齐指本地从左向右，右对齐指本地从右向左）。
end //文本对齐界线结束的地方 （左对齐指本地从左向右，右对齐指本地从右向左）。
默认值是 start。
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";
ctx.textAlign = "left";
ctx.strokeText("Hello world", 0, 100);
```

#### textBaseline

决定文字垂直方向的对齐方式。

```js
ctx.textBaseline = "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";

top //文本基线在文本块的顶部。
hanging //文本基线是悬挂基线。
middle //文本基线在文本块的中间。
alphabetic //文本基线是标准的字母基线。
ideographic //文字基线是表意字基线；如果字符本身超出了alphabetic 基线，那么ideograhpic基线位置在字符本身的底部。
bottom //文本基线在文本块的底部。 与 ideographic 基线的区别在于 ideographic 基线不需要考虑下行字母。
默认值是 alphabetic。
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";
ctx.textBaseline = "hanging";
ctx.strokeText("Hello world", 0, 100);
```

#### measureText

返回一个关于被测量文本[`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics) 对象包含的信息（例如它的宽度）

```
ctx.measureText(text);
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var text = ctx.measureText("foo"); // TextMetrics object
text.width; // 16;
```



### 设置渐变

#### 线性：createLinearGradient

创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性 [`CanvasGradient`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasGradient)对象。

```js
CanvasGradient ctx.createLinearGrasdient(x0, y0, x1, y1);
// 起点X坐标，起点Y坐标，终点X坐标，终点Y坐标
```

```js
var gradient = ctx.createLinearGradient(0,0,200,0);
gradient.addColorStop(0,"green");
gradient.addColorStop(0.5,"yellow");
gradient.addColorStop(1,"red");
ctx.fillStyle = gradient;
ctx.fillRect(0,0,200,200);
```

#### 径向：createRadialGradient

根据参数确定两个圆的坐标，绘制放射性渐变的方法。这个方法返回 [`CanvasGradient`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasGradient)。

```js
CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
//开始圆的x坐标，开始圆的y坐标，开始圆的半径，   结束圆的x，结束圆的y，结束圆的半径
```

```js
var gradient = ctx.createRadialGradient(100,100,100,100,100,0);
gradient.addColorStop(0,"white");
gradient.addColorStop(1,"green");
ctx.fillStyle = gradient;
ctx.fillRect(0,0,200,200);
```



### 画布整理

```js
注意点
	1.canvas图像的渲染有别于html图像的渲染，canvas的渲染极快，不会出现代码覆盖后延迟渲染的问题，写canvas代码一定要具有同步思想
	2.在获职上下文时，一定要先判断，画布高宽的问题，画布默认高宽300*150，切记一定要使用htmI的attr ibute的形式来定义画布的宽高，通过css形式定义会缩放画布内的图像
	3.绘制矩形的问题
	    a.边框宽度的问题，边框宽度是在偏移量上下分别渲染-半，可能会出现小数边框，
	-旦出现小数边框都会向上取整
	    b. canvas的api只支持一种图像的直接渲染:矩形
 
        
画布的api：
     canvas.getcontext('2d')
     canvas.height
     canvas.width

画布的上下文api:
ctx. fillRect(x,y,W,h) :填充矩形
ctx. strokeRect(x, ymwmh) :带边框的矩形
ctx. fillstyle
ctx. strokeStyle
ctx. lineWidth
ctx. lineCap
ctx. lineJoin
ctx. moveTo(x,y):将画笔拾起点到x, y处
ctx. lineTo(x,y):将画笔移到x，y处
ctx.rect(x,y,w,h)
ctx.arc(x,y,r,degS ,degE,dir)
ctx.arcTo(x1,y1,x2,y2,r):2个坐标，一个半径
    结合moveTo(x,y)方法使用，
    x,y:起始点
    x1,y1:控制点
    x2,y2:结束点
ctx. quadraticCurveTo(x1,y1,X2,y2)
    结合moveTo(x,y)方法使用，
    x,y:起始点
    x1,y1:控制点
    x2,y2:结束点
    必须经过起点和终点
ctx. bezierCurveTo(x1, y1, x2, y2, x3, y3)
    结合moveTo(x,y)方法使用，
    x,y:起始点
    x1,y1:控制点
    x2,y2:控制点
    x3, y3:结束点
    必须经过起点和终点
ctx. beginpath() :清除路径容器
ctx. closepath() :闭合路径
    fill自动闭合
    stroke需要手动闭合
ctx. save( )
    将画布当前状态(样式相关变换相关)压入到样式栈中
ctx.restore()
    将样式栈中栈顶的元素弹到样式容器中
    图像最终渲染依赖于样式容器
    
ctx. translate(x,y) :将原点按当前坐标轴位移x，y个单位
ctx. rotate(弧度) :将坐标轴按顺时针方向进行旋转
ctx. scale(因子):
    放大:放大画布，画布中的一个CSS像素所占据的物理面积变大，画布中包含的Css像素的个数变少
画布中图像所包含的Css像素的个数不变
    缩小:缩小画布，画布中的一个CSS像素所占据的物理面积变小，画布中包含的Css像素的个数变多
画布中图像所包含的Css像素的个数不变
```

### 马赛克效果制作

用到的知识点：

#### getImageData

返回一个[`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为*(sx, sy)、*宽为*sw、*高为*sh。*

```js
ImageData ctx.getImageData(sx, sy, sw, sh);
sx  //将要被提取的图像数据矩形区域的左上角 x 坐标。
sy  //将要被提取的图像数据矩形区域的左上角 y 坐标。
sw  // 将要被提取的图像数据矩形区域的宽度。
sh  // 将要被提取的图像数据矩形区域的高度。

返回一个ImageData 对象，包含canvas给定的矩形图像数据。
```

#### createImageData

是 Canvas 2D API 创建一个新的、空白的、指定大小的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象。 所有的像素在新对象中都是透明的。

```js
ImageData ctx.createImageData(width, height);
ImageData ctx.createImageData(imagedata);

width	// ImageData 新对象的宽度。
height	// ImageData 新对象的高度。
imagedata	//从现有的 ImageData 对象中，复制一个和其宽度和高度相同的对象。图像自身不允许被复制。

返回：指定了宽度和高度的，新的 ImageData 对象。 新对象使用透明的像素进行填充。
```

#### putImageData

是 Canvas 2D API 将数据从已有的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。

```js
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);

imageData	// ImageData ，包含像素值的数组对象。
dx	//源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
dy	//源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
dirtyX 	//可选，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
dirtyY	//可选，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
dirtyWidth	//可选，在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
dirtyHeight	//可选，在源图像数据中，矩形区域的高度。默认是图像数据的高度。
```

![image-20200314112353237](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200314112353237.png)

### 刮刮卡效果

利用globalCompositeOperation 抠出来那个画出来的那个图像设置为透明嘛，然后就能看到这个画布下层的图片

### 设置图片/图像透明度

#### globalAlpha

是 Canvas 2D API 用来描述在canvas上绘图之前，设置图形和图片透明度的属性。 数值的范围从 0.0 （完全透明）到1.0 （完全不透明）。

```js
ctx.globalAlpha = value;
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.globalAlpha = 0.5;

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
```

![image-20200314130022086](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200314130022086.png)

#### globalCompositeOperation

属性设置要在绘制新形状时应用的合成操作的类型，其中type是用于标识要使用的合成或混合模式操作的字符串。

```
ctx.globalCompositeOperation = type;
type的12种类型见：https://developer.mozilla.org/enUS/docs/Web/API/Canvas_API/Tutorial/Compositing

常用的：
source：源
destination：目标
	source-over:(默认值)：源在上面，新的图像层级比较高
	source-in:只留下源与目标的重叠的部分（源的那一部分）
	source-out:只留下源超过目标的部分
	source-atop:砍掉源溢出的部分
	destination-over:目标在上面，旧的图像层级比较高
	destination-in:只留下源与目标的重叠部分（目标的那一部分）
	destination-out:只留下目标和超过源的部分
	destination-atop:砍掉目标溢出的部分
	
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.globalCompositeOperation = "xor";

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
```

![image-20200314130229860](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200314130229860.png)

### canvas固定写法：

```js
//固定写法
ctx.save()         //通过将当前状态放入栈中，保存 canvas 全部状态的方法。
ctx.beginPath()    //通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
ctx.restore()      //通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。
```

## clipboard API

**剪切板API**，提供了几个异步方法，用户访问剪切板

该属性暴露于全局对象`Navigator.clipboard`中

`read()`: 从剪切板读取数据

`readText()`: 从操作系统剪切板读取文本

`write()`: 写入任意数据至操作系统剪切板

`writeText()`: 写入文本数据至操作系统剪切板

如果你的应用依赖于electron，可以用electron自带的clipboard API

```
const clipboard = require('electron').clipboard;
clipboard.writeText('something string');
```

**提供的方法**：
`clipboard.readText([type])`: 以纯文本的形式从clipboard返回内容
`clipboard.writeText(text, [type])`: 以纯文本的形式向clipboard添加内容
`clipboard.readHtml([type])`: 返回clipboard中的标记内容
`clipboard.writeHtml(markup[, type])`: 向clipboard中添加标记内容
`clipboard.writeImage(image: NativeImage[, type])`: 向clipboard中写入image
`clipboard.readImage([type])`: 从clipboard中返回NativeImage内容
`clipboard.readRtf([type])`: 从clipboard中返回RTF内容
`clipboard.writeRtf(text[, type])`: 想clipboard中写入RTF格式的txt
`clipboard.clear([type])`: 清空clipboard中的内容
`clipboard.availabelFormats([type])`: 返回clipboard支持的格式数组
`clipboard.has(data[, type])`: 返回clipboard是否支持指定打data格式
`clipboard.read(data[, type])`: 读取clipboard的data
`clipboard.write(data[, type])`: 向clipboard中写入data

以上方法中的可选参数type的类型均为string

### 示例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.hover {
				cursor: pointer;
				background-color: skyblue;
				display: inline-block;
				padding: 10px;
				border-radius: 50px;
				user-select: none;
			}
		</style>
	</head>
	<body>
		<div class="datas">我是一段文本数据，请点击下面的按钮就可以直接复制我了</div>
		<div class="hover fn1">点击复制上面的文本到剪贴板</div>
		<div class="hover fn2">读取剪贴板内的内容</div>
	</body>
	<script>
		let datas = document.querySelector('.datas').innerText.toString()
		let fn1 = document.querySelector('.fn1')
		let fn2 = document.querySelector('.fn2')
		fn1.addEventListener('click', async () => {
			var res = await navigator.clipboard.writeText(datas)
			alert('文本已复制到剪贴板')
		})
		fn2.addEventListener('click',async()=>{
			var res = await navigator.clipboard.readText()
			console.log(res)
		})
	</script>
</html>
```

# DOM

## 节点

- 整个文档是一个文档节点
- 每个 HTML 元素是元素节点
- HTML 元素内的文本是文本节点
- 每个 HTML 属性是属性节点
- 注释是注释节点

## nodeType 属性

| 元素类型 | NodeType |
| :------- | :------- |
| 元素     | 1        |
| 属性     | 2        |
| 文本     | 3        |
| 注释     | 8        |
| 文档     | 9        |

## 修改 HTML 内容

```js
document.getElementById("p1").innerHTML="新文本!";
document.getElementById("p1").innerText="新文本!";
document.getElementById("p2").style.color="blue";
document.getElementById("p2").style.fontFamily="Arial";
document.getElementById("p2").style.fontSize="larger";
```

## dom方法

| 方法                     | 描述                                                         |
| :----------------------- | :----------------------------------------------------------- |
| getElementById()         | 返回带有指定 ID 的元素。                                     |
| getElementsByTagName()   | 返回包含带有指定标签名称的所有元素的节点列表（集合/节点数组）。 |
| getElementsByClassName() | 返回包含带有指定类名的所有元素的节点列表。                   |
| appendChild()            | 把新的子节点添加到指定节点。                                 |
| removeChild()            | 删除子节点。                                                 |
| replaceChild()           | 替换子节点。                                                 |
| insertBefore()           | 在指定的子节点前面插入新的子节点。                           |
| createAttribute()        | 创建属性节点。                                               |
| createElement()          | 创建元素节点。                                               |
| createTextNode()         | 创建文本节点。                                               |
| getAttribute()           | 返回指定的属性值。                                           |
| setAttribute()           | 把指定属性设置或修改为指定的值。                             |

## HTMLCollection 与 NodeList 的区别

```
1.NodeList			伪数组,有forEach方法。
2.HTMLCollection	伪数组,没有forEach方法。
```

```
1.HTMLCollection：	html元素的合集，可以通过id、name或索引获取元素
2.NodeList：	 		文档节点的集合，只能通过索引获。
```

```js
node.childNodes 	结果返回类型是 NodeList，
node.children 		结果返回类型是 HTMLCollection 
.getElementsByXXX 	结果返回类型是HTMLCollection
.querySelectorAll 	返回的是 NodeList
```

注意：**querySelectorAll方法返回的NodeList，是静态的，不会随着文档节点的增添而改变。**其他返回的都是动态合集

## 事件

### 鼠标事件移入移动移出顺序

- `mouseover` >>> `mouseenter` >>> `mousemove`(`多次触发`) >>> `mouseout` >>> `mouseleave`

mouseover/mouseout      有冒泡

mouseenter/mouseleave  无冒泡

### onload 和 onunload 事件

当用户进入或离开页面时，会触发 onload 和 onunload 事件。

onload 事件可用于检查访客的浏览器类型和版本，以便基于这些信息来加载不同版本的网页。

onload 和 onunload 事件可用于处理 cookies。

```html
<body onload="checkCookies()">
```

### onchange 事件

## 事件监听器

### addEventListener

第一个参数是事件的类型 (如 "click" 或 "mousedown").

第二个参数是事件触发后调用的函数。

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参可选。默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

### removeEventListener()

### 冒泡捕获

事件点击 是先捕获进去，然后冒泡出来的


# HTML5

```
 ☞HTML5属于上一代HTML的新迭代语言，设计HTML5最主要的目的是为了在移动设备上支持多媒体！！！
   例如： video 标签和 audio 及 canvas 标记
 
 ☞ 新特性：
	  1. 取消了过时的显示效果标记  <font></font> 和 <center></center> ...
	  2. 新表单元素引入
	  3. 新语义标签的引入  
	  4. canvas标签（图形设计）
	  5. 本地数据库（本地存储）
	  6. 一些API
 ☞ 好处：
	  1. 跨平台
	  	  例如：比如你开发了一款HTML5的游戏，你可以很轻易地移植到UC的开放平台、Opera的游戏中心、Facebook应用平台，甚至可以通过封装的技术发放到App Store或Google Play上，所以它的跨平台性非常强大，这也是大多数人对HTML5有兴趣的主要原因。

 ☞ 缺点：
	  1. pc端浏览器支持不是特别友好，造成用户体验不佳
```

## 新语义标签

网页布局结构标签及兼容处理

```
  头部标签：<header></header>
  尾部标签: <footer></footer>
  内容标签：<article></article>
  侧边栏标签:<aside></aside>
  导航标签：<nav></nav>
  块级标签：<section></section>
  ....
  它们都是带语义的div
  语义化标签在IE8及以下不兼容，需做兼容处理
  第一种：document.createElement("nav");标签为行级元素，需display:block;设置为块级元素。
  缺点：每个标签都需要创建一次。
  第二种：引入js插件html5shiv.js(自己写也可以）
  缺点：在除IE8以下的浏览器多此一举，多一次请求。
  第三种：条件hack
  <!--[if lte IE 8]>
     js脚本
  <![endif]-->  针对条件加载
```

## 多媒体标签及属性介绍

```
 ☞ <video></video> 视频
	  属性：controls 显示控制栏
	  属性：autoplay 自动播放(Chrome默认禁用此功能,加muted可实现自动静音播放）	
	  属性：loop  设置循环播放
 ☞ <audio></audio>  音频
	  属性：controls 显示控制栏
	  属性：autoplay 自动播放	(Chrome默认禁用此功能）
	  属性：loop  设置循环播放
 ☞ video标签支持的格式    http://www.w3school.com.cn/html5/html_5_video.asp
 ☞ 多媒体标签在网页中的兼容效果方式

	 <video>
		<source src="trailer.mp4">
		<source src="trailer.ogg">
		<source src="trailer.WebM">
	</video>
```

## 智能表单控件

```
<input  type="email">
 email: 输入合法的邮箱地址
 url：  输入合法的网址
 number： 只能输入数字
 range： 滑块
 color： 拾色器
 date： 显示日期
 month：显示月份
 week ：显示第几周
 time：显示时间
 tel: 手机号码
 search: 搜索框
```

## 表单属性

```
 ◆form属性：	
	autocomplete=on | off          自动完成 输入记录是否显示
	novalidate=true | false        是否关闭校验 表单校验 如检查email格式

  ◆ input属性：
    *autofocus  ： 自动获取输入框焦点
    form：		
    list：如图
    multiple：	 实现多选文件
    *placeholder ： 占位符  （提示信息）
    *required：    必填项
    表单域外的提交 给输入框加个form属性值为表单id即可
    <form action="index.html" method="get" id="test">
         用户名：<input type="text" name="username" value="" required>
                 <input type="submit" name="" value="提交">
     </form>
    <input type="text" name="uname" form="test"
	◆ 如何修改表单控件中的默认提示信息 
		 1. 表单验证触发oninvalid事件
		 2. 通过setCustomValidity方法设置修改内容
```

## datalist

```html
 <form class="" action="index.html" method="post">
     <input type="text" list="test"/>
     <datalist id="test">
        <option value="鞋子">约有30783个商品</option>
        <option value="上衣">约有30783个商品</option>
        <option value="裤子">约有30783个商品</option>
        <option value="家电">约有30783个商品</option>
      </datalist>
</form>
```

![效果展示](https://img-blog.csdn.net/20180731162441973?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDQ4NTk3Mg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## classList

```javascript
  ☞ Dom.classList.add("类名"): 给当前dom元素添加类样式

  ☞ Dom.classList.remove("类名"); 给当前dom元素移除类样式

  ☞ classList.contains("类名"); 检测是否包含类样式

  ☞ classList.toggle("active");  切换类样式（有就删除，没有就添加）
```

```
document.querySelector("选择器")；
document.querySelectorAll("选择器");
```

## data-自定义属性名

```js
<div class='c' data-iii='666'/>

let str = document.querySelector(".c")
str.dataset.dataiii = '1960-10-03';
```

## 文件读取

```js
  ☞  FileReader
	  FileReader			 接口有3个用来读取文件方法返回结果在result中
	  readAsBinaryString    ---将文件读取为二进制编码
	  readAsText		   ---将文件读取为文本
	  readAsDataURL		   ---将文件读取为DataURL

 ☞  FileReader 提供的事件模型
	 onabort	    中断时触发
     onerror	    出错时触发
     onload	    文件读取成功完成时触发
     onloadend	读取完成触发，无论成功或失败
     onloadstart	读取开始时触发
     onprogress	读取中

 ☞ 小案例
 let oInput = document.querySelector("input");
  oInput.onchange = function(){
    //获取文件
    let file = this.files[0];
    //创建读取器
    let reader = new FileReader();
    //开始读取
    reader.readAsText(file);
    reader.onload = function(){
      console.log(reader.result);
    }
  }
```

## 获取网络状态

```js
  ☞ 获取当前网络状态
		 window.navigator.onLine 返回一个布尔值

  ☞ 网络状态事件(需要触发)
		 1. window.ononline
		 2. window.onoffline
```

## 获取地理定位

```
  ☞  获取一次当前位置
	  window.navigator.geolocation.getCurrentPosition(success,error);

	   1. coords.latitude   维度
       2. coords.longitude   经度

  ☞  实时获取当前位置
  	  window.navigator.geolocation.watchPosition(success,error);
```

## 本地存储

```
   ☞发展：
      随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出解决方案，使用sessionStorage和localStorage存储数据。 

    ☞  localStorage：
    	1. 永久生效
        2. 多窗口共享
        3. 容量大约为20M
        
        ◆window.localStorage.setItem(key,value)  设置存储内容
        ◆window.localStorage.getItem(key)  		 获取内容
        ◆window.localStorage.removeItem(key)	 删除内容
        ◆window.localStorage.clear()			清空内容
        
    ☞ sessionStorage：
		  1. 生命周期为关闭当前浏览器窗口
           2. 可以在同一个窗口下访问
           3. 数据大小为5M左右
           
         ◆window.sessionStorage.setItem(key,value)
		◆window.sessionStorage.getItem(key)
		◆window.sessionStorage.removeItem(key)
		◆window.sessionStorage.clear()
```

## 操作多媒体

```
http://www.w3school.com.cn/html5/html5_ref_audio_video_dom.asp
1
```

## Canvas画布

绘图工具

```
  ☞ 设置画布大小： 默认大小300x150 必须使用内联方式设置画布，通过其他方式，实际绘图区域大小仍为300x150，会有失真效果。
  ☞ 解决画布重绘问题
  	   1. 设置一次描边 ctx.stroke()
       2. 开启新的图层 ctx.beginPath();
1234
```

绘图方法
let canvas = document.querySelector(“canvas”);
let ctx = canvas.getContext(“2d”);
ctx.moveTo(100,200);
ctx.lineTo(500,300);
ctx.stroke();

```
ctx.moveTo(x,y)    落笔
ctx.lineTo(x,y)    连线
ctx.stroke()	   描边

ctx.beginPath()；   开启新的图层

颜色： strokeStyle="值"
线宽： lineWidth="值"   备注：不需要带单位

线连接方式：   lineJoin: round | bevel | miter (默认)

线帽（线两端的结束方式）：  lineCap: butt(默认值) | round | square 

闭合路径： ctx.closePath()

```

渐变方案

```
  ☞ 线性渐变
  	 var grd=ctx.createLinearGradient(x0,y0,x1,y1);
  	 	  x0-->渐变开始的x坐标
          y0-->渐变开始的y坐标
          x1-->渐变结束的x坐标
          y1-->渐变结束的y坐标
          
      grd.addColorStop(0,"black");      设置渐变的开始颜色
      grd.addColorStop(0.1,"yellow");   设置渐变的中间颜色
      grd.addColorStop(1,"red");        设置渐变的结束颜色

  	  ctx.strokeStyle=grd;
      ctx.stroke();
      
      备注：
         addColorStop(offse,color);
         中渐变的开始位置和结束位置介于0-1之间，0代表开始，1代表结束。中间可以设置任何小数
         
  ☞ 径向渐变
  
  	        ctx.createradialGradient(x0,y0,r0,x1,y1,r1);

            (x0,y0)：渐变的开始圆的 x,y 坐标

            r0：开始圆的半径

            (x1,y1)：渐变的结束圆的 x,y 坐标

            r1：结束圆的半径

```

填充效果

```
  ctx.fill();	      设置填充效果
  ctx.fillstyle="值"; 设置填充颜色
12
```

非零环绕原则

```
 ☞ 绘制一个如下图形
 里面图形顺时针，外面图形逆时针绘图


 ☞ 非零环绕原则：
	  1. 任意找一点，越简单越好
	  2. 以点为圆心，绘制一条射线，越简单越好（相交的边越少越好）
	  3. 以射线为半径顺时针旋转，相交的边同向记为+1，反方向记为-1，如果相加的区域等于0，则不填充。
	  4. 非零区域填充

```

绘制虚线

```
	原理：

     设置虚线其实就是设置实线与空白部分直接的距离,利用数组描述其中的关系

     例如： [10,10]  实线部分10px 空白部分10px

     例如： [10,5]  实线部分10px 空白部分5px

     例如： [10,5,20]  实线部分10px  空白5px  实线20px  空白部分10px 实线5px 空白20px....

    绘制：
     ctx.setLineDash(数组);
     ctx.stroke();
     
     例如：（需要开启新的图层）
         ctx.beginPath();
     	 ctx.moveTo(100, 100);
	 	 ctx.lineTo(300, 100);
	 	 ctx.setLineDash([2,4]);
	 	 ctx.stroke();

    注意：
        如果要将虚线改为实线，只要将数组改为空数组即可。

```

绘制动画效果

```
   ☞ 绘制一个描边矩形： content.strokeRect(x,y,width,height) 
   ☞ 绘制一个填充矩形： content.fillRect(x,y,width,height)  
   ☞ 清除：		   content.clearRect(x,y,width,height)  

   

   ☞ 实现动画效果： 
   	      1. 先清屏
   	      2. 绘制图形
   	      3. 处理变量
12345678910
```

绘制文本

```
  ☞ 绘制填充文本
  	  content.fillText(文本的内容,x,y)
  
  ☞ 绘制镂空文本
  	   content.strokeText();
  	   
  ☞ 设置文字大小：
  	   content.font="20px 微软雅黑"
  	   备注： 该属性设置文字大小，必须按照cssfont属性的方式设置
  	   
  ☞ 文字水平对齐方式【文字在圆心点位置的对齐方式】
  		content.textalign="left | right | center"
  
  ☞文字垂直对齐方式
  		 content.textBaseline="top | middle | bottom | alphabetic(默认)"
  
  ☞文字阴影效果
  		 ctx.shadowColor="red";  设置文字阴影的颜色

         ctx.ShadowOffsetX=值;   设置文字阴影的水平偏移量

         ctx.shadowOffsetY=值;   设置文字阴影的垂直偏移量

         ctx.shadowBlur=值;      设置文字阴影的模糊度

```

绘制图片

```
  ☞    
      //将图片绘制到画布的指定位置
     content.drawImage(图片对象,x,y);

  ☞ 
  	 //将图片绘制到指定区域大小的位置  x,y指的是矩形区域的位置，width和height指的是矩形区域的大小
     content.drawImage(图片对象,x,y,width,height);
     
  ☞ 
  	 //将图片的指定区域绘制到指定矩形区域内
     content.drawImage(图片对象,sx,sy,swidth,sheight,dx,dy,dwidth,dheight);
     
     sx,sy 指的是要从图片哪块区域开始绘制，swidth，sheight 是值 截取图片区域的大小
     dx,dy 是指矩形区域的位置，dwidth,dheight是值矩形区域的大小



   ☞ 
   	  解决图片绘制到某一个区域的按原比例缩放绘制：
        绘制宽：绘制高==原始宽：原始高

```

绘制圆弧

```
   ☞
   	 content.arc(x,y,radius,startradian,endradian[,direct]);
   	 
   	   		x,y    圆心的坐标

             radius 半径

             startradian   开始弧度

             endradian     结束弧度
        
             direct        方向（默认顺时针 false）   true 代表逆时针
             
   ☞ 0度角在哪？
		  以圆心为中心向右为0角 顺时针为正，逆时针为负
             
   ☞ 备注：
   	    角度 和 弧度的关系： 角度:弧度= 180:pi
   	    
   	     特殊值

           0度 = 0弧度

           30度 = π/6   (180度的六分之一)

           45度 = π/4   

           60度 = π/3

           90度 = π/2

           180度 = π

           360度 = 2π

           

    ☞ 绘制圆上任意点：	
    	公式：
           x=ox+r*cos( 弧度 )

           y=oy+r*sin( 弧度 )



         ox: 圆心的横坐标

         oy: 圆心的纵坐标

         r： 圆的半径

```

平移【坐标系圆点的平移】

```
ctx.translate(x,y);

   特点：
      通过该方法可以将原点的位置进行重新设置。

   注意：
       1. translate(x,y) 中不能设置一个值

       2. 与moveTo(x,y) 的区别：

            moveTo(x,y) 指的是将画笔的落笔点的位置改变，而坐标系中的原点位置并没有发生改变

            translate(x,y) 是将坐标系中的原点位置发生改变

```

旋转【坐标系旋转】

```
ctx.rotate(弧度)
1
```

伸缩

```
  ctx.scale(x,y)
    
       备注：
           沿着x轴和y轴缩放
    
           x,y 为倍数  例如： 0.5  1
```