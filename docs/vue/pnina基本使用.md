# Pinia 的基本使用

 [Home | Pinia 中文文档 (web3doc.top)](https://pinia.web3doc.top/) 

与vuex的区别

1. 不再是单一状态树了，而是进行了拆分；
2. 去掉了mutation；
3. 可以直接对state进行修改。

## 基本使用 基于<script setup>

 [介绍 | Pinia 中文文档 (web3doc.top)](https://pinia.web3doc.top/introduction.html#基本示例)  看基本示例

### defineStore 创建一个store

第一个参数是id,主要是用来devTool调试的

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
    state: () => {
        return {
            count: 1
        }
    },
    action: {
        increment() {
            this.count++
        }
    }
})


组合式写法
export const useStore = defineStore('main', () => {
    const count = ref(1)
    
    function increment() {
        count.value++
    }
    return {
        count,
        increment
    }
})
```

### 实例化定义的store

实例化出来的 `store` 是一个用`reactive` 包裹的对象，同reactive的规则。

```js
import { useStore, $patch } from 'path'
const useData = useStore()
```

#### state

直接进行解构出来的值，并不能被监听到改动。

```js
useData.count++ // 直接对state的值 修改
store.$patch({ count: count+1, name: '新增name' }) // 用$patch方法就行修改
store.increment()
```

如果需要**解构**， 需要用`storeToRefs `

```js
import { storeToRefs } from 'pinia'

const { count, increment } = storeToRefs(store)
```

**重置状态**，将store重置到初始状态。

```js
store.$reset()
```

可直接全部**覆盖替换 **state

```js
store.$state = { counter: 666, name: 'Paimon' }
```



#### actions

同以前一样，可进行异步操作。但不同的是, action多了mutation的职责，对state进行修改。

```js
action: {
    async refreshCurrentUser() {
        try{
            const result = await getCurrentUser()
            if(result.code === 200) {
                this.count = result.data.count
            }
        }catch() {
            
        }
    }
}
```

