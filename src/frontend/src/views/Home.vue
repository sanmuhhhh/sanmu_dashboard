<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { NGrid, NGridItem, NCard } from 'naive-ui'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useThemeStore } from '../store/theme'
import Icon from '../components/icons/Icon.vue'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')

// 功能选项
const quickActions = [
  { 
    id: 'data-collector', 
    title: '数据', 
    shortTitle: '数据',
    icon: 'database',
    color: '#2962ff'
  },
  { 
    id: 'data-processor', 
    title: '处理', 
    shortTitle: '处理',
    icon: 'cpu',
    color: '#00d4ff'
  },
  { 
    id: 'ai-analyzer', 
    title: 'AI', 
    shortTitle: 'AI',
    icon: 'brain',
    color: '#00ff88'
  },
  { 
    id: 'visualization', 
    title: '可视化', 
    shortTitle: '可视',
    icon: 'chart',
    color: '#ffaa00'
  },
  { 
    id: 'workflow', 
    title: '工作流', 
    shortTitle: '流',
    icon: 'workflow',
    color: '#ff6b6b'
  },
  { 
    id: 'plugins', 
    title: '插件', 
    shortTitle: '插件',
    icon: 'plugin',
    color: '#9b59b6'
  },
  { 
    id: 'stock-market', 
    title: '股市', 
    shortTitle: '股市',
    icon: 'chart',
    color: '#00d4ff'
  },
  { 
    id: 'todos', 
    title: 'TODO', 
    shortTitle: 'TODO',
    icon: 'task',
    color: '#2962ff'
  }
]


// 新闻动态数据
const newsData = ref([
  { title: 'AI 技术突破：GPT-5 发布在即', time: '2小时前', source: 'TechNews' },
  { title: '市场分析：科技股持续上涨', time: '5小时前', source: 'FinanceDaily' },
  { title: '新功能上线：数据可视化增强', time: '1天前', source: 'ProductUpdate' },
  { title: '行业报告：2024年趋势预测', time: '2天前', source: 'IndustryReport' },
  { title: '技术分享：Vue 3 最佳实践', time: '3天前', source: 'DevBlog' }
])

// 自选动态数据
const watchlistData = ref([
  { name: 'AAPL', price: 178.50, change: '+2.3%', trend: 'up' },
  { name: 'GOOGL', price: 142.20, change: '+1.8%', trend: 'up' },
  { name: 'MSFT', price: 378.90, change: '-0.5%', trend: 'down' },
  { name: 'TSLA', price: 245.60, change: '+3.2%', trend: 'up' },
  { name: 'NVDA', price: 485.30, change: '+5.1%', trend: 'up' }
])

// TODO数据
const todosData = ref({
  completed: 8,
  inProgress: 2,
  pending: 5
})

