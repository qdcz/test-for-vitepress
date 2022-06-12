import{_ as s,c as n,o as a,a as e}from"./app.7831a705.js";const k='{"title":"linux\u4E0B\u5B89\u88C5redis","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u8FDB\u5165redis\u547D\u4EE4\u754C\u9762","slug":"%E8%BF%9B%E5%85%A5redis%E5%91%BD%E4%BB%A4%E7%95%8C%E9%9D%A2"},{"level":2,"title":"\u7ED9\u65B0\u94FE\u63A5\u547D\u540D","slug":"%E7%BB%99%E6%96%B0%E9%93%BE%E6%8E%A5%E5%91%BD%E5%90%8D"}],"relativePath":"environmentConstruction/redis\u79BB\u7EBF\u5B89\u88C5.md","lastUpdated":1654420195118}',p={},r=e(`<h1 id="linux%E4%B8%8B%E5%AE%89%E8%A3%85redis" tabindex="-1">linux\u4E0B\u5B89\u88C5redis</h1><p><a href="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/install%20pack/redis-6.2.6.tar.gz" target="_blank" rel="noopener noreferrer">\u5B89\u88C5\u5305\u94FE\u63A5</a></p><div class="language-shell line-numbers-mode"><pre><code><span class="token function">tar</span> -xvf xxx.tar.gz   		\u89E3\u538B
<span class="token comment"># \u8FDB\u5165\u5230\u5B89\u88C5\u6587\u4EF6\u5939\u8DEF\u5F84\u5185</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>  		\u5B89\u88C5redis  ---------<span class="token punctuation">(</span>\u5982\u679C\u6CA1\u6709gcc \u9700\u8981\u81EA\u5DF1\u5B89\u88C5<span class="token punctuation">)</span>
<span class="token function">mv</span> redis.conf <span class="token number">6379</span>.conf  	\u4FEE\u6539\u6587\u4EF6\u540D\u5B57

<span class="token comment"># \u4FEE\u65396379.conf\u914D\u7F6E\u6587\u4EF6</span>
<span class="token function">vim</span> <span class="token number">6379</span>.conf 			\u5982\u4E0B\uFF1A
<span class="token number">69</span>\u884C   <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0  		\u4FEE\u6539\u4E3A\u53EF\u4EE5\u8FDC\u7A0B\u8FDE\u63A5
<span class="token number">94</span>\u884C	  protected-mode no      \u8FD0\u884C\u5916\u90E8\u8FDC\u7A0B\u8FDE\u63A5
<span class="token number">257</span>\u884C  daemonize <span class="token function">yes</span>			\u8BA9redis\u5728linux\u540E\u53F0\u8FD0\u884C
<span class="token number">302</span>\u884C  logfile /usr/cxy/application/redis-6.2.6/access.log    \u6539\u6210\u8FD9\u4E2A   access.log\u6587\u4EF6\u81EA\u5EFA  \u9700\u8981chmod <span class="token number">777</span> access.log \u7ED9\u6743\u9650
<span class="token number">455</span>\u884C  <span class="token function">dir</span> /usr/cxy/application/redis-6.2.6/dbfiles/			\u6539\u6210\u8FD9\u4E2A    dbfiles\u6587\u4EF6\u5939\u81EA\u5EFA   \u9700\u8981chmod <span class="token number">777</span> ./dbfiles \u7ED9\u6743\u9650
<span class="token number">901</span>\u884C  requirepass <span class="token number">123456</span>	 \u4FEE\u6539\u5BC6\u7801,\u9ED8\u8BA4\u65E0\u5BC6\u7801 

<span class="token comment"># \u5C06 redis_init_script \u6587\u4EF6\u62F7\u8D1D\u5230\u6307\u5B9A\u8DEF\u5F84\uFF08\u5728utils\u6587\u4EF6\u5939\u4E0B\uFF09</span>
<span class="token function">cp</span> redis_init_script /etc/init.d/		
<span class="token comment"># \u8FDB\u5165\u5230 /etc/init.d/   \u76EE\u5F55\u4E0B</span>
<span class="token function">vim</span> redis_init_script  	\u4FEE\u6539\u914D\u7F6E\u6211\u6587\u4EF6 \u5982\u4E0B
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language-shell line-numbers-mode"><pre><code><span class="token comment">### BEGIN INIT INFO</span>
<span class="token assign-left variable">REDISPORT</span><span class="token operator">=</span><span class="token number">6379</span>
<span class="token assign-left variable">EXEC</span><span class="token operator">=</span>/usr/local/bin/redis-server
<span class="token assign-left variable">CLIEXEC</span><span class="token operator">=</span>/usr/local/bin/redis-cli

<span class="token assign-left variable">PIDFILE</span><span class="token operator">=</span>/var/run/redis_<span class="token variable">\${REDISPORT}</span>.pid
<span class="token assign-left variable">CONF</span><span class="token operator">=</span><span class="token string">&quot;/usr/cxy/application/redis-6.2.6/<span class="token variable">\${REDISPORT}</span>.conf&quot;</span>    <span class="token comment"># \u4FEE\u6539\u8FD9\u4E2A\u8DEF\u5F84\u6B63\u662Fredis\u5B89\u88C5\u7684\u8DEF\u5F84</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-shell line-numbers-mode"><pre><code><span class="token comment"># \u914D\u7F6E\u6743\u9650</span>
<span class="token function">chmod</span> <span class="token number">777</span> redis_init_script
<span class="token comment"># \u542F\u52A8redis</span>
./redis_init_script start
<span class="token comment"># \u68C0\u6D4Bredis\u8FD0\u884C\u72B6\u6001</span>
<span class="token function">ps</span> -ef <span class="token operator">|</span> <span class="token function">grep</span> redis
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h1 id="%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4" tabindex="-1">\u5E38\u7528\u547D\u4EE4</h1><h2 id="%E8%BF%9B%E5%85%A5redis%E5%91%BD%E4%BB%A4%E7%95%8C%E9%9D%A2" tabindex="-1">\u8FDB\u5165redis\u547D\u4EE4\u754C\u9762</h2><div class="language-shell line-numbers-mode"><pre><code>redis-cli
auth  \u4F60\u8BBE\u7F6E\u7684\u5BC6\u7801
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220105175300.png" alt=""></p><h2 id="%E7%BB%99%E6%96%B0%E9%93%BE%E6%8E%A5%E5%91%BD%E5%90%8D" tabindex="-1">\u7ED9\u65B0\u94FE\u63A5\u547D\u540D</h2><div class="language-shell line-numbers-mode"><pre><code><span class="token comment"># \u65B0\u8FDE\u63A5\u9ED8\u8BA4\u6CA1\u6709\u540D\u5B57</span>
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CLIENT GETNAME
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>

<span class="token comment"># \u8BBE\u7F6E\u540D\u5B57</span>
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CLIENT SETNAME cxy-redis
OK

<span class="token comment"># \u8FD4\u56DE\u540D\u5B57</span>
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CLIENT GETNAME
<span class="token string">&quot;cxy-redis&quot;</span>

<span class="token comment"># \u67E5\u770B\u94FE\u63A5\u5217\u8868</span>
client-list   
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h1 id="window%E4%B8%8B%E5%AE%89%E8%A3%85gui%E5%B7%A5%E5%85%B7%E8%BF%9E%E6%8E%A5linux%E7%9A%84redis" tabindex="-1">window\u4E0B\u5B89\u88C5gui\u5DE5\u5177\u8FDE\u63A5linux\u7684redis</h1><p><a href="https://github.com/qishibo/AnotherRedisDesktopManager/releases" target="_blank" rel="noopener noreferrer">\u53EF\u89C6\u5316\u5DE5\u5177(GUI)</a></p><p>\u5EFA\u8BAE 1.5.5\u7248\u672C</p><div class="language-"><pre><code>\u8D26\u53F7\u9ED8\u8BA4\u662Fdefault
\u5BC6\u7801\u5C31\u662F\u521A\u624D\u8BBE\u7F6E\u7684
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,15),l=[r];function i(t,c,o,b,u,m){return a(),n("div",null,l)}var E=s(p,[["render",i]]);export{k as __pageData,E as default};
