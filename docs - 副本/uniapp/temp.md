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
	uni.navigateTo({
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



# UniAPP 社区论坛项目

基于ThinkSNS 

php + mysql 技术， 核心 + 多应用 + 多插件的产品模式

gitee thinksns



### 项目初始化  ok

1. 新建uniapp项目，并创建feeds + me页面
2. 配置tabBar
3. 通过npm 引入 uview-ui
4. uview-ui在main中使用，并引入主题文件、样式文件
5. uview-ui 按需引入



### 首页的实现 ok

1. 分析首页，整个结构
2. swiper 首页轮播图
3. 首页顶部并没有标题： navigationStyle: 'custom'
4. 点击进行跳转一个外部页面，是开一个webView ，
5. 当url作为参数的时候是，要用encodeURL 对url进行编码，以及decodeURL进行编码。



### 用接口请求数据

https://v1.uviewui.com/js/http.html

https://v1.uviewui.com/js/apiManage.html

1. 用uview 提供的js进行封装请求
2. 请求拦截 响应拦截
3. api封装在一个文件里面
4. 然后挂载到vue实例上
5. 然后再页面中进行使用



### 首页 【推荐、资讯】 平滑切换实现

1. 用轮播器，取消自动切换

2. 然后操作swiper的current值进行操作

3. 注册基础信息到vue原型上

   ```
   Vue.prototype.BaseUrl = ''
   ```



### 瀑布流

1. 用css实现也可以，或者js也行

   ```js
   cloumn-gap: 10px;
   column-count: 2;
   ```

   但删除一个元素之后，要重新绘制，css布局适合静态数据展示的

2. js的话，用uview的u-waterfall

   轮播图需要一个固定高度，但瀑布流的高度是不固定的，是一致递增的，我们可以动态监听,

   总感觉有点奇怪，需要这样一行一行去监听

    [Waterfall 瀑布流 | uView - 多平台快速开发的UI框架 - uni-app UI框架 (gitee.io)](https://xuqu.gitee.io/components/waterfall.html) 

   uView 的 waterfall瀑布流 是分成两行 分别插入

   ```js
   this.$u.getRect('#u-left-cloumn')
   https://v1.uviewui.com/js/getRect.html
   uView 根据 nodesRef.boudingClientRect 进行的封装，简化了使用复杂度。
   默认返回一个Promise 可以用then 或者 async + await 接收结果
   ```

   swiper要固定传递一个高度，但瀑布流的高度会变化的，所以用uview 提供的this.$u.getRect(selector) 每添加一个块，就获取一次左右两侧的高度，传递给轮播图，对轮播图的高度进行重新设置。也可以自己用 xxx.getBoudingClientRect 获取高度



## 切换轮播图版块

需求：

切换轮播图版块的时候，要根据版块设置轮播器的高度

点击切换 、滑动切换都要 根据切换后的版块的高度，去设置轮播器的当前高度。



## 滚动首页-文章的版块，版块导航栏置顶，并切换版块之后，新的版块滚动距离清空

1. NavBar 使用该插件替换导航 资讯、新闻的导航。但弹幕都在说不需要用这个，用uview的吸顶效果就可以了。或者用粘性布局。

   视频中用的是，滚动到一定距离，顶部导航栏显示

   ```js
   onPageScroll(event) {
       event.scrollTop
       1. 滚动到200 顶部导航栏显示 否则隐藏
       2. 记录当前版块的滚动位置
   }
   
   在切换的版块的时候，根据记录的位置，设置版块的滚动位置。
   ```

   

 ## 滚动到底部请求新数据，下拉页面做刷新

```js
1. pages.json  enablePullDownRefresh 
2. onPullDownRefresh() { // 顶部下拉刷新请求更新数据
    1. 清空已有数据
    2. 重新请求数据
}
3. onReachBottom() { // 
    滚动到底部 触发
}
用两个页面事件，来监听滚动到头部和底部的事件。
```

## 动态  瀑布流 用 Grid 栅格布局

1. 获取数据 在onLoad中请求数据，因为onLoad中可以获取路由参数

其实逻辑没啥特别的，主要是要会gird布局

```js
img*img img 
img*img img
img img img

img img*img
img img*img
img img img
```

2. 下拉到底部进行加载



## 分包形式 写详情页

subPages

```js
page.json
{
    "subPackages"
}
```

feedInfo.vue

async onLoad(options) {	

​	

} // 获取动态详情

可以提自定义编译条件，这样的话刷新页面，url就可以自定义带参数

1. 分包写详情页面
2. 在onLoad中获取详情数据
3. 可以自定义编译条件



## 资讯详情页面 富文本解析

1. 毛玻璃效果 pic-blur

2. 富文本解析

   ```js
   里面的图片占位符 @![7.jpg](16)
   用正则去匹配 .代表任意字符
   /@!\[.*\]\((\d*)\)/g
              
   替换文章正文中的图片占位符
   ```

3. html-parse   插件市场有

4. 滚动页面，滚动到一定距离就显示顶部导航栏 onPageScroll 事件，滚动距离超过100,显示顶部标题，否则就是正常的操作按钮



## 封装一个评论组件

1. 样式、交互（自己写的）；
2. 组件传参，根据当前文章数据获取文章的评论数据；
3. 组件不是页面，没有页面生命周期函数，比如没有onLoad,所以只能用组件的生命周期函数 created mounted等
4. 坑：因为文章数据是接口请求回来的，所以直接使用传递给子组件的文章信息会出现空对象报错。用Loading+v-if 处理，数据加载完成后，整个页面才开始进行渲染



## 用户登录、注册功能

封装成一个全局登录、注册组件，

跳转到具体的登录页面，然后获取用户信息

```
// 在created中判断 是够被授权了
wx.getSetting({
	success: res => {
		if(res.authSetting['scope.userInfo']) {
			uni.getUserInfo({
				success: res => {
					this.getUserInfoFlag = false
				},
				fail: () => {
					console.log('用户未授权！')
				}
			})
		}
	}
})

微信授权
uni.getUserinfo({
	success: res => {
		// 获取用户信息成功 进行后续操作
	},
	fail: () => {
		console.log('用户未授权！')
	}
})
```

1. 获取当前微信用户的昵称 和 头像信息。
2. 使用u-form 实现登陆，手机注册、邮箱注册基础逻辑
3. 使用u-form 实现表单验证相关逻辑



