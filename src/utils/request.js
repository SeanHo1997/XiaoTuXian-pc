import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'

const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器(在请求头统一携带token)
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  const { profile } = store.state.user
  // 判断是否有token
  if (profile.token) {
    // 将authorization统一设置
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器 1、剥离无效数据 2、处理token生效

// res => res.data 将有用的后台数据分离出来
instance.interceptors.response.use(res => res.data, error => {
  // 如果响应回来失败,并且状态码是401
  if (error.response && error.response.status === 401) {
    // 1清空用户信息
    store.commit('user/setUser', {})
    // 2跳转到登录页面(需要传参,登录后需要跳转到原页面)
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(error)
})

// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
