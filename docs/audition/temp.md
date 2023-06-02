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

   