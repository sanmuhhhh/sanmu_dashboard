import axios from 'axios'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: '/api',              // 基础 URL（会被 vite proxy 代理到后端）
  timeout: 10000,               // 超时时间 10 秒
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器（添加 token、统一处理请求）
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器（统一处理响应和错误）
apiClient.interceptors.response.use(
  (response) => {
    // 直接返回 data，简化调用
    return response.data
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          // 未授权，可以跳转登录页
          console.error('未授权，请登录')
          break
        case 403:
          console.error('无权限访问')
          break
        case 404:
          console.error('接口不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('请求失败:', data?.message || error.message)
      }
    } else {
      console.error('网络错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient

