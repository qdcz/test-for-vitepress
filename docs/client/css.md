# 多列布局（分栏布局）

## 栏目宽度

column-width指定每一栏的宽度（这是多列布局的第一种分法）



## 栏目列数

column-count指定要多少栏（这是多列布局的第二种分法）



## 栏目距离

column-gap



## 栏目间隔线

column-rule

















## column

```css
columns: column-width column-count;
```



### column-count

column-count属性指定某个元素应分为的列数

```css
column-count: number|auto;
/*
	number		列的最佳数目将其中的元素的内容无法流出
	auto		列数将取决于其他属性，例如："column-width"
*/
```



### column-fill

column-fill属性指定如何填充列

```css
column-fill: balance|auto;
```



### column-gap

column-gap的属性指定的列之间的差距

```css
column-gap: length|normal;
```



### column-width

每一列的宽度

```css
column-width:100px;
```



### column-rule

下面三列东西的整合



### column-rule-width

column-rule-width属性指定列之间的宽度规则

```css
column-rule-width: thin|medium|thick|length;

/*
	thin		指定一个细边框的规则
	medium		定义一个中等边框规则
	thick		指定一个粗边框的规则
	length		指定宽度的规则
*/

column-rule-width: 1px;
column-rule-width: thin;
```



### column-rule-style

column-rule-style属性指定列之间的样式规则

```css
column-rule-style: none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset;
```

| 值     | 描述                                             |
| :----- | :----------------------------------------------- |
| none   | 定义没有规则。                                   |
| hidden | 定义隐藏规则。                                   |
| dotted | 定义点状规则。                                   |
| dashed | 定义虚线规则。                                   |
| solid  | 定义实线规则。                                   |
| double | 定义双线规则。                                   |
| groove | 定义 3D grooved 规则。该效果取决于宽度和颜色值。 |
| ridge  | 定义 3D ridged 规则。该效果取决于宽度和颜色值。  |
| inset  | 定义 3D inset 规则。该效果取决于宽度和颜色值。   |
| outset | 定义 3D outset 规则。该效果取决于宽度和颜色值。  |



### column-rule-color 

column-rule-color属性指定列之间的颜色规则

```css
column-rule-color: color;
```



### column-span

column-span属性指定某个元素应该跨越多少列。

```css
column-span: 1|all;

/*
	1		元素应跨越一列
	all		该元素应该跨越所有列
*/
```

# 响应式布局



## 媒体选择器（核心）

### 媒体类型

```
all              所有媒体
braille          盲文触觉设备
embossed         盲文打印机
print            手持设备
projection       打印预览
screen           彩色屏幕
speech           “听觉”类似的媒体设备
tty               不适用像素的设备
tv                电视
```

```css
监听游览器的窗口的尺寸
@media screen and (width:800px){
    
}
```

### 媒体属性（特性）

```
width:游览器窗口的尺寸（min max）
        min-width：800px    >=800px
        max-width：800px    <=800px
        
device-width:设备独立像素（min max）
        pc端：分辨率
        移动端：具体看机器的参数
        
-webkit-device-pixel-ratio:
        pc端：1
        移动端：具体看机器参数
        -webkit-min-device-pixel-ratio
        -webkit-max-device-pixel-ratio
orientation：portrait   ：竖屏
orientation：landscape：横屏
min-device-pixel-ratio：像素比
```



### 关键字

```css
and  连接媒体特性

(,)   只要满足其中一条规则就执行
@media only screen and(min-width:800px),(orientation:landscape){
            border:100px solid;
     }
 
not  排除指定媒体类型(和游览器兼容有关)
 
only 指定某种特定的媒体类型(和游览器兼容有关)
     老版本的游览器只支持媒体类型，不支持带媒体属性的查询

     only:事例
     @media screen and(min-width:800px){
            border:100px solid;
     }
老版本会解析@media screen{border:100px solid;}  这样媒体属性查询就失效了
解决：@media only screen and(min-width:800px){
            border:100px solid;
     }

```

## 媒体查询案例

```css
<img src="image.jpg"
     data-src-600px="image-600px.jpg"
     data-src-800px="image-800px.jpg"
     alt="">
     
     @media (min-device-width:600px) {
    img[data-src-600px] {
        content: attr(data-src-600px, url);
    }
}

@media (min-device-width:800px) {
    img[data-src-800px] {
        content: attr(data-src-800px, url);
    }
}
```

# CSS媒体类

## @support

@support主要是用于检测浏览器是否支持CSS的某个属性，其实就是条件判断，如果支持某个属性，你可以写一套样式，如果不支持某个属性，你也可以提供另外一套样式作为替补

不是所有的浏览器以及其所有的版本都是支持@support

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			/* 如果浏览器支持display:flex属性的话，那么这块内的代码会执行 */
			@supports(display: flex) {
				.box{
					height: 100px;
					width: 100px;
					border: #009998 solid 1px;
				}
			}
			
			/* 如果浏览器 不支持display:flex属性的话，那么这块内的代码会执行 */
			@supports not (display: flex) {
				.box{
					height: 100px;
					width: 100px;
					border: #009998 solid 10px;
				}
			}
			
			/* 如果浏览器支持display:flex属性 且 支持box-shadow的话，那么这块内的代码会执行 */
			@supports  (display: flex) and (box-shadow: 2px 2px 2px black){
				.box{
					height: 100px;
					width: 100px;
					border: #009998 solid 10px;
				}
			}
			
			/* 如果浏览器支持display:flex属性 或 支持box-shadow的话，那么这块内的代码会执行 */
			@supports  (display: flex) or (box-shadow: 2px 2px 2px black){
				.box{
					height: 100px;
					width: 100px;
					border: #009998 solid 10px;
				}
			}
		</style>
	</head>
	<body>
		<div class="box">1</div>
	</body>
</html>
```

## @document 

```css
@document url(http://www.w3.org/),
          url-prefix(http://www.w3.org/Style/),
          domain(mozilla.org),
          regexp("https:.*")
{
  /* 该条CSS规则会应用在下面的网页:
     + URL为"http://www.w3.org/"的页面.
     + 任何URL以"http://www.w3.org/Style/"开头的网页
     + 任何主机名为"mozilla.org"或者主机名以".mozilla.org"结尾的网页     
     + 任何URL以"https:"开头的网页 */

  /* 让上述网页变得超级丑 */
  body {
    color: purple;
    background: yellow;
  }
}
```

## @import

### 语法

```css
@import url;
@import url list-of-media-queries;

url			是一个表示要引入资源位置的 <string> 或者 <uri> 。 这个 URL 可以是绝对路径或者相对路径。 要注意的是这个 URL 不需要指明一个文件； 可以只指明包名，然后合适的文件会被自动选择
list-of-media-queries			是一个逗号分隔的 媒体查询 条件列表，决定通过URL引入的 CSS 规则 在什么条件下应用。如果浏览器不支持列表中的任何一条媒体查询条件，就不会引入URL指明的CSS文件。
```

### 示例

```css
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import 'custom.css';
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url('landscape.css') screen and (orientation:landscape);
```

## @media

后面补



## 动画Animation

### animation-name

```css
animation-name:move
@keyframes move{
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(180deg);
    }
}
```

### animation-duration

动画播放的时长

```css
animation-duration:1s
```

### animation-timing-function

CSS动画在每一动画周期中执行的节奏（对比 于 帧数的0% 10% 100%）

```css
默认效果：由慢变快再变慢
linear:线性过渡，等同于贝塞尔曲线（0,0,1,1）
ease:平滑过渡，等同于贝塞尔曲线（0.25,0.1,0.25,1.0）
ease-in:由慢到快，等同于贝塞尔曲线（0.42,0,1,1）
ease-out:由快到慢，等同于贝塞尔曲线（0,0,0.58,1）
ease-in-out:由慢到快再到慢，等同于贝塞尔曲线（0.42,0,0.58,1）
cubic-bezier(1,1,2,3)
step
```

#### step

steps(n, start/end)

start表示一开始就越阶，（0%的那个阶段没有执行到）

​     就是start看不到第一帧

end表示每个阶段完成后才越阶，（0%的那个阶段就有执行到）

​     就是end看不到最后一帧

![1569638984995](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1569638984995.png)

###  animation-delay

定义动画开始前等待的时间

```css
 animation-delay:1s
```

### animation-iteration-count

定义了动画执行的次数

```css
animation-iteration-count:3
animation-iteration-count:infinite   // 无限循环
```

###  animation-direction

定义了动画帧数执行的方向    (动画结束之后会返回最原来的位置)   

normal     默认属性     from到to   每个动画循环结束，动画重置到起点重新开始，

reverse     反向执行     to到from   每个动画循环结束，动画重置到起点重新开始，

alternate                       from到to  to到from  from到to循环交替

alternate-reverse        to到from   from到to  to到from循环交替

### animation-fill-mode

定义动画在动画外的状态

动画结束之后会返回最原来的位置     animation-fill-mode控制结束之后 以帧数的哪个状态保存

backwards    动画开始的位置与from保持一致

forwards       动画结束的位置与to的状态保持一致

both               backwards和forwards的结合 

```css
 animation-direction:backwards
```

### animation-play-state

定义动画的暂停开始

```css
animation-play-state:running
animation-play-state:paused
```

### 动画帧

关键帧控制的是整个动画的周期

animation-iteration-count控制的动画中的每一帧

```css
animation-name:move
@keyframes move{
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(180deg);
    }
}
```

### 动画的坑

```css
/* 注意事项 span是内联元素 只有块元素才配拥有动画 */
position: relative;  // 改变BFc
animation: move 0.8s linear infinite alternate;
```

## BFC

浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。

```
BFC是一个独立的布局环境，在这个环境中按照一定规则进行布局，并且不会影响其它环境中的布局，BFC中的元素布局不受外部影响。

