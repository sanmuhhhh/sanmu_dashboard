<script setup lang="ts">
import { NButton, NSpace, NDivider } from 'naive-ui'
import { ref, computed } from 'vue'
import ThemeToggle from '../ThemeToggle.vue'
import Icon from '../icons/Icon.vue'
import { useThemeStore } from '../../store/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')
const activeTool = ref('crosshair')
</script>

<template>
  <div class="top-bar" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <div class="top-bar-left">
      <div class="logo">
        <span class="logo-text">Sanmu Dashboard</span>
      </div>
      
      <n-divider vertical />
      
      <n-space :size="8">
        <n-button quaternary size="small">指标</n-button>
        <n-button quaternary size="small">警报</n-button>
        <n-button quaternary size="small">回放</n-button>
      </n-space>
      
      <n-divider vertical />
      
      <n-space :size="4">
        <n-button quaternary size="small" circle>
          <Icon name="undo" :size="16" />
        </n-button>
        <n-button quaternary size="small" circle>
          <Icon name="redo" :size="16" />
        </n-button>
      </n-space>
    </div>
    
    <div class="top-bar-center">
      <!-- 快捷键显示区域 -->
      <n-space :size="12">
        <span class="shortcut-hint">Ctrl + /</span>
      </n-space>
    </div>
    
    <div class="top-bar-right">
      <n-space :size="8">
        <ThemeToggle />
        <n-button quaternary size="small" circle>
          <Icon name="search" :size="16" />
        </n-button>
        <n-button quaternary size="small" circle>
          <Icon name="camera" :size="16" />
        </n-button>
        <n-button quaternary size="small" circle>
          <Icon name="settings" :size="16" />
        </n-button>
        <n-button quaternary size="small" circle>
          <Icon name="fullscreen" :size="16" />
        </n-button>
        <n-button type="primary" size="small">发布</n-button>
      </n-space>
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 100%;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-dark .top-bar {
  background-color: #1e222d;
}

.theme-light .top-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-bar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.top-bar-right {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.theme-dark .logo-text {
  color: #d1d4dc;
}

.theme-light .logo-text {
  color: #18181c;
}

.shortcut-hint {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.theme-dark .shortcut-hint {
  color: #787b86;
  background-color: #2a2e39;
}

.theme-light .shortcut-hint {
  color: #787b86;
  background-color: #f5f5f5;
}
</style>