// TODO饼图配置
const todosChartOption = computed(() => {
  const total = todosData.value.completed + todosData.value.inProgress + todosData.value.pending
  const completedPercent = total > 0 ? Math.round((todosData.value.completed / total) * 100) : 0
  
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: isDark.value ? '#1e222d' : '#ffffff',
      borderColor: isDark.value ? '#2a2e39' : '#e5e5e5',
      borderWidth: 1,
      textStyle: {
        color: isDark.value ? '#d1d4dc' : '#18181c',
        fontSize: 12
      },
      padding: [8, 12]
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'TODOS',
        type: 'pie',
        radius: ['45%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: isDark.value ? '#131722' : '#ffffff',
          borderWidth: isDark.value ? 4 : 5,
          shadowBlur: isDark.value ? 25 : 30,
          shadowColor: isDark.value ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.15)',
          shadowOffsetX: 0,
          shadowOffsetY: isDark.value ? 0 : 4
        },
        label: {
          show: true,
          position: 'center',
          formatter: `{a|${completedPercent}%}\n{b|完成度}`,
          rich: {
            a: {
              fontSize: isDark.value ? 36 : 38,
              fontWeight: 'bold',
              color: isDark.value ? '#00ff88' : '#52c41a',
              lineHeight: 42,
              textShadowBlur: isDark.value ? 12 : 8,
              textShadowColor: isDark.value ? 'rgba(0, 255, 136, 0.6)' : 'rgba(82, 196, 26, 0.4)',
              textShadowOffsetX: 0,
              textShadowOffsetY: isDark.value ? 0 : 2
            },
            b: {
              fontSize: 13,
              fontWeight: 600,
              color: isDark.value ? '#787b86' : '#595959',
              lineHeight: 18
            }
          }
        },
        labelLine: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 255, 136, 0.6)',
            borderWidth: 4
          }
        },
        animationType: 'scale',
        animationEasing: 'backOut',
        animationDuration: 1000,
        animationDelay: (idx: number) => idx * 150,
        data: total > 0 ? [
          { 
            value: todosData.value.completed, 
            name: '已完成',
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: isDark.value ? '#00ff88' : '#52c41a' },
                  { offset: 0.5, color: isDark.value ? '#00d4aa' : '#73d13d' },
                  { offset: 1, color: isDark.value ? '#00b87a' : '#95de64' }
                ]
              },
              shadowBlur: 30,
              shadowColor: isDark.value ? 'rgba(0, 255, 136, 0.5)' : 'rgba(82, 196, 26, 0.4)',
              shadowOffsetX: 0,
              shadowOffsetY: 4
            }
          },
          { 
            value: todosData.value.inProgress, 
            name: '进行中',
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: isDark.value ? '#ffaa00' : '#faad14' },
                  { offset: 1, color: isDark.value ? '#ff8800' : '#ffc53d' }
                ]
              },
              shadowBlur: 20,
              shadowColor: isDark.value ? 'rgba(255, 170, 0, 0.4)' : 'rgba(250, 173, 20, 0.2)'
            }
          },
          { 
            value: todosData.value.pending, 
            name: '待处理',
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: isDark.value ? '#787b86' : '#bfbfbf' },
                  { offset: 1, color: isDark.value ? '#5a5d68' : '#d9d9d9' }
                ]
              },
              shadowBlur: 15,
              shadowColor: isDark.value ? 'rgba(120, 123, 134, 0.3)' : 'rgba(191, 191, 191, 0.2)'
            }
          }
        ] : [
          {
            value: 1,
            name: '暂无数据',
            itemStyle: {
              color: isDark.value ? '#787b86' : '#bfbfbf'
            }
          }
        ]
      }
    ]
  }
})

// 图片数据
const galleryImages = ref([
  { id: 1, title: '图片 1' },
  { id: 2, title: '图片 2' },
  { id: 3, title: '图片 3' },
  { id: 4, title: '图片 4' },
  { id: 5, title: '图片 5' }
])

const currentImageIndex = ref(0)
const ripplePosition = ref({ x: 0, y: 0, show: false })

// 切换到上一张图片
const prevImage = () => {
  currentImageIndex.value = currentImageIndex.value > 0 
    ? currentImageIndex.value - 1 
    : galleryImages.value.length - 1
}

// 切换到下一张图片
const nextImage = () => {
  currentImageIndex.value = currentImageIndex.value < galleryImages.value.length - 1
    ? currentImageIndex.value + 1
    : 0
}

// 处理图片点击
const handleImageClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const clickY = event.clientY - rect.top
  const width = rect.width
  
  // 显示水波纹效果
  ripplePosition.value = {
    x: clickX,
    y: clickY,
    show: true
  }
  
  // 点击右半部分向右切换，左半部分向左切换
  if (clickX > width / 2) {
    nextImage()
  } else {
    prevImage()
  }
  
  // 隐藏水波纹
  setTimeout(() => {
    ripplePosition.value.show = false
  }, 600)
}

// 自动切换图片
let autoSlideInterval: number | null = null

