# 前端面试押题

知识点：html、css js ts vue react 算法 node.js 浏览器 跨平台 工程化 http 安全 其他。

一周时间。

重复才是学习的本质。

现在前端面试 越来越倾向JS。

## html 押题

概念题：是什么 怎么做 解决了什么问题 优点 缺点 怎么解决缺点

1. 语义化

   写html的一种方法论， 标签h1-h6 , 段落用p，头部header, 导航用nav

   

2. html5有什么新标签

   重点：答自己常用的，不要答那些不会的

3. canvas和svg的区别



看别人的总结 和 平时自己写博客总结。



## CSS 押题

1. BFC  块级格式化上下文  Block Formatting Contexts ，一个区域内有一套渲染规则。

   没办法解释，没办法准确说清楚，但你拿一个具体的例子，可以说出是不是BFC。\

   触发bfc的常见条件

   1. 浮动元素
   2. 绝对定位，absolute fixed
   3. inline-block
   4. overflow 不为 visible
   5. 弹性元素（display: flex inline-flex）

   解决了什么问题：

   1. 清楚浮动
   2. 防止margin合并，两个div上下会合并margin,但其中一个是bfc的话，就不会合并

2. 如何实现**垂直居中** 经典，写一篇文章 多少种方式实现垂直居中, 实践题，看代码

   1. table默认垂直居中

      ```
      <table>
      	<tr>
      		<td></td>
      	</tr>
      </table>
      
      或者用div 加上table的css属性
      display: table
      display: table-row
      display: table-cell  + vertical-align: middle
      ```

   2. display: flex  

   3. absoulte,tranfrom

   

3. css 选择器优先级 根据网站提供的abcd 分值

   1. style 的内联比css的高；
   2. 选择器越具体，其优先级越高；

   2. 相同优先级，出现在后面的，覆盖前面的；

   3. 属性后面加！important的优先级最高。

4. 如何清除浮动  实践题，写博客, 但浮动基本可以不用了，现在浏览器都支持 flex

   1. .clearfix 

      ```js
      .clearfix:after{
          content: '';
          display: block;
          clear: both;
      }
      .clearfix{
          zoom: 1;
      }
      ```

   2. 给父元素加上 overflow：hidden。 触发BFC

5. 两种盒模型 box-sizing content-box border-box ,区分题

   **content-box:** 即width 指的是content区域，而不是实际宽度

   公式： 元素的实际宽度 = width + padding + border

   **border-box:** 即width指定的是左右边框外侧的宽度

   元素的实际宽度 = width



## JS 押题

1. **JS数据类型有哪些**

   string number undefined null boolean  object   bigint  symbol

   bigint? number是一个双精度浮点数，64位，位数是有限的，整数和小数位 是有限的的，

   用法： 只支持整数，1234567123456789n  最后加n，表示是bigint

   null 表示一个对象为空，undefined 一个基本类型为空

   数组 函数 日期 是类class,不是类型type

2. **原型链是什么**,

   **不直接回答，而是先回答什么是原型，什么是原型链**

   大概念题，大概念变小概念，然后套概念题的答题思路

   通过隐藏属性 *__proto__* 关联起来

   先讲原型，再讲原型链，举例子说明

   原型链：非普通对象的原型链

   ```js
   var a= []
   a.__proto__ = Array.prototype
   Aeeay.prototype = Object.prototype
   通过隐藏属性 __proto__  关联
   
   
   CF是个构造函数
   怎么创建新的原型链
   Object.create(CF)
   a = new CF() // 构造函数 a.__?__ = CF.prototype
   
   var a = new Array(1, 2, 3)
   a 是 Array 的实例化
   ```

   解决了什么问题：在没有class的情况下，实现了【继承】，
   继承：借助Java的概念，java是经典的面对对象编程。class A extends B, 继承是类（方法）对类（方法）的

   子 继承 父的东西，而不是继承父

