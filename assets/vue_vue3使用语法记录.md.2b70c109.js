import{_ as s,c as n,o as a,a as l}from"./app.1f31ecdb.js";const d=JSON.parse('{"title":"vue3使用记录","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue3使用语法记录.md"}'),e={name:"vue/vue3使用语法记录.md"},p=l(`<h1 id="vue3使用记录" tabindex="-1">vue3使用记录 <a class="header-anchor" href="#vue3使用记录" aria-hidden="true">#</a></h1><ol><li><p>disExpose ref 父组件获取子组件实例，并使用子组件方法</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">子组件</span></span>
<span class="line"><span style="color:#A6ACCD;">defineExpose({</span></span>
<span class="line"><span style="color:#A6ACCD;">hide,</span></span>
<span class="line"><span style="color:#A6ACCD;">show</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">父组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;child ref=&quot;xxx&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	const xxx = ref({})</span></span>
<span class="line"><span style="color:#A6ACCD;">	...</span></span>
<span class="line"><span style="color:#A6ACCD;">	xxx.show()</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></li><li><p>vue3中使用route</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">setup</span></span>
<span class="line"><span style="color:#A6ACCD;">import { useRoute } from &#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const route = useRoute()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p>router4中 不再使用tag</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">https://www.cnblogs.com/yejunweb/p/16093455.html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>shallowRef 替换一整个对象的时候用</p></li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">ref </span></span>
<span class="line"><span style="color:#A6ACCD;">const va = ref({ count: 1 })</span></span>
<span class="line"><span style="color:#A6ACCD;">va.value.count += 1 会产生变化，</span></span>
<span class="line"><span style="color:#A6ACCD;">但 </span></span>
<span class="line"><span style="color:#A6ACCD;">const va = shallowRef({ count: 1 })</span></span>
<span class="line"><span style="color:#A6ACCD;">va.value.count += 1</span></span>
<span class="line"><span style="color:#A6ACCD;">并不会产生变化</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">因为shallowRef只会做浅层代理，不会被深层递归地转为响应式</span></span>
<span class="line"><span style="color:#A6ACCD;">这种适合对这个对象进行替换，这种情况</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,3),r=[p];function c(o,i,t,u,b,C){return a(),n("div",null,r)}const m=s(e,[["render",c]]);export{d as __pageData,m as default};
