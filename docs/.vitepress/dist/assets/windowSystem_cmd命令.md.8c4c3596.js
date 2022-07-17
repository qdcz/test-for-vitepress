import{_ as n,c as s,o as a,a as t}from"./app.71728ad2.js";const m='{"title":"netstat","description":"","frontmatter":{},"headers":[{"level":3,"title":"netstat","slug":"netstat"},{"level":3,"title":"taskkill","slug":"taskkill"}],"relativePath":"windowSystem/cmd\u547D\u4EE4.md","lastUpdated":1657533746323}',e={},p=t(`<h3 id="netstat" tabindex="-1">netstat</h3><div class="language-shell"><pre><code><span class="token operator">&gt;</span>netstat -ano                 \u67E5\u770B\u6240\u6709\u7AEF\u53E3\u5360\u7528\u60C5\u51B5

<span class="token operator">&gt;</span>netstat -ano<span class="token operator">|</span>findstr <span class="token number">8689</span>    \u67E5\u8BE2\u6307\u5B9A\u7AEF\u53E3\u5360\u7528\u60C5\u51B5
    C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>LEGION<span class="token operator">&gt;</span>netstat -ano<span class="token operator">|</span>findstr <span class="token number">8689</span>
    TCP    <span class="token number">0.0</span>.0.0:8689           <span class="token number">0.0</span>.0.0:0              LISTENING       <span class="token number">27872</span>
    TCP    <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:8689              <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:0                 LISTENING       <span class="token number">27872</span>
   
<span class="token operator">&gt;</span>tasklist<span class="token operator">|</span>findstr <span class="token number">27872</span>  \u67E5\u770B\u8FD9\u4E2Apid\u7684 \u56FE\u50CF\u540D<span class="token punctuation">(</span>\u8FDB\u7A0B\u540D<span class="token punctuation">)</span>\u3001PID\u3001\u4F1A\u8BDD\u540D\u3001\u4F1A\u8BDD<span class="token comment">#\u548C\u5185\u5B58\u3002</span>

<span class="token operator">&gt;</span>taskkill /f /t /im node.exe \u7ED3\u675Fnode.exe\u7684\u8FDB\u7A0B\u53CA\u76F8\u5173\u5B50\u8FDB\u7A0B
  /f \u662F\u5F3A\u5236\u505C\u6B62
  /t \u662F\u7ED3\u675F\u5B50\u8FDB\u7A0B
  /im \u662F\u7ED3\u675F\u8FDB\u7A0B
</code></pre></div><h3 id="taskkill" tabindex="-1">taskkill</h3><div class="language-shell"><pre><code>/S    system           \u6307\u5B9A\u8981\u8FDE\u63A5\u7684\u8FDC\u7A0B\u7CFB\u7EDF\u3002

    /U    <span class="token punctuation">[</span>domain<span class="token punctuation">\\</span><span class="token punctuation">]</span>user    \u6307\u5B9A\u5E94\u8BE5\u5728\u54EA\u4E2A\u7528\u6237\u4E0A\u4E0B\u6587\u6267\u884C\u8FD9\u4E2A\u547D\u4EE4\u3002

    /P    <span class="token punctuation">[</span>password<span class="token punctuation">]</span>       \u4E3A\u63D0\u4F9B\u7684\u7528\u6237\u4E0A\u4E0B\u6587\u6307\u5B9A\u5BC6\u7801\u3002\u5982\u679C\u5FFD\u7565\uFF0C\u63D0\u793A
                           \u8F93\u5165\u3002

    /FI   filter           \u5E94\u7528\u7B5B\u9009\u5668\u4EE5\u9009\u62E9\u4E00\u7EC4\u4EFB\u52A1\u3002
                           \u5141\u8BB8\u4F7F\u7528 <span class="token string">&quot;*&quot;</span>\u3002\u4F8B\u5982\uFF0C\u6620\u50CF\u540D\u79F0 eq acme*

    /PID  processid        \u6307\u5B9A\u8981\u7EC8\u6B62\u7684\u8FDB\u7A0B\u7684 PID\u3002
                           \u4F7F\u7528 TaskList \u53D6\u5F97 PID\u3002

    /IM   imagename        \u6307\u5B9A\u8981\u7EC8\u6B62\u7684\u8FDB\u7A0B\u7684\u6620\u50CF\u540D\u79F0\u3002\u901A\u914D\u7B26 <span class="token string">&#39;*&#39;</span>\u53EF\u7528\u6765
                           \u6307\u5B9A\u6240\u6709\u4EFB\u52A1\u6216\u6620\u50CF\u540D\u79F0\u3002

    /T                     \u7EC8\u6B62\u6307\u5B9A\u7684\u8FDB\u7A0B\u548C\u7531\u5B83\u542F\u7528\u7684\u5B50\u8FDB\u7A0B\u3002

    /F                     \u6307\u5B9A\u5F3A\u5236\u7EC8\u6B62\u8FDB\u7A0B\u3002

    /?                     \u663E\u793A\u5E2E\u52A9\u6D88\u606F\u3002

\u7B5B\u9009\u5668:
\u7B5B\u9009\u5668\u540D      \u6709\u6548\u8FD0\u7B97\u7B26                \u6709\u6548\u503C
-----------   ---------------           -------------------------
STATUS        eq, ne                    RUNNING <span class="token operator">|</span>
NOT RESPONDING <span class="token operator">|</span> UNKNOWN
IMAGENAME     eq, ne                    \u6620\u50CF\u540D\u79F0
PID           eq, ne, gt, lt, ge, le    PID \u503C
<span class="token environment constant">SESSION</span>       eq, ne, gt, lt, ge, le    \u4F1A\u8BDD\u7F16\u53F7\u3002
CPUTIME       eq, ne, gt, lt, ge, le    CPU \u65F6\u95F4\uFF0C\u683C\u5F0F\u4E3A
hh:mm:ss\u3002
hh - \u65F6\uFF0C
mm - \u5206\uFF0Css - \u79D2
MEMUSAGE      eq, ne, gt, lt, ge, le    \u5185\u5B58\u4F7F\u7528\u91CF\uFF0C\u5355\u4F4D\u4E3A KB
USERNAME      eq, ne                    \u7528\u6237\u540D\uFF0C\u683C\u5F0F\u4E3A <span class="token punctuation">[</span>domain<span class="token punctuation">\\</span><span class="token punctuation">]</span>user
MODULES       eq, ne                    DLL \u540D\u79F0
SERVICES      eq, ne                    \u670D\u52A1\u540D\u79F0
WINDOWTITLE   eq, ne                    \u7A97\u53E3\u6807\u9898

    \u8BF4\u660E
    ----
    <span class="token number">1</span><span class="token punctuation">)</span> \u53EA\u6709\u5728\u5E94\u7528\u7B5B\u9009\u5668\u7684\u60C5\u51B5\u4E0B\uFF0C/IM \u5207\u6362\u624D\u80FD\u4F7F\u7528\u901A\u914D\u7B26 <span class="token string">&#39;*&#39;</span>\u3002
    <span class="token number">2</span><span class="token punctuation">)</span> \u8FDC\u7A0B\u8FDB\u7A0B\u603B\u662F\u8981\u5F3A\u884C <span class="token punctuation">(</span>/F<span class="token punctuation">)</span> \u7EC8\u6B62\u3002
    <span class="token number">3</span><span class="token punctuation">)</span> \u5F53\u6307\u5B9A\u8FDC\u7A0B\u673A\u5668\u65F6\uFF0C\u4E0D\u652F\u6301 <span class="token string">&quot;WINDOWTITLE&quot;</span> \u548C <span class="token string">&quot;STATUS&quot;</span> \u7B5B\u9009\u5668\u3002

\u4F8B\u5982:
TASKKILL /IM notepad.exe
TASKKILL /PID <span class="token number">1230</span> /PID <span class="token number">1241</span> /PID <span class="token number">1253</span> /T
TASKKILL /F /IM cmd.exe /T
TASKKILL /F /FI <span class="token string">&quot;PID ge 1000&quot;</span> /FI <span class="token string">&quot;WINDOWTITLE ne untitle*&quot;</span>
TASKKILL /F /FI <span class="token string">&quot;USERNAME eq NT AUTHORITY\\SYSTEM&quot;</span> /IM notepad.exe
TASKKILL /S system /U \u57DF<span class="token punctuation">\\</span>\u7528\u6237\u540D /FI <span class="token string">&quot;\u7528\u6237\u540D ne NT*&quot;</span> /IM *
TASKKILL /S system /U username /P password /FI <span class="token string">&quot;IMAGENAME eq note*&quot;</span>
</code></pre></div>`,4),o=[p];function c(l,u,r,i,k,I){return a(),s("div",null,o)}var T=n(e,[["render",c]]);export{m as __pageData,T as default};