onMounted(() => {
  // 每隔5秒自动向右切换
  autoSlideInterval = window.setInterval(() => {
    nextImage()
  }, 5000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
})

// 点击功能选项
const handleQuickAction = (actionId: string) => {
  // TODO: 实现功能跳转
  console.log('执行功能:', actionId)
}

// 动画效果
onMounted(() => {
  // 可以在这里添加数据更新逻辑，实现动态效果
})
</script>

<template>
  <div class="home-container" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <div class="home-wrapper">
      <!-- 头部 -->
      <div class="home-header">
        <div class="home-title">
          <Icon name="terminal" :size="20" />
          <span>HOME</span>
        </div>
        <div class="home-status">
          <span class="status-dot"></span>
          <span>就绪</span>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 左侧：功能选项容器 -->
        <div class="actions-container">
        <div class="actions-panel">
          <div 
            v-for="action in quickActions" 
            :key="action.id"
            class="action-item"
            :style="{ '--action-color': action.color }"
            @click="handleQuickAction(action.id)"
          >
            <div class="action-square" :style="{ 
              '--action-color': action.color,
              'background-color': `${action.color}15`,
              'border-color': `${action.color}30`
            }">
              <div class="action-icon" :style="{ color: action.color }">
                <Icon :name="action.icon" :size="20" />
              </div>
              <span class="action-label">{{ action.shortTitle }}</span>
            </div>
          </div>
        </div>
            </div>
        <!-- 右侧：预留空间 -->
        <div class="right-container">
          <!-- 左侧：TODO完成情况 -->
          <div class="todos-status-container">
            <n-card class="todos-status-card">
              <div class="todos-status-header">
                <h3 class="todos-status-title">TODO</h3>
              </div>
              <div class="todos-status-content">
                <!-- 饼图 -->
                <div class="todos-chart-wrapper">
            <v-chart
              :option="todosChartOption"
              class="todos-chart"
              autoresize
            />
                </div>
                <!-- 统计信息 -->
                <div class="todos-stats">
                  <div class="stat-item">
                    <div class="stat-value">{{ todosData.completed }}</div>
                    <div class="stat-label">已完成</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ todosData.inProgress }}</div>
                    <div class="stat-label">进行中</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ todosData.pending }}</div>
                    <div class="stat-label">待处理</div>
                  </div>
                </div>
              </div>
          </n-card>
          </div>
          <!-- 右侧：图片精选 -->
          <div class="gallery-container">
            <n-card class="gallery-card">
              <div class="gallery-header">
                <div class="gallery-indicator">
                  {{ currentImageIndex + 1 }} / {{ galleryImages.length }}
                </div>
              </div>
              <div class="gallery-viewer">
                <div 
                  class="gallery-image-wrapper"
                  @click="handleImageClick"
                >
                  <div 
                    class="gallery-image-slide"
                    :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
                  >
                    <div 
                      v-for="image in galleryImages" 
                      :key="image.id"
                      class="gallery-image-item"
                    >
                      <div class="gallery-image-placeholder">
                        <Icon name="camera" :size="48" />
                        <span>{{ image.title }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 水波纹效果 -->
                  <div 
                    v-if="ripplePosition.show"
                    class="ripple-effect"
                    :style="{
                      left: ripplePosition.x + 'px',
                      top: ripplePosition.y + 'px'
                    }"
                  ></div>
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </div>

      <!-- 底部：新闻动态和自选动态 -->
      <div class="bottom-charts">
        <n-grid :cols="2" :x-gap="24" :y-gap="24">
          <n-grid-item>
            <n-card class="chart-card">
              <div class="chart-header">
                <h3 class="chart-title">新闻动态</h3>
              </div>
              <div class="chart-content">
                <div class="news-list">
                  <div 
                    v-for="(item, index) in newsData" 
                    :key="index"
                    class="news-item"
                  >
                    <div class="news-title">{{ item.title }}</div>
                    <div class="news-meta">
                      <span class="news-source">{{ item.source }}</span>
                      <span class="news-time">{{ item.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="chart-card">
              <div class="chart-header">
                <h3 class="chart-title">自选动态</h3>
              </div>
              <div class="chart-content">
                <div class="watchlist-list">
                  <div 
                    v-for="(item, index) in watchlistData" 
                    :key="index"
                    class="watchlist-item"
                  >
                    <div class="watchlist-name">{{ item.name }}</div>
                    <div class="watchlist-price">${{ item.price }}</div>
                    <div 
                      class="watchlist-change"
                      :class="{ 'trend-up': item.trend === 'up', 'trend-down': item.trend === 'down' }"
                    >
                      {{ item.change }}
                    </div>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 24px;
  min-height: 100%;
  transition: background-color 0.3s ease;
}

.theme-dark .home-container {
  background-color: #131722;
}

.theme-light .home-container {
  background-color: #ffffff;
}

.home-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* 头部 */
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid;
  transition: border-color 0.3s ease;
}

