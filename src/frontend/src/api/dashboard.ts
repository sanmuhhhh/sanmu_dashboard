import apiClient from './index'

// ==========================================
// 📊 仪表盘相关 API 接口
// ==========================================

// 定义响应类型
export interface DashboardData {
  totalUsers: number
  totalRevenue: number
  charts: ChartData[]
}

export interface ChartData {
  id: string
  type: 'line' | 'bar' | 'pie'
  title: string
  data: any
  config?: any
}

// API 接口函数
export const dashboardApi = {
  /**
   * 获取仪表盘数据
   * GET /api/dashboard
   */
  getDashboardData: () => {
    return apiClient.get<DashboardData>('/dashboard')
  },
  
  /**
   * 获取图表数据
   * GET /api/charts/:id
   */
  getChartData: (chartId: string) => {
    return apiClient.get<ChartData>(`/charts/${chartId}`)
  },
  
  /**
   * 更新图表配置
   * PUT /api/charts/:id
   */
  updateChartConfig: (chartId: string, config: any) => {
    return apiClient.put(`/charts/${chartId}`, config)
  },
  
  /**
   * 删除图表
   * DELETE /api/charts/:id
   */
  deleteChart: (chartId: string) => {
    return apiClient.delete(`/charts/${chartId}`)
  }
}

