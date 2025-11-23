// ==========================================
// 📚 API 使用示例
// ==========================================

import apiClient from './index'

// ==========================================
// 示例 1：简单的 GET 请求
// ==========================================
export const exampleApi = {
  // GET /api/example/users
  getUsers: async () => {
    try {
      const data = await apiClient.get('/example/users')
      return data
    } catch (error) {
      console.error('获取用户列表失败:', error)
      throw error
    }
  },
  
  // GET /api/example/users/:id
  getUserById: async (id: number) => {
    return apiClient.get(`/example/users/${id}`)
  },
  
  // POST /api/example/users
  createUser: async (userData: { name: string; email: string }) => {
    return apiClient.post('/example/users', userData)
  },
  
  // PUT /api/example/users/:id
  updateUser: async (id: number, userData: Partial<{ name: string; email: string }>) => {
    return apiClient.put(`/example/users/${id}`, userData)
  },
  
  // DELETE /api/example/users/:id
  deleteUser: async (id: number) => {
    return apiClient.delete(`/example/users/${id}`)
  }
}

// ==========================================
// 使用示例（在组件中）
// ==========================================
/*
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exampleApi } from '../api/example'

const users = ref([])
const loading = ref(false)

const loadUsers = async () => {
  loading.value = true
  try {
    users.value = await exampleApi.getUsers()
  } catch (error) {
    // 错误已在拦截器中处理
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>
*/