3. **代码中的this是什么**

   this function的第一个隐藏函数， 是call的第一个参数

   ```js
   语法糖
   f1()       f1.call(undefined)
   f1('hi')   f1.call(undefined, 'hi')
   如果在浏览器中 undefined 会为 window
   如果在nodejs中， undefined 是global/undefined
   
   
   obj.ca.f(p)   f.call(o.c, p)  没有啥上下文，函数就是输入输出   
   转换代码，记住转换代码的公式就行。
   
   可以用 'use strict' 严格模式，禁止它将undefined 改为 window
   
   不用管它绕来绕去，看打印最近的一次调用，看最终执行的地方就可以了。
   
   函数本体是存在堆里面的，对象存的函数只是存了函数的内存地址。
   ```

   ![1685696034645](C:\Users\杨桂鹏\AppData\Roaming\Typora\typora-user-images\1685696034645.png)

   一个难题，不该多想，而是按照转换公式去完成他。应该确定一个通用的

   ```js
   const arr = [function() { console.log(this) }]
   arr[0]()
   等价于
   arr.0()
   转化为 0.call(arr)
   
   this就是arr
   ```

   箭头函数没有this

   ```js
   f = () => {
       console.log(this)
   }
   其实跟
   f = () => {
       console.log(a)
   }
   是一样的，我们根本不知道外面 定义a是什么。
   外面定义a是什么，a就输出什么；
   外面this是啥，就输出什么。
   箭头函数里面的this就是一个普通变量，和abcd都一样。
   ```

4. **new 做了什么**

   mdn官网： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new
   
   参考文章：  [JS 的 new 到底是干什么的？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/23987456) 
   
   new 做了什么，主要分四步
   
   1. 创建空对象； 
   2. 绑定原型； 1中的空白对象添加\_\_proto\_\_ 属性，并该属性链接到构造函数的原型对象上；
   3. 指定this = 临时对象； 可以假定用了**call**去指定了这个函数执行时的this = 1中空对象。
   4. 执行构造函数；
   5. 返回对象。如果构造函数没有返回对象，则返回this。
   
   new 主要是为了创建实例对象，实例对象的共有方法、属性，绑定在原型上，**节省代码**。
   
   
   
   ##### 兵营的例子
   
   1. 一开始创建大兵
   
   ```js
   const 士兵 = {
       id: 1,
       hp: 42,
       攻击力: 5,
       攻击() { log('对方hp-2') },
       奔跑() { log('前进两步') },
       防御() { log('被攻击不掉hp') }
   }
   ```
   
   2. 以及创建100个大兵怎么样
   
   ```js
   const 士兵们 = []
   for(let i = 0; i < 100; i++) {
       const 士兵 = {
           id: i,
           hp: 42,
           攻击力: 5,
           攻击() { log('对方hp-2') },
           奔跑() { log('前进两步') },
           防御() { log('被攻击不掉hp') }
       }
       士兵们.push(士兵)
   }
   ```
   
   3. 用**JS原型链**去节省公共的函数以及属性
   
   ```js
   const 士兵们 = []
   const 公共 = {
       攻击力: 5,
       攻击() { log('对方hp-2') },
       奔跑() { log('前进两步') },
       防御() { log('被攻击不掉hp') },
   }
   for(let i = 0; i < 100; i++) {
       const 士兵 = {
           id: i,
           hp: 42,
       }
       士兵.__proto__ = 公共    // 实际开发中不要用 __proto__ 这个属性
       士兵们.push(士兵)
   }
   ```
   
   4. 然后封装成一个函数
   
   ```js
   const 士兵们 = []
   
   function create() {
       const 公共 = {
           攻击力: 5,
           攻击() { log('对方hp-2') },
           奔跑() { log('前进两步') },
           防御() { log('被攻击不掉hp') },
       }
       return function (id, hp) {
           const 士兵 = {
               id: i,
               hp: hp,
           }
           士兵.__proto__ = 公共    // 实际开发中不要用 __proto__ 这个属性
        	// 创建的实例对象的原型属性（__proto__） 指向 构造函数（类）的 原型对象(prototype)
           // 这里的构造函数的原型 用一个对象代替了，但是一样的操作，指向一个对象
           return 士兵
       }
   }
   
   const 创建士兵 = create()
   
   for(let i = 0; i < 100; i++) {
       const 士兵 = 创建士兵(i, 42)
       士兵们.push(士兵)
   }
   ```
   
   ##### JS之父的救赎
   
   new帮我们完成了这个过程，让我们以少量的代码，完成**上述第四步这个过程**。
   
   ```js
   function CreateSolid(id, hp) {
       this.id = id // 实例化内部自有属性
       this.hp = hp
   }
   CreateSolid.prototype.攻击力 = 5
   CreateSolid.prototype.攻击 = function() { log('对方hp-2') }
   CreateSolid.prototype.奔跑 = function() { log('前进两步') }
   CreateSolid.prototype.防御 = function() { log('被攻击不掉hp') }
   
   const 士兵们 = []
   for(let i = 0; i < 100; i++) {
       const 士兵 = new CreateSolid(i, 42)
       士兵们.push(士兵)
   }
   
   如果是 ES6 的话 就是用class的写法了
   class CreateSolid{
       construtor(id, hp) {
           this.id = id // 实例化内部自有属性
       	this.hp = hp
       }
       攻击() { log('对方hp-2') }
       奔跑() { log('前进两步') }
       防御() { log('被攻击不掉hp') }
   }
   
   const 士兵们 = []
   for(let i = 0; i < 100; i++) {
       const 士兵 = new CreateSolid(i, 42)
       士兵们.push(士兵)
   }
   ```
   
   #### call 和 apply
   
   ```
   function fn() {}
   fn.call({}, a1, a2)
   fn.apply({}, [a1, a2])
   
   mdn文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call
   他们只有一个区别，call接受的是一个参数列表， 而apply接受的是一个包含多个参数的数组
   ```
   
   apply为了解决一些场景，比如readDataFromFile 并不知道读的数据有多长，知道有多长也传不进去。所以apply为了解决这个场景。
   
   理论上，apply能解决所有，但call的话就省了组装成数组的那一步了。
   
   
   
