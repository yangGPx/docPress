# webpack高级配置

## Webpack高级配置举例（1）

babel永远不要自己写，而是找文档复制

1. package.json , webpack.config.js

   ```js
   package.json 
   "scaripts": {
       "build": "webpack"
   }
   
   webpack.config.js
   module.exports = {
       mode: 'development'
   }
   ```

   

2. **babel-loader**  打包js, webpack5也可以直接编译发包Js了，但babel-loader支持打包ts

   ```js
   preset pre预先 set配置 
   module: {
     rules: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env']
           }
         }
       }
     ]
   }
   ```

3. babel-loader 打包jsx, vue/react

   ```js
   @babel/preset-react
   
   jsDemo.jsx
   export const jsxDemo = () => <div>jsDemo</div>
   
   module: {
     rules: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: [
                 ['@babel/preset-env'],
                 ['@babel/preset-react']
             ]
           }
         }
       }
     ]
   }
   没有安装react 也没有提示
   ```

4. eslint插件 jsx插件要引入React，不引入就报错提示

   ```js
   支持 eslint，jsx里面必须引入react
   1. webstorm支持eslint检查
   2. webpack也支持eslint检查
   
   1. 创建 .eslintrx.js 文件， 初始化配置， 开启webstrome 的eslint功能
   
   2. webpack 用 EslintPlugin, google webpack 使用eslint
   在 ["@babel/preset-react", {runtime: 'classic'}]
   ```

5. babel-loader 打包 ts文件

   ```js
   改 babel-loader的正则检查
   
   加presets @babel/preset-typescript
   ```

6. ESlint 支持 TS 

   代码地址： https://github.com/FrankFang/jprcb00x6ZsV/blob/master/.eslintrc.js
   
   ```
   为啥不用TSlint, 作者不想维护了，让大家用ESlint
   
.eslintrc.js  单独对ts, tsx制定规则
   overrides 单独对ts tsx制定规则，主要使用airbnb-typescript ，然后自己写一下小rule进行覆盖
   project 必须写，估计是为了告诉去哪里找入口，
   ```
   
7. babel-loader 打包 TSX tsx: ts支持div

   ```js
   demo.tsx
   
   import React from 'react'
   const TsxDemo = () => (<div>Tsx Demo</div>)
   
   npx tsc --init // 生成tsconfig.json
                          
   jsx: "preserve"  // 打开并改为 react
                          
   strict: false  // 严格模式，对新手不好
   noImplicitAny: true  // 打开，并支持
   ```

   **CRLF**  回车换行， 回车（车床）是老式打字机，打满一行，然后需要把打字位置回到最左边。换行就是的换下一行进行打字。回车有一个符号进行表示。

   操作系统 window mac Linux 对换行的理解不一样。window 比较传统 认为是 \r\n (CRLF)， 旧版mac认为是 \r，新版mac是 \n (LF)， linux是 \n (LF)。所以为啥会出现 LF CRLF这种情况

   解决： 1. 所有人用LF，进行限制 2. IDE认为两种都是同一种意思，换行

8. JS / TS 支持@

   两个的写法是不一样的

   ```js
   JS webpack.config.js
   module.export = {
       resolve: {
           alias: {
               '@': path.resolve(__driname, './src')
           }
       }
   }
   
   TS tsConfig.json
   paths: {
      "@/*": ["src/*"]
   }
   
   .eslintrc.js
   去除 noConsole的eslint限制
   rules 两个地方的rule都加
   "no-console": [0]
   
   commit快捷键 commit习惯，做一个完整功能 就commit一次
   ```

9. webpack需要学到什么程度， 和你的薪水有关

   学到独立解决问题的，能自己查 自己解决配出需要的配置。

10. 不用@表示src, 而用src表示src。（将@符号改为src）



## Webpack高级配置举例（2）

1. webpack支持scss

   ```
   webpack.config.js
   rules: [
   	...,
   	{
   		test: /.s[ac]ss$/i,
   		loaders: ['style-loader', 'css-loader', 'sass-loader']
   	}
   ]
   
   scss文件支持@
   @import `~@/assets/demo.scss`  同config配置，但最好加上~ 用alias的时候
   ```

   ```scss
   // demo.scss
   $color: red;
   body {
       color: $color
   }
   ```

2. scss自动import 全局文件

   ```js
   前提： 有一个全局变量文件， 每个用到里面变量的 都需要引入。
   解决： sass 自动import 
   
   loaders: [
       'style-loader',
       'css-loader',
       {
           loader: 'sass-loader',
           options: {
           	additionalData: `@import "~@/assets/const.scss"`,
               sassOptions: {
                   includePaths: [__dirname]
               }
           }
           
       }
   ]
   ```

3. scss 分享变量给JS

   ```js
   1. scss-exports.scss
   :export{
   	color: red;
   }
   
   2. 改css-loader的配置，说明这个功能不是scss-loader提供的功能，是css-loader提供的功能
   {
       loader: 'css-loader',
       options: {
           modules: {
               compileType: 'icss'
           }
       }
   }
   
   3. 在js中使用
   import vars from '@/scss-exports.scss'
   vars.log
   ```

4. webpack 支持Less文件

   ```js	
   rules: [
   	...,
   	{
   		test: /.less$/i,
   		loaders: [
               'style-loader', 
               {
                   loader: 'css-loader',
                   options: {
                       modules: {
                           compileType: 'icss'
                       }
                   }
               }, 
               'less-loader'
   		]
   	}
   ]
   ```

5. Less 自动引入全局文件

   ```js
   跟 sass-loader差不多
   {
       loader: 'less-loader',
       options: {
           additionalData: `@import "~@/vars-less.less"`
       }
   }
   ```

6. scss 和 less 区别

   scss/sass  scss ruby社区出的  sass一开始是没有 {}的。后面加回去{} 变成了scss

   less twitter出的 Bootstrap

   stylus 可以 {} 不加 {}也行

7. 在生产环境提取单独的css文件, 并加hash

   MinCssExtraPlugin({

   ​	filename: '[name].[contenthash].css'	

   })

   ```js
   本地用style-loader  生产环境用 MiniCssExtraPlugin
   {
       test: /.less$/i,
       loaders: [
           mode === 'production' ? MiniCssExtraPlugin.loader :  'style-loader',
           ...
       ]
   }
   mode === 'production' ? MiniCssExtraPlugin.loader :  'style-loader'
   ```

8. 自动生成html代码

   HtmlWebpackPlugin

   小技巧： [1, 2, 5 , mode === 'production' && 4].filter(Boolean)