.theme-dark .home-header {
  border-bottom-color: #2a2e39;
}

.theme-light .home-header {
  border-bottom-color: #e5e5e5;
}

.home-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .home-title {
  color: #d1d4dc;
}

.theme-light .home-title {
  color: #18181c;
}

.home-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: color 0.3s ease;
}

.theme-dark .home-status {
  color: #787b86;
}

.theme-light .home-status {
  color: #787b86;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00ff88;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 主要内容区域 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
}

/* 左侧功能选项容器 */
.actions-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 功能选项面板 */
.actions-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  align-content: start;
  position: relative;
  z-index: 1;
}

/* 右侧容器 */
.right-container {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 24px;
  width: 100%;
  height: 100%;
  align-items: stretch;
}

/* TODO完成情况容器 */
.todos-status-container {
  width: 100%;
  height: 100%;
}

.todos-status-card {
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.theme-dark .todos-status-card {
  background-color: #1e222d;
  border: 1px solid #2a2e39;
}

.theme-light .todos-status-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
}

.todos-status-card :deep(.n-card__content) {
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.todos-status-header {
  margin-bottom: 16px;
  flex-shrink: 0;
}

.todos-status-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .todos-status-title {
  color: #d1d4dc;
}

.theme-light .todos-status-title {
  color: #18181c;
}

.todos-status-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.todos-chart-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todos-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.todos-stats {
  display: flex;
  justify-content: space-around;
  gap: 8px;
  flex-shrink: 0;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.theme-dark .stat-item {
  background-color: #252936;
}

.theme-light .stat-item {
  background-color: #fafafa;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .stat-value {
  color: #d1d4dc;
}

.theme-light .stat-value {
  color: #18181c;
}

.stat-label {
  font-size: 11px;
  transition: color 0.3s ease;
}

.theme-dark .stat-label {
  color: #787b86;
}

.theme-light .stat-label {
  color: #787b86;
}

/* 图片精选容器 */
.gallery-container {
  width: 100%;
  height: 100%;
}

.gallery-card {
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.theme-dark .gallery-card {
  background-color: #1e222d;
  border: 1px solid #2a2e39;
}

.theme-light .gallery-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
}

.gallery-card :deep(.n-card__content) {
  padding: 20px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.gallery-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .gallery-title {
  color: #d1d4dc;
}

.theme-light .gallery-title {
  color: #18181c;
}

.gallery-indicator {
  font-size: 12px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.theme-dark .gallery-indicator {
  color: #787b86;
}

.theme-light .gallery-indicator {
  color: #787b86;
}

.gallery-viewer {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 0;
}

.gallery-image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  min-height: 0;
  cursor: pointer;
}

.theme-dark .gallery-image-wrapper {
  background-color: #252936;
}

.theme-light .gallery-image-wrapper {
  background-color: #fafafa;
}

.gallery-image-slide {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-image-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transition: color 0.3s ease;
}

.theme-dark .gallery-image-placeholder {
  color: #787b86;
}

.theme-light .gallery-image-placeholder {
  color: #787b86;
}

.gallery-image-placeholder span {
  font-size: 16px;
  font-weight: 500;
}

/* 水波纹效果 */
.ripple-effect {
  position: absolute;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ripple-animation 0.6s ease-out;
}

.theme-dark .ripple-effect {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes ripple-animation {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

.action-item {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 液态玻璃效果 */
.theme-dark .action-item {
  background: rgba(30, 34, 45, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.theme-dark .action-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.theme-dark .action-item:hover::before {
  left: 100%;
}

.theme-dark .action-item:hover {
  background: rgba(37, 41, 54, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.theme-light .action-item {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

.theme-light .action-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  transition: left 0.5s ease;
}

.theme-light .action-item:hover::before {
  left: 100%;
}

.theme-light .action-item:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 2px 4px rgba(0, 0, 0, 0.08);
}

.action-square {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-item:hover .action-square {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  filter: brightness(1.1);
}

.action-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  z-index: 1;
}

.action-item:hover .action-icon {
  transform: scale(1.1);
}

.action-label {
  font-size: 12px;
  font-weight: 500;
  transition: color 0.3s ease;
  z-index: 1;
}

.theme-dark .action-label {
  color: #d1d4dc;
}

.theme-light .action-label {
  color: #18181c;
}


/* 底部图表 */
.bottom-charts {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-card {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.chart-card :deep(.n-card__content) {
  display: flex;
  flex-direction: column;
  padding: 16px !important;
}

.theme-dark .chart-card {
  background-color: #1e222d;
  border: 1px solid #2a2e39;
}

.theme-light .chart-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
}

.chart-header {
  margin-bottom: 8px;
  padding: 0 0 8px 0;
}

.chart-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .chart-title {
  color: #d1d4dc;
}

.theme-light .chart-title {
  color: #18181c;
}

.chart-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: flex-start;
  align-items: stretch;
}


/* 新闻列表 */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 180px;
  overflow-y: auto;
  flex-shrink: 0;
  width: 100%;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.news-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.news-item {
  padding: 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.theme-dark .news-item {
  background-color: #252936;
}

.theme-dark .news-item:hover {
  background-color: #2a2e39;
}

.theme-light .news-item {
  background-color: #fafafa;
}

.theme-light .news-item:hover {
  background-color: #f0f0f0;
}

.news-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.theme-dark .news-title {
  color: #d1d4dc;
}

.theme-light .news-title {
  color: #18181c;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  transition: color 0.3s ease;
}

.theme-dark .news-meta {
  color: #787b86;
}

.theme-light .news-meta {
  color: #787b86;
}

.news-source {
  font-weight: 500;
}

.news-time {
  opacity: 0.8;
}

/* 自选列表 */
.watchlist-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 180px;
  overflow-y: auto;
  flex-shrink: 0;
  width: 100%;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.watchlist-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.watchlist-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.theme-dark .watchlist-item {
  background-color: #252936;
}

.theme-dark .watchlist-item:hover {
  background-color: #2a2e39;
}

.theme-light .watchlist-item {
  background-color: #fafafa;
}

.theme-light .watchlist-item:hover {
  background-color: #f0f0f0;
}

.watchlist-name {
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .watchlist-name {
  color: #d1d4dc;
}

.theme-light .watchlist-name {
  color: #18181c;
}

.watchlist-price {
  font-size: 13px;
  font-weight: 500;
  text-align: right;
  transition: color 0.3s ease;
}

.theme-dark .watchlist-price {
  color: #d1d4dc;
}

.theme-light .watchlist-price {
  color: #18181c;
}

.watchlist-change {
  font-size: 12px;
  font-weight: 600;
  text-align: right;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.watchlist-change.trend-up {
  color: #00ff88;
  background-color: rgba(0, 255, 136, 0.1);
}

.theme-light .watchlist-change.trend-up {
  color: #52c41a;
  background-color: rgba(82, 196, 26, 0.15);
  font-weight: 700;
}

.watchlist-change.trend-down {
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
}

/* 水波纹效果 */
.ripple-effect {
  position: absolute;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ripple-animation 0.6s ease-out;
  z-index: 10;
}

.theme-dark .ripple-effect {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes ripple-animation {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
}
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
</style>