5. **立即执行函数** 概念题
   
   是什么 怎么做 解决什么问题 优缺点 怎么解决缺点
   
   是什么： 声明一个匿名函数，然后立即执行该函数
   
   实现代码：
   
   ```js
   (function() {    })();
   (function(){}());
   !function(){}();
   +function(){}();
   -function(){}();
   
   var x = function(){}();
   ```
   
   解决什么问题：创建出一个局部作用域， 做出局部变量（不用es6)
   
   function f() { var a; } 这样的话 就多了一个全局变量 f。那现在就是解决f匿名。
   
   优点： 兼容性
   
   缺点：代码不好看
   
   解决： es6 { let }
   
   
   
6. JS的闭包是什么？怎么用？
   
   是什么： 闭包是JS的一种**语法特性**
   
   闭包 = 函数 + 自由变量
   
   对于一个函数来说，变量分为全局、局部（函数内部）、自由
   
   JS的函数都支持闭包
   
   闭包主要看使用场景。
   
   
   
   跟自由变量相对应的是全局变量，因为全局变量本来就可以被全部访问。如果是全局变量，就分不清是闭包可以访问还是全局变量
   
   例子：
   
   ```js
   {
       let lives = 3;
       window.getLives = function() { return lives }
   }
   1. lives 相对于 getLives 是自由变量
   2. getLives 是函数，可以访问lives
   
   var api = function() {
       let lives = 3;
       return {
           getLives() {
               return lives
           }
       }
   }
   
   const add2 = function() {
       var count
       function add() {
           count += 1
       }
   }()
   ```
   
   解决了什么问题：
   
   1. 避免全局污染
   2. 提供了对局部变量的间接访问
   3. 维持变量，使其不被垃圾回收
   
   优点： 好用
   
   缺点： 使用不当，可能造成内存泄漏
   
   IE bug：
   
   ```js
   function test() {
       var x = { name: 'y' }
       var y = { name: 'y', content: '--这里有个很长的字符串--' }
       return () => x
   }
   const myFn = test()
   ```
   
   对于正常设想来说， y没被用到 应该被回收，但旧版本的IE并不会对y进行回收