创建BFC的条件：

（1）根元素或包含根元素的元素
（2）浮动元素float＝left|right或inherit（≠none）
（3）绝对定位元素position＝absolute或fixed
（4）display＝inline-block|flex|inline-flex|table-cell或table-caption
（5）overflow＝hidden|auto或scroll(≠visible)
```



#### BFC布局规则

1.内部的box会在垂直方向一个一个接着排放，块级元素

2.开启BFC的区域不会和浮动的盒子发生重叠

​     eg：解决图片文字环绕

3.内部的box垂直方向的距离由margin决定，同一个BFC的两个相邻的Box的margin会发生重叠

​     特殊解决：开启border：1px   solod  red； 开启边框也可以

4.计算BFC的高度时，浮动元素也参与计算（清除浮动，haslayout）

​     清除浮动：让浮动的子元素撑开父级元素的高度

## haslayout

对于早期的IE显示引擎来说，如果所有元素都“拥有布局”的话，会导致很大的性能问题。因此IE开发团队决定使用布局概念来减少游览器的性能开销，即只将布局应用于实际需要的那些元素，所以便出现了“拥有布局”和“没有拥有布局”两种情况

#### 拥有默认拥有布局的元素

```
html,body,table,tr,td,img,hr,input,select,textarea,button,iframe,embed,object,applet,marquee
```

#### 怎么触发haslayout

```
float:left或right
display:inline-block
position:absolute
width:除auto外任何值
height:除auto外任何值
zoom:除normal外任何值
write-mode:tb-rl
```

## IFC 

IFC指的是行级格式化上下文，它有这样的一些布局规则：

（1）行级上下文内部的盒子会在水平方向，一个接一个地放置。
（2）当一行不够的时候会自动切换到下一行。
（3）行级上下文的高度由内部最高的内联盒子的高度决定。



# CSS杂



## CSS盒模型



### 标准盒子模型

宽度=内容的宽度（content）+ border + padding + margin

```css
box-sizing:context-box  /* W3C的标准盒子模型 */
```



### 低版本IE盒子模型

宽度=内容宽度（content+border+padding）+ margin

```css
box-sizing:border-box  /* IE盒子模型 */
```



## 浏览器是怎样解析CSS选择器的

CSS选择器的解析是从右向左解析的 , 发现不符合规则，需要进行回溯，会损失很多性能

在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图



## 图片的格式

### png

png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。

### jpg

jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。

### webp

webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。





# CSS2.1



## 文本块

### letter-spacing

文本字符的间距

### text-align

```css
start | end | left | right | center | justify | match-parent
```

### text-decoration

```css
text-decoration: underline overline #FF3028;
/*  四合一
text-decoration-line	文本修饰的位置, 如下划线underline，删除线line-through
text-decoration-color	文本修饰的颜色
text-decoration-style	文本修饰的样式, 如波浪线wavy实线solid虚线dashed
text-decoration-thickness	文本修饰线的粗细
*/
```

### text-indent

首行缩进

### white-space

用来设置如何处理元素中的 [空白](https://developer.mozilla.org/en-US/docs/Glossary/whitespace)。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space

```css
normal
	连续的空白符会被合并，换行符会被当作空白符来处理。换行在填充「行框盒子(line boxes)」时是必要。
nowrap
	和 normal 一样，连续的空白符会被合并。但文本内的换行无效。
pre
	连续的空白符会被保留。在遇到换行符或者<br>元素时才会换行。 
pre-wrap
	连续的空白符会被保留。在遇到换行符或者<br>元素，或者需要为了填充「行框盒子(line boxes)」时才会换行。
pre-line
	连续的空白符会被合并。在遇到换行符或者<br>元素，或者需要为了填充「行框盒子(line boxes)」时会换行。
break-spaces
	与 pre-wrap的行为相同，除了：任何保留的空白序列总是占用空间，包括在行尾。每个保留的空格字符后都存在换行机会，包括空格字符之间。这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容大小和最大内容大小）。
```

### word-spacing

标签和单词之间的间距

### text-transform

只觉得首字母大写好用 

```css
text-transform: capitalize;
```

### text-rendering

CSS 属性定义浏览器渲染引擎如何渲染字体











## CSS的像素

放大与缩小： css的像素是一个抽象的单位

   放大：是放大CSS像素的面积，区域内css像素的个数变少

   缩小：是缩小CSS像素的面积，区域内css像素的个数变多

## 定位类型

#### 相对定位

相对定位的元素并未脱离文档流

#### 绝对定位

绝对定位的元素则脱离了文档流，绝对定位元素不占据空间

绝对定位元素相对于*最近的非 static 祖先元素*定位。当这样的祖先元素不存在时，则相对于ICB（inital container block, 初始包含块）

#### 固定定位

```css
position: fixed;
```

#### 粘性定位

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位

```html
<div>
  <dl>+
    <dt>A</dt>
    <dd>Andrew W.K.</dd>
    <dd>Apparat</dd>
    <dd>Arcade Fire</dd>
    <dd>At The Drive-In</dd>
    <dd>Aziz Ansari</dd>
  </dl>
  <dl>
    <dt>C</dt>
    <dd>Chromeo</dd>
    <dd>Common</dd>
    <dd>Converge</dd>
    <dd>Crystal Castles</dd>
    <dd>Cursive</dd>
  </dl>
  <dl>
    <dt>E</dt>
    <dd>Explosions In The Sky</dd>
  </dl>
  <dl>
    <dt>T</dt>
    <dd>Ted Leo & The Pharmacists</dd>
    <dd>T-Pain</dd>
    <dd>Thrice</dd>
    <dd>TV On The Radio</dd>+
</div>
```

```css
* {
  box-sizing: border-box;
}

dl {
  margin: 0;
  padding: 24px 0 0 0;
}

dt {
  background: #B8C1C8;
  border-bottom: 1px solid #989EA4;
  border-top: 1px solid #717D85;
  color: #FFF;
  font: bold 18px/21px Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 2px 0 0 12px;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
}

dd {
  font: bold 20px/45px Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0 0 0 12px;
  white-space: nowrap;
}

dd + dd {
  border-top: 1px solid #CCC
}
```

## 浮动

浮动分两层  盒模型一层 文字一层  浮动的时候只会把盒模型那一层浮动进去 文字那一层卡在外边



## hack

### **条件注释法** 

```
只在IE下生效 
<!--[if IE]> 
这段文字只在IE浏览器显示 
<![endif]--> 

只在IE6下生效 
<!--[if IE 6]> 
这段文字只在IE6浏览器显示 
<![endif]--> 

只在IE6以上版本生效 
<!--[if gte IE 6]> 
这段文字只在IE6以上(包括)版本IE浏览器显示 
<![endif]--> 

只在IE8上不生效 
<!--[if ! IE 8]> 
这段文字在非IE8浏览器显示 
<![endif]--> 

非IE浏览器生效 
<!--[if !IE]> 
这段文字只在非IE浏览器显示 
<![endif]--> 
```

### **类内属性前缀法** 

| hack       | 写法                               | 实例 | IE6(S) | IE6(Q) | IE7(S) | IE7(Q) | IE8(S) | IE8(Q) | IE9(S) | IE9(Q) | IE10(S) | IE10(Q) |
| ---------- | ---------------------------------- | ---- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| *          | *color                             | 青色 | Y      | Y      | Y      | Y      | N      | Y      | N      | Y      | N       | Y       |
| +          | +color                             | 绿色 | Y      | Y      | Y      | Y      | N      | Y      | N      | Y      | N       | Y       |
| -          | -color                             | 黄色 | Y      | Y      | N      | N      | N      | N      | N      | N      | N       | N       |
| _          | _color                             | 蓝色 | Y      | Y      | N      | Y      | N      | Y      | N      | Y      | N       | N       |
| #          | #color                             | 紫色 | Y      | Y      | Y      | Y      | N      | Y      | N      | Y      | N       | Y       |
| \0         | color:red\0                        | 红色 | N      | N      | N      | N      | Y      | N      | Y      | N      | Y       | N       |
| \9\0       | color:red\9\0                      | 粉色 | N      | N      | N      | N      | N      | N      | Y      | N      | Y       | N       |
| !important | color:blue !important;color:green; | 棕色 | N      | N      | Y      | N      | Y      | N      | Y      | N      | Y       | Y       |





# CSS3

## 阴影

### 边框阴影

#### box-shadow

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

### 文字阴影

#### text-shadow

https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow

```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black; 

