<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton, NTabs, NTabPane, NCard } from 'naive-ui'
import Icon from '../icons/Icon.vue'
import { useThemeStore } from '../../store/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')
const activeTab = ref('watchlist')

const tabs = [
  { key: 'watchlist', label: '观察列表', icon: 'watchlist' },
  { key: 'alerts', label: '警报', icon: 'alerts' },
  { key: 'news', label: '新闻', icon: 'news' },
  { key: 'data', label: '数据', icon: 'data' },
  { key: 'hotlists', label: '热门', icon: 'hotlists' },
  { key: 'calendar', label: '日历', icon: 'calendar' },
  { key: 'ideas', label: '想法', icon: 'ideas' },
  { key: 'chat', label: '聊天', icon: 'chat' },
  { key: 'help', label: '帮助', icon: 'help' },
  { key: 'object', label: '对象', icon: 'object' },
  { key: 'dom', label: 'DOM', icon: 'dom' },
  { key: 'replay', label: '回放', icon: 'replay' },
  { key: 'settings', label: '设置', icon: 'settings' }
]
</script>

<template>
  <div class="right-sidebar" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <div class="sidebar-tabs">
      <n-tabs
        v-model:value="activeTab"
        type="line"
        size="small"
        placement="left"
        class="vertical-tabs"
      >
        <n-tab-pane
          v-for="tab in tabs"
          :key="tab.key"
          :name="tab.key"
          :tab="tab.icon"
        >
          <template #tab>
            <Icon :name="tab.icon" :size="18" class="tab-icon" />
          </template>
          <div class="tab-content">
            <n-card size="small" class="tab-card">
              <div class="tab-header">
                <h3>{{ tab.label }}</h3>
              </div>
              <div class="tab-body">
                <p class="placeholder-text">{{ tab.label }} 内容区域</p>
              </div>
            </n-card>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<style scoped>
.right-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-dark .right-sidebar {
  background-color: #1e222d;
}

.theme-light .right-sidebar {
  background-color: #ffffff;
  border-left: 1px solid #e5e5e5;
}

.sidebar-tabs {
  flex: 1;
  overflow: hidden;
}

.vertical-tabs {
  height: 100%;
}

:deep(.n-tabs-nav) {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-dark :deep(.n-tabs-nav) {
  background-color: #1e222d;
  border-right: 1px solid #2a2e39;
}

.theme-light :deep(.n-tabs-nav) {
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
}

:deep(.n-tabs-tab) {
  padding: 8px 12px;
  min-width: 48px;
}

.tab-icon {
  display: inline-block;
  vertical-align: middle;
  transition: color 0.3s ease;
}

.theme-dark .tab-icon {
  color: #787b86;
}

.theme-light .tab-icon {
  color: #787b86;
}

.tab-content {
  padding: 12px;
  height: 100%;
  overflow: auto;
}

.tab-card {
  border: none;
  transition: background-color 0.3s ease;
}

.theme-dark .tab-card {
  background-color: #131722;
}

.theme-light .tab-card {
  background-color: #ffffff;
}

.tab-header {
  margin-bottom: 12px;
}

.tab-header h3 {
  margin: 0;
  font-size: 14px;
  transition: color 0.3s ease;
}

.theme-dark .tab-header h3 {
  color: #d1d4dc;
}

.theme-light .tab-header h3 {
  color: #18181c;
}

.tab-body {
  transition: color 0.3s ease;
}

.theme-dark .tab-body {
  color: #787b86;
}

.theme-light .tab-body {
  color: #787b86;
}

.placeholder-text {
  margin: 0;
  font-size: 12px;
  text-align: center;
  padding: 20px;
  transition: color 0.3s ease;
}

.theme-dark .placeholder-text {
  color: #787b86;
}

.theme-light .placeholder-text {
  color: #787b86;
}
</style>