7. **如何实现类**
	ES5 没有 class，只是保留了这个关键字。历史原因，因为很多早期js程序员是java转的，所以想办法实现类。
	
	**没有class实现一个类**
	
	this上挂载的是实例对象的自有变量，而prototype挂载的是共享变量
	
	Typescript 不推荐 Function
	
	```js
	Dog.prototype = {
	    say: ...
	    kind: ...
	}
	这样写有一个问题，把constructor 去掉了，有时候造成代码逻辑的bug，构造函数执行不明。
	
	```
	
8. JS 如何实现继承

   继承是类之间的关系

   ##### 函数实现继承

   自身属性我要继承，共有属性我也要继承

   ```js
   function Animal(legsNum) {
       this.legsNum = legsNum
   }
   Animal.prototype.kind = '555'
   
   function Dog(name) {
       Animal.call(this, 4) // 继承Animal的自身属性
       this.name = name
   }
   
   Dog.prototype.__proto__ = Animal.prototype // 子类原型的原型 = 构造函数的原型  实现原型链
   
   Dog.prototype.say = function() {}
   ```

   但**\_\_proto\_\_** 属性在不同浏览器中不一定叫这个名，不同浏览器对这个属性的命名不一样，所以上面那句话是有问题的，不能够使用。

   那我们怎么去做呢，

   我们可以利用new的步骤

   1. 创建一个空对象
   2. 绑定原型，空对象的原型属性 = 构造函数的原型  空对象.\_\_proto\_\_  = Dog.prototype
   3. 构造函数的this === 空对象  Dog.call(空对象)
   4. 执行构造函数，如果没有返回对象则并返回this

   我们可以利用第二步，创建一个空白函数，空白函数的原型 等于 父类函数的原型，然后子类的原型 等于 new 空白函数，因为空白函数的实例化里面就有\_\_proto \_\_ 指向了父类的原型，这样就实现了原型链。然后再将需要挂在到子类原型上的属性 进行挂载。

   ```js
   function Animal(legsNum) {
       this.legsNum = legsNum
   }
   
   function Dog(name) {
       Animal.call(this, 4) // 继承Animal的自身属性
       this.name = name
   }
   
   const fn = function() {}
   fn.prototype = Animal.prototype
   Dog.prototype = new fn() // 返回一个啥也没有的空对象，空对象里面有__proto__ 指向了Animal.prototype
   
   Dog.prototype.say = function() {}
   ```

   

   ##### class 实现继承

   1. extends
   2. super

   ```js
   class Animal {
       contructor(legsNum) {
           this.legsNum = legsNum
       }
   }
   
   class Dog extends Animal {
       contructor(name, legsNum) {
           super(legsNum)
           this.name = name
       }
       say() {
           
       }
   }
   ```

   

   

## 手写

#### 手写节流throttle 防抖debounce

最后生成一个通用函数

**节流就是技能冷却中**，闪现过后的cd内，就不能再调用

**防抖就是回城**

节流： 触发了一个动作之后，执行对应的函数。在一段时间内，再次触发会无效，要等待时间到了，再次触发才会有效果

防抖： 触发一个动作之后， 会开始计时，在一段时间内，如果再次触发该动作的话，会重新开始计时，等待计时完成后才会执行动作对应的函数

代码： 实现形式大同小异，理解概念更为重要。

**防抖 debounce**

