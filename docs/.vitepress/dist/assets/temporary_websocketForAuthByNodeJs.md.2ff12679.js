import{_ as n,c as s,o as a,a as t}from"./app.f3070ad9.js";const g='{"title":"index.js\u6587\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"index.js\u6587\u4EF6","slug":"index-js\u6587\u4EF6"},{"level":2,"title":"client.html","slug":"client-html"},{"level":2,"title":"utils.session.js","slug":"utils-session-js"},{"level":2,"title":"utils.signature.js","slug":"utils-signature-js"}],"relativePath":"temporary/websocketForAuthByNodeJs.md","lastUpdated":1653224484278}',p={},o=t(`<h2 id="index-js\u6587\u4EF6" tabindex="-1">index.js\u6587\u4EF6</h2><div class="language-js"><pre><code>
<span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> WebSocketServer<span class="token punctuation">,</span> Server <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;ws&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> parse <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;url&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> qs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;querystring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> uuid <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uuid&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>generateCookie<span class="token punctuation">,</span>setSession<span class="token punctuation">,</span>checkSession<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./utils/session&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;fs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> _map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> clients <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>




<span class="token comment">// \u4E0D\u9700\u8981\u9274\u6743\u7684\u63A5\u53E3</span>
<span class="token keyword">const</span> noAuth <span class="token operator">=</span> <span class="token punctuation">[</span>
<span class="token string">&#39;/client.html&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;/favicon.ico&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;/hyw/chat/login&#39;</span>
<span class="token punctuation">]</span>

<span class="token comment">/**
* \u521B\u5EFA\u4E00\u4E2Ahttp\u670D\u52A1
  */</span>
  <span class="token keyword">const</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">RequestHeaderProcessing</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// \u8BF7\u6C42\u5934\u5904\u7406</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> pathname <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// \u767B\u5F55\u63A5\u53E3</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pathname <span class="token operator">===</span> <span class="token string">&quot;/hyw/chat/login&quot;</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> postData <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
  req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> postData <span class="token operator">+=</span> chunk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> token <span class="token operator">=</span> uuid<span class="token punctuation">.</span><span class="token function">v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  postData <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>postData<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> <span class="token punctuation">{</span> userName<span class="token punctuation">,</span> userPassword <span class="token punctuation">}</span> <span class="token operator">=</span> postData
  _map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>userName<span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// \u8BBE\u7F6E\u7F13\u5B58\u7684session</span>
  <span class="token function">setSession</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token literal-property property">expires</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1000</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">30</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&quot;\u767B\u9646\u6210\u529F&quot;</span><span class="token punctuation">,</span>
  token<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token function">CookieHandle</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// cookie\u5904\u7406</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>noAuth<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token operator">=&gt;</span>i<span class="token operator">==</span>pathname<span class="token punctuation">)</span><span class="token operator">==</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> isUseful <span class="token operator">=</span> <span class="token function">checkSession</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>connectSid<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>isUseful <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&quot;session\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>


    <span class="token keyword">if</span><span class="token punctuation">(</span>pathname <span class="token operator">===</span> <span class="token string">&quot;/hyw/chat/info&quot;</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> postData <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> postData <span class="token operator">+=</span> chunk<span class="token punctuation">)</span>
        req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>


            res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
                <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&quot;\u67E5\u8BE2\u6210\u529F&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>pathname <span class="token operator">===</span> <span class="token string">&quot;/client.html&quot;</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>  <span class="token comment">// \u8BBF\u95EE\u672C\u5730\u6587\u4EF6</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&quot;./&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;client.html&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// body</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
                res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string-property property">&quot;Content-Type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text/html&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;text/html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// \u8FC7OPTIONS\u8BF7\u6C42</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pathname <span class="token operator">==</span> <span class="token string">&#39;/favicon.ico&#39;</span> <span class="token operator">||</span> pathname <span class="token operator">==</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">&quot;hyw\u4E3B\u9875\u7CFB\u7EDF\uFF01\uFF01!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">404</span><span class="token punctuation">,</span> <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&quot;\u60A8\u8BBF\u95EE\u7684url\u5730\u5740\u975E\u6CD5\u6216\u8005\u4E0D\u5B58\u5728&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">/**
* \u4E2D\u95F4\u4EE3\u7406  \u9274\u6743\u7B49\u64CD\u4F5C
* @param req
* @param res
  */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">RequestHeaderProcessing</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// \u8BBE\u7F6Ecors \u5141\u8BB8\u5BA2\u6237\u7AEF\u8FDB\u884C\u8DE8\u57DF</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Origin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://127.0.0.1:5500&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Headers&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Content-Type,Content-Length, Authorization, Accept,X-Requested-With&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Methods&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PUT,POST,GET,DELETE,OPTIONS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Credentials&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token comment">/**
* \u6743\u9650\u68C0\u9A8C
* @param req
* @param res
  */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">CookieHandle</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> cookie <span class="token operator">=</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>cookie <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>cookie<span class="token punctuation">)</span><span class="token punctuation">{</span>
  cookie<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> arr <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;=&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> key <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>index<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  req<span class="token punctuation">[</span><span class="token string">&#39;connectSid&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
  req<span class="token punctuation">.</span>cookie<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>




<span class="token comment">/**
* \u521B\u5EFAwebsocket\u670D\u52A1
  */</span>
  <span class="token keyword">const</span> wss <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocketServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">noServer</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> wss2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocketServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">noServer</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
* http\u8BF7\u6C42\u5347\u7EA7\u4E3Asocket
  */</span>
  server<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;upgrade&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">upgrade</span><span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> socket<span class="token punctuation">,</span> head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> pathname <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pathname <span class="token operator">===</span> <span class="token string">&#39;/hyw/socket/dev&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
  * \u8EAB\u4EFD\u6821\u9A8C
    */</span>

           <span class="token comment">// console.log(&quot;\u6709\u7528\u6237\u60F3\u8FDE\u63A5\u8FDB\u6765-IP\u5730\u5740\u4E3A:&quot;, request.socket.remoteAddress)</span>
           <span class="token comment">// let queryStr = parse(request.url).search;</span>
           <span class="token comment">// queryStr = queryStr.slice(1);</span>
           <span class="token comment">// let queryObj = queryStr.split(&quot;&amp;&quot;).reduce((T, C) =&gt; {</span>
           <span class="token comment">//     T[C.split(&quot;=&quot;)[0]] = C.split(&quot;=&quot;)[1]</span>
           <span class="token comment">//     return T</span>
           <span class="token comment">// }, {})</span>
           <span class="token comment">// const { AAPID, token } = queryObj</span>
           <span class="token comment">// if (AAPID != &#39;cxy&#39;) return console.log(&quot;APPID\u9519\u8BEF\u6216\u4E0D\u5B58\u5728&quot;);</span>
           <span class="token comment">// if (!token) return console.log(&quot;token\u4E0D\u5B58\u5728&quot;);</span>
           <span class="token comment">//</span>
           <span class="token comment">// let arr = [];</span>
           <span class="token comment">// let mapProxy = _map.values()</span>
           <span class="token comment">// let val = mapProxy.next().value;</span>
           <span class="token comment">// while (val) {</span>
           <span class="token comment">//     arr.push(val)</span>
           <span class="token comment">//     val = mapProxy.next().value;</span>
           <span class="token comment">// }</span>
           <span class="token comment">// mapProxy = undefined;</span>
           <span class="token comment">// val = undefined;</span>
           <span class="token comment">// if (arr.findIndex(i =&gt; i == token) == -1) return console.log(&quot;token\u9519\u8BEF&quot;);</span>
           <span class="token comment">// arr = undefined;</span>


           <span class="token comment">/**
            * \u521B\u5EFA\u4E86\u670D\u52A1\u5668\uFF0C\u5E76\u4E14\u5728\u5185\u90E8\u8C03\u7528\u4E86handleUpgrade\u65B9\u6CD5\uFF0C
            * \u56E0\u6B64\u60A8\u9700\u8981\u901A\u77E5WebSocket\u670D\u52A1\u5668\u5FFD\u7565\u670D\u52A1\u5668\u542F\u52A8\u90E8\u5206\uFF0C\u5E76\u7EE7\u7EED\u4F7F\u7528\u73B0\u6709\u8D44\u6E90\uFF0C\u540C\u65F6\u5C06\u9009\u9879\u6307\u5B9A\u4E3A{ noServer: true }
            */</span>
           wss<span class="token punctuation">.</span><span class="token function">handleUpgrade</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> socket<span class="token punctuation">,</span> head<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">done</span><span class="token punctuation">(</span><span class="token parameter">ws</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               wss<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;connection&#39;</span><span class="token punctuation">,</span> ws<span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>pathname <span class="token operator">===</span> <span class="token string">&#39;/hyw/prod&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wss2<span class="token punctuation">.</span><span class="token function">handleUpgrade</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> socket<span class="token punctuation">,</span> head<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">done</span><span class="token punctuation">(</span><span class="token parameter">ws</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wss2<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;connection&#39;</span><span class="token punctuation">,</span> ws<span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    socket<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;HTTP/1.1 404 not find\\r\\n\\r\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;upgrade\u51FD\u6570\u5904\u7406\u9519\u8BEF&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">/**
* socket\u5B9E\u4F8B\u76D1\u542C
  */</span>
  wss<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;connection&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">connection</span><span class="token punctuation">(</span><span class="token parameter">ws<span class="token punctuation">,</span> request</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  clients<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u7528\u6237\u8FDE\u63A5\u6210\u529F!&quot;</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>socket<span class="token punctuation">.</span>remoteAddress<span class="token punctuation">,</span>request<span class="token punctuation">.</span>cookie<span class="token punctuation">,</span>request<span class="token punctuation">.</span>cookies<span class="token punctuation">)</span>
  ws<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span>a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u670D\u52A1\u7AEF\u63A5\u53D7\u5230\u7684\u6D88\u606F:&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;Binary Message&#39;</span><span class="token punctuation">,</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u5173\u95ED\u672A\u6FC0\u6D3B\u7684</span>
<span class="token comment">// const interval = setInterval(function ping() {</span>
<span class="token comment">//     wss.clients.forEach(function each(ws) {</span>
<span class="token comment">//         console.log(ws.isAlive)</span>
<span class="token comment">//         // if (ws.isAlive === false) return ws.terminate();</span>
<span class="token comment">//</span>
<span class="token comment">//         // ws.isAlive = false;</span>
<span class="token comment">//         // ws.ping();</span>
<span class="token comment">//     });</span>
<span class="token comment">// }, 1000);</span>

wss<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;close&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token function">clearInterval</span><span class="token punctuation">(</span>interval<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>









<span class="token comment">/**
* \u76D1\u542Chttp\u670D\u52A1\u7AEF\u53E3
  */</span>
  server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">listening</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F\uFF01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="client-html" tabindex="-1">client.html</h2><div class="language-html"><pre><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>\u539F\u751F\u540E\u7AEF<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u53D1\u751F\u6307\u4EE4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// Example POST method implementation:</span>
    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">postData</span><span class="token punctuation">(</span>url <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// Default options are marked with *</span>
            <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token comment">// *GET, POST, PUT, DELETE, etc.</span>
                <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;no-cors&#39;</span><span class="token punctuation">,</span> <span class="token comment">// no-cors, *cors, same-origin</span>
                <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token string">&#39;no-cache&#39;</span><span class="token punctuation">,</span> <span class="token comment">// *default, no-cache, reload, force-cache, only-if-cached</span>
                <span class="token literal-property property">credentials</span><span class="token operator">:</span> <span class="token string">&#39;same-origin&#39;</span><span class="token punctuation">,</span> <span class="token comment">// include, *same-origin, omit</span>
                <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/json&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;follow&#39;</span><span class="token punctuation">,</span> <span class="token comment">// manual, *follow, error</span>
                <span class="token literal-property property">referrerPolicy</span><span class="token operator">:</span> <span class="token string">&#39;no-referrer&#39;</span><span class="token punctuation">,</span> <span class="token comment">// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url</span>
                <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token comment">// body data type must match &quot;Content-Type&quot; header</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// return response.body</span>
            <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// parses JSON response into native JavaScript objects</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;fetch\u63A5\u53E3\u8BF7\u6C42\u9519\u8BEF&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&quot;\u8BF7\u6C42\u5931\u8D25\uFF01&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">500</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Example POST method implementation:</span>
    <span class="token keyword">function</span> <span class="token function">postAjax</span><span class="token punctuation">(</span>url <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
            <span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">==</span> <span class="token number">4</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">var</span> data <span class="token operator">=</span> xhr<span class="token punctuation">.</span>responseText		<span class="token comment">// \u63A5\u6536\u54CD\u5E94\u4FE1\u606F</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
            xhr<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Content-type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;application/json; charset=utf-8&#39;</span><span class="token punctuation">)</span>	<span class="token comment">// \u8BBE\u7F6EContent-type</span>
            xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">//\u53D1\u9001\u8BF7\u6C42\u5230\u670D\u52A1\u5668</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>




    <span class="token keyword">class</span> <span class="token class-name">WebSocketProxy</span> <span class="token punctuation">{</span>
        <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>url <span class="token operator">=</span> arg<span class="token punctuation">.</span>url<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>socket <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>messages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heartPollTime <span class="token operator">=</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>


            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u521D\u59CB\u5316\u521B\u5EFA</span>
        <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>WebSocket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Sorry! Your browser doesn\\&#39;t support WebSocket&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Connection already exist&#39;</span><span class="token punctuation">)</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">)</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">create socket with url: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>url<span class="token punctuation">,</span> <span class="token string">&#39;echo-protocol&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">const</span> self <span class="token operator">=</span> <span class="token keyword">this</span>
                <span class="token comment">// \u8FDE\u63A5\u6210\u529F\u540E\u7684\u56DE\u8C03\u51FD\u6570</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">.</span><span class="token function-variable function">onopen</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;socket\u8FDE\u63A5\u6210\u529F!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// \u8FDE\u63A5\u5931\u8D25\u540E\u7684\u56DE\u8C03\u51FD\u6570</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;socket\u8FDE\u63A5\u5931\u8D25!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    self<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// \u8FDE\u63A5\u5173\u95ED\u540E\u7684\u56DE\u8C03\u51FD\u6570</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">.</span><span class="token function-variable function">onclose</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;socket\u8FDE\u63A5\u5DF2\u65AD\u5F00!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    self<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>


                <span class="token comment">// \u6D88\u606F\u901A\u77E5</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;message&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    self<span class="token punctuation">.</span>messages<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">777</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;[WebSocketProxy] &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>

                <span class="token comment">// \u5FC3\u8DF3\u673A\u5236</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token comment">// this.socket.send(JSON.stringify({ &quot;event&quot;: &quot;HeartBeat&quot; }))</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heartPollTime<span class="token punctuation">)</span>

            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// socket\u65E5\u5FD7\u6253\u5370</span>
        <span class="token function">log</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> prefix <span class="token operator">=</span> <span class="token string">&#39;[WebSocketProxy] &#39;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>msg<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5173\u95EDsocket\u8FDE\u63A5</span>
        <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;socket doesn\\&#39;t exist&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reStartHeartBit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>socket <span class="token operator">=</span> <span class="token keyword">undefined</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;socket close!&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u91CD\u65B0\u542F\u52A8\u5FC3\u8DF3\u72B6\u6001</span>
        <span class="token function">reStartHeartBit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer<span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heartTimer <span class="token operator">=</span> <span class="token keyword">undefined</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u53D1\u751F\u6570\u636E</span>
        <span class="token function">send</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">/**
                 * event 
                 *      broadcast    \u5E7F\u64AD
                 *      groupChat
                 *      pointToPoint \u70B9\u5BF9\u70B9
                 * 
                 *      
                 * \u5728\u53D1\u9001\u7684\u4E8C\u8FDB\u5236\u6570\u636E\u4E2D\u643A\u5E26\u4E00\u4E9B\u4E1C\u897F
                 *  \u6BD4\u5982\u8EAB\u4EFD\u9A8C\u8BC1\u4E5F\u53EF  \u4E00\u65E6\u65F6\u95F4\u8FC7\u671F \u7528\u4E00\u4E2Aaction \u901A\u77E5\u7528\u6237\u91CD\u8FDE
                 * */</span>
                <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;event&quot;</span><span class="token operator">:</span> <span class="token string">&quot;broadcast&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;666&quot;</span> <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">;</span>
                <span class="token keyword">const</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;text/plain&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token comment">// console.log(this.socket.readyState);</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>socket<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6D88\u606F\u53D1\u9001\u5931\u8D25&#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">postAjax</span><span class="token punctuation">(</span><span class="token string">&#39;http://127.0.0.1:8080/hyw/chat/login&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">&#39;cxy&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">userPassword</span><span class="token operator">:</span> <span class="token string">&quot;123456&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token function">postAjax</span><span class="token punctuation">(</span><span class="token string">&#39;http://127.0.0.1:8080/hyw/chat/info&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">&#39;cxy&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">userPassword</span><span class="token operator">:</span> <span class="token string">&quot;123456&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">ddd</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ddd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>



        <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>code <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            window<span class="token punctuation">.</span>websocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocketProxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;ws://127.0.0.1:8080/hyw/socket/dev?AAPID=cxy&amp;token=&quot;</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>token
                <span class="token comment">// url: &quot;ws://127.0.0.1:8080/hyw/socket/dev?AAPID=cxy&amp;token=&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>websocket<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>



    document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.btn1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">/**
         * 
         *  CONNECTING \u2014 \u6B63\u5728\u8FDE\u63A5\u4E2D\uFF0C\u5BF9\u5E94\u7684\u503C\u4E3A 0\uFF1B
            OPEN \u2014 \u5DF2\u7ECF\u8FDE\u63A5\u5E76\u4E14\u53EF\u4EE5\u901A\u8BAF\uFF0C\u5BF9\u5E94\u7684\u503C\u4E3A 1\uFF1B
            CLOSING \u2014 \u8FDE\u63A5\u6B63\u5728\u5173\u95ED\uFF0C\u5BF9\u5E94\u7684\u503C\u4E3A 2\uFF1B
            CLOSED \u2014 \u8FDE\u63A5\u5DF2\u5173\u95ED\u6216\u8005\u6CA1\u6709\u8FDE\u63A5\u6210\u529F\uFF0C\u5BF9\u5E94\u7684\u503C\u4E3A 3\u3002
         * */</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524Dsocket\u6240\u5904\u4E8E\u7684\u72B6\u6001&quot;</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span>websocket<span class="token punctuation">.</span>socket<span class="token punctuation">.</span>readyState<span class="token punctuation">)</span>
        window<span class="token punctuation">.</span>websocket<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/**
     * todo
     * \u89E3\u6790\u51FAtoken \u53D1\u9001\u6307\u4EE4\u7684\u65F6\u5019\u90FD\u662F\u8981\u643A\u5E26token\u7684
     * 
     * \u6839\u636Etoken\u5206\u53D1\u5230\u5404\u4E2A\u5206\u7EC4\u4E0A
     * 
     * 
     * 
     * **/</span>

    <span class="token comment">// postAjax(&#39;http://127.0.0.1:8080/login&#39;, { userName: &#39;cxy&#39;, userPassword: &quot;123456&quot; }).then(data =&gt; {</span>
    <span class="token comment">//     postAjax(&#39;http://127.0.0.1:8080/info&#39;).then(res=&gt;{</span>
    <span class="token comment">//         console.log(res)</span>
    <span class="token comment">//     })</span>
    <span class="token comment">//     window.websocket = new WebSocketProxy({</span>
    <span class="token comment">//         url: &quot;ws://127.0.0.1:8080/hyw/socket/dev?AAPID=cxy&amp;token=&quot;</span>
    <span class="token comment">//     })</span>
    <span class="token comment">// });</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="utils-session-js" tabindex="-1">utils.session.js</h2><div class="language-js"><pre><code><span class="token keyword">const</span> signature <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./signature&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> uuid <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uuid&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">saveUninitialized</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">secret</span><span class="token operator">:</span> <span class="token string">&#39;$CxyZrhZyw&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">HttpOnly</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Expires</span><span class="token operator">:</span><span class="token number">1000</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">30</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> Sessions <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// &quot;xxx&quot;:{</span>
    <span class="token comment">//     views:0  // \u8BBF\u95EE\u6B21\u6570</span>
    <span class="token comment">// }</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">/**
 * \u83B7\u53D6\u5F53\u524D\u7F13\u5B58\u7684cookie
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">getSession</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">cookie</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> Sessions<span class="token punctuation">[</span>cookie<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * \u8BBE\u7F6Ecookie
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">setSession</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>opt</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> expires <span class="token punctuation">}</span> <span class="token operator">=</span> opt<span class="token punctuation">;</span>
    <span class="token keyword">let</span> preStr <span class="token operator">=</span> <span class="token string">&#39;connect.sid=&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> sessionId <span class="token operator">=</span> signature<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span><span class="token function">v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>options<span class="token punctuation">.</span>secret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> suffixStr <span class="token operator">=</span> <span class="token string">&#39;; Path=/; HttpOnly&#39;</span><span class="token punctuation">;</span>
    Sessions<span class="token punctuation">[</span>sessionId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">view</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
        expires
    <span class="token punctuation">}</span>
    req<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Set-Cookie&#39;</span><span class="token punctuation">,</span>preStr <span class="token operator">+</span> sessionId <span class="token operator">+</span> suffixStr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment">/**
 * \u68C0\u67E5session\u662F\u5426\u8FC7\u671F
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">checkSession</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">cookie</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> session <span class="token operator">=</span> Sessions<span class="token punctuation">[</span>cookie<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>session<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">// \u68C0\u67E5\u662F\u5426\u8FC7\u8FC7\u671F</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>expires<span class="token punctuation">,</span>view<span class="token punctuation">}</span> <span class="token operator">=</span> session<span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>expires<span class="token punctuation">)</span><span class="token punctuation">{</span>
        session<span class="token punctuation">.</span>view<span class="token operator">++</span>
        <span class="token keyword">return</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> expires
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token keyword">delete</span> Sessions<span class="token punctuation">[</span>cookie<span class="token punctuation">]</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">/**
 * session\u8FC7\u671F\u81EA\u68C0
 */</span>
<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Sessions<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span>

exports<span class="token punctuation">.</span>getSession <span class="token operator">=</span> getSession
exports<span class="token punctuation">.</span>setSession <span class="token operator">=</span> setSession
exports<span class="token punctuation">.</span>checkSession <span class="token operator">=</span> checkSession

</code></pre></div><h2 id="utils-signature-js" tabindex="-1">utils.signature.js</h2><div class="language-js"><pre><code><span class="token comment">/**
 * Module dependencies.
 */</span>

<span class="token keyword">var</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;crypto&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Sign the given \`val\` with \`secret\`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */</span>

exports<span class="token punctuation">.</span><span class="token function-variable function">sign</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> secret</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;string&#39;</span> <span class="token operator">!=</span> <span class="token keyword">typeof</span> val<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&quot;Cookie value must be provided as a string.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;string&#39;</span> <span class="token operator">!=</span> <span class="token keyword">typeof</span> secret<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&quot;Secret string must be provided.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span>  val <span class="token operator">+</span> <span class="token string">&#39;.&#39;</span> <span class="token operator">+</span> crypto
        <span class="token punctuation">.</span><span class="token function">createHmac</span><span class="token punctuation">(</span><span class="token string">&#39;sha256&#39;</span><span class="token punctuation">,</span> secret<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">&#39;base64&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\=+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Unsign and decode the given \`val\` with \`secret\`,
 * returning \`false\` if the signature is invalid.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */</span>

exports<span class="token punctuation">.</span><span class="token function-variable function">unsign</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> secret</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;string&#39;</span> <span class="token operator">!=</span> <span class="token keyword">typeof</span> val<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&quot;Signed cookie string must be provided.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;string&#39;</span> <span class="token operator">!=</span> <span class="token keyword">typeof</span> secret<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&quot;Secret string must be provided.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> str <span class="token operator">=</span> val<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> val<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">,</span> mac <span class="token operator">=</span> exports<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> secret<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token function">sha1</span><span class="token punctuation">(</span>mac<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token function">sha1</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">?</span> str <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Private
 */</span>

<span class="token keyword">function</span> <span class="token function">sha1</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> crypto<span class="token punctuation">.</span><span class="token function">createHash</span><span class="token punctuation">(</span><span class="token string">&#39;sha1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre></div>`,8),c=[o];function e(u,l,k,i,r,d){return a(),s("div",null,c)}var y=n(p,[["render",e]]);export{g as __pageData,y as default};
