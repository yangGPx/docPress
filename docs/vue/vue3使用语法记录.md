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

   