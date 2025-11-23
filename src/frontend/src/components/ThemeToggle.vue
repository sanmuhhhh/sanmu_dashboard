<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NButton } from 'naive-ui'
import { useThemeStore } from '../store/theme'
import Icon from './icons/Icon.vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')
const iconName = computed(() => isDark.value ? 'moon' : 'sun')

// 创建全屏遮罩容器
let overlayContainer: HTMLElement | null = null

onMounted(() => {
  // 创建全屏遮罩容器
  overlayContainer = document.createElement('div')
  overlayContainer.id = 'theme-overlay-container'
  overlayContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 99999;
    overflow: hidden;
  `
  document.body.appendChild(overlayContainer)
})

onUnmounted(() => {
  if (overlayContainer && overlayContainer.parentNode) {
    overlayContainer.parentNode.removeChild(overlayContainer)
  }
})

const handleClick = (event: MouseEvent) => {
  if (!overlayContainer) return
  
  // 获取点击位置（相对于视口）
  const clickX = event.clientX
  const clickY = event.clientY
  
  // 计算需要覆盖整个屏幕的半径
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const maxDistance = Math.max(
    Math.sqrt(clickX ** 2 + clickY ** 2),
    Math.sqrt((screenWidth - clickX) ** 2 + clickY ** 2),
    Math.sqrt(clickX ** 2 + (screenHeight - clickY) ** 2),
    Math.sqrt((screenWidth - clickX) ** 2 + (screenHeight - clickY) ** 2)
  )
  const finalRadius = maxDistance * 1.5
  
  // 先保存旧主题的颜色（切换前）
  const oldThemeColor = isDark.value ? '#131722' : '#ffffff'
  
  // 先切换主题（瞬间完成，新主题在底层）
  themeStore.toggleTheme()
  
  // 立即创建遮罩层（显示旧主题的颜色）
  const overlay = document.createElement('div')
  overlay.className = 'theme-overlay'
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${screenWidth}px;
    height: ${screenHeight}px;
    background-color: ${oldThemeColor};
    pointer-events: none;
    will-change: clip-path;
    clip-path: circle(100% at ${clickX}px ${clickY}px);
  `
  
  overlayContainer.appendChild(overlay)
  
  // 强制重排
  overlay.offsetHeight
  
  // 立即开始动画：遮罩层从点击位置扩散消失，露出底层的新主题
  requestAnimationFrame(() => {
    overlay.style.transition = 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    overlay.style.clipPath = `circle(0px at ${clickX}px ${clickY}px)`
  })
  
  // 动画完成后移除遮罩
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
  }, 600)
}
</script>

<template>
  <n-button
    quaternary
    size="small"
    circle
    class="theme-toggle"
    @click="handleClick"
  >
    <Icon :name="iconName" :size="18" class="theme-icon" />
  </n-button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 0;
  transition: all 0.3s ease;
}

.theme-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: scale(1.1);
}
</style>