/* offset-x | offset-y
text-shadow: 5px 10px;

/* Global values */
text-shadow: inherit;
text-shadow: initial;
text-shadow: unset;

/*多重阴影*/
text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
```

![image-20200220162600799](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200220162600799.png)

伪类



## 结构性伪类

### nth-of-type(index)的坑

```css
<div>
    <h1 class="inner"></h1>
    <p class="inner"></p>
    <span class="inner"></span>
</div>
```



```css
div .inner:nth-child(1){   // 渲染了h1标签
    background-color:"pink";
}
div .inner:nth-of-type(1){   // 渲染了全部标签（相当于如下）
    background-color:"pink";
}
。。。。。。。。。。。。。。。。。。。。。。。。
div h1:nth-of-type(1){   // 渲染了全部标签（相当于如下）
    background-color:"pink";
}
div p:nth-of-type(1){   // 渲染了全部标签（相当于如下）
    background-color:"pink";
}
div span:nth-of-type(1){   // 渲染了全部标签（相当于如下）
    background-color:"pink";
}
```

### :empty

代表没有子元素的元素。子元素只可以是元素节点或文本（包括空格）。**注释或处理指令都不会产生影响。**

```html
<div class="box"><!-- I will be lime --></div>
<div class="box">I will be pink</div>
<div class="box">
    <!-- I will be red because of the whitespace around this comment -->
</div>
```

```css
.box:empty {
    background: lime;
}
第一个是lime
```

### :not

## 属性优先级

### 权重排名

```html
!import > 行内样式 > ID选择器 > 类选择器 > 标签选择器 > 通配符 > 继承 > 游览器默认属性
```



### 内联选择器  1000

### ID选择器      0100

### 类选择器，属性选择器（） 0010

```css
div[id="text"] 0011
```

### 元素选择器  0001

## 自定义字体

```css
@font-face{
    font-family:"zidingyi";
    src:url(../font/...);
}
#text{
    font:50px "zidingyi";
}
```

## 新增文本样式

#### 文字阴影（在css2.1的笔记中有例子）

#### 文字描边

```css
-webkit-text-stroke:pink 4px;
```

#### 文字排版

```css
direction:rtl;  //  文字向右靠
unicode-bidi:bidi-override;   // 文字反序
```

## 新增UI方案

#### 盒模型阴影

```css
/* 插页(阴影向内) |  x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色  */
box-shadow:inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
```

```css
/* x偏移量 | y偏移量 | 阴影模糊半径(程度)  | 阴影颜色  */
text-shadow:2px 2px 2px 1px rgba(0, 0, 0, 0.2);
```

#### 倒影

```css
-webkit-box-reflect: below 10px;  // 倒影位置 中间距离
/*  渐变倒影 */
-webkit-box-reflect:right 0 px linear-gradient(90deg,rgba(0,0,0,.1),rgba(0,0,0,.1));
```

#### resize

```css
两个要配合使用
resize: inline; //none | both | horizontal | vertical | block | inline
overflow:auto;
```

#### box-sizing

```css
盒模型  加padding不往外挤
heigh:100px;
width:100px;
padding:10px;
box-sizing:border-box;

没有盒模型  加padding往外挤
heigh:100px;
width:100px;
padding:10px;
```

```css
box-sizing: content-box;
```

#### 边框图片

##### border-image-source

##### border-image-slice  

将图片分割为9个区域

```css
border-image-slice: 30 30% 45;  //  上右下左
```

##### border-image-repeart

```css
border-image-repeart:stretch;

stretch 拉伸图片以填充边框。
repeat  平铺图片以填充边框。
round   平铺图像。当不能整数次平铺时，根据情况放大或缩小图像。
space   平铺图像 。当不能整数次平铺时，会用空白间隙填充在图像周围（不会放大或缩小图像）
inherit 继承父级元素的计算值。
```

##### border-image-width

定义图像边框宽度(里面图片的宽度，不是border的宽度)

##### border-image-outset

定义边框图像可超出边框盒的大小。

```
border-image-outset：上右下左 或top right bottom 。。。
```

## 背景图片(渐变)

##### background-imag

```css
background-image:url(),url()  // 图片叠加，放前面的最先显示
```

##### background-position

##### background-repeat

##### background-origin

规定了指定背景图片[`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image) 属性的原点位置的背景相对区

##### background-size

```
设置背景图片大小。图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸。
```

##### -webkit-background-clip: text;

## 渐变

### 线性渐变

```css
background-image:linear-gradient(red,green)
```

#### linear-gradient

```css
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
linear-gradient(, blue, green 40%, red);

/*详情见mdn*/
```

##### 百分比渐变

```css
linear-gradient(0deg, red 10%, blue 20%);
/* 红色部分从10%开始渐变 蓝色部分从20%开始渐变 */
```

##### 透明色渐变

```css
linear-gradient(0deg, rgba(0,0,0,0) 100px, rbga(167,178,222,1) 300px);
```

![1568560661709](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568560661709.png)

#### repeating-linear-gradient 重复渐变

### 径向渐变

#### radial-gradient

## 层级

a.浮动提升半层，只有在浮动的情况下，才需要考虑元素分两层

​    定位元素提升一层

​            相对定位会在文档流有残留

b.z-index为1怎么都会比a高；z-index为-1怎么都会比a低



# CSS函数

## calc

```css
width: calc(100% - 100px);
```



# CSS变量

### 声明变量和使用变量

```html
<style>
    :root{
        --blue:blue
    }
    .fo-blue{
        color: var(--blue);
    }
</style>
```

# CSSStyleDeclaration

## getComputedStyle

返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问

```js
//css
.crumbs{
    background-color: #ebebeb;
}
.crumbs:after{
    background-color: #fff;
}

// html
<div class="crumbs">js操作css变量</div>

// js
let divDom = document.querySelector('.crumbs')
var divDom_compuStyle = getComputedStyle(divDom)					   // 拿到divDom的css对象
var divDom_after_compuStyle = getComputedStyle(divDom,":after")			// 拿到divDom的after伪类css对象
```

## getPropertyValue

返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) ，这个返回值将会包含预请求的CSS属性信息。

### 语法

```js
// 看上例


		// 我要拿crumbs的伪类的背景颜色属性
divDom_after_compuStyle.getPropertyValue("background-color")   // rgb(255, 255, 255)   // 白色的#fff
		// 我要拿crumbs的背景颜色属性
divDom_after_compuStyle.getPropertyValue("background-color")   // rgb(235, 235, 235)   // 有点灰黄的的#ebebeb
```

## getPropertyPriority（不常用）

根据传入的CSS属性，返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 来表示该属性的优先级。

语法：

```js
var priority = style.getPropertyPriority(property);
```

例子

```js
var declaration = document.styleSheets[0].cssRules[0].style;
var isImportant = declaration.getPropertyPriority('margin') === 'important';
```



## setProperty

为一个声明了CSS样式的对象设置一个新的值 。

### 语法

```js
style.setProperty(propertyName, value, priority);

propertyName 
//是一个 DOMString ，代表被更改的CSS属性。
value  可选 
/*是一个 DOMString ，含有新的属性值。如果没有指定, 则当作空字符串。
注意: value 不能包含 "!important" --那个应该使用 priority 参数.*/
priority  可选 
//是一个 DOMString 允许设置 "important" CSS 优先级。如果没有指定, 则当作空字符串。
```

### 举例

字体颜色由初始化的蓝色变成黄色

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			:root {
				--size:80px;
				--color:blue;
			}

			.fo-blue {
				font-size: var(--size);
				color: var(--color);
			}
		</style>
	</head>
	<body>
		<div class="fo-blue">js操作css变量,点我无限放大</div>
	</body>
	<script>
		let roots = document.querySelector(':root')
		let text1 = document.querySelector('.fo-blue')
		var text1_style = getComputedStyle(text1) 
		text1.style.setProperty('--color','yellow') // 此注意：不能用getComputedStyle(text1)，只能用dom.style
	</script>
</html>

```

### 另辟蹊径

还有一种方法js操作css变量

#### 使用setAttribute改变css的变量值

##### 关键

```js
roots.setAttribute('style', '--size:' + value++ + 'px')
```

##### 全部代码

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			:root {
				--init: 50px;
				--blue: blue;
				--size: var(--init);
			}

			.fo-blue {
				font-size: var(--size);
				color: var(--blue);

				-moz-user-select: none;
				/*火狐*/
				-webkit-user-select: none;
				/*webkit浏览器*/
				-ms-user-select: none;
				/*IE10*/
				-khtml-user-select: none;
				/*早期浏览器*/
				user-select: none;
			}
		</style>
	</head>
	<body>
		<div class="fo-blue">js操作css变量,点我无限放大</div>
	</body>
	<script>
		let roots = document.querySelector(':root')
		let text1 = document.querySelector('.fo-blue')
		var text1_style = getComputedStyle(text1)
		var value = getComputedStyle(text1).getPropertyValue('--init').slice(0, -2);
		text1.addEventListener('click', function() {
			roots.setAttribute('style', '--size:' + value++ + 'px')
		})
	</script>
</html>

```

## removeProperty

移除style对象的一个属性。

### 语法

```js
var oldValue = style.removeProperty(property);
```

### 举例

