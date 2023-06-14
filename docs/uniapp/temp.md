# uniapp

vue + 微信小程序

中小型企业 常用的技术方案

此次课程：社区论坛类项目

两大块：

对uniapp入门

社区项目实战，贴近企业实践的综合项目

未登录状态

登录状态

评论 + 发表动态



完成项目 + 发布项目



## uniapp 介绍

支持主流

HBuilder 对 uniapp做了很多支持



## 构建项目

https://uniapp.dcloud.net.cn/tutorial/project.html 

添加 小程序的appid

编译配置 vue.config.js

全局配置 pages.json

全局样式 uni.scss

App.vue 不需要写 template 主要是全局生命周期函数

uniapp 支持 alias  @



## 生命周期

分 页面生命周期 和 组件生命周期

页面生命周期： https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle  区别于vue2的生命周期函数

组件生命周期： https://uniapp.dcloud.net.cn/tutorial/page.html#componentlifecycle  同vue2的

应用生命周期： https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle 只能在  **App.vue** 里监听

页面生命周期

```js
onLoad 页面加载
onShow 监听页面展示
onPullDownRefresh 用户下拉刷新之后触发
```

#### 刷新页面配置

```json
1. pages.json 中
{
    "pages": [
        { 
            "path": "pages/index/index",
            "style": {
                "enablePullDownRefresh": true
            }
        }
    ]
}

2. 可以监听路径对应的页面， onPullDownRefresh 函数
```



钩子函数，在整个应用的某些阶段 提供钩子函数

```js
应用生命周期，只在App.vue中才能使用
onPageNotFound() { // 找不到的生命周期
	uni.navigateTp({
        url: '/pages/404/404' // 路由都要在pages.json 中注册
    })
}


页面生命周期
onLoad() {
    let timer = setTimeout(() => {
        clearTimeout(timer)
        uni.navigateTo({
            url: ''
        })
    })
}

onShow() {
    
}

允许页面下拉刷新，
需要先在pages.json 进行允许下拉刷新的配置
然后才能在页面进行对应生命周期的函数

uniapp会提供更多的生命周期，比如分享也会有对应的生命周期函数
```

## 页面跳转 
快捷输入： NAV  组件跳转
uniapp没有h标签
文本用text
### switch tab 导航跳转 
1. 创建页面
2. 在pages.json中进行 **tabBar** 的配置
3. 如果路由在tabBar中进行配置了的话，**不能用uni.navigateTo**，而是**用uni.switchTab**进行跳转

todo：

1. uniapp中怎么使用 iconfont

   https://blog.csdn.net/qq_39961695/article/details/122242022
   
2. uni.switchTab怎么传递参数？

### 路由传参
在onLoad(options) options进行接收

### 小程序分包配置 

参考文章： https://juejin.cn/post/7081431609785712647#heading-0

uniapp: https://uniapp.dcloud.net.cn/collocation/pages.html#subpackages

有点像**路由懒加载**，目的都是为了提升首页加载速度，以及减少打包的体积

课件说明：因小程序有体积和资源加载限制，各家小程序平台提供了分包方式，优化小程序的下载和启动速度。

主包就是默认启动页面以及TabBar页面， 而分包是根据**pages.json**的配置进行划分。

```json
分包目录 subPages/news 放在pages同级
page.json
"subPackages": [
    {
        "root": "subpages",
        "pages": [
            {
                path: 'news/news',
                "style": {
					"navigationBarTitleText": "uni-app"
				}
            }
        ]
    }
]

和路由懒加载是差不多的，也是注册路由，然后打包是分包的，首页加载的时候并不会加载该包。
通过注册的路由进行访问
```



分包：将一个完整的小程序项目，按照需求划分为不同的包，在构建的时打包不同的分包，用户在使用中按需加载

##### 1.2分包的好处

- 可以优化小程序首次启用的下载时间
- 在多团队共同开发时可以更好的解耦协作

##### 1.3 主包+分包进行构成

> 使用分包的小程序，必定包含一个主包

- 主包：包含了默认的启动页面、TabBar 页面以及所有分包都需要用到的公共资源
- 分包：分包的页面+分包页面中资源根据开发者的配置包含的某些小程序页面以及页面需要使用的私有资源

一个主包 + 多个分包组成， 小程序默认进来加载主包

#### 分包的体积限制

- 目前，小程序分包的大小有以下两个限制
  - 整个小程序所有的分包大小不超过20M（主包+所有分包）
  - 单个分包/主包大小不能超过2M



主包不能引入分包的私有资源







## UniApp 常见组件简介

1. 内置组件，和小程序相同
2. 记住是 uniapp组件了，要按照uniapp提供的规则去使用

```js
学习uniapp的组件 就像学习html的标签一样
view text image
```



## UniApp 常见API

 `uni-app`的 js API 由标准 ECMAScript 的 js API 和 uni 扩展 API 这两部分组成。 

 请注意不要把浏览器里的 js 等价于标准 js。 

对各种组件进行操作，以及各种扩展api(比如操作android的 ios的)

uniapp 对原有标签基本都做了封装，为了提供各种参数给用户用，以及为了适配各种不同的客户端。

template的渲染规则和vue的差不多



选择图片

```js
uni.chooseImage({
    count: 1,
    sizeType
    sourceType
    success
})

uni.pageScrollTo({
    scrollTop: 9999999,
    duration: 0
})

本地缓存
uni.setStorageSync('chatlist', JSON.stringify(this.chatList))

onShow() {
    if(!!uni.getStorageSync('chatList')) {
        然后进行初始化，并滚动
    }
}
```



## 自定义组件 和 通信

自定义组件 todo

components

emit @click 父子组件通信

也可以用uniapp提供的，方便跨组件传递

```js
提升到全局事件，相当于事件总线
uni.$on('click1', () => {
    
})

uni.$emit('click1', params)

但自我感觉，还是得慎用，全局事件监听
```



## uniapp vuex状态管理

vuex

store 文件夹

```js
import vue
import vuex

vue.use(vuex)

export default const store = new Vuex.store({
  state: {},
    mutations: {},
    actions: {}
})

在main.js中引入 并使用

使用和vue中vuex是一样的。
```



## 运行环境判断与跨端兼容

文档参考： https://uniapp.dcloud.net.cn/tutorial/platform.html#%E8%B7%A8%E7%AB%AF%E5%85%BC%E5%AE%B9

1. 开发环境 和  生产环境

   process.env.NODE_ENV  nodeJs 中的

2. 判断平台

   在编译时判断，在运行时判断  

   小程序无alert 但浏览器有

   ```js
   1. 编译时，注释判断，表明在哪里使用
   // #ifdef H5
   alert(12333)
   // #endif
   <!--  #ifdef  %PLATFORM% -->
   平台特有的组件
   <!--  #endif -->
   2. 用api方法
   uni.getSystemInfoSync().platform // 输出当前所在平台
   ```

3. 跨端兼容

   uniapp对大部分平台做了兼容，但依然会出现无法兼容的情况

   使用注释断言，模仿的是C语言的，这样在编译的时候就进行了处理，会根据注释以及打包的版本进行处理，看是否打包进去。













