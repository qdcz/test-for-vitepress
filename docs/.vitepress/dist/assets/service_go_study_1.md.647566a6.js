import{_ as t,c as n,o as e,a}from"./app.71728ad2.js";const f='{"title":"\u6574\u6570\uFF1A","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6574\u6570\uFF1A","slug":"\u6574\u6570\uFF1A"},{"level":2,"title":"\u65E0\u7B26\u53F7\u6574\u6570\uFF1A","slug":"\u65E0\u7B26\u53F7\u6574\u6570\uFF1A"},{"level":2,"title":"int uint byte","slug":"int-uint-byte"},{"level":2,"title":"\u6D6E\u70B9\u578B\uFF08IEEE-754 \u6807\u51C6\uFF09\uFF1A","slug":"\u6D6E\u70B9\u578B\uFF08ieee-754-\u6807\u51C6\uFF09\uFF1A"},{"level":2,"title":"\u5C3E\u90E8\u90E8\u5206\u53EF\u80FD\u9020\u6210\u7CBE\u5EA6\u635F\u5931","slug":"\u5C3E\u90E8\u90E8\u5206\u53EF\u80FD\u9020\u6210\u7CBE\u5EA6\u635F\u5931"},{"level":2,"title":"\u67E5\u770B\u53D8\u91CF\u7684\u7C7B\u578B","slug":"\u67E5\u770B\u53D8\u91CF\u7684\u7C7B\u578B"},{"level":2,"title":"\u67E5\u770B\u4E00\u4E2A\u53D8\u91CF\u5360\u7528\u7684\u5B57\u8282\u5927\u5C0F","slug":"\u67E5\u770B\u4E00\u4E2A\u53D8\u91CF\u5360\u7528\u7684\u5B57\u8282\u5927\u5C0F"},{"level":2,"title":"\u5B57\u7B26\u7C7B\u578B","slug":"\u5B57\u7B26\u7C7B\u578B"},{"level":2,"title":"\u5B57\u7B26\u4E32\u7C7B\u578B","slug":"\u5B57\u7B26\u4E32\u7C7B\u578B"},{"level":2,"title":"\u5E03\u5C14\u7C7B\u578B","slug":"\u5E03\u5C14\u7C7B\u578B"},{"level":2,"title":"\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C","slug":"\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C"},{"level":2,"title":"\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u4E92\u8F6C","slug":"\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u4E92\u8F6C"},{"level":2,"title":"\u5148\u8DF3\u8FC7\u6307\u9488\u6A21\u5757","slug":"\u5148\u8DF3\u8FC7\u6307\u9488\u6A21\u5757"},{"level":2,"title":"\u5148\u8DF3\u8FC7\u8FD0\u7B97\u7B26\u6A21\u5757","slug":"\u5148\u8DF3\u8FC7\u8FD0\u7B97\u7B26\u6A21\u5757"}],"relativePath":"service/go/study/1.md","lastUpdated":1657713369545}',r={},i=a(`<h2 id="\u6574\u6570\uFF1A" tabindex="-1">\u6574\u6570\uFF1A</h2><p>int8\uFF08-128 -&gt; 127\uFF09 int16\uFF08-32768 -&gt; 32767\uFF09 int32\uFF08-2,147,483,648 -&gt; 2,147,483,647\uFF09 int64\uFF08-9,223,372,036,854,775,808 -&gt; 9,223,372,036,854,775,807\uFF09</p><h2 id="\u65E0\u7B26\u53F7\u6574\u6570\uFF1A" tabindex="-1">\u65E0\u7B26\u53F7\u6574\u6570\uFF1A</h2><p>uint8\uFF080 -&gt; 255\uFF09 uint16\uFF080 -&gt; 65,535\uFF09 uint32\uFF080 -&gt; 4,294,967,295\uFF09 uint64\uFF080 -&gt; 18,446,744,073,709,551,615\uFF09</p><h2 id="int-uint-byte" tabindex="-1">int uint byte</h2><div class="language-golang"><pre><code>var a int = 100;
var b uint = 1;
c byte :=255
</code></pre></div><h2 id="\u6D6E\u70B9\u578B\uFF08ieee-754-\u6807\u51C6\uFF09\uFF1A" tabindex="-1">\u6D6E\u70B9\u578B\uFF08IEEE-754 \u6807\u51C6\uFF09\uFF1A</h2><p>float32\uFF08+- 1e-45 -&gt; +- 3.4 * 1e38\uFF09 float64\uFF08+- 5 1e-324 -&gt; 107 1e308\uFF09</p><h2 id="\u5C3E\u90E8\u90E8\u5206\u53EF\u80FD\u9020\u6210\u7CBE\u5EA6\u635F\u5931" tabindex="-1">\u5C3E\u90E8\u90E8\u5206\u53EF\u80FD\u9020\u6210\u7CBE\u5EA6\u635F\u5931</h2><div class="language-golang"><pre><code>var num1 float32 = -123.00000000091
var num2 float64 = -123.00000000091
fmt.Printf(&quot;\u7C7B\u578B\u662F %T&quot;,num1,num2)

// \u6700\u597D\u7528float64\uFF08\u9ED8\u8BA4\u4E5F\u662Ffloat64\uFF09 \u5982\uFF1A var c = 1.1
</code></pre></div><h2 id="\u67E5\u770B\u53D8\u91CF\u7684\u7C7B\u578B" tabindex="-1">\u67E5\u770B\u53D8\u91CF\u7684\u7C7B\u578B</h2><div class="language-golang"><pre><code>c byte :=255
fmt.Printf(&quot;\u7C7B\u578B\u662F %T&quot;,c)
</code></pre></div><h2 id="\u67E5\u770B\u4E00\u4E2A\u53D8\u91CF\u5360\u7528\u7684\u5B57\u8282\u5927\u5C0F" tabindex="-1">\u67E5\u770B\u4E00\u4E2A\u53D8\u91CF\u5360\u7528\u7684\u5B57\u8282\u5927\u5C0F</h2><div class="language-golang"><pre><code>import unsafe
c byte :=255
fmt.Printf(&quot;\u7C7B\u578B\u662F %d&quot;,unsafe.Sizeof(a))
</code></pre></div><h2 id="\u5B57\u7B26\u7C7B\u578B" tabindex="-1">\u5B57\u7B26\u7C7B\u578B</h2><p>\u5728go\u7684\u5B57\u7B26\u4E2D\u90FD\u662F\u91C7\u7528utf-8\u7F16\u7801 golang\u7684\u5B57\u7B26\u662F\u7531\u5B57\u8282\u7EC4\u6210\u7684</p><div class="language-golang"><pre><code>// \u8FD9\u91CC\u7684\u7801\u503C\u90FD\u662Futf-8\u7801\u503C

var a byte = &#39;a&#39;
fmt.Printf(&quot;a=%c,\u5BF9\u5E94\u7684\u7801\u503Ca=%d&quot;,a,a)  // a=a,\u5BF9\u5E94\u7684\u7801\u503Ca=97


var a byte = &#39;\u9648&#39;
fmt.Printf(&quot;a=%c,\u5BF9\u5E94\u7684\u7801\u503Ca=%d&quot;,a,a)  // \u76F4\u63A5\u6EA2\u51FA
var a int = &#39;\u9648&#39;
fmt.Printf(&quot;a=%c,\u5BF9\u5E94\u7684\u7801\u503Ca=%d&quot;,a,a)  // a=\u9648,\u5BF9\u5E94\u7684\u7801\u503Ca=38472
</code></pre></div><p>\u5B57\u7B26\u7C7B\u578B\u662F\u53EF\u4EE5\u76F4\u63A5\u8FD0\u7B97\u7684 \u5F53\u6210\u4E00\u4E2A\u6574\u5F62</p><div class="language-golang"><pre><code>var a int = &#39;a&#39;
var b = a + 1
fmt.Printf(b)  // 98
fmt.Pr
</code></pre></div><h2 id="\u5B57\u7B26\u4E32\u7C7B\u578B" tabindex="-1">\u5B57\u7B26\u4E32\u7C7B\u578B</h2><div class="language-golang"><pre><code>var a string = &quot;cxy&quot;
fmt.Println(a)  // cxy
</code></pre></div><p>go\u4E2D\u7684\u5B57\u7B26\u4E32\u4E00\u65E6\u8D4B\u503C\u4E4B\u540E\u662F\u4E0D\u53EF\u53D8\u7684\u3002</p><div class="language-golang"><pre><code>var a string = &quot;cxy&quot;
a[0] = &#39;a&#39;  // \u62A5\u9519
</code></pre></div><p>\u53CD\u5F15\u53F7\u5199\u6CD5</p><div class="language-golang"><pre><code>var a string = \`
    c
    x
    y
\`
fmt.Println(a)
</code></pre></div><p>\u591A\u4E2A\u5B57\u7B26\u62FC\u63A5 +\u53F7\u7559\u5728\u4E0A\u884C</p><h2 id="\u5E03\u5C14\u7C7B\u578B" tabindex="-1">\u5E03\u5C14\u7C7B\u578B</h2><p>\u5728\u5185\u5B58\u4E2D\u5360\u7528\u4E00\u4E2A\u5B57\u8282</p><h2 id="\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C" tabindex="-1">\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C</h2><div class="language-golang"><pre><code>var a int // 0
var b float32 // 0
var c float64 // 0
var d bool // false
var e string //&quot;&quot;
</code></pre></div><h2 id="\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u4E92\u8F6C" tabindex="-1">\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u4E92\u8F6C</h2><p>\u57FA\u672C\u6570\u636E\u7C7B\u578B\u65E0\u6CD5\u81EA\u52A8\u8F6C\u6362</p><div class="language-golang"><pre><code>var a int = 100
var c float32 = float32(a)
var b int64 = int64(c)
</code></pre></div><p>go\u7684\u6570\u636E\u7C7B\u578B\u8F6C\u5316\u80FD\u4ECE\u4E00\u4E2A\u5C0F\u8303\u56F4\u8F6C\u5230\u4E00\u4E2A\u5927\u8303\u56F4 \u4E5F\u53EF\u4ECE\u4E00\u4E2A\u5927\u8303\u56F4\u8F6C\u5230\u5C0F\u8303\u56F4\u3002</p><p>\u57FA\u672C\u6570\u636E\u7C7B\u578B\u8F6Cstring(\u7B2C\u4E00\u79CD\u65B9\u6CD5)</p><div class="language-golang"><pre><code>var a int = 100
var str string
str = fmt.Sprintf(&quot;%d&quot;,a)
fmt.Printf(&quot;str type %T str=%v&quot;,str,str)  // str type string str=100

var b float64 = 3.141519265
var str1 string
str1 = fmt.Sprintf(&quot;%f&quot;,b)
fmt.Printf(&quot;str type %T str=%v&quot;,str1,str1)  // str type string str=3.141519

var c bool = false
var str2 string
str2 = fmt.Sprintf(&quot;%t&quot;,c)
fmt.Printf(&quot;str type %T str=%q&quot;,str2,str2)  // str type string str=&quot;false&quot;

var d byte = &#39;a&#39;
var str3 string
str3 = fmt.Sprintf(&quot;%c&quot;,d)
fmt.Printf(&quot;str type %T str=%q&quot;,str3,str3)  // str type string str=&quot;a&quot;
</code></pre></div><p>\u57FA\u672C\u6570\u636E\u7C7B\u578B\u8F6Cstring(\u7B2C\u4E8C\u79CD\u65B9\u6CD5) strconv\u5305\u5B9E\u73B0\u4E86\u57FA\u672C\u6570\u636E\u7C7B\u578B\u548C\u5176\u5B57\u7B26\u4E32\u8868\u793A\u7684\u76F8\u4E92\u8F6C\u6362\u3002</p><div class="language-golang"><pre><code>strconv.FormatInt
strconv.FormatUint
strconv.FormatFloat
strconv.FormatBool
</code></pre></div><p>\u4EE5\u4E0A\u7684%\u5B57\u7B26 \u5177\u4F53\u53C2\u8003\u6587\u6863 <a href="https://studygolang.com/pkgdoc" target="_blank" rel="noopener noreferrer">goApi\u6587\u6863</a></p><p>string \u7C7B\u578B\u8F6C \u57FA\u672C\u6570\u636E\u7C7B\u578B</p><p>\u53C2\u8003\u6587\u6863\u4E2D\u7684 strconv\u5305\u5427</p><p>p50</p><h2 id="\u5148\u8DF3\u8FC7\u6307\u9488\u6A21\u5757" tabindex="-1">\u5148\u8DF3\u8FC7\u6307\u9488\u6A21\u5757</h2><h2 id="\u5148\u8DF3\u8FC7\u8FD0\u7B97\u7B26\u6A21\u5757" tabindex="-1">\u5148\u8DF3\u8FC7\u8FD0\u7B97\u7B26\u6A21\u5757</h2>`,44),o=[i];function l(s,d,g,p,u,c){return e(),n("div",null,o)}var q=t(r,[["render",l]]);export{f as __pageData,q as default};