```js
let text1 = document.querySelector('.fo-blue')
text1.style.removeProperty('margin-top')
```

## item

通过下标从 [`CSSStyleDeclaration`](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration) 返回一个 CSS 属性值。只要传入参数这个方法就不会抛出异常； 当传入的下标越界时会返回空字符串，当未传入参数时会抛出一个 `TypeError` 。

语法：

```js
var propertyName = style.item(index);
```

举例：

```js
var style = document.getElementById('div1').style;
var propertyName = style.item(1); // or simply style[1] - returns the second style listed
```

# CSS杂记

###### text-rendering

文本渲染

https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-rendering



# CSS封装写法

## 常用

##### 淘宝的样式初始化代码

```css
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend
,button,input,textarea,th,td{margin:0;padding:0;}
body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;}
h1,h2,h3,h4,h5,h6{font-size:100%;}
address,cite,dfn,em,var{font-style:normal;}
code,kbd,pre,samp{font-family:couriernew,courier,monospace;}
small{font-size:12px;}
ul,ol{list-style:none;}
a{text-decoration:none;}
a:hover{text-decoration:underline;}
sup{vertical-align:text-top;}
sub{vertical-align:text-bottom;}
legend{color:#000;}
fieldset,img{border:0;}
button,input,select,textarea{font-size:100%;}
table{border-collapse:collapse;border-spacing:0;}
```



##### 文本单行超出省略号显示

```css
overflow: hidden;
text-overflow: ellipsis;
white-space:nowrap
```

##### 文本固定三行超出省略号显示

```css
overflow: hidden;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
display: -webkit-box;
-webkit-line-clamp: 3;   /*超出几行省略*/
```



##### 移动+PC端禁止文本选中

```css
-moz-user-select:none; /*火狐*/
-webkit-user-select:none; /*webkit浏览器*/
-ms-user-select:none; /*IE10*/
-khtml-user-select:none; /*早期浏览器*/
user-select:none;
-webkit-touch-callout: none; /*手机端*/
```



##### 居中定位

```css
{// 已知宽高垂直居中  1
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    width:100px;
    height:100px; 
    //原理    left + right + width + padding + margin = 包含块的宽度
             top + bottom + height + padding + margin = 包含块的高度
}

{// 未知宽高垂直居中  2
    position:absolute;
    left:50%;
    top:50%;
    transform:translate3d(-50%,-50%,0);
}

{// 已知宽高垂直居中  3
    height:200px;
    line-height:200px;
}

// 图片垂直居中  4  看例子
图片居中{
    display:block;
    margin:0 auto;
}

// 水平垂直居 5 
/	利用text-align:center和vertical-align:middle属性	/
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}

.container::after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.box {
  display: inline-block;
  width: 500px;
  height: 400px;
  background-color: pink;
  white-space: normal;
  vertical-align: middle;
}
```

##### 横向超过滑动效果

```css
width: 100%;
white-space:nowrap;
overflow-x: scroll;
```

##### input初始化样式

```css
background:none; 
outline:none; 
border:0px;
```

##### 隐藏滚动条

```css
html::-webkit-scrollbar {
    width: 0 !important
}
```

##### 清除浮动的几种方式

```html
<!-- 解决方法5 -->
<div class="box5 clearbox">
    <div class="inner5">伪元素清除浮动</div>
</div>

/* 开启haslayout */
.clearbox {
    *zoom: 1;
}

/* IE6/7不支持伪元素 */
.clearbox:after {
    content: "";
    display: block;
    clear: both;
}

clear属性只有块级元素才有效的，所以才加display:block
clear:left是“清除左浮动”
clear:right是“清除右浮动”
```

```html
<!-- 解决方法4 -->
<div class="box4">
    <div class="inner4">空标签清除浮动</div>
    <div style="clear: both"></div>
</div>

.box4 {
    border: 1px solid red;
    margin-bottom: 10px;
}

.inner4 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: aqua;
}
```

```html
<!-- 解决方法3 -->
<div class="box3">
    <div class="inner3">br便签清除浮动</div>
    <br clear="all" />
</div>

.box3 {
    border: 1px solid red;
    margin-bottom: 10px;
}

.inner3 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: aqua;
}
```

```html
<!-- 解决方法2 -->
<div class="box2">
    <div class="inner2">开启overflow或者position清除浮动</div>
</div>

.box2 {
    border: 1px solid red;
    margin-bottom: 10px;
    /* 开启BFC */
    overflow: hidden;
    /* position: absolute; */
    /*不好用*/
}
.inner2 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: aqua;
}
```

```html
<!-- 解决方法1 -->
<div class="box1">
    <div class="inner1">给父级元素加高度（扩展性不好）</div>
</div>

.box1 {
    border: 1px solid red;
    margin-bottom: 10px;
    /* 方法1加高度 */
    height: 100px;
}

.inner1 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: aqua;
}
```



## 不常用

##### table的隔行变色

```css
tr：nth-child（even）{   //奇数
    background-color:#fff;
}
tr：nth-child（odd）{   //偶数
    background-color:#fff;
}
```

##### 自定义滚动条

```css
#page::-webkit-scrollbar {
    width: 10px;
}

#page::-webkit-scrollbar-button {
    height: 0;
    background-color: #FF7677;
}

#page::-webkit-scrollbar-track {
    background: #5acbff;
}

#page::-webkit-scrollbar-track-piece {
    background: #f3f3f3;
}

#page::-webkit-scrollbar-thumb {
    background: #11a4ff;
    border-radius: 50px;
}

#page::-webkit-scrollbar-corner {
    background: #82AFFF;
}

#page::-webkit-scrollbar-resizer {
    background: #8cffdd;
}
```



##### 创建一个三角形

```css
#box {
    width: 0;
    height: 0;
    border-top: 40px solid #03A9F4;
    border-left: 40px solid #9C27B0;
    border-right: 40px solid #3F51B5;
    border-bottom: 40px solid #ff0000;
}

#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent transparent transparent;
}
```



##### 禁止浏览器的滚动条

```css
html,body{
    height:100%;
    overflow:scroll;
}
```

##### 移动端模拟固定定位

（如果fixed在IE6不能生效）

```css
html和body  两个中只有一个overflow  是作用给文档
html和body  两个中都有overflow  一个是作用给文档   一个是作用给自己
html{
    height:100%;
    overflow:hidden; 
},
body{
    height:100%;
    overflow:auto;
}
div{
    position:absolute;
    top:50px;
    left:50px;
    height:100px;
    width:100px;
    background-color:red;
}
```



##### 背景透明文字不透明

```css
background:rbga(0,0,0,0.8);
color:white;
```



##### 文字透明背景不透明

```
background:rbga(0,0,0);
color:rbga(255,255,255,.5);
```



##### 浮雕文字

```css
color:white;
text-shadow:black 1px 1px 10px; // 颜色 偏移量 偏移量 模糊度
```

![1568465510943](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568465510943.png)



##### 文字模糊

```css
h1{
    color:black;
    transiton:1s;
}
h1:hover{
    color:rgba(0,0,0,0);
    text-shadow:black 0 0 100px;
}
```

![1568465750373](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568465750373.png)



##### 文字内带图片

```css
background-image:url()
-webkit-background-clip:text;
color:rbga(0,0,0,0.3);
```

##### position:fixed;在android下无效处理

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
```



##### 移动端rem适配

```css
html{
	font-size: 15px;
}
div{
    font-size:2rem;			// 等于30px
}



html{
	font-size: 100vw/ 750
}

或：document.querySelector('html').style.fontSize = `${window.innerWidth / 7.5 }px`;
```

##### 响应式设计

```html
<meta name=’viewport’ content=”width=device-width, initial-scale=1. maximum-scale=1,user-scalable=no”>
```

##### 一些IE兼容

```css
<!--[if IE]>
    <p>所有IE可识别</p>
<![endif]-->
<!--[if IE 8]>
    <p>IE8可识别</p>
<![endif]-->
<!--[if !IE]>
    <p>所有非IE可识别</p>
<![endif]-->
<!--[if lt IE 7]>
    <p>IE7 以下版本可识别，不包含IE7</p>
<![endif]-->
<!--[if gt IE 7]>
    <p>IE7 以上版本可识别，不包含IE7</p>
<![endif]-->
<!--[if lte IE 7]>
    <p>IE7 以下版本可识别，包含IE7</p>
<![endif]-->
<!--[if gte IE 7]>
    <p>IE7 以上版本可识别，包含IE7</p>
<![endif]-->
```

##### position:fixed;在 android 下无效处理

```
因为移动端浏览器默认的viewport叫做layoutviewport。在移动端显示时，因为layoutviewport的宽度大于移动端屏幕
的宽度，所以页面会出现滚动条左右移动，fixed的元素是相对layoutviewport来固定位置的，而不是移动端屏幕来固定位置的
，所以会出现感觉fixed无效的情况。

如果想实现fixed相对于屏幕的固定效果，我们需要改变的是viewport的大小为idealviewport，可以如下设置：

