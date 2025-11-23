<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton, NTooltip } from 'naive-ui'
import Icon from '../icons/Icon.vue'
import { useThemeStore } from '../../store/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')
const activeTool = ref('crosshair')

const tools = [
  { id: 'crosshair', icon: 'crosshair', name: '十字线' },
  { id: 'trend', icon: 'trend', name: '趋势线' },
  { id: 'fibonacci', icon: 'fibonacci', name: '斐波那契' },
  { id: 'rectangle', icon: 'rectangle', name: '矩形' },
  { id: 'circle', icon: 'circle', name: '圆形' },
  { id: 'text', icon: 'text', name: '文本' },
  { id: 'pattern', icon: 'pattern', name: '图形' },
  { id: 'prediction', icon: 'prediction', name: '预测' },
  { id: 'icon', icon: 'icon', name: '图标' },
  { id: 'ruler', icon: 'ruler', name: '标尺' },
  { id: 'zoom', icon: 'zoom', name: '缩放' },
  { id: 'magnet', icon: 'magnet', name: '磁铁' },
  { id: 'lock', icon: 'lock', name: '锁定' },
  { id: 'hide', icon: 'hide', name: '隐藏' },
  { id: 'delete', icon: 'delete', name: '删除' }
]

const selectTool = (toolId: string) => {
  activeTool.value = toolId
}
</script>

<template>
  <div class="left-sidebar" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <div class="toolbar">
      <n-tooltip
        v-for="tool in tools"
        :key="tool.id"
        placement="right"
        :show-delay="300"
      >
        <template #trigger>
          <n-button
            :type="activeTool === tool.id ? 'primary' : 'default'"
            quaternary
            size="large"
            class="tool-button"
            @click="selectTool(tool.id)"
          >
            <Icon :name="tool.icon" :size="16" />
          </n-button>
        </template>
        {{ tool.name }}
      </n-tooltip>
    </div>
  </div>
</template>

<style scoped>
.left-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-dark .left-sidebar {
  background-color: #1e222d;
}

.theme-light .left-sidebar {
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
}

.toolbar {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 4px;
  min-height: min-content;
}

.tool-button {
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 0;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: background-color 0.3s ease;
}

.theme-dark .tool-button:hover {
  background-color: #2a2e39;
}

.theme-light .tool-button:hover {
  background-color: #f5f5f5;
}
</style>

