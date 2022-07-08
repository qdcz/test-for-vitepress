import{_ as n,c as s,o as a,a as t}from"./app.1760f824.js";const y='{"title":"\u9501","description":"","frontmatter":{},"headers":[{"level":2,"title":"555","slug":"_555"},{"level":2,"title":"\u6392\u5B83\u9501","slug":"\u6392\u5B83\u9501"},{"level":3,"title":"\u5B9E\u73B0\u601D\u8DEF\u3010\u672C\u5730\u9501\u6CD5\u3011","slug":"\u5B9E\u73B0\u601D\u8DEF\u3010\u672C\u5730\u9501\u6CD5\u3011"}],"relativePath":"service/NodeJs/\u9501.md","lastUpdated":1657011443036}',p={},o=t(`<h1 id="\u9501" tabindex="-1">\u9501</h1><h2 id="_555" tabindex="-1">555</h2><h2 id="\u6392\u5B83\u9501" tabindex="-1">\u6392\u5B83\u9501</h2><p>\u7231\u6BB5</p><h3 id="\u5B9E\u73B0\u601D\u8DEF\u3010\u672C\u5730\u9501\u6CD5\u3011" tabindex="-1">\u5B9E\u73B0\u601D\u8DEF\u3010\u672C\u5730\u9501\u6CD5\u3011</h3><div class="language-JavaScript"><pre><code><span class="token keyword">const</span> <span class="token punctuation">{</span> EventEmitter <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;events&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> uid <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uuid&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>





<span class="token keyword">class</span> <span class="token class-name">MyEmitter</span> <span class="token keyword">extends</span> <span class="token class-name">EventEmitter</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> myEmitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">redLock</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>times <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>  <span class="token comment">// \u5F53\u524D\u6267\u884C\u88AB\u9501\u4F4F\u4E86</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">InitLengthChangeMonitoring_excuteQueue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// \u6DFB\u52A0excuteQueue\u7684\u6570\u7EC4\u957F\u5EA6\u53D8\u5316\u76D1\u542C</span>
    <span class="token function">InitLengthChangeMonitoring_excuteQueue</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> arrayMethods <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> ArrayProto <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">method</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> arrayMethods<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&quot;function&quot;</span> <span class="token operator">&amp;&amp;</span> method <span class="token operator">==</span> <span class="token string">&#39;push&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ArrayProto<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    arrayMethods<span class="token punctuation">[</span><span class="token string">&#39;push&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
                    self<span class="token punctuation">.</span><span class="token function">excuteQueueFn</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>excuteQueue<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                ArrayProto<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> arrayMethods<span class="token punctuation">[</span>method<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        arr<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> ArrayProto<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// \u6267\u884C\u73B0\u573A\u961F\u5217\u4E2D\u6DFB\u52A0\u7684\u64CD\u4F5C\u51FD\u6570(\u4E00\u822C\u662F\u6570\u636E\u5E93\u64CD\u4F5C)</span>
    <span class="token keyword">async</span> <span class="token function">excuteQueueFn</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// console.log(&quot;excuteQueueFn\u7F13\u5B58\u5185\u7684\u5224\u65AD\u961F\u5217\u957F\u5EA6&quot;, num);</span>
        <span class="token keyword">let</span> deleteIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u5220\u9664\u4E0B\u6807</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>flag <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">// \u4E0A\u9501 === \u300B \u5F00\u59CB\u4FBF\u5229\u89E6\u53D1</span>
            <span class="token comment">// \u5FAA\u73AF\u961F\u5217 \u6267\u884C\u961F\u5217\u4E2D\u7684\u51FD\u6570</span>
            <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// \u5982\u679C\u961F\u5217\u4E2D\u7684\u957F\u5EA6\u4E00\u76F4\u5B58\u5728 \u90A3\u4E48\u4ED6\u4F1A\u4E00\u76F4\u6267\u884C\u4E0B\u53BB\u3002</span>
                deleteIndex<span class="token operator">++</span>
                <span class="token comment">// console.log(&quot;555\u6211\u8981\u5F00\u59CB\u6267\u884C\u4E86\u54E6\uFF01&quot;, num);</span>
                <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token keyword">let</span> <span class="token punctuation">{</span> id<span class="token punctuation">,</span> fn <span class="token punctuation">}</span> <span class="token operator">=</span> instance<span class="token punctuation">;</span>
                    <span class="token keyword">let</span> randomId <span class="token operator">=</span> uid<span class="token punctuation">.</span><span class="token function">v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                        myEmitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> <span class="token string">&#39;\u89E3\u9501\u54C8\uFF01&#39;</span><span class="token punctuation">)</span>
                        <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>times<span class="token punctuation">[</span>randomId<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>times<span class="token punctuation">[</span>randomId<span class="token punctuation">]</span><span class="token punctuation">)</span>
                        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u628A\u5B9E\u4F8B\u5E26\u51FA\u53BB; \u7528\u6765\u7ED3\u675F\u9501</span>

                    <span class="token comment">// \u8D85\u65F6\u673A\u5236  \u4E00\u822C\u662F \u5F00\u53D1\u8005\u4F7F\u7528\u8BE5\u65B9\u6CD5\u5FD8\u8BB0\u4F7F\u7528\u89E3\u9501\u6267\u884C\u7684\u8D85\u65F6\u56DE\u8C03</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>times<span class="token punctuation">[</span>randomId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                        <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>times<span class="token punctuation">[</span>randomId<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&quot;\u9519\u8BEF\uFF01(\u7528\u6237\u672A\u8C03\u7528\u89E3\u9501\u529F\u80FD)\u672A\u5728\u89C4\u5B9A\u65F6\u95F4\u5185\u89E3\u9501\uFF0C\u4E3A\u4E86\u907F\u514D\u51FA\u73B0\u6B7B\u9501\uFF0C\u5F3A\u884C\u7ED3\u679C&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u6267\u884C\u5B8C\u6BD5</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>flag <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> deleteIndex<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">addWriteLock</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> errCallback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> id <span class="token operator">=</span> uid<span class="token punctuation">.</span><span class="token function">v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>excuteQueue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            id<span class="token punctuation">,</span>
            <span class="token literal-property property">fn</span><span class="token operator">:</span> callback
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token comment">//  todo \u53BB\u6D88\u8D39\u6570\u7EC4\u5566</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res<span class="token punctuation">,</span> rej</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u8D85\u65F6\u673A\u5236\uFF0C\u5F3A\u884C\u89E3\u9501 \u4E0D\u9020\u6210\u6B7B\u9501\u3002</span>
            self<span class="token punctuation">.</span>times<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">errCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">rej</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// arr.splice(arr.findIndex(i=&gt;i.id==id))</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// \u51FD\u6570\u6267\u884C\u5B8C\u4E86\u8FDB\u884C\u89E3\u9501</span>
            <span class="token comment">// console.log(&#39;addWriteLock&#39;, id);</span>
            myEmitter<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">res</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">clearTimeout</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>times<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token keyword">delete</span> self<span class="token punctuation">.</span>times<span class="token punctuation">[</span>id<span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token comment">/**
 * \u4F7F\u7528\u65B9\u6CD5\uFF1A
 * 
 * 
 */</span>
<span class="token comment">// (async function () {</span>
<span class="token comment">//     await writeLock(&#39;test-locket&#39;, function (lockInstance) {</span>
<span class="token comment">//         // \u6211\u662F\u4E00\u4E9B\u6570\u636E\u5E93\u7684\u64CD\u4F5C</span>
<span class="token comment">//         lockInstance.unlock(); // \u5B8C\u4E8B \u89E3\u9501</span>
<span class="token comment">//     }, () =&gt; {</span>
<span class="token comment">//         // \u6211\u662F\u4E00\u4E2A\u8D85\u65F6\u56DE\u8C03</span>
<span class="token comment">//     })</span>
<span class="token comment">// })()</span>


module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">redLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div>`,6),e=[o];function c(u,l,k,i,r,d){return a(),s("div",null,e)}var f=n(p,[["render",c]]);export{y as __pageData,f as default};