```js
function debounce(fn, time = 300, asThis) {
    let timer = null
    return (...args) => {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            typeof fn === 'function' && fn.call(asThis, ...args)
        }, time)
    }
}

const fp = function(name) {
    console.log(name, this.okk)
}

const d1 = debounce(fp, 300)
const d2 = debounce(fp, 300, { okk: '这是一个111' })

// 测试用例
for(let i = 1; i< 10; i++) {
	console.log('执行：' + i)
	d1('这是一个名字1')    
	d2('这是一个名字2')    
}
```

**节流 throttle**

```js
function throttle(fn, time = 300, asThis) {
    let timer = null
    return (...args) => {
        if(timer) return console.log('请勿频繁操作');
        fn.call(asThis, ...args)
        timer = setTimeout(() => {
            timer = null
        }, time)
    }
}

const fp = function(name) {
    console.log(name, this.okk)
}

const d1 = throttle(fp, 300)
const d2 = throttle(fp, 300, { okk: '这是一个111' })

// 测试用例
for(let i = 1; i< 10; i++) {
	console.log('执行：' + i)
	d1('操作成功1')    
    d2('操作成功2')
}

```

**使用场景**

节流： 提交表单之后的loading， 禁止用户频繁操作

防抖：输入框联想，监听滚动时间，window.resize



#### 发布订阅

设计模式 是 基于是面向对象的。

基于 面向对象的设计模式可以基本不用看了。

函数式编程 以及 数据响应去做了。

设计模式 翻译成大白话  就是 套路。

把自己代码写好就行。

发布订阅模式主要实现了三个方法

```js
const event = {
    on() {},
    emit() {},
	off() {},
    once() {}
}
addEventListener
removeEventListener
```

任务 队列 

任务 =》 函数

队列 =》 要做到先进先出

要想清楚用什么数据结构，再考虑用什么算法。

映射 hash表

都是一些名词

代码的话,还是老样子

```js

```



### 手写Ajax  async Javascript and XML(JSON)

Axios

jQuery

VueResource

window.fetch



记忆题

```js
var xhr = new XMLHttpRequest()

xhr.open('GET', '/xxx')

xhr.onreadytstatechange = function () {
    if(xhr.readtState === 4) { // 下载操作已完成
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            success(xhr)
        } else {
            fail(xhr)
        }
    }
}

xhr.onload = (...args) => {
    console.log(args)
}

xhr.onerror = () => {
    
}

xhr.send('{ "name": "yang" }')

```



#### 手写Promise 推迟一点看

之前好像写过一个简单版本的，得找一下代码

#### 手写Promise.all 

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

输入： 一个  promise 的 iterable 类型 ，比如Array map set 等

输出： 一个 新的Promise, resolve 输出按照顺序的resolve结果，

要先清楚

主要用到了计数器，

1. 这是一个函数，挂载在Promise上的
2. 函数就要考虑 输入输出，输入一个promise列表， 输出一个新的 promise
3. 用数组去记录结果，如果记录数组的长度 === 传入的promise长度，就代表全部是resolve的
4. 只要有一个reject 就整体reject的

```js
Promise.myAll = function(list) {
    const results = []
    const count = 0
    return new Promise((resolve, reject) => {
        list.forEach((promise, index) => {
            promise.then((res) => {
                count++
                results[index] = res
                if(count === list.length) {
	                resolve(results)                
                }
            }, (error) => {
                reject(error)
            })
        })
    })
}
```



#### 深拷贝

深拷贝 和 浅拷贝 是相对应的。

主要是引用类型数据，拷贝之后 ,是否有关联

两个方法

1. 用JSON

   不支持Date， 正则， undefined， 函数等数据类型

   不支持引用

   所以可以用递归 + 类型判断 进行深拷贝

2. 用递归

   很考查基础

   1. 递归
   2. 类型判断
   3. 检查环
   4. 不拷贝原型上的属性

