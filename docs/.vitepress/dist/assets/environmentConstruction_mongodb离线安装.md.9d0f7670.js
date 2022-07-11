import{_ as n,c as s,o as a,a as e}from"./app.f3070ad9.js";const m='{"title":"mongodb centos7 \u4E0A\u79BB\u7EBF\u5B89\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"\u6D4B\u8BD5","slug":"\u6D4B\u8BD5"}],"relativePath":"environmentConstruction/mongodb\u79BB\u7EBF\u5B89\u88C5.md","lastUpdated":1657266098127}',o={},t=e(`<h1 id="mongodb-centos7-\u4E0A\u79BB\u7EBF\u5B89\u88C5" tabindex="-1">mongodb centos7 \u4E0A\u79BB\u7EBF\u5B89\u88C5</h1><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5</h2><p><a href="https://www.mongodb.com/try/download/enterprise" target="_blank" rel="noopener noreferrer">\u5728\u5B98\u7F51\u4E2D\u4E0B\u8F7D\u6307\u5B9A\u7684\u5305</a></p><p>\u7136\u540E\u4F7F\u7528 <code>tar -zxvf mongodb-linux-x86_64-enterprise-rhel70-5.0.9.tgz</code> \u89E3\u538B</p><p><code>mv mongodb-linux-x86_64-enterprise-rhel70-5.0.9 /usr/local</code> \u79FB\u52A8\u5230local\u76EE\u5F55\u4E0B</p><p><code>mv mongodb-linux-x86_64-enterprise-rhel70-5.0.9 mongodb-5.0.9</code> \u4FEE\u6539\u6587\u4EF6\u540D\u5B57</p><p>\u4F7F\u7528 <code>mkdir db</code> \u521B\u5EFA\u6570\u636E\u5B58\u653E\u4F4D\u7F6E</p><p>\u4F7F\u7528 <code>touch mongodb.log</code> \u521B\u5EFA\u65E5\u5FD7\u5B58\u653E\u4F4D\u7F6E</p><p>\u5728bin\u76EE\u5F55\u4E0B\u521B\u5EFA mongodb.conf \u914D\u7F6E\u6587\u4EF6</p><p><code>vi mongodb.conf</code> \u6DFB\u52A0\u4EE5\u4E0B\u914D\u7F6E</p><div class="language-shell"><pre><code><span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">27017</span>
<span class="token assign-left variable">dbpath</span><span class="token operator">=</span>/usr/local/mongodb-5.0.9/data/db
<span class="token assign-left variable">logpath</span><span class="token operator">=</span>/usr/local/mongodb-5.0.9/data/logs/mongodb.log
<span class="token assign-left variable">fork</span><span class="token operator">=</span>true
<span class="token assign-left variable">auth</span><span class="token operator">=</span>false
<span class="token assign-left variable">bind_ip</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0
</code></pre></div><p>\u7136\u540E\u8FDB\u5165bin\u76EE\u5F55\u4E0B\u542F\u52A8 <code>./mongod -f ./mongodb.conf</code></p><p>\u542F\u52A8\u6210\u529F\u540E\u6253\u5370</p><div class="language-shell"><pre><code>about to fork child process, waiting <span class="token keyword">until</span> server is ready <span class="token keyword">for</span> connections.
forked process: <span class="token number">44626</span>
child process started successfully, parent exiting
</code></pre></div><p>\u4F7F\u7528 <code>netstat -ntlp</code> \u67E5\u770B\u5F53\u524D\u6240\u6709tcp\u7AEF\u53E3 \u53EF\u4EE5\u770B\u523027017\u7AEF\u53E3\u5DF2\u7ECF\u542F\u52A8</p><p>\u4F7F\u7528 <code>netstat -ntulp |grep 80</code> \u67E5\u770B\u5F53\u524D\u6240\u670927017\u7AEF\u53E3 \u53EF\u4EE5\u770B\u523027017\u7AEF\u53E3\u5DF2\u7ECF\u542F\u52A8</p><h2 id="\u6D4B\u8BD5" tabindex="-1">\u6D4B\u8BD5</h2><p>\u5728bin\u76EE\u5F55\u4E0B <code>./mongo</code> \u6253\u5F00mongodb</p><div class="language-shell"><pre><code><span class="token punctuation">[</span>root@qdcz bin<span class="token punctuation">]</span><span class="token comment"># ./mongo</span>
MongoDB shell version v5.0.9
connecting to: mongodb://127.0.0.1:27017/?compressors<span class="token operator">=</span>disabled<span class="token operator">&amp;</span><span class="token assign-left variable">gssapiServiceName</span><span class="token operator">=</span>mongodb
Implicit session: session <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span> <span class="token builtin class-name">:</span> UUID<span class="token punctuation">(</span><span class="token string">&quot;5341d8cf-25e2-485d-9e4b-d80e7d2711fc&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
MongoDB server version: <span class="token number">5.0</span>.9
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
Warning: the <span class="token string">&quot;mongo&quot;</span> shell has been superseded by <span class="token string">&quot;mongosh&quot;</span>,
<span class="token function">which</span> delivers improved usability and compatibility.The <span class="token string">&quot;mongo&quot;</span> shell has been deprecated and will be removed <span class="token keyword">in</span>
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
---
The server generated these startup warnings when booting: 
        <span class="token number">2022</span>-07-08T14:08:41.918+08:00: You are running this process as the root user, <span class="token function">which</span> is not recommended
        <span class="token number">2022</span>-07-08T14:08:41.919+08:00: /sys/kernel/mm/transparent_hugepage/enabled is <span class="token string">&#39;always&#39;</span><span class="token builtin class-name">.</span> We suggest setting it to <span class="token string">&#39;never&#39;</span>
        <span class="token number">2022</span>-07-08T14:08:41.919+08:00: /sys/kernel/mm/transparent_hugepage/defrag is <span class="token string">&#39;always&#39;</span><span class="token builtin class-name">.</span> We suggest setting it to <span class="token string">&#39;never&#39;</span>
        <span class="token number">2022</span>-07-08T14:08:41.919+08:00: Soft rlimits <span class="token keyword">for</span> <span class="token function">open</span> <span class="token function">file</span> descriptors too low
        <span class="token number">2022</span>-07-08T14:08:41.919+08:00:         currentValue: <span class="token number">1024</span>
        <span class="token number">2022</span>-07-08T14:08:41.919+08:00:         recommendedMinimum: <span class="token number">64000</span>
---
MongoDB Enterprise <span class="token operator">&gt;</span> 

</code></pre></div><p><code>show dbs</code> \u67E5\u770B\u6240\u6709\u6570\u636E\u5E93</p><div class="language-shell"><pre><code>MongoDB Enterprise <span class="token operator">&gt;</span> show dbs
admin   <span class="token number">0</span>.000GB
config  <span class="token number">0</span>.000GB
<span class="token builtin class-name">local</span>   <span class="token number">0</span>.000GB
<span class="token builtin class-name">test</span>    <span class="token number">0</span>.000GB
MongoDB Enterprise <span class="token operator">&gt;</span> 

</code></pre></div><p><code>db</code> \u5F53\u524D\u9009\u4E2D\u7684\u6570\u636E\u5E93</p><p><code>show tables</code> \u67E5\u770B\u6240\u6709\u8868</p><p><code>db.test.insert({name:&quot;cxy&quot;})</code> \u5411test\u8868\u5185\u63D2\u5165\u4E00\u6761\u6570\u636E \u6CA1\u6709test\u8868\u4F1A\u81EA\u52A8\u521B\u5EFA\u4E00\u5F20test\u8868</p><div class="language-shell"><pre><code>MongoDB Enterprise <span class="token operator">&gt;</span> db.test.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>name:<span class="token string">&quot;cxy&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&quot;nInserted&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
MongoDB Enterprise <span class="token operator">&gt;</span> 

</code></pre></div><p><code>db.test.find()</code> \u67E5\u770B\u5F53\u524D\u6570\u636E\u5E93\u4E0B\u7684test\u8868\u7684\u6240\u6709\u6570\u636E</p><div class="language-shell"><pre><code>MongoDB Enterprise <span class="token operator">&gt;</span> db.test.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;62c7df353e2badb04e797755&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;cxy&quot;</span> <span class="token punctuation">}</span>
MongoDB Enterprise <span class="token operator">&gt;</span> 

</code></pre></div>`,27),p=[t];function c(l,r,i,d,u,k){return a(),s("div",null,p)}var b=n(o,[["render",c]]);export{m as __pageData,b as default};
