# Axios 封装

考虑的特殊情况： 

1. post 用form
2. formData
3. 返回的数据是二进制流

两种形式，主要是使用上有所不同，但响应拦截函数这一块是一样的。

## 第一种形式

在使用的时候，由用户去配置这个接口的 methods 和 params ，更加灵活自由一点。

```js
import Axios from 'axios'
import { message, removeItem } from '@/utlis/utli'
import { ACCESS_TOKEN } from '@/store/const'

const request = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 20000,
})

//异常处理器
const errorhandler = (error) => {
  const { response = {} } = error
  const data = response['data'] || {}
  if ([403,503].includes(data['code'])) {
    message.error(data.message)
  }
  return Promise.resolve(error)
}

// 检查当前请求的接口路径 是否需要token
const checkUrlNoNeedToken = (path) => {
  const noUseTokenPathList = ['login', '/apis/v2/user/getToken']
  const flag = noUseTokenPathList.find(item => {
    return path.indexOf(item) > -1
  })
  return !!flag
}

//请求拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token')
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token && !checkUrlNoNeedToken(config.url)) {
    config.headers['token'] = token
  } else {
    delete config.headers.token
  }
  return config
}, errorhandler)

// 响应拦截器 看项目而定，主要分局status 以及 接口约定的code\status进行处理
// 有一些项目是错误信息完全由后端返回
request.interceptors.response.use((response) => {
  if (response.data.code === 10002) {
    message.error(response.data.message || 'error')
    removeItem(ACCESS_TOKEN)
    window.location.href = '/login'
  }else if ((response.data.code < 200 || response.data.code > 299) && response.data.code !== 23030) {
    // 对接口的错误信息 统一进行提示 非200的状态码 都提示
    message.error(response.data.message || 'error')
  }
  return response.data
}, errorhandler)

export default request
```

使用

```js
import request from 'request.js'

request({
    methods: 'get',
    params: {
        a: 1
    }
})
```

##  第二种

对于使用者来说，这种的话就使用起来更加简单，但对于一些特殊情况的处理，需要内部提前准备好配置项，让用户能够实现特殊情况上的处理，而不需要自己再去加逻辑。

```js
import axios from 'axios'

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config)
	config = handleConfigureAuth(config)
	return config
})

axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.data)
        handleAuthError(response.data.errno)
        handleGeneralError(response.data.errno, response.data.errmsg)
        return response
    },
    (err) => {
        handleNetworkError(err.response.status)
        Promise.reject(err.response)
    }
)

function Get(url, params, clearFn) {
    return new Promise((resolve) => {
        axios.get(url, { params }).then((result) => {
            resolve([null, result.data])
        }).catch((err) => {
            resolve([err, {}])
        })
    })
}
```

使用

```js
const [err, result] = await Get('/userInfo', { name: 'ygp' })
```

