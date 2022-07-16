import{_ as e,c as s,o as t,a as o}from"./app.71728ad2.js";const E='{"title":"1\u3001\u79BB\u7EBF\u90E8\u7F72mysql8.0.27\u7248\u672C","description":"","frontmatter":{},"headers":[],"relativePath":"environmentConstruction/mysql\u79BB\u7EBF\u5B89\u88C5.md","lastUpdated":1654431478124}',n={},a=o(`<h1 id="_1\u3001\u79BB\u7EBF\u90E8\u7F72mysql8-0-27\u7248\u672C" tabindex="-1">1\u3001\u79BB\u7EBF\u90E8\u7F72mysql8.0.27\u7248\u672C</h1><p><a href="https://downloads.mysql.com/archives/community/" target="_blank" rel="noopener noreferrer">mysql\u4E0B\u8F7D\u5730\u5740</a></p><p>1.\u4E0B\u8F7D\u6307\u5B9A\u7248\u672C\u7684\u5305</p><p>2.\u4F7F\u7528 <code>tar -xvf mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz</code> \u89E3\u538B</p><p>3.\u6DFB\u52A0\u7528 <code>useradd -s /sbin/nologin -M mysql </code></p><p>4.\u521D\u59CB\u5316mysql <code>./mysqld --initialize --user=mysql</code></p><p>\u7F16\u8BD1\u5B8C \u4F1A\u628A\u5BC6\u7801\u6253\u51FA\u6765 \u4F8B\u5982\uFF1A</p><div class="language-"><pre><code>2021-12-13T06:11:47.879663Z 0 [Warning] [MY-011070] [Server] &#39;Disabling symbolic links using --skip-symbolic-links (or equivalent) is the default. Consider not using this option as it&#39; is deprecated and will be removed in a future release.
2021-12-13T06:11:47.879733Z 0 [System] [MY-013169] [Server] /usr/cxy/application/mysql-8.0.27-linux-glibc2.12-x86_64/bin/mysqld (mysqld 8.0.27) initializing of server in progress as process 8531
2021-12-13T06:11:47.929457Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-12-13T06:11:48.389073Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-12-13T06:11:49.228364Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2021-12-13T06:11:49.228379Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2021-12-13T06:11:49.302201Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: qZk/uB&lt;zC2Ng  vsdIP/*Tq8f*	
</code></pre></div><p>qZk/uB&lt;zC2Ng \u5C31\u662F\u5BC6\u7801</p><ol start="5"><li><p>\u4F7F\u7528 <code>cp ../support-files/mysql.server /etc/init.d/mysqld</code> \u62F7\u8D1D\u6587\u4EF6\u5230etc\u76EE\u5F55\u4E0B</p><p>\u7136\u540E\u4F7F\u7528 <code>vi /etc/my.cnf </code> \u6253\u5F00mysql\u914D\u7F6E\u6587\u4EF6 \u91CD\u65B0\u4FEE\u6539\u91CC\u9762\u5185\u5BB9</p><div class="language-mysql"><pre><code>\u5C06\u6587\u4EF6\u5185\u7684\u4FE1\u606F\u5220\u9664\uFF0C\u66FF\u6362\u5982\u4E0B

[mysqld]
basedir=/usr/cxy/application/mysql-8.0.27-linux-glibc2.12-x86_64
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
character-set-server=utf8
[client]
socket=/var/lib/mysql/mysql.sock
default-character-set=utf8
</code></pre></div></li></ol><p>6.\u4F7F\u7528 <code>service mysqld start</code>\u542F\u52A8\u670D\u52A1</p><p><img src="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213153701.png" alt=""></p><h1 id="\u67420\uFF1A\u5E38\u7528\u547D\u4EE4" tabindex="-1">\u67420\uFF1A\u5E38\u7528\u547D\u4EE4</h1><div class="language-js"><pre><code>service mysqld start		\u542F\u52A8mysql\u670D\u52A1
service mysqld restart		\u91CD\u542Fmysql\u670D\u52A1
</code></pre></div><h1 id="\u67421\uFF1A\u4FEE\u6539\u5BC6\u7801" tabindex="-1">\u67421\uFF1A\u4FEE\u6539\u5BC6\u7801</h1><p>\u4F7F\u7528 <code>./mysql -uroot -p</code>\u8F93\u5165\u8D26\u53F7\u5BC6\u7801\u8FDB\u5165\u6570\u636E\u5E93</p><p>\u4F7F\u7528 <code>alter user &#39;root&#39;@&#39;localhost&#39; identified by &#39;cz532911&#39;;</code> \u5C06\u6570\u636E\u5E93\u5BC6\u7801\u4FEE\u6539\u6210 cz532911</p><p>\u4F7F\u7528 <code>quit</code> \u9000\u51FA\u6570\u636E\u5E93</p><p><img src="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213154000.png" alt=""></p><p>GRANT ALL PRIVILEGES ON <em>.</em> TO &#39;root&#39;@&#39;%&#39; WITH GRANT OPTION</p><div class="language-"><pre><code>./mysql -u root -pvmwaremysql&gt;use mysql;
update user set host = &#39;%&#39; where user = &#39;root&#39;;
select host, user from user

</code></pre></div><h1 id="\u67422\uFF1A\u4F7F\u7528navicat\u8FDE\u63A5\u6570\u636E\u5E93\u51FA\u73B01130\u9519\u8BEF" tabindex="-1">\u67422\uFF1A\u4F7F\u7528Navicat\u8FDE\u63A5\u6570\u636E\u5E93\u51FA\u73B01130\u9519\u8BEF</h1><p>1.\u6539\u8868\u6CD5</p><p>\u4F60\u7684\u5E10\u53F7\u4E0D\u5141\u8BB8\u4ECE\u8FDC\u7A0B\u767B\u9646\uFF0C\u53EA\u80FD\u5728localhost\u3002\u8FD9\u4E2A\u65F6\u5019\u53EA\u8981\u5728localhost\u7684\u90A3\u53F0\u7535\u8111\u767B\u5165MySQL\u540E\uFF0C\u66F4\u6539&quot;MySQL&quot;\u6570\u636E\u5E93&quot;user&quot;\u8868\u91CC\u7684&quot;host&quot;\u9879\uFF0C\u5C06&quot;localhost&quot;\u6539\u6210&quot;%&quot;</p><div class="language-"><pre><code>mysql -uroot -p #\u767B\u5F55

use mysql; 			  #\u9009\u62E9\u6570\u636E\u5E93
update user set host = &#39;%&#39; where user = &#39;root&#39;;
FLUSH PRIVILEGES; 	   #\u5237\u65B0\u6743\u9650
</code></pre></div><p><img src="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213162500.png" alt=""></p><h1 id="\u67423\uFF1A\u4F7F\u7528navicat\u8FDE\u63A5\u6570\u636E\u5E93\u51FA\u73B02059\u9519\u8BEF" tabindex="-1">\u67423\uFF1A\u4F7F\u7528Navicat\u8FDE\u63A5\u6570\u636E\u5E93\u51FA\u73B02059\u9519\u8BEF</h1><p>mysql8 \u4E4B\u524D\u7684\u7248\u672C\u4E2D\u52A0\u5BC6\u89C4\u5219\u662Fmysql_native_password,\u800C\u5728mysql8\u4E4B\u540E,\u52A0\u5BC6\u89C4\u5219\u662Fcaching_sha2_password</p><p>\u4FEE\u6539\u52A0\u5BC6\u89C4\u5219\u5982\u4E0B\uFF1A</p><div class="language-"><pre><code>mysql -uroot -p #\u767B\u5F55

use mysql; #\u9009\u62E9\u6570\u636E\u5E93
# \u8FDC\u7A0B\u8FDE\u63A5\u8BF7\u5C06&#39;localhost&#39;\u6362\u6210&#39;%&#39;
ALTER USER &#39;root&#39;@&#39;%&#39; IDENTIFIED BY &#39;123456&#39; password  EXPIRE NEVER; 	   #\u66F4\u6539\u52A0\u5BC6\u65B9\u5F0F
ALTER USER &#39;root&#39;@&#39;%&#39; IDENTIFIED WITH mysql_native_password BY &#39;123456&#39;; #\u66F4\u65B0\u7528\u6237\u5BC6\u7801
FLUSH PRIVILEGES; #\u5237\u65B0\u6743\u9650
</code></pre></div><p><img src="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213162300.png" alt=""></p><p><img src="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213162400.png" alt=""></p><div class="language-"><pre><code>ALTER USER &#39;root&#39;@&#39;%&#39; IDENTIFIED WITH mysql_native_password BY &#39;123456&#39;;
</code></pre></div>`,33),i=[a];function r(l,c,d,p,m,u){return t(),s("div",null,i)}var q=e(n,[["render",r]]);export{E as __pageData,q as default};
