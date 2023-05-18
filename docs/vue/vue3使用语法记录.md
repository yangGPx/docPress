# vue3使用记录

1. disExpose ref  父组件获取子组件实例，并使用子组件方法

   ```
   子组件
   defineExpose({
   hide,
   show
   })
   
   父组件
   <template>
   	<child ref="xxx"/>
   </template>
   
   <script setup>
   	const xxx = ref({})
   	...
   	xxx.show()
   <script/>
   ```

2. vue3中使用route

   ```
   setup
   import { useRoute } from 'vue-router'
   
   const route = useRoute()
   ```

3. router4中 不再使用tag

   ```
   https://www.cnblogs.com/yejunweb/p/16093455.html
   ```

4.  shallowRef  替换一整个对象的时候用

   ``` 
   ref 
   const va = ref({ count: 1 })
   va.value.count += 1 会产生变化，
   但 
   const va = shallowRef({ count: 1 })
   va.value.count += 1
   并不会产生变化
   
   因为shallowRef只会做浅层代理，不会被深层递归地转为响应式
   这种适合对这个对象进行替换，这种情况
   ```

5. 自定义组件 使用时支持-model   Todo

   ```vue
   <template>
   <div class="email-input">
       <a-input ref="emailInputEl" class="email-input-el" v-model:value="inputData" placeholder="请输入您的电子邮箱账户" @change="inputChange"/>
   </div>
   </template>
   
   <script setup>
       const emit = defineEmits(['update:modelValue'])
       
       emit('update:modelValue', value)
   </script>
   
   <EmailInput v-model="xxx">
       
   但还没够完善，因为改变xxx的值 并不能改变input的值 
   ```

6. pinia 更小巧，action 和 mutation合一起了，可以直接修改， 也可以$patch修改状态, 或者使用action进行修改

    [介绍 | Pinia 中文文档 (web3doc.top)](https://pinia.web3doc.top/introduction.html#基本示例)  基本使用

   ```js
   store.js 
   import { defineStore } from 'pinia'
   
   export const useCounterStore = defineStore('counter', {
     state: () => {
       return { count: 0 }
     },
     // 也可以定义为
     // state: () => ({ count: 0 })
     actions: {
       increment() {
         this.count++
       },
     },
   })
   
   类似定义一个组件一样（setup）,定义变量和方法 然后暴露出去
   export const useCounterStore = defineStore('counter', () => {
     const count = ref(0)
     function increment() {
       count.value++
     }
   
     return { count, increment }
   })
   
   使用
   import { useCounterStore } from '@/stores/counter'
   
   export default {
     setup() {
       const counter = useCounterStore()
   
       counter.count++
         
       counter.$patch({ count: counter.count + 1 })
       counter.increment()
     },
   }
   
   ```

7. pinia state的修改

   1. 可直接进行修改，整个实例化出来的store， `store` 是一个用`reactive` 包裹的对象 ；
   2. 通过$patch进行修改；
   3. 通过action进行修改；

   ```js
   import {defineStore} from 'pinia'
   
   export const useStore  = defineStore('id', {
       state: () => {
           return {
               count: 1
           } 
       },
       action: {
           increment() {
               this.count += 1
           }
       }
   })
   ```

   