<metaname="viewport"content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-sca
le=1.0,user-scalable=no"/>
```

##### overflow:scroll 时不能平滑滚动的问题怎么处理

```
以下代码可解决这种卡顿的问题：-webkit-overflow-scrolling:touch;是因为这行代码启用了硬件加速特性，所以滑动很流
畅。
```



# CSS爬坑大全

## transition设置display过渡无效

### 问题：

使用display:none(block)对div的隐藏与显示应用于过渡属性上，但是transition完全失效，没有过渡效果。

div元素使用display:none(block)实现隐藏与显示的时候，会与transition属性冲突，导致过渡效果无效。display会破坏transition。

### 原因：

display:none的时候，页面文档流中将不会存在该元素，display:block的时候，文档流中才存在该元素。transition属性无法对一个从无到有的元素进行过渡显示。

### 解决：

几个div并排出现缝隙

原因

​	使用了display: inline-block;

解决：

​	在父元素+font-size：0；这样文字会消失

​	在子元素设置font-size：随便px

## 行间距=行高-字体大小

```css
行间距=行高-字体大小     （ 行间距==line-height-font-size）

font：30px /50px "微软雅黑"  //这样也可以设置行高 30是字体大小 50是行高  第二个不写的话就使用默认值

line-height：50px;
font：30px  "微软雅黑"   //这样子会默认覆盖掉行高

正确写法1:  font：30px /50px 
正确写法2:  font：30px 
           line-height
```

## 兄弟元素相邻之间的边距会合并    取最大的那个边距

```css
box1{
margin-bottom:50px;
}
box2{
margin-top:100px;
}
取到边距最大的    上下盒子相差100px
```


# CSS伪类

伪类能操作DOM以外的元素 （有在DOM内 没渲染出来）

## 动态伪类

lvhaf

## 伪元素

### :first-line 

#### 语法

```css
"first-line" 伪元素用于向文本的首行设置特殊样式。

注释："first-line" 伪元素只能用于块级元素。
注释：下面的属性可应用于 "first-line" 伪元素：
font
color
background
word-spacing
letter-spacing
text-decoration
vertical-align
text-transform
line-height
clear
```

#### 示例

```css
p:first-line{
  color:#ff0000;
  font-variant:small-caps;
}
```

### :first-letter 

#### 语法

```css
"first-letter" 伪元素用于向文本的首字母设置特殊样式：

注释："first-letter" 伪元素只能用于块级元素。
注释：下面的属性可应用于 "first-letter" 伪元素：
font
color
background
margin
padding
border
text-decoration
vertical-align (仅当 float 为 none 时)
text-transform
line-height
float
clear
```

#### 示例

```css
p:first-letter{
  color:#ff0000;
  font-size:xx-large;
}
```

### :before 

":before" 伪元素可以在元素的内容前面插入新内容。

```css
h1:before{
  content:url(logo.gif);
}
```

### :after

":after" 伪元素可以在元素的内容之后插入新内容。

```css
h1:after {
  content:url(logo.gif);
}
```

## 锚伪类

### :target

:target选择器可用于当前活动的target元素的样式。

```css
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<style>
:target
{
	border: 2px solid #D4D4D4;
	background-color: #e5eecc;
}
</style>
</head>
<body>

<h1>This is a heading</h1>

<p><a href="#news1">Jump to New content 1</a></p>
<p><a href="#news2">Jump to New content 2</a></p>

<p>Click on the links above and the :target selector highlight the current active HTML anchor.</p>

<p id="news1"><b>New content 1...</b></p>
<p id="news2"><b>New content 2...</b></p>

</body>
</html>
```

## 结构性伪类

```css
tr:nth-child(2n)		表示HTML表格中的偶数行。
tr:nth-child(2n+1)		表示HTML表格中的奇数行。

p:nth-child(5)   		匹配父元素下的第5个子元素
p:first-child     		匹配所有元素中的第1个元素，且第1个元素是p才生效
p:last-child		    匹配所有元素中的最后一个元素，且最后一个元素是p才生效
div:only-child			选择所有仅有一个子元素的div元素


p:nth-of-type(5)		匹配父元素下的第5个p元素
p:nth-last-of-type() 	同上，但是从最后一个子元素开始计数
p:first-of-type			匹配所有P元素中的第1个P元素
p:last-of-type			匹配所有P元素中的最后一个P元素
p:only-of-type			匹配所有P元素中,选择所有仅有一个子元素为p的元素
<div></div>
```

## 表单性伪类

### :checked

选择所有选中的表单元素

### :disabled

选择所有禁用的表单元素

### :enabled

选择所有启用的表单元素

### :focus      

获取焦点时触发

# Flex布局

## 老版本flex和新版本flex区别

```
给定盒子宽高500px    里面5个小div每个200px  
老版本会选择溢出，新版本会压缩
```

## 老版本flex

### 注意



### 容器上的属性

#### -webkit-box-orident

控制主轴     是X轴还是Y轴

```css
-webkit-box-orident：horizontal     控制主轴为x轴
-webkit-box-orident：vertical       控制主轴为Y轴
```

#### -webkit-box-direction

控制主轴或者侧轴是正常方向还是相反方向

```css
-webkit-box-direction: normal; 正常方向   x的右边  y的下边
-webkit-box-direction: reverse;相反的方向
```

#### -webkit-box-pack

主轴的富裕空间管理

```css
常用
start
end
center
justify
-webkit-box-pack:start; 不会给项目区分配空间，只是确定富裕空间的位置 
```

#### -webkit-box-align

侧轴的富裕空间管理

```css
常用     
start
end
center  
-webkit-box-align:center; 不会给项目区分配空间，只是确定富裕空间的位置
```

### 项目上的属性

#### -webkit-box-flex:1(弹性空间管理)

将主轴上的富裕空间按比例分配到各个项目上width上

```css
-webkit-box-flex:1
```

```css
.box{
    height:1000px;
    width:1000px;
}
.box div{
    width:100px;
    -webkit-box-flex:1
}
.box > div:nth-child(1){
    -webkit-box-flex:6
}
<div class="box">
 <div>1</div>
 <div>2</div>
 <div>3</div>
 <div>4</div>
 <div>5</div>
</div>
剩500的富裕空间   分给五个div  第一块300+100宽度=400,剩下的都是100+100=200宽度
```



## 新版本flex

### 注意

```js
多行多列的富裕空间管理看align-content

单行单列的富裕空间管理看align-items
```

### 语法糖

#### flex:1

### 容器上的属性

#### display: flex

#### flex-direction

确定哪一条是主轴

```js
flex-direction: row;
flex-direction: column;
flex-direction: row-reverse;     //表现和row相同，  但是置换了主轴起点和主轴终点
flex-direction: column-reverse;  //表现和column相同，但是置换了主轴起点和主轴终点
```

#### justify-content（主轴富裕空间）

```js
justify-content: start;   //从行首开始排列。每行第一个元素与行首对齐，同时所有后续的元素与前一个对齐。
justify-content: flex-start;   //从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。
justify-content: flex-end;   //从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。
justify-content: center;   //伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
justify-content: left;   //伸缩元素一个挨一个在对齐容器得左边缘，如果属性的轴与内联轴不平行，则left的行为类似于start
justify-content: right;  //元素以容器右边缘为基准, 一个挨着一个对齐,如果属性轴与内联轴不平行,则right的行为类似于start.
justify-content: space-between;   //在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
justify-content: space-around;   //在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。
justify-content: space-evenly;   //flex项都沿着主轴均匀分布在指定的对齐容器中。相邻flex项之间的间距，主轴起始位置到第一个flex项的间距,，主轴结束位置到最后一个flex项的间距，都完全一样。
```

```css
常用
flex-start                 column跟随主轴方向 富裕空间在下面    row跟随主轴方向 富裕空间在后面
flex-end                   column跟随主轴方向 富裕空间在上面    row跟随主轴方向 富裕空间在前面
center                     column跟随主轴方向 富裕空间在上面  
space-between              富裕空间在项目之间
space-around(box 没有的)    富裕空间在项目两边
```

#### align-items（侧轴富裕空间）

```css
常用
flex-start 
flex-end
center
baseline(box 没有的)        基线对齐
stretch(box 没有的)         等高布局（项目没有高度）
```

#### flex-wrap

属性控制了容器为单行/列还是多行/列。并且定义了侧轴的方向，新行/列将沿侧轴方向堆砌。

```
flex-wrap：nowrap   单行/列
flex-wrap：wrap     多行/列
flex-wrap：wrap-reverse  多行/列-反方向

```

#### align-content（侧轴富裕空间）

把所有的项目看成了一个整体  

```
flex-start
    所有行/列从侧轴起点开始填充。第一行/列的侧轴起点边和容器的侧轴起点边对齐。
    接下来的每一行/列紧跟前一行/列。
flex-end
    所有弹性元素从侧轴末尾开始填充。最后一个弹性元素的侧轴终点和容器的侧轴终点对齐。
    同时所有后续元素与前一个对齐。
center
    所有行/列朝向容器的中心填充。每行/列互相紧挨，相对于容器居中对齐。
    容器的侧轴起点边和第一行/列的距离相等于容器的侧轴终点边和最后一行/列的距离。
space-between
    所有行/列在容器中平均分布。相邻两行/列间距相等。
    容器的侧轴起点边和终点边分别与第一行/列和最后一行/列的边对齐。
space-around
    所有行/列在容器中平均分布，相邻两行/列间距相等。
    容器的侧轴起点边和终点边分别与第一行/列和最后一行/列的距离是相邻两行/列间距的一半。
stretch
    拉伸所有行/列来填满剩余空间。剩余空间平均的分配给每一行/列
```

#### flex-flow

“flex-direction” 和 “flex-wrap”的简写

```css
flex-flow:column wrap;
flex-flow:column-reverse wrap;
```



### 项目上的属性

#### flex

 flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 



#### flex-grow: 1(弹性空间管理)

```
跟老版的-webkit-box-flex:1 一样
```

##### 计算规则

```
flex-grow： 
   可用空间 = (容器大小 - 所有相邻项目flex-basis的总和)
   可扩展空间 = (可用空间/所有相邻项目flex-grow的总和)
   每项伸缩大小 = (伸缩基准值 + (可扩展空间 x flex-grow值))
```

```
flex-shrink：
   每项flex收缩大小 = 伸展基准值 - (收缩比例 / 收缩比例总和 x 溢出的空间)-->并不是
   
   1.计算收缩因子与基准值乘的总和  
   2.计算收缩因数
              收缩因数=（项目的收缩因子*项目基准值）/第一步计算总和    
   3.移除空间的计算
              移除空间= 项目收缩因数 x 负溢出的空间  
```



#### order 

属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照 order 属性的值的增序进行布局。拥有相同 order 属性值的元素按照它们在源代码中出现的顺序进行布局

```js
order:1/2/3       //order越大越往后排
```

#### align-self (单个富裕空间)

会对齐当前 flex 行中的 flex 元素，并覆盖 align-items 的值. 如果任何 flex 元素的侧轴方向 margin 值设置为 auto，则会忽略 align-self。

```css
auto
    设置为父元素的 align-items 值，如果该元素没有父元素的话，就设置为 stretch。
flex-start
    flex 元素会对齐到 cross-axis 的首端。
flex-end
    flex 元素会对齐到 cross-axis 的尾端。
center
    flex 元素会对齐到 cross-axis 的中间，如果该元素的 cross-size 的尺寸大于 flex 容器，将在两个方向均等溢出。
baseline
    所有的 flex 元素会沿着基线对齐，
stretch
    flex 元素将会基于容器的宽和高，按照自身 margin box 的 cross-size 拉伸
```

#### flex-basis

指定了 flex 元素在主轴方向上的初始大小，没有这条属性时默认是宽/高

```
flex-grow： 
   可用空间 = (容器大小 - 所有相邻项目flex-basis的总和)
   可扩展空间 = (可用空间/所有相邻项目flex-grow的总和)
   每项伸缩大小 = (伸缩基准值 + (可扩展空间 x flex-grow值))   ps：伸缩基准值是宽高，开启了flex-basis就是flex-basis的值
```

#### flex-shrink

```
 flex-grow 属性定义弹性盒子项（flex item）的拉伸因子。
 flex-shrink 属性指定了 flex 元素的收缩因子  默认值为1
 
 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
```

```
flex-shrink：
   每项flex收缩大小 = 伸展基准值 - (收缩比例 / 收缩比例总和 x 溢出的空间)-->并不是
   
   1.计算收缩因子与基准值乘的总和  
   2.计算收缩因数
              收缩因数=（项目的收缩因子*项目基准值）/第一步计算总和    
   3.移除空间的计算
              移除空间= 项目收缩因数 x 负溢出的空间  
```

# 最强大的grid布局

网格布局（Grid）是最强大的 CSS 布局方案。

## 容器属性

### display:grid

```html
<style>
    #gridBox{
        border: solid 1px skyblue;
        display: grid;
        text-align: center;
    }
    .item{
        font-size: 50px;
    }
    .item-1{ background-color: #007AFF;}
    .item-2{ background-color: #19BE6B;}
    .item-3{ background-color: #2C405A;}
</style>
<body>
    <div id='gridBox'>
        <div class='item item-1'>1</div>
        <div class='item item-2'>2</div>
        <div class='item item-3'>3</div>
    </div>
</body>
```

![image-20201105201640197](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105201640197.png)

### display: inline-grid

如果使用grid默认是块元素的，可以使用display: inline-grid让每个元素变成行内元素

```html
<style>
    #gridBox{
        border: solid 1px skyblue;
        text-align: center;
        display: inline-grid;
    }
    .item{
        font-size: 50px;
    }
    .item-1{ background-color: #007AFF;}
    .item-2{ background-color: #19BE6B;}
    .item-3{ background-color: #2C405A;}
</style>
<body>
    <div id='gridBox'>
        <div class='item item-1'>1</div>
        <div class='item item-2'>2</div>
        <div class='item item-3'>3</div>
    </div>
	</body>
```

![image-20201105201906253](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105201906253.png)

### grid-template-columns

使用grid-template-columns能将容器划分成几列

比如`grid-template-columns: 50px 50px;`将容器划分成2列，每列宽度大小50px

比如`grid-template-columns: 50px 50px 60px;`将容器划分成3列，第1、2列宽度为50px，第三列宽度为60px

```html
<style>
    #gridBox{
        border: solid 1px skyblue;
        text-align: center;
        display: inline-grid;
        grid-template-columns: 50px 50px 60px;
    }
    .item{
        font-size: 50px;
    }
    .item-1{ background-color: #007AFF;}
    .item-2{ background-color: #19BE6B;}
    .item-3{ background-color: #2C405A;}
    .item-4{ background-color: #aa0000;}
    .item-5{ background-color: #aaaa00;}
    .item-6{ background-color: #ff55ff;}
</style>
<body>
    <div id='gridBox'>
        <div class='item item-1'>1</div>
        <div class='item item-2'>2</div>
        <div class='item item-3'>3</div>
        <div class='item item-4'>4</div>
        <div class='item item-5'>5</div>
        <div class='item item-6'>6</div>
    </div>
</body>
```

![image-20201105202438308](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105202438308.png)

比如`grid-template-columns: 33.3% 33.3% 33.3%;`将容器划分成3列宽度相等，先修改容器宽度为500px

```html
<style>
    #gridBox{
        border: solid 1px skyblue;
        text-align: center;
        width:500px;
        display: inline-grid;
        grid-template-columns: 33.3% 33.3% 33.3%;
    }
    .item{
        font-size: 50px;
    }
    .item-1{ background-color: #007AFF;}
    .item-2{ background-color: #19BE6B;}
    .item-3{ background-color: #2C405A;}
    .item-4{ background-color: #aa0000;}
    .item-5{ background-color: #aaaa00;}
    .item-6{ background-color: #ff55ff;}
</style>
<body>
    <div id='gridBox'>
        <div class='item item-1'>1</div>
        <div class='item item-2'>2</div>
        <div class='item item-3'>3</div>
        <div class='item item-4'>4</div>
        <div class='item item-5'>5</div>
        <div class='item item-6'>6</div>
    </div>
</body>
```

![image-20201105202824797](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105202824797.png)

### repeat()函数

这个函数可以用在CSS Grid属性`grid-template-columns`和`grid-template-rows`。

- 重复值

重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat()`函数，简化重复的值。上面的代码用`repeat()`改写如下。

```css
grid-template-columns: 33.3% 33.3% 33.3%;   ===  grid-template-columns: repeat(3,33.3%)
```

- 还可以重复模式

grid-template-columns: repeat(1,20% 50% 30%)

![image-20201105205910740](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105205910740.png)

![image-20201105205923723](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105205923723.png)

换成`grid-template-columns: repeat(2,20% 50% 30%)`后

![image-20201105205935364](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105205935364.png)

### **auto-fill 关键字**

也是作用于`grid-template-columns`和`grid-template-rows`。

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

![image-20201105210526453](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105210526453.png)

![1604581634965](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\1604581634965.gif)

### **fr 关键字**

为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。

![image-20201105211107941](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105211107941.png)

![image-20201105211120361](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105211120361.png)

```css
`grid-template-columns: 1fr 2fr;`
```

![image-20201105211204984](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105211204984.png)

```css
grid-template-columns: 150px 1fr 2fr;
```

第一列的宽度为150像素，第二列的宽度是第三列的一半。

![image-20201105211314044](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105211314044.png)

### **minmax()**函数

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 100px 1fr minmax(300px, 1fr);
```

![1604582231661](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\1604582231661.gif)

### **auto 关键字**

`auto`关键字表示由浏览器自己决定长度。

```css
grid-template-columns: 100px auto 100px;
```

![image-20201105211926297](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105211926297.png)

### **网格线的名称**

`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

三个单元格，四条网线

```css
grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
```

网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

### grid-template-rows 

用grid-template-rows 能将容器划分成几行，详情就不说了

### grid-row-gap（设置间隔）

### grid-column-gap（设置间隔）

```css
grid-template-columns: 100px auto 100px;
grid-row-gap: 20px;
grid-column-gap: 20px;
```

![image-20201105212313567](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105212313567.png)

### grid-gap

`grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

```css
grid-gap: <grid-row-gap> <grid-column-gap>;
```

```css
grid-gap: 20px 20px; // 如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。
```

### grid-template-areas

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

```css
grid-template-columns: 100px auto 100px;
grid-row-gap: 20px;
grid-column-gap: 20px;
grid-template-areas: 'a b c'
                     'd e f'
                     'g h i';
```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

```css
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```

如果某些区域不需要利用，则使用"点"（`.`）表示。

```css
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```

### grid-auto-flow（默认:row先行后列）

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行

```css
grid-auto-flow: row; 	 // 先行后列
grid-auto-flow: column;  // 先列后行
```

```css
#gridBox{
    border: solid 1px skyblue;
    text-align: center;
    /* width:400px; */
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: repeat(3,33.3%);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-auto-flow: column;
}
```

![image-20201105212950232](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105212950232.png)

#### dense

设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

```css
grid-auto-flow: row dense;
grid-auto-flow: column dense;
```

1号项目占据两个单元格，然后在默认的`grid-auto-flow: row`情况下，会产生下面这样的布局。

![image-20201105214257712](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105214257712.png)

![image-20201105214310219](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105214310219.png)

设为`row dense`，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。

![image-20201105223811977](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105223811977.png)

![image-20201105223823276](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105223823276.png)

### justify-items

置单元格内容的水平位置（左中右）

```css
justify-items: start | end | center | stretch(拉伸，占满单元格的整个宽度（默认值）。);
```

```css
#gridBox{
    border: solid 1px skyblue;
    text-align: center;
    /* width:400px; */
    display: grid;
    grid-template-columns: 100px 200px 100px;
    grid-template-rows: repeat(3,33.3%);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-auto-flow: column;
    justify-items: center;
}
```

![image-20201105225138011](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105225138011.png)

### align-items 

置单元格内容的垂直位置（左中右） 用法就跟上面一样

```css
align-items: start | end | center | stretch;
```

### place-items

`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

```css
place-items: <align-items> <justify-items>;
```

```css
place-items: start end;
```

如果省略第二个值，则浏览器认为与第一个值相等

### justify-content

`justify-content`属性是整个内容区域在容器里面的水平位置（左中右）

```css
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
```

```css
#gridBox{
    border: solid 1px skyblue;
    text-align: center;
    /* width:400px; */
    display: grid;
    grid-template-columns: 100px 200px 100px;
    grid-template-rows: repeat(3,33.3%);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-auto-flow: column;
    justify-items: center;
    justify-content: center;
}
```

```css
justify-content: center;
```

![image-20201105230943771](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105230943771.png)

```css
justify-content: start;
```

![image-20201105231025871](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105231025871.png)

```css
justify-content: space-between;
```

![image-20201105231633007](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105231633007.png)

```css
justify-content: space-between;
```

![image-20201105231848333](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105231848333.png)

```css
space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。
```

![image-20201105232116876](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105232116876.png)

### align-content

`align-content`属性是整个内容区域的垂直位置（上中下）。  用法跟上面一样

### place-content

`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

```css
place-content: <align-content> <justify-content>
```

```css
place-content: space-around space-evenly;
```

### grid-auto-columns

### grid-auto-rows 

### grid-template

`grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。

`grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。

从易读易写的角度考虑，还是建议不要合并属性，所以这里就不详细介绍这两个属性了。

## 项目属性

### 关于项目的占位

```css
grid-column-start属性：左边框所在的垂直网格线
grid-column-end属性：右边框所在的垂直网格线
grid-row-start属性：上边框所在的水平网格线
grid-row-end属性：下边框所在的水平网格线
```

```css
.item-1{ 
    background-color: #007AFF;
    grid-column-start:1;
    grid-column-end:3;
}
```

![image-20201105234215534](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105234215534.png)

```css
.item-1{ 
    background-color: #007AFF;
    grid-column-start:1;
    grid-column-end:3;
    grid-row-start: 2;
    grid-row-end: 4;
}
```

![image-20201105234332814](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105234332814.png)

##### 使用span关键字

这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格

```css
.item-1 {
  grid-column-start: span 2;  ===    grid-column-end: span 2;
}
```

```css
.item-1{ 
    background-color: #007AFF;
    grid-column-end: span 2;
    grid-row-end: span 4;
}
```

![image-20201105234654701](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105234654701.png)

使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

### grid-column

`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，

```css
grid-column: <start-line> / <end-line>;
```

```css
grid-column: 1 / 3;
grid-row: 1 / 2;
/* 等同于 */
grid-column-start: 1;
grid-column-end: 3;
grid-row-start: 1;
grid-row-end: 2;
```

```css
.item-1{ 
    background-color: #007AFF;
    grid-column: 1 / 3;
    grid-row: 2 / 4;
}
```

![image-20201105235205908](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105235205908.png)

```css
// 这个效果跟上面的一样
.item-1{ 
    background-color: #007AFF;
    grid-column: 1 / span 2; 
    grid-row: 2 / 4;
}
```



### grid-row

`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

```css
grid-row: <start-line> / <end-line>;
```

### grid-area

`grid-area`属性指定项目放在哪一个区域。

![image-20201105235505250](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105235505250.png)

![image-20201105235513864](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105235513864.png)

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置

```css
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
```

```css
grid-area: 1 / 1 / 3 / 3;
```

![image-20201105235723555](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201105235723555.png)

### justify-self

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

### align-self

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

### place-self

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

```css
place-self: center center;
```

如果省略第二个值，`place-self`属性会认为这两个值相等。

花括号省略

```css
a .button
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments
```

函数调用

```css
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

a .button
  border-radius(5px)


透明赋值
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

button {
  border-radius: 5px 10px;
}
变成
button {
  -webkit-border-radius: 5px 10px;
  -moz-border-radius: 5px 10px;
  border-radius: 5px 10px;
}
```

语言计算

```css
sum(nums...)
  sum = 0
  sum += n for n in nums

sum(1 2 3 4)
// => 10
```

父级参考运算符

```css
ul
  li a
    display: block
    color: blue
    padding: 5px
    html.ie &
      padding: 6px
    &:hover
      color: red


/*等于*/

ul li a {
  display: block;
  color: #00f;
  padding: 5px;
}
html.ie ul li a {
  padding: 6px;
}
ul li a:hover {
  color: #f00;
}
```

变量使用

```css
#prompt
  position: absolute
  top: 150px
  left: 50%
  width: 200px
  margin-left: -(@width / 2)
      
#prompt
  position: absolute
  top: 150px
  left: 50%
  width: w = 200px
  margin-left: -(w / 2)
```

# svg形状

## 矩形rect标签

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect width="300" height="100"
style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)"/>

</svg>
```

```css
rect 元素的 width 和 height 属性可定义矩形的高度和宽度
rx 和 ry 属性可使矩形产生圆角。
x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）

style 属性用来定义 CSS 属性
		fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
		stroke-width 属性定义矩形边框的宽度
		stroke 属性定义矩形边框的颜色
		fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
		stroke-opacity 属性定义笔触颜色的透明度（合法的范围是：0 - 1）
		opacity 属性定义整个元素的透明值（合法的范围是：0 - 1）
```



## 圆形circle标签

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<circle cx="100" cy="50" r="40" stroke="black"
stroke-width="2" fill="red"/>

</svg>
```

```css
cx 和 cy 属性定义圆点的 x 和 y 坐标。如果省略 cx 和 cy，圆的中心会被设置为 (0, 0)
r 属性定义圆的半径。
```

## 椭圆ellipse>标签

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/>

</svg>
```

```css
cx 属性定义圆点的 x 坐标
cy 属性定义圆点的 y 坐标
rx 属性定义水平半径
ry 属性定义垂直半径
```

## 线条line 标签

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<line x1="0" y1="0" x2="300" y2="300"
style="stroke:rgb(99,99,99);stroke-width:2"/>

</svg>
```

```css
x1 属性在 x 轴定义线条的开始
x2 属性在 x 轴定义线条的结束
y1 属性在 y 轴定义线条的开始
y2 属性在 y 轴定义线条的结束
```

## 多边形polygon标签

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<polygon points="220,100 300,210 170,250"
style="fill:#cccccc;
stroke:#000000;stroke-width:1"/>

</svg>
```

```css
points 属性定义多边形每个角的 x 和 y 坐标
```

## 折线polyline标签

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"
style="fill:white;stroke:red;stroke-width:2"/>

</svg>
```

```css
points 属性定义每个点的 x 和 y 坐标
```

## 路径path标签

下面的命令可用于路径数据：

- M = moveto（移动到起始点）
- L = lineto（画线到目标点）
- H = horizontal lineto（绘制水平线标明在X轴移动到的位置）
- V = vertical lineto（绘制垂直线标明在Y轴移动到的位置）
- C = curveto  （三次贝塞尔曲线，参数x1，y1，x2，y2，x3，y3（C10，20，30，40，50， 60））
- S = smooth curveto
- Q = quadratic Belzier curve  （二次贝塞尔曲线，参数x1，y1，x2，y2（Q10，20，30，40））
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath（关闭路径、合并）

**注释：**以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<path d="M250 150 L150 350 L350 350 Z" />

</svg>
```

上面的例子定义了一条路径，它开始于位置 250 150，到达位置 150 350，然后从那里开始到 350 350，最后在 250 150 关闭路径。

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20210303091814.png)

## 2D变形（transform）

### transform:rotate(angle);   旋转

   正值:顺时针旋转  rotate(360deg)
   负值:逆时针旋转  rotate(-360deg)
   只能设单值。正数表示顺时针旋转，负数表示逆时针旋转

### transform:translate(tx,ty);   平移

X方向平移:transform:  translateX(tx)
Y方向平移:transform:  translateY(ty) 
二维平移：transform:  translate(tx[, ty])； 如果ty没有指定，它的值默认为0。

可设单值，也可设双值。
       正数表示XY轴正向位移，负数为反向位移。设单值表示只X轴位移，Y轴坐标不变，
       例如transform: translate(100px);等价于transform: translate(100px,0);

### transform:skewX(45deg);  倾斜

transform:skewX(45deg);
    X方向倾斜:transform:  skewX(angle)
               skewX(45deg):参数值以deg为单位 代表与y轴之间的角度
    Y方向倾斜:transform:  skewY(angle)
               skewY(45deg):参数值以deg为单位 代表与x轴之间的角度
     二维倾斜:transform:  skew(ax[, ay]);  如果ay未提供，在Y轴上没有倾斜
               skew(45deg,15deg):参数值以deg为单位 第一个参数代表与y轴之间的角度
                                                                        第二个参数代表与x轴之间的角度
                单值时表示只X轴扭曲，Y轴不变，如transform: skew(30deg);等价于                     transform: skew(30deg, 0);
                考虑到可读性，不推荐用单值，应该用transform: skewX(30deg);。skewY表示                     只Y轴扭曲，X轴不变  
            
 正值:拉正斜杠方向的两个角
 负值:拉反斜杠方向的两个角

### transform:scale(2);   缩放

transform:scale(2);
  X方向缩放:transform:  scaleX(sx); 
  Y方向缩放:transform:  scaleY(sy);
  二维缩放 :transform:  scale(sx[, sy]);  (如果sy 未指定，默认认为和sx的值相同)  

  要缩小请设0.01～0.99之间的值，要放大请设超过1的值。
  例如缩小一倍可以transform: scale(.5);
      放大一倍可以transform: scale(2);

 如果只想X轴缩放，可以用scaleX(.5)相当于scale(.5, 1)。
 同理只想Y轴缩放，可以用scaleY(.5)相当于scale(1, .5)

 正值:缩放的程度
  负值:不推荐使用（有旋转效果）
  单值时表示只X轴,Y轴上缩放粒度一样，如transform: scale(2);等价于transform: scale(2,2);

### transform-origin   基点变换

 transform-origin CSS属性让你更改一个元素变形的基点。

```
transform-origin:center 250px;
参考 时钟的12个数字  改变基点变换
```

### 组合变换

计算方式 从右往左

![1568860256536](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568860256536.png)

```css
transform: scale(0.5) translateX(100px);  位移了50px;
transform: translateX(100px) scale(0.5);  位移了100px;
transform:translateX(100px) rotate(180deg);  往右移100px边翻转;
transform:rotate(180deg) translateX(100px);   旋转180 改变了坐标 边向左移动100px;
```

### transform过渡坑

```js
1.transition在元素首次渲染还没有结束的情况下是不会被触发的;
2.在绝大部分变换样式切换时,如果变换函数的位置，个数不相同也不会触发过渡;
  eg:
      if(flag){
          this.style.transform="rotate(-720deg) scale(1)";
      }else{
          this.style.transform="rotate(0deg)";
      }
      flag=!flag;
 
//  错误 这样transition只会触发了一次
      
```



### 矩阵



## 3D变形

3D写法  外部大盒子 里面套要变化的元素



### 景深

景深就是我们的肉眼距离显示器的距离，景深越大，元素离我们越远，效果就不好，

在我们CSS3中，perspective用于激活一个3D空间，属性值就是景深大小（默认none无景深）
应用景深的元素称为“舞台元素”，舞台元素的所有后代元素都会受影响，（如果后代元素中也添加了perspective属性，效果会叠加而不是覆盖）

#### perspective: 100px;

z轴到原点坐标的距离为100px

写在父元素身上，作用于子元素，本身不起作用

#### transform: perspective(100px);

z轴到原点坐标的距离为100px

写在自身身上，若使用perspective()函数，那么他必须被放置在transform属性的首位，如果放在其他函数之后，则会被忽略

#### perspective-origin；

​    同perspective属性，也是设置在父元素上，对后代元素起作用。 这个属性来设置你在X, Y轴坐标确定的那个点来看这个元素，Z轴是被perspective属性设置的 

#### perspective: 100px;与transform: perspective(100px);的区别

当父（盒子）只有一个子元素的时候，没变化

当父（盒子）有多个元素的时候:

   1.给父元素加perspective：800px；会以父元素的某个点为视点，看所有的子元素，所以看到的每个子元素的样式是不一样的。

![1569135155568](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1569135155568.png)

  2.分别给子元素加transform：perspective（800px）；属性的时候，会以元素自身的某个点作为视点，所以呈现出的效果还是一样的。

![1569135189437](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1569135189437.png)

#### 景深叠加（坑）

```jsp
<style>
    .box{
        perspective:100px
    }
</style>
<body>
    <div style="perspective:200px"> 
        <div class="box">
           <div class="inner"></div>
        </div>
    </div>
</body>

// 景深叠加没有计算规则 整个页面会被破坏
```



### transform: scaleZ(number)  3D缩放

transform: scaleZ(number)
transform: scale3d(scaleX,scaleY,scaleZ);

如果只设置scaleZ(number)，你会发现元素并没有被扩大或压缩，scaleZ(number)需要和translateZ(length)配合使用，number乘以length得到的值，是元素沿Z轴移动的距离，从而使得感觉被扩大或压缩 



### transform: rotateX(250deg)   3D旋转

#### transform: rotateX(250deg)

#### transform: rotateY(250deg)

#### transform: rotateZ(250deg)

#### transform: rotate3d(1,1,1,360deg)

x, y, z分别接受一个数值(number),用来计算矢量方向(direction vector)，矢量方向是三维空间中的一条线, 从坐标系原点到x, y, z值确定的那个点，元素围绕这条线旋转angle指定的值



### transform: translateZ(length）  3D平移

#### transform: translateZ(length）

transform: translateZ(length)是3D Transformaton特有的，其他两个2D中就有
       translateZ  它不能是百分比 值; 那样的移动是没有意义的。

#### transform: translate3d(translateX,translateY,translateZ);

​       translateZ  它不能是百分比 值; 那样的移动是没有意义的。



### 灭点

指的是立体图形各条边的延伸线所产生的相交点。透视点的消失点

​    原理：

​        景深越大，灭点越远，元素变形更小

​        景深越小，灭点越近，元素变形更大



### transform-style: preserve-3d;  3D舞台

该元素不会被继承    写在父元素（作用于子元素  ）

```js
flat             //设置元素的子元素位于该元素的平面中。
preserve-3d      //指示元素的子元素应位于 3D 空间中。
```

设置元素的子元素是位于 3D 空间中还是平面中。

### backface-visibility: hidden;  开启背面透不透明

```js
isible
背面朝向用户时可见。
hidden
背面朝向用户时不可见。
```

详细见例子  正方体旋转

## css3过渡

### transition-property 

指定应用过渡属性的名称

### transition-duration

属性以秒或毫秒为单位指定过渡动画所需的时间。

### transition-timing-function

CSS属性受到 transition的影响，会产生不断变化的中间值

```
属性值：(ease默认值)
   1、ease：（加速然后减速）默认值，ease函数等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0).
   2、linear：（匀速），linear 函数等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0).
   3、ease-in：(加速)，ease-in 函数等同于贝塞尔曲线(0.42, 0, 1.0, 1.0).
   4、ease-out：（减速），ease-out 函数等同于贝塞尔曲线(0, 0, 0.58, 1.0).
   5、ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)
   6、cubic-bezier： 贝塞尔曲线
   7、step-start：等同于steps(1,start)
         step-end：等同于steps(1,end)
         steps(<integer>,[,[start|end]]?)
                第一个参数：必须为正整数，指定函数的步数
                第二个参数：指定每一步的值发生变化的时间点（默认值end）
```

### transition-delay

transition-delay属性规定了在过渡效果开始作用之前需要等待的时间。

### 监听transition完成

```js
addEventListenter("transitionend",function(){console.log("监听完成 会触发两次")})
```

### css3天坑

transition在元素首次渲染还没有结束的情况下是不会触发的

```asp
<style type="text/css">
    #test{
        width: 100px;
        height: 100px;			
        transition-property: width;
        transition-duration: 2s;
    }
</style>
<body>
    <div id="test"></div>
</body>
<script type="text/javascript">
    //transition在元素首次渲染还没有结束的情况下是不会被触发的	
    window.onload=function(){
        var test = document.createElement("div");
        test.style.width="300px";
    }
    
    // 原因transition渲染的会比较慢 所以加个window.onload
    
    
    //  对比  直接进行到初步渲染
    var test = document.createElement("div");
    test.style.width="300px";
</script>
```