```js

function getType() {
    return 
}

const cache = new Map()

function deepClone(a) {	 // 缓存cache不能全局，最好临时创建并递归传递
	if(a instanceof Object) { // 不考虑 跨iframe 以及dom元素 等等
        
        if(a instanceof Function) { // 不能 100% 拷贝
           if(a.prototype) {
               result = function() {
                   return a.apply(this, arguments)
               }
           } else {
               result = (...args) => { return a.call(undefined, ...args) }
           }
        } else if(a instanceof Array) {
            result = []
        }
        
        for(let key in a) {
            result[key] = deepClone(a[key])
        }
    } else {
        
    }
}

 // 缓存cache不能全局，最好临时创建并递归传递
每次深拷贝 都传进去
deepClone(a, cache) {
	if(!cache) {
        cache = new Map()
    }    


      ...
      ...
      deepClone(a[key], cache)
}
通过递归不断的传递这一个cache，这样的话cache就不会在深拷贝完成后又残留。
```

1. 先判断是不是对象
2. 再判断是不是函数， 函数怎么判断普通函数、箭头函数。如果函数有prototype 就是普通函数,否则就是箭头函数
3. 再判断。。
4. 就不断添加类型支持就行

**但存在一个问题** 环引用

a.self = a   自引用，没处理这种情况，会出现栈溢出。

```js
1. 记录所有的引用类型的深拷贝记录，用Map去记录，因为我们的key是对象,用weakMap也行，因为weakMap的key只能是对象；
2. 如果检查已经拷贝过了，就直接返回已经处理过的数据；

1. 进来的时候，检查是否深拷贝过，
```

**还存在什么问题呢？**

如果属性是继承得到的，不在这个数据上，而在原型上，就不能去深拷贝这个属性。

```js
for(let key in a) {
    if(a.hasOwnProperty(key)) { // 检查属性是否不在原型上的
    	result[key] = deepClone[a[key]]
	}
}

```



### 数组去重

var a1 = [1,2,2,333,4,4,333]

1. 计数排序,用对象去计数 如果里面有对象的话 就用map。用对象存储key的话，key就只能是字符串可。
2. 用set, Array.from(new Set(a))  [...new Set(a1)]
3. 使用Map存key，这样的话支持的类型多





## Dom押题

com事件模型： 先经历从上到下的捕获，再经理从下到上的冒泡阶段

addEventListener('click', fn, T/F)

可以使用e.stopPropagation() 來阻止捕获或冒泡 // 阻止传播的过程



#### 手写事件委托

不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。

好处：

1. 节省监听器
2. 实现动态监听

还钱：

解决坏处：



思路： 点击span后，递归遍历span的祖先元素，看其中有没有ul的li

主要是冒泡，点击的具体元素 会 一层一层找到父级元素，然后去检测父级元素 是否符合传入的selector, 符合的话 则执行事件

递归的边界值：一直递归到 父级元素层

```js
el.matches(selector) 
例子：
<div id="xxxxxx" data-xxx="xxx"></div>

document.querySelector('[data-xxx="xxx"]').matches('#xxxxxx')  => true

function eventEntrust(element, eventType, selector, callback) {
    if(element && element.nodeType === 3) {
        element.addEventListener(eventType, (e) => {
            let el = e.target
            while(!el.matches(selector)) {
                if(element === el) {
                    el = null
                    break;
                }
                el = el.parentNode
            }
            
            el && callback.call(el, e, el)
        })
    }
     return element 
}

```

### 拖拽 div







## Http

##### Get Post 区别有哪些

打开一post页 

1. 幂等性

   get是读，post是写， get读100次，数据也是一样的，而post每提交一次，数据库的值就可以改变。所以get是幂等，post不是

   get是读，post是写 所以用浏览器打开页面发送Get请求，post打开页面提交表单

   get页面可以被手签收藏，post页面不行，为了安全。
   
3. 请求参数

   通常，Get请求参数放在url里， post请求放在body里

   Get请求参数放在url里 是有长度限制，  不是协议限制的，而是软件和服务器限制的
   
3. TCP packet

5. get只发一个，post两个或两个以上，因为有请求体。
   
   **最根本区别就是语义的区别。**

****