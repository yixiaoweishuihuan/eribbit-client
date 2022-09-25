import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 导出基地址 提供给其他非axios的请求使用
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const { profile } = store.state.user
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  res => res.data,
  error => {
    if (error.response && error.response.status === 401) {
      // 清空无效用户信息
      store.commit('user/setUser', {})
      // 跳转到登录页面
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push(`/login?redirectUrl=${fullPath}`)
    }
    return Promise.reject(error)
  }
)

export default (url, method = 'get', data) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
