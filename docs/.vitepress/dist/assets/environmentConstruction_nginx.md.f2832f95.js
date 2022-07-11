import{_ as n,c as s,o as a,a as e}from"./app.f3070ad9.js";const g='{"title":"1\u3001\u540C\u884C\u5BF9\u6BD4","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9000\u51FAng\u8FDB\u7A0B","slug":"\u9000\u51FAng\u8FDB\u7A0B"},{"level":2,"title":"\u4EE3\u7406\u659C\u6760\u95EE\u9898","slug":"\u4EE3\u7406\u659C\u6760\u95EE\u9898"},{"level":2,"title":"\u91CD\u590D\u51FA\u73B0\u591A\u6B21\u8DE8\u57DF\u5141\u8BB8*","slug":"\u91CD\u590D\u51FA\u73B0\u591A\u6B21\u8DE8\u57DF\u5141\u8BB8"}],"relativePath":"environmentConstruction/nginx.md","lastUpdated":1655984747232}',t={},o=e(`<h1 id="_1\u3001\u540C\u884C\u5BF9\u6BD4" tabindex="-1">1\u3001\u540C\u884C\u5BF9\u6BD4</h1><p>IIS</p><p>Apache</p><p>Tomcat</p><p>Lighttpd</p><p>Nginx\u4F18\u70B9</p><p>5W\u5E76\u53D1\u91CF</p><p>Ng\u91C7\u7528\u4E86\u591A\u8FDB\u7A0B\u548CI/O\u591A\u8DEF\u590D\u7528\uFF08epoll\uFF09\u7684\u5E95\u5C42\u5B9E\u7EBF\u7684</p><h1 id="_2\u3001\u5728\u7EBF\u90E8\u7F72nginx\uFF08\u7B80\u5355\u5B89\u88C5\uFF09" tabindex="-1">2\u3001\u5728\u7EBF\u90E8\u7F72nginx\uFF08\u7B80\u5355\u5B89\u88C5\uFF09</h1><p>1\u3001\u5B89\u88C5gcc\u7F16\u8BD1\u5668\u3001gcc\u80FD\u5904\u7406\u5404\u79CD\u8BED\u8A00 \u4F7F\u7528\u547D\u4EE4 <code>yum install -y gcc</code>\u6765\u5B89\u88C5 \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F <code>gcc-v</code></p><p>2\u3001\u5B89\u88C5pcre \u4F7F\u7528\u547D\u4EE4<code>yum install -y pcre pcre-devel</code> \u6765\u5B89\u88C5 \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F <code>rpm -qa pcre pcre-devel</code></p><p>\u56E0\u4E3Ang\u6709\u7528\u5230pcre\u5E93\uFF08\u517C\u5BB9\u6B63\u5219\u8868\u8FBE\u5F0F\u5E93\uFF09rewrite \u548C http \u6A21\u5757\u90FD\u6709\u7528\u5230\u6B63\u5219\u5E93</p><p>3\u3001zlib</p><p>zlib\u5E93\u63D0\u4F9B\u4E86\u538B\u7F29\u7B97\u6CD5 \u4F7F\u7528\u547D\u4EE4<code>yum install -y zlib zlib-devel</code> \u6765\u5B89\u88C5 \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F <code>rpm -qa zlib zlib-devel</code></p><p>4\u3001OpenSSL \u4F7F\u7528\u547D\u4EE4<code>yum install -y openssl openssl-devel</code> \u6765\u5B89\u88C5 \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F <code>rpm -qa openssl openssl-devel</code></p><p>OpenSSL\u662F\u4E00\u4E2A\u5F00\u653E\u6E90\u4EE3\u7801\u7684\u8F6F\u4EF6\u5E93\u5305</p><p>SSL\uFF1A\u5B89\u5168\u5957\u63A5\u534F\u8BAE\u7684\u7F29\u5199\uFF0C\u53EF\u4EE5\u5728intelnet\u4E0A\u63D0\u4F9B\u79D8\u5BC6\u6027\u4F20\u8F93\u3002</p><p>5\u3001\u5728\u7EBF\u4E0B\u8F7Dng \u4F7F\u7528\u547D\u4EE4<code>wget ng\u7684\u4E0B\u8F7D\u94FE\u63A5</code> \u7136\u540E\u4F7F\u7528<code>tar -zxvf nginx-1.13.9.tar.gz</code> \u89E3\u538B\u5230\u5F53\u524D\u6587\u4EF6\u5939\u6216\u8005\u6307\u5B9A\u6587\u4EF6\u5939</p><p>6\u3001\u8FDB\u5165\u5230ng\u6587\u4EF6\u5939\u5185 \u4F7F\u7528\u547D\u4EE4 <code>./configure</code> \u8FDB\u884C\u7B80\u5355\u5B89\u88C5</p><p>7\u3001\u7136\u540E\u8FD0\u884C <code>make &amp;&amp; make install</code> \u8FDB\u884C\u5168\u90E8\u5B89\u88C5 \uFF08\u9ED8\u8BA4\u5B89\u88C5\u8DEF\u5F84\u662F<code>/usr/local/nginx</code>\uFF09</p><p>8\u3001\u542F\u52A8ng \u8FDB\u5165\u5230sbin \u6587\u4EF6\u5939\u5185 \u8FD0\u884C <code>./nginx</code> \u5373\u8FD0\u884C\u6210\u529F</p><h1 id="_3\u3001\u79BB\u7EBF\u90E8\u7F72nginx\uFF08\u7B80\u5355\u5B89\u88C5\uFF09" tabindex="-1">3\u3001\u79BB\u7EBF\u90E8\u7F72nginx\uFF08\u7B80\u5355\u5B89\u88C5\uFF09</h1><p><a href="http://nginx.org/en/download.html" target="_blank" rel="noopener noreferrer">http://nginx.org/en/download.html</a> \u5728\u5B98\u7F51\u4E0B\u8F7Dng\u5305 \u9009\u62E9linux\u7248 \u7136\u540E\u4E0A\u4F20\u261E\u670D\u52A1\u5668</p><p>\u5B89\u88C5ng\u65F6\u9700\u8981\u518D\u5B89\u88C5\u4E00\u4E9B\u73AF\u5883\u6240\u9700\u7684\u5305</p><p>1\u3001\u8FDB\u5165gcc\u6587\u4EF6\u5939 \u8FD0\u884C <code> rpm -Uvh *.rpm --nodeps --force</code> \u547D\u4EE4 \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F <code>gcc-v</code></p><p>2\u3001\u8FDB\u5165gcc-c++\u6587\u4EF6\u5939 \u8FD0\u884C <code> rpm -Uvh *.rpm --nodeps --force</code> \u547D\u4EE4 \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F <code>g++-v</code></p><p>3\u3001\u5B89\u88C5PCRE \u89E3\u538B <code>tar -zxvf pcre-8.35.tar.gz</code> \u7136\u540E \u7F16\u8BD1 ./configure &amp;&amp; make &amp;&amp; make install</p><p>4\u3001\u5B89\u88C5libtool \u89E3\u538B <code> tar -zxvf libtool-2.4.2.tar.gz</code> \u7136\u540E \u7F16\u8BD1 ./configure &amp;&amp; make &amp;&amp; make install</p><p>5\u3001\u5B89\u88C5ng \u89E3\u538B <code>tar -zxvf nginx-1.13.9.tar.gz</code> \u7136\u540E \u7F16\u8BD1 ./configure &amp;&amp; make &amp;&amp; make install</p><p>\u542F\u52A8ng\u65B9\u5F0F nginx\u5B89\u88C5\u76EE\u5F55\u5730\u5740 -c nginx\u914D\u7F6E\u6587\u4EF6\u5730\u5740 \u5982\u4E0B\uFF1A</p><div class="language-nginx"><pre><code>/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf            \uFF08\u5B89\u88C5\u540E\u7684\u8DEF\u5F84\u4F1A\u88AB\u53D8\u5230/usr/local  \u91CC\u9762\uFF09
</code></pre></div><div class="language-nginx"><pre><code>\u547D\u4EE4\uFF1A 
\u8DEF\u5F84 -s stop 							\u505C\u6B62ng
\u8DEF\u5F84 -s reload  						\u91CD\u542Fng 


netstat -tunlp   						\u67E5\u770B\u7AEF\u53E3\u5360\u7528
netstat -tunlp |grep                      \u67E5\u770B\u6307\u5B9A\u7AEF\u53E3
</code></pre></div><h1 id="_4\u3001\u590D\u6742\u5B89\u88C5" tabindex="-1">4\u3001\u590D\u6742\u5B89\u88C5</h1><p>\u76F8\u5F53\u4E8E\u5728configure\u4E0A\u505A\u4E00\u4E9B\u547D\u4EE4\u7684\u6DFB\u52A0</p><p>\u6CE8\u610F\uFF1A\u8981\u91CD\u65B0\u6DFB\u52A0configure\u540E\u9762\u8DDF\u7684\u540E\u7F00\u5F97\u5378\u8F7Dng\u540E\u91CD\u65B0\u5B89\u88C5</p><div class="language-shell"><pre><code>./configure --prefix<span class="token operator">=</span>/usr/local/nginx --with-http_ssl_module --with-openssl<span class="token operator">=</span>/usr/cxy/openssl-1.1.1l
</code></pre></div><h1 id="_5\u3001\u5378\u8F7Dnginx" tabindex="-1">5\u3001\u5378\u8F7Dnginx</h1><p>1\u3001<code>./nginx -s stop</code> \u5148\u628Ang\u505C\u6389</p><p>2\u3001<code>rm -rf /usr/local/nginx</code> \u5C06ng\u5220\u9664</p><p>3\u3001<code>make clean</code> \u5C06\u5B89\u88C5\u5305\u4E4B\u524D\u7F16\u8BD1\u7684\u73AF\u5883\u6E05\u9664\u6389</p><h1 id="_6\u3001\u65E0\u505C\u6B62\u670D\u52A1\u66F4\u65B0nginx\u7248\u672C" tabindex="-1">6\u3001\u65E0\u505C\u6B62\u670D\u52A1\u66F4\u65B0nginx\u7248\u672C</h1><p>1)\u3001\u5C06\u65E7\u7248\u672C\u7684nginx\u4E0Bsbin\u7684nginx\u8FDB\u884C\u5907\u4EFD</p><div class="language-shell"><pre><code><span class="token builtin class-name">cd</span> /usr/local/nginx/sbin
<span class="token function">mv</span> nginx nginxold
</code></pre></div><p>2)\u3001\u5C06\u65B0\u7248\u672C\u7684\u5B89\u88C5\u76EE\u5F55\u7F16\u8BD1\u540E\u7684objs\u76EE\u5F55\u4E0B\u7684nginx\u6587\u4EF6\u62F7\u8D1D\u5230\u539F\u6765 <code>/usr/local/nginx/sbin</code> \u76EE\u5F55\u4E0B</p><div class="language-shell"><pre><code><span class="token builtin class-name">cd</span> ~/nginx/newVersion/nginx-1.16.1/objs
<span class="token function">cp</span> nginx /usr/local/nginx/sbin
</code></pre></div><p>3)\u3001\u53D1\u9001\u4FE1\u53F7USR2\u7ED9Nginx\u7684\u65E7\u7248\u672C\u5BF9\u5E94\u7684master\u8FDB\u7A0B</p><div class="language-shell"><pre><code><span class="token function">kill</span> -USR2 <span class="token variable"><span class="token variable">\`</span><span class="token function">more</span> /usr/local/logs/nginx.pid<span class="token variable">\`</span></span>
</code></pre></div><p>4)\u3001\u53D1\u9001\u4FE1\u53F7QUIT\u7ED9Nginx\u7684\u65E7\u7248\u672C\u5BF9\u5E94\u7684master\u8FDB\u7A0B</p><div class="language-shell"><pre><code><span class="token function">kill</span> -QUIT <span class="token variable"><span class="token variable">\`</span><span class="token function">more</span> /usr/local/logs/nginx.pid.oldpid<span class="token variable">\`</span></span>
</code></pre></div><h1 id="_7\u3001nginx\u670D\u52A1\u5668\u5347\u7EA7" tabindex="-1">7\u3001nginx\u670D\u52A1\u5668\u5347\u7EA7</h1><p>\u65B9\u6848\u4E00\u3001\u4F7F\u7528nginx\u670D\u52A1\u4FE1\u606F\u5347\u7EA7</p><p>\u5982\u4E0A6</p><p>\u65B9\u6848\u4E8C\u3001\u4F7F\u7528nginx\u5B89\u88C5\u76EE\u5F55\u7684make\u547D\u4EE4\u5347\u7EA7</p><p>1)\u3001\u5C06\u65E7\u7248\u672C\u7684nginx\u4E0Bsbin\u7684nginx\u8FDB\u884C\u5907\u4EFD</p><div class="language-shell"><pre><code><span class="token builtin class-name">cd</span> /usr/local/nginx/sbin
<span class="token function">mv</span> nginx nginxold
</code></pre></div><p>2)\u3001\u5C06\u65B0\u7248\u672C\u7684\u5B89\u88C5\u76EE\u5F55\u7F16\u8BD1\u540E\u7684objs\u76EE\u5F55\u4E0B\u7684nginx\u6587\u4EF6\u62F7\u8D1D\u5230\u539F\u6765 <code>/usr/local/nginx/sbin</code> \u76EE\u5F55\u4E0B</p><div class="language-shell"><pre><code><span class="token builtin class-name">cd</span> ~/nginx/newVersion/nginx-1.16.1/objs
<span class="token function">cp</span> nginx /usr/local/nginx/sbin
</code></pre></div><p>3)\u3001\u8FDB\u5165\u5230\u5B89\u88C5\u76EE\u5F55\uFF08\u6CE8\u610F\u518Dnginx\u76EE\u5F55\u4E0B \u800C\u4E0D\u662Fsbin\u76EE\u5F55\u4E0B\uFF09\uFF0C\u6267\u884Cmake upgrade</p><p>4)\u3001\u9A8C\u8BC1 nginx -V</p><h1 id="_8\u3001user\u6307\u4EE4" tabindex="-1">8\u3001user\u6307\u4EE4</h1><p>\u7528\u4E8E\u914D\u7F6E\u8FD0\u884Cnginx\u670D\u52A1\u5668\u7684worker\u8FDB\u7A0B\u7684\u7528\u6237\u548C\u7528\u6237\u7EC4</p><div class="language-"><pre><code>useradd www   \u4F1A\u5728home\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2Awww\u7684\u7528\u6237
user www      \u8BBE\u7F6E\u4E00\u4E2A\u7528\u6237\u4FE1\u606F  www
\u5728home/www/   \u76EE\u5F55\u4E0B\u653E\u7F6E\u4E00\u4E2Aindex.html\u9875\u9762


\u4FEE\u6539ng\u4E00\u4E2Ahttp\u6A21\u5757\u7684\u914D\u7F6E\uFF08\u53EF\u4EE5\u5148\u770B\u4E0Bng\u6574\u4F53\u914D\u7F6E\u6587\u4EF6\uFF09
user  www;
location /{
	root	/home/www/html
	index	/index.html index.htm
}
</code></pre></div><h1 id="_9\u3001work\u8FDB\u7A0B\u548Cmaster\u8FDB\u7A0B" tabindex="-1">9\u3001work\u8FDB\u7A0B\u548Cmaster\u8FDB\u7A0B</h1><p>\u5982\u679C\u8981\u5173\u95EDwork\u8FDB\u7A0B</p><div class="language-nginx"><pre><code><span class="token comment"># user  nobody;         	# \u7528\u6237\u7EC4</span>
master_process	off    	<span class="token comment"># \u9ED8\u8BA4\u4F7F\u7528on \u5F00\u542F\u5DE5\u4F5C\u8FDB\u7A0B</span>
worker_processes  1		<span class="token comment"># \u7528\u4E8E\u914D\u7F6Enginx\u751F\u6210\u5DE5\u4F5C\u8FDB\u7A0B\u7684\u6570\u91CF\uFF0C\u8FD9\u662Fnginx\u670D\u52A1\u5668\u5B9E\u73B0\u5E76\u53D1\u5904\u7406\u670D\u52A1\u7684\u5173\u952E\u6240\u5728\uFF0C\u5EFA\u8BAE\u4E0E\u670D\u52A1\u5668cpu\u5185\u6838\u6570\u4FDD\u6301\u4E00\u81F4</span>
</code></pre></div><p>\u6307\u5B9Awork\u8FDB\u7A0B\u7684\u6570\u91CF</p><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">2</span></span><span class="token punctuation">;</span>
</code></pre></div><h1 id="_9\u3001ng\u5E38\u4F7F\u7528\u7684\u4E00\u4E9B\u547D\u4EE4" tabindex="-1">9\u3001ng\u5E38\u4F7F\u7528\u7684\u4E00\u4E9B\u547D\u4EE4</h1><div class="language-shell"><pre><code><span class="token function">ps</span> -ef <span class="token operator">|</span> <span class="token function">grep</span> nginx   \u8FC7\u6EE4\u51FA\u5173\u4E8Eng\u7684\u8FDB\u7A0B\u4FE1\u606F
./nginx -t  \u68C0\u67E5config\u914D\u7F6E\u6587\u4EF6\u662F\u5426\u6709\u9519
./nginx -T  \u68C0\u67E5config\u914D\u7F6E\u6587\u4EF6\u662F\u5426\u6709\u9519\u5E76\u6253\u5370\u51FA\u914D\u7F6E\u6587\u4EF6
./nginx -tq \u68C0\u67E5config\u914D\u7F6E\u6587\u4EF6\u662F\u5426\u6709\u9519\u5E76\u6253\u5370\u51FA\u914D\u7F6E\u6587\u4EF6\u4E2D\u51FA\u9519\u7684\u4F4D\u7F6E\u548C\u9519\u8BEF
</code></pre></div><h2 id="\u9000\u51FAng\u8FDB\u7A0B" tabindex="-1">\u9000\u51FAng\u8FDB\u7A0B</h2><div class="language-shell"><pre><code><span class="token function">ps</span> -ef <span class="token operator">|</span> <span class="token function">grep</span> nginx 		\u62FF\u5230\u8FDB\u7A0B\u53F7
<span class="token function">more</span> <span class="token punctuation">..</span>/logs/nginx.pid		\u62FF\u5230\u8FDB\u7A0B\u53F7 \u4E24\u79CD\u65B9\u5F0F\u90FD\u53EF
<span class="token function">kill</span> -<span class="token environment constant">TERM</span> <span class="token number">14270</span>    		\u6740\u6389\u8FDB\u7A0B   \u5173\u4E8E<span class="token environment constant">TERM</span>\u770B\u5982\u4E0B\u8868
</code></pre></div><div class="language-shell"><pre><code>./nginx -s stop 	<span class="token comment"># \u505C\u6B62ng</span>
./nginx -s reload 	<span class="token comment"># \u91CD\u542Fng</span>
./nginx -s start 	<span class="token comment"># \u542F\u52A8ng</span>
nginx -s \u662F\u7ED9nginx\u53D1\u4FE1\u53F7  \u5982\u679C\u672A\u542F\u52A8\u8FC7\u76F4\u63A5 /usr/local/nginx/sbin/nginx \u542F\u52A8\u5373\u53EF

./nginx -s quit     <span class="token comment"># \u89C1\u5982\u4E0B</span>
./nginx -s hub
./nginx -s usr1
./nginx -s usr2
./nginx -s winch

./nginx -g <span class="token string">&quot;pid logs/test.pid&quot;</span>		<span class="token comment"># \u4EE5\u643A\u5E26\u5168\u5C40\u914D\u7F6E\u7684\u65B9\u6CD5\u542F\u52A8ng</span>
</code></pre></div><table><thead><tr><th style="text-align:center;"><strong>TERM, INT</strong></th><th style="text-align:left;">Quick shutdown \u76F4\u63A5\u6740\u6B7B\u8FDB\u7A0B\uFF08\u7C97\u66B4\uFF09</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>QUIT</strong></td><td style="text-align:left;">Graceful shutdown \u4F18\u96C5\u7684\u5173\u95ED\u8FDB\u7A0B,\u5373\u7B49\u8BF7\u6C42\u7ED3\u675F\u540E\u518D\u5173\u95ED\uFF08\u63A8\u8350\u4F7F\u7528\uFF09</td></tr><tr><td style="text-align:center;"><strong>HUP</strong></td><td style="text-align:left;">Configuration reload ,Start the new worker processes with a new configuralltion Gracefully shutdown the old worker processes<br>(\u6539\u53D8\u914D\u7F6E\u6587\u4EF6,\u5E73\u6ED1\u7684\u91CD\u8BFB\u914D\u7F6E\u6587\u4EF6\uFF09</td></tr><tr><td style="text-align:center;"><strong>USR1</strong></td><td style="text-align:left;">Reopen the log files \u91CD\u8BFB\u65E5\u5FD7,\u5728\u65E5\u5FD7\u6309\u6708/\u65E5\u5206\u5272\u65F6\u6709\u7528</td></tr><tr><td style="text-align:center;"><strong>USR2</strong></td><td style="text-align:left;">Upgrade Executable on the fly \u5E73\u6ED1\u7684\u5347\u7EA7</td></tr><tr><td style="text-align:center;"><strong>WINCH</strong></td><td style="text-align:left;">Gracefully shutdown the worker processes \u4F18\u96C5\u5173\u95ED\u65E7\u7684\u8FDB\u7A0B(\u914D\u5408USR2\u6765\u8FDB\u884C\u5347\u7EA7)</td></tr></tbody></table><div class="language-shell"><pre><code><span class="token comment"># \u5982\u679C\u6211\u5220\u9664\u4E86ng\u7684\u65E5\u5FD7  \u8FD9\u65F6\u6211\u4E0D\u60F3\u91CD\u542F \u53C8\u8981\u91CD\u65B0\u751F\u6210\u65E5\u5FD7\u53EF\u4EE5\u4F7F\u7528</span>
<span class="token function">kill</span> -USR1 <span class="token variable"><span class="token variable">\`</span><span class="token function">more</span> /usr/local/nginx/logs/nginx.pid<span class="token variable">\`</span></span>

<span class="token comment"># \u53EA\u4F18\u96C5\u7684\u5173\u95EDwork\u8FDB\u7A0B</span>
<span class="token function">kill</span> -WINCH <span class="token number">14270</span>

<span class="token comment"># \u4E0D\u91CD\u542Fnginx\u53C8\u8981\u5E73\u6ED1\u7684\u5347\u7EA7ng</span>
<span class="token function">ps</span> -ef <span class="token operator">|</span> <span class="token function">grep</span> nginx 		\u62FF\u5230\u8FDB\u7A0B\u53F7
<span class="token function">kill</span> -USR2 <span class="token number">14270</span>		
<span class="token function">ps</span> -ef <span class="token operator">|</span> <span class="token function">grep</span> nginx 		\u4F60\u4F1A\u53D1\u73B0\u6709\u4E24\u4E2Amaster\u8FDB\u7A0B\u548Cwork\u8FDB\u7A0B
\u8FDB\u5165\u5230logs\u6587\u4EF6\u5185  \u4F1A\u51FA\u73B0\u4E24\u4E2A\u6587\u4EF6  \u4E00\u4E2A\u662Fnginx.pid.oldbin \u4E00\u4E2A\u662Fnginx.pid
\u5982\u679C\u786E\u5B9A\u670D\u52A1\u5668\u5347\u7EA7\u6210\u529F\u4E4B\u540E  \u6267\u884C  <span class="token function">kill</span> -QUIT \u65E7\u7684\u4E3B\u8FDB\u7A0B\u53F7  \u7136\u540E\u5C31\u5347\u7EA7\u6210\u529F\u4E86
</code></pre></div><h1 id="\u53CD\u5411\u4EE3\u7406" tabindex="-1">\u53CD\u5411\u4EE3\u7406</h1><h2 id="\u4EE3\u7406\u659C\u6760\u95EE\u9898" tabindex="-1"><strong>\u4EE3\u7406\u659C\u6760\u95EE\u9898</strong></h2><p><strong>1.\u4EE5\u4E0B\u662F\u52A0\u4E0D\u52A0\u659C\u6760\u90FD\u662F\u4E00\u6837\u7684\u8DEF\u5F84</strong> \u90FD\u4F1A\u8BBF\u95EE <code>http://10.142.124.221:18080/</code></p><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://10.142.124.221:18080</span><span class="token punctuation">;</span>
        <span class="token comment"># proxy_pass http://10.142.124.221:18080/;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>2.\u5E26\u6709\u524D\u7F00\u7684\u8BDD</strong></p><p>\u7B2C\u4E00\u4E2A\u4F1A\u8FD4\u56DE <code>http://10.142.124.221:18080/server/index.html</code></p><p>\u7B2C\u4E8C\u4E2A\u4F1A\u8FD4\u56DE <code>http://10.142.124.221:18080/index.html</code></p><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /server</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://10.142.124.221:18080</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://10.142.124.221:18080/</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u6216\u8005\u5982\u679C\u60F3\u8FBE\u5230\u7B2C\u4E8C\u4E2A\u7684\u6548\u679C\u4E5F\u53EF\u4EE5\u8FDB\u884C\u5982\u4E0B\u64CD\u4F5C</p><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /proxy_api_out/</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">rewrite</span> ^/proxy_api_out/(.*)$ /<span class="token variable">$1</span> break</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://10.142.124.221:18080</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

\u4EE5\u4E0A\u662F\u4F1A\u5339\u914D\u8DEF\u5F84\u4E0A\u7684/proxy_api_out/  \u5982\u679C\u5339\u914D\u4E0A\u4F1A\u8FDB\u884C\u8DEF\u5F84\u91CD\u5199
</code></pre></div><h2 id="\u91CD\u590D\u51FA\u73B0\u591A\u6B21\u8DE8\u57DF\u5141\u8BB8" tabindex="-1">\u91CD\u590D\u51FA\u73B0\u591A\u6B21\u8DE8\u57DF\u5141\u8BB8*</h2><p>\u53EF\u4EE5\u4F7F\u7528<code>proxy_set_header Origin &quot;&quot;;</code>\u5C06\u4EE3\u7406\u6E90\u7684\u5141\u8BB8\u6240\u6709\u8DE8\u57DF\u6E05\u9664\u6389 \u7136\u540E\u518D\u81EA\u5DF1\u8BBE\u7F6E\u4E0A</p><h1 id="linux-ssl\u81EA\u7B7E\u8BC1\u4E66-nginx-\u5C06http\u5347\u7EA7\u6210https" tabindex="-1">linux+ssl\u81EA\u7B7E\u8BC1\u4E66+nginx \u5C06http\u5347\u7EA7\u6210https</h1><p>nginx \u9700\u8981\u5F00\u542F ssl\u6A21\u5757</p><p>\u6267\u884C\u5982\u4E0B\u547D\u4EE4</p><div class="language-nginx"><pre><code>./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-openssl=/usr/cxy/ssl/openssl-1.1.1

<span class="token comment"># \uFF08/usr/cxy/ssl/openssl-1.1.1   \u662F\u5B58\u653Eopenssl\u6E90\u7801\u7684\u5730\u65B9  \u53EF\u81EA\u884C\u53BBnginx\u5B98\u7F51\u4E0B\u8F7D\uFF09</span>

\u7136\u540Emake 
\u7136\u540Emake install
</code></pre></div><p>1)\u3001\u521B\u5EFACA\u79C1\u94A5\uFF0C \u5229\u7528\u79C1\u94A5\u521B\u5EFACA\u8BC1\u4E66</p><div class="language-shell"><pre><code><span class="token comment">#\u521B\u5EFACA\u79C1\u94A5</span>
openssl genrsa -out rootCA.key <span class="token number">2048</span>
<span class="token comment">#\u521B\u5EFACA\u8BC1\u4E66</span>
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days <span class="token number">1024</span> -out rootCA.crt
</code></pre></div><p>2)\u3001\u521B\u5EFAserver\u79C1\u94A5\u4EE5\u53CACSR</p><div class="language-shell"><pre><code><span class="token comment">#\u521B\u5EFAserver\u79C1\u94A5</span>
openssl genrsa -out control.key <span class="token number">2048</span>
<span class="token comment">#\u6839\u636E\u914D\u7F6E\u8981\u7684openssl\u53C2\u6570\u521B\u5EFA\u670D\u52A1\u5668csr\u6587\u4EF6\uFF0C \u540E\u9762\u4F1A\u7528\u5230</span>
openssl req -new -key control.key -out control.csr -extensions v3_req
</code></pre></div><p>3)\u3001\u4F7F\u7528CA\u8BC1\u4E66\u7ED9server.csr\u505A\u7B7E\u540D</p><div class="language-shell"><pre><code>openssl x509 -req -days <span class="token number">500</span> -in control.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out control.crt -sha256 -extensions v3_req
</code></pre></div><p>4)\u3001\u5C06\u8BC1\u4E66\u653E\u5230nginx\u7684conf\u76EE\u5F55\u4E0B \u5982\u679C\u4E0D\u8FD9\u4E48\u505A \u4F60\u4E5F\u53EF\u5728\u914D\u7F6E\u4E2D\u6307\u5B9A\u8BC1\u4E66\u7684\u4F4D\u7F6E</p><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">ssl_certificate</span>      server.crt</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">ssl_certificate_key</span>  server.key</span><span class="token punctuation">;</span>
</code></pre></div><p>ng\u5B8C\u6574\u914D\u7F6E\u5982\u4E0B\uFF1A</p><div class="language-shell"><pre><code>control <span class="token punctuation">{</span>
    listen       <span class="token number">443</span> ssl<span class="token punctuation">;</span>
    server_name  <span class="token number">192.168</span>.237.128<span class="token punctuation">;</span>

    ssl_certificate      control.crt<span class="token punctuation">;</span>
    ssl_certificate_key  control.key<span class="token punctuation">;</span>
    ssl_session_cache    shared:SSL:1m<span class="token punctuation">;</span>
    ssl_session_timeout  5m<span class="token punctuation">;</span>
    ssl_ciphers  HIGH:<span class="token operator">!</span>aNULL:<span class="token operator">!</span>MD5<span class="token punctuation">;</span>
    ssl_prefer_server_ciphers  on<span class="token punctuation">;</span>
    location / <span class="token punctuation">{</span>
        <span class="token comment"># rewrite ^/snxun/(.*)$ /$1 break;</span>
        proxy_pass http://127.0.0.1:7001<span class="token punctuation">;</span> 
        proxy_pass_header Server<span class="token punctuation">;</span> 
        proxy_set_header Host <span class="token variable">$http_host</span><span class="token punctuation">;</span> 
        proxy_redirect off<span class="token punctuation">;</span> 
        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span> 
        proxy_set_header X-Scheme <span class="token variable">$scheme</span><span class="token punctuation">;</span> 
        proxy_connect_timeout <span class="token number">60</span><span class="token punctuation">;</span> 
        proxy_read_timeout <span class="token number">120</span><span class="token punctuation">;</span>
        root   html<span class="token punctuation">;</span>
        index  index.html index.htm<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h1 id="\u6162\u6162\u5B8C\u5584\u914D\u7F6E\u6587\u4EF6" tabindex="-1">\u6162\u6162\u5B8C\u5584\u914D\u7F6E\u6587\u4EF6</h1><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">8688</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
    <span class="token comment">#charset koi8-r;</span>
    <span class="token directive"><span class="token keyword">access_log</span>  logs/8688_haojin.access.log  main</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">error_log</span>   logs/8688_haojin.error.log</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> /haojin-api-out/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Origin&#39;</span> <span class="token string">&quot;*&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Methods&#39;</span> <span class="token string">&#39;GET, POST, OPTIONS&#39;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Headers&#39;</span> <span class="token string">&#39;DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,vaildMin,If-Modified-Since,Cache-Control,Content-Type,Range,pageNum,pageSize&#39;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Expose-Headers&#39;</span> <span class="token string">&#39;Content-Length,Content-Range&#39;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> Pragma <span class="token string">&quot;no-cache&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">&quot;no-store, no-cache, must-revalidate, post-check=0, pre-check=0&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://10.249.0.31:18080/</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Origin <span class="token string">&quot;&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = OPTIONS)</span><span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> /haojin-api-in/</span> <span class="token punctuation">{</span>
        <span class="token comment"># rewrite ^/haojin-api/(.*)$ /$1 break;</span>
        <span class="token comment"># add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span>
        <span class="token comment"># add_header &#39;Access-Control-Allow-Origin&#39; $http_origin;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Origin&#39;</span> <span class="token string">&quot;*&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Methods&#39;</span> <span class="token string">&#39;GET, POST, OPTIONS&#39;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Headers&#39;</span> <span class="token string">&#39;DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,vaildMin,If-Modified-Since,Cache-Control,Content-Type,Range,pageNum,pageSize&#39;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Expose-Headers&#39;</span> <span class="token string">&#39;Content-Length,Content-Range&#39;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> Pragma <span class="token string">&quot;no-cache&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">&quot;no-store, no-cache, must-revalidate, post-check=0, pre-check=0&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://10.142.124.221:18080/</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Origin <span class="token string">&quot;&quot;</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = OPTIONS)</span><span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-shell"><pre><code><span class="token comment">#user  nobody;</span>
worker_processes  <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>


events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>

    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#keepalive_timeout  0;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    control <span class="token punctuation">{</span>
        listen       <span class="token number">8688</span><span class="token punctuation">;</span>
        server_name  localhost<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

         location / <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
	    <span class="token comment"># proxy_pass http://10.249.0.31:18080;</span>
	    proxy_pass http://10.142.124.221:18080<span class="token punctuation">;</span>
            add_header Access-Control-Allow-Methods *<span class="token punctuation">;</span>
            add_header Access-Control-Max-Age <span class="token number">3600</span><span class="token punctuation">;</span>
            <span class="token comment"># add_header Access-Control-Allow-Credentials true;</span>
            <span class="token comment"># more_clear_headers Access-Control-Allow-Origin;</span>
            <span class="token comment"># add_header Access-Control-Allow-Origin $http_origin;</span>
            add_header Access-Control-Allow-Headers 
            <span class="token variable">$http_access_control_request_headers</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request_method</span> <span class="token operator">=</span> OPTIONS<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token builtin class-name">return</span> <span class="token number">200</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect control error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI control listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>
    
    
    control <span class="token punctuation">{</span>
        listen       <span class="token number">7001</span><span class="token punctuation">;</span>
        server_name  localhost<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

         location / <span class="token punctuation">{</span>
             root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
            proxy_pass http://101.231.77.77:28088/<span class="token punctuation">;</span>
             add_header Access-Control-Allow-Methods *<span class="token punctuation">;</span>
            add_header Access-Control-Max-Age <span class="token number">3600</span><span class="token punctuation">;</span>
            <span class="token comment"># add_header Access-Control-Allow-Credentials true;</span>
            <span class="token comment"># more_clear_headers Access-Control-Allow-Origin;</span>
            <span class="token comment"># add_header Access-Control-Allow-Origin $http_origin;</span>
            add_header Access-Control-Allow-Headers 
            <span class="token variable">$http_access_control_request_headers</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request_method</span> <span class="token operator">=</span> OPTIONS<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token builtin class-name">return</span> <span class="token number">200</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect control error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI control listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>


    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    <span class="token comment">#control {</span>
    <span class="token comment">#    listen       8000;</span>
    <span class="token comment">#    listen       somename:8080;</span>
    <span class="token comment">#    server_name  somename  alias  another.alias;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>


    <span class="token comment"># HTTPS control</span>
    <span class="token comment">#</span>
    <span class="token comment">#control {</span>
    <span class="token comment">#    listen       443 ssl;</span>
    <span class="token comment">#    server_name  localhost;</span>

    <span class="token comment">#    ssl_certificate      cert.pem;</span>
    <span class="token comment">#    ssl_certificate_key  cert.key;</span>

    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="token comment">#    ssl_session_timeout  5m;</span>

    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>

<span class="token punctuation">}</span>

</code></pre></div><div class="language-shell"><pre><code>./nginx -s reload  				// \u91CD\u542F
</code></pre></div><h1 id="\u4E2A\u4EBA\u8BB0\u5F55" tabindex="-1">\u4E2A\u4EBA\u8BB0\u5F55</h1><p>P25</p><p><a href="https://www.bilibili.com/video/BV1og411T76d?p=25&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1og411T76d?p=25&amp;spm_id_from=pageDriver</a></p>`,107),p=[o];function c(l,i,r,k,d,u){return a(),s("div",null,p)}var h=n(t,[["render",c]]);export{g as __pageData,h as default};
