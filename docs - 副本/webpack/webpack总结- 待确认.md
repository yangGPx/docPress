# webpack 源码课总结

## 基础知识

#### node_modules的**.bin**目录是做啥的？

> #### Executables
>
> When in global mode, executables are linked into `{prefix}/bin` on Unix, or directly into `{prefix}` on Windows. Ensure that path is in your terminal's `PATH` environment to run them.
>
> When in local mode, executables are linked into `./node_modules/.bin` so that they can be made available to scripts run through npm. (For example, so that a test runner will be in the path when you run `npm test`.)

如果直接在命令行中使用webpack-cli，可以

```js
node_modules/.bin/webpack
或
npx webpack

npx 会在当前目录下的./node_modules/.bin里去查找是否有可执行的命令，没有找到的话再从全局里查找是否有安装对应的模块，全局也没有的话就会自动下载对应的模块，如上面的 create-react-app，npx 会将 create-react-app 下载到一个临时目录，用完即删，不会占用本地资源。
```

而在package.json中scripts可以直接写 webpack, 这就是**.bin目录**的作用。

babel官网 [@babel/parser模块](https://www.babeljs.cn/docs/babel-parser) 也是很大程度上依赖了[acorn](https://github.com/acornjs/acorn)，下面为babel官网

>  Heavily based on [acorn](https://github.com/marijnh/acorn) and [acorn-jsx](https://github.com/RReverser/acorn-jsx) 

直接使用webpack、webpack-cli进行打包

```
1. yarn add webpack webpack-cli
2. 命令行窗口 
./node_modules/.bin/webpack-cli --mode=development ./project_1/index.js
```

### bundler 打包器

实现目标：

1. **转译**，将一些不兼容的js语法转译为兼容性更好的语法，比如 import/export 转译为 require/module.exports ，ESModule 转为 CommonJs的语法；
2. **打包**， 将多个文件打包成一个文件。

**过程**： code -> es5Code -> AST->  code2

**文字解释**：利用**babel**一些模块以及**Node**的一些模块，实现各个过程。读取文件，在将code转为AST后, 收集文件的依赖，以及文件的es5Code，并在收集过程中，处理循环依赖这种情况（记录收集过的依赖，收集过的就不再收集）。

注意：**打包器** 和 **打包器最后输出文件**是两个东西。

前提： 读写文件利用了nodeJs的fs,path,

1. code -> es5Code  [@babel/core](https://www.babeljs.cn/docs/babel-core)

   ```js
   babel.transformFromAstSync(ast, code, {
       presets: ['@babel/preset-env']
   })
   ```

2. code -> AST  [@babel/parser](https://www.babeljs.cn/docs/babel-parser)

   ```js
   const ast = require("@babel/parser").parse(code, {sourceType: "module"});
   ```

3. 对AST进行遍历，生成依赖列表 [@babel/traverse](https://www.babeljs.cn/docs/babel-traverse)

   ```js
   TS 依赖列表的值
   依赖列表是数组的原因： 为了可以知道顺序，入口文件放在第一个
   type DepsRelation = { key: string, deps: string[], code: string }[]
   
   import traverse from "@babel/traverse";
   
   traverse(ast, {
     enter(path) {
        // 如果该语法是 import
       if(path.node.type === 'ImportDeclaration') {
        	console.log(path.node.source.value, 'from的路径')
           // 按照设计好的依赖列表类型，收集好每一个文件
       }
     },
   });
   ```

4. 设计最后输出的文件，根据CommonJS2标准，拼接出打包后的 **dist.js**

   ```js
   require 引入并执行这个文件
   最后输出的文件格式：
   var depRelation = [
       {
           key: 'index.js',
           deps: ['a.js', 'b.js'],
           code: function (require, module, exports) {}
       }
   ]
   var modules = {} // 收集已经require过的依赖
   execute(depRelation[0].key)
function execute(key) {} //  根据key，在depRelation中找到对应项，执行它的code
   ```
   

技巧：

1. 用hash记录已打包过的文件



## 源码解析，带着问题看源码

看必定执行的代码，定义不看，只有if不看。

1. webpack-cli 是如何调用 wepack 的

   ```js
   执行这句话，webpack-cli怎么调用webpack的
   node_modules/.bin/webpack-cli --mode=development project_1/index.js
   先看.bin/webpack-cli命令 用的哪个文件，然后入口进去找，
   
   webpack = require('webpack')
   compiler = webpack(options, callback)
   ```

2. webpack 是如何分析 index.js 的

   ```js
   验证我们bundler的猜想
   
   1. 从问题1中知道了，webpack-cli如何调用webpack的，于是我们就去node_modules的webpack folder,然后看package.json的main对应的入口文件是哪一个？
   --package.json
   "main": "lib/index.js",
   
   -- lib/index.js
   const fn = lazyFunction(() => require("./webpack"));
   
   -- lib/webpack.js
   const compilers = childOptions.map(options => createCompiler(options));
   const compiler = new MultiCompiler(compilers);
   
   createCompiler()
   
   并没有找到index.js,如何执行 code - es5Code - ast - code2 这个流程
   
   发现定义了很多
   this.hooks = {
       [eventName]: new SyncHook([]),
   }
   this.hooks.eventName.xxx.call()
   
   tapable 这是 webpack 团队为了写 webpack 而写的一个事件/钩子库
   用法
   
   定义一个事件/钩子
   this.hooks.eventName = new SyncHook(["arg1", "arg2"]);
   监听一个事件/钩子
   this.hooks.eventName.tap('监听理由', fn)
   触发一个事件/钩子
   this.hooks.eventName.call('arg1', 'arg2')
   
   ```

3. webpack 的流程是怎样的？（无法直接找到webpack如何去分析打包index.js文件，转而去看webpack的流程）

   ```js
   重新回到 webpack/lib/index.js 进行分析，主要是收集触发了哪些hook（钩子）,以及主要事件
   environment
   afterEnvironment
   initialize
   beforeRun
   run
   --this.readRecords
   --this.compile(onCompiled)
   beforeCompile
   compile
   make
   finishMake
   --process.nextTick
   ----compilation.finish
   
   finishModules
   ------compilation.seal()
   seal
   beforeChunks
   ---this.addChunk
   -- buildChunkGraph(this, chunkGraphInit);
   afterChunks
   shouldRecord
   reviveModules
   beforeModuleIds
   moduleIds
   reviveChunks
   beforeChunkIds
   chunkIds
   beforeModuleHash
   -- 	this.createModuleHashes();
   afterModuleHash
   beforeCodeGeneration
   --this.codeGeneration
   afterCodeGeneration
   beforeRuntimeRequirements
   ...
   -- this.createChunkAssets
   -- cont()
   processAssets
   -- this.summarizeDependencies();
   afterSeal
   -- this.fileSystemInfo.logStatistics();
   
   afterCompile 执行传进来的callback（onCompiled）函数
   
   -- process.nextTick
   -- this.emitAssets
   -- this.emitRecords
   
   done
   ---- this.cache.storeBuildDependencies
   ------finalCallback
   afterDone
   
   收集了webpack的大概hook,以及一些流程中的主要函数，但并没有我们想要的答案
   
   我们想要的是
   code - ast - code2 的在哪里执行的，根据目前我们收集到的钩子函数，
   猜测在compile - afterCompile阶段进行了这些操作，所以我们去看他的钩子监听 xxx.tap
   ```

4. 读取 index.js 并分析和收集依赖是在哪个阶段？

   ```js
   上面收集的hooks以及主要函数，让我们大概了解了webpack的结构以及阶段，
   根据猜测，主要去查看 compile - afterCompile的钩子的tap，主要是传了callback函数的，这样才能持续完成后续的操作；
   compile
   make
   -- EntryPlugin.createDependency(entry, options); 收集依赖
   finishMake
   afterCompile
   
   我们发现 make - finishMake 之间什么代码都没有啊！只有一个类似收集依赖的函数
   
   ```

5. make - finishMake 之间，做了什么 Optimize 优化

   ```js
   compile
   --this.newCompilation(params);
   thisCompilation
   compilation
   ---- compilation.addEntry
   entryData = { 
   				dependencies: [],
   				includeDependencies: [],
   				options: {
   					name: undefined,
   					...options
   				}
   			};  // 依赖，很像我们自己定义的收集依赖函数
   
   
   -- addEntry
   -- this._addEntryItem
   addEntry
   -- this.addModuleChain
   -- this.dependencyFactories.get(Dep)
   -- this.handleModuleCreation
   -- this.factorizeModule
   ---- this.factorizeQueue.add
   ---- factory.create 找到 this.factorizeQueue的创建，发现
   ---- _factorizeModule factory  ---> this.dependencyFactories.get(Dep) tip1
   -- this.addModule
   ---- this.addModuleQueue.add
   -- this.buildModule
   ---- this.buildQueue.add
   -- this.processModuleDependencies
   ---- this.processDependenciesQueue.add
   succeedEntry
   
   任务队列知识，任务队列发现有任务会自动执行
   
   tip1
   this.dependencyFactories.get(Dep) 是个啥？
   你搜 compilation.tap 就知道，它是 normalModuleFactory，简称 nmf
   结论：factory 就是 nmf，所以 factory.create 就是 nmf.craete
   
   ```

6. nmf.create 做了什么？

```js
来到 NormalModuleFactory.js，可以看到 create 的代码
```



### webpack 装逼指南

1. 阅读了webpack 源码
2. webpack 使用 Tapable 作为事件中心，将打包分为 env,compile,make sewal,emit等阶段
3. 在make阶段借助acorn对源码进行了parse



## Loader  和 Plugin

### Loader

官网解释：

>  webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。 

比如不能识别CSS文件，所以需要引用Css-loader。主要集中在编译阶段。

#### 自己实现一个CSS-Loader。

**关键点**： 把css转为js。js文件中转，css文件代码转为字符串，然后在写入的时候，用dom操作，添加到html文件中。

**注意**：css中会有属性选择器，会有双引号，如果直接用`"${code}"`反引号+双引号进行包裹的话，最后写的文件会出问题，所以用**`${JSON.stringify(code)}`**,JSON.stringify会对双引号进行转义。

```js
if(/\.css$/.test(path)) {
    code = `const str = ${JSON.stringify(code)}
		if(document) {
			const style = document.createElement('style')
			style.innerHTML = str
			document.head.appendChild(style)
}
export default str
	`
}
```

loader可以是一个函数，

css-loader 就是把上面的代码单独封装在一个文件里面，导出方法

```js
css-loader.js
const transform = code => `
	const str = ${JSON.stringify(code)}
	if(document) {
const style = document.createElement('style')
style.innerHTML = str
document.head.appendChild(style)
}
export default str
`

module.exports = transform


bundler.ts
if(/\.css$/.test(path)) {
  code = require('./css-loader.js')(code)   
}

```

 #### 单一职责原则

webpack里每个loader只做一件事，方便组合。

而上面的代码**做了两件事**，**第一是css->js**， **第二是添加到head里面**。拆分为css-loader、style-loader。但我们无法实现style-loader，因为**style-loader是插入代码**，需要寻找插入时机和插入位置。

如果是sassLoader,lessLoader -> cssLoader 这样过程一直是转译，但style-loader是接收到css-loader transform后的代码，并添加插入逻辑。 

拆分后的代码

```js
css-loader 
const tranform = (code) => `
	const str = ${JSON.stringify(code)}
	export default str
` 
module.exports = transform

stule-loader
const tranform = (code) => `
${code}
	if(document) {
const style = document.createElement('style')
style.innerHTML = ${JSON.stringify(code)}
document.head.appendChild(style)
}
` 
module.exports = transform

code = require('./css-loader.js')(code)
code = require('./style-loader.js')(code)
但这样的话，最后打包输出的结果

const str = "const str = \"body{color: red}\"\"
...
style.innerHTML = "const str = \"body{color: red}\"..."
输出的了多余的代码，这样就会有问题
```

### Plugin

官网解释

>  loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。 

在某两个阶段中间插入进去,考虑在哪个阶段执行，全局阶段基本都可以。

### imagemin-webpack-plugin

1. 使用
2. 源码，监听emit事件，对compilation.assets进行遍历，如果是图片的话，就对图片进行压缩

### clean-webpack-plugin

1. 使用
2. emit，确定开始编译之前，清除之前的文件
3. done，删除不需要的临时文件

### providePlugin

全局使用一个变量，不需要引入，直接用就好了，会自动在使用到变量的文件自动引入。

在哪个阶段开始做呢？

该 插件直接监听的是nmf

compilation阶段，获取nmf,  parse之后, 在ast遍历的时候进行处理



### Loader 和 plugin区别 ？

loader主要是在make阶段

plugin对webpack的每个阶段进行介入，丰富webpack的能力，基于事件机制工作，监听web                                      pack的 打包过程中每个阶段函数

### 自己写webpack plugin

官方文档 write plugin

主要是按照官方文档格式，以及考虑需求，要监听什么阶段的事件？，以及要做什么？