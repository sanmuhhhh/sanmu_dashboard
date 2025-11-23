<script setup lang="ts">
import { ref, computed } from 'vue'
import { NTabs, NTabPane, NCard } from 'naive-ui'
import Icon from '../icons/Icon.vue'
import { useThemeStore } from '../../store/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')
const activeTab = ref('home')

const tabs = [
  { key: 'home', label: 'Home' },
  { key: 'timeframe', label: '时间周期' },
  { key: 'pine', label: 'Pine Editor' },
  { key: 'trading', label: '交易面板' },
  { key: 'screener', label: '筛选器' }
]
</script>

<template>
  <div class="bottom-panel" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <n-tabs
      v-model:value="activeTab"
      type="line"
      size="small"
      class="bottom-tabs"
    >
      <n-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :name="tab.key"
        :tab="tab.label"
      >
        <div class="panel-content">
          <n-card size="small" class="panel-card">
            <div class="panel-body">
              <template v-if="tab.key === 'home'">
                <div class="home-content">
                  <Icon name="terminal" :size="24" />
                  <p class="placeholder-text">Home 面板</p>
                </div>
              </template>
              <template v-else-if="tab.key === 'timeframe'">
                <div class="timeframe-selector">
                  <span
                    v-for="tf in ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All']"
                    :key="tf"
                    class="timeframe-item"
                    :class="{ active: tf === '1D' }"
                  >
                    {{ tf }}
                  </span>
                  <Icon name="calendar" :size="16" class="calendar-icon" />
                </div>
              </template>
              <template v-else>
                <p class="placeholder-text">{{ tab.label }} 内容区域</p>
              </template>
            </div>
          </n-card>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped>
.bottom-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-dark .bottom-panel {
  background-color: #1e222d;
  border-top: 1px solid #2a2e39;
}

.theme-light .bottom-panel {
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
}

.bottom-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

:deep(.n-tabs-nav) {
  flex-shrink: 0;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  justify-content: center; /* 标签页居中 */
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

:deep(.n-tabs-nav-scroll-wrapper) {
  display: flex;
  justify-content: center;
  width: 100%;
}

:deep(.n-tabs-tab-wrapper) {
  display: flex;
  justify-content: center;
}

.theme-dark :deep(.n-tabs-nav) {
  background-color: #1e222d;
  border-bottom: 1px solid #2a2e39;
}

.theme-light :deep(.n-tabs-nav) {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

:deep(.n-tabs-tab) {
  padding: 8px 16px; /* 标签页内边距 */
}

:deep(.n-tabs-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

:deep(.n-tab-pane) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-content {
  flex: 1;
  padding: 12px;
  overflow: auto;
  min-height: 0;
  display: flex;
  justify-content: center; /* 内容区域居中 */
  align-items: flex-start; /* 顶部对齐 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.panel-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.panel-card {
  border: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 1000px; /* 限制最大宽度，内容居中时不会太宽 */
  margin: 0 auto; /* 确保卡片本身居中 */
}

.theme-dark .panel-card {
  background-color: #131722;
}

.theme-light .panel-card {
  background-color: #ffffff;
}

.panel-body {
  flex: 1;
  overflow: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保内容主体居中 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.panel-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.timeframe-selector {
  display: flex;
  align-items: center;
  justify-content: center; /* 时间周期选项居中 */
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
}

.timeframe-item {
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.theme-dark .timeframe-item {
  color: #787b86;
}

.theme-light .timeframe-item {
  color: #787b86;
}

.theme-dark .timeframe-item:hover {
  background-color: #2a2e39;
  color: #d1d4dc;
}

.theme-light .timeframe-item:hover {
  background-color: #f5f5f5;
  color: #18181c;
}

.timeframe-item.active {
  background-color: #2962ff;
  color: #ffffff;
}

.calendar-icon {
  margin-left: 8px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.theme-dark .calendar-icon {
  color: #787b86;
}

.theme-light .calendar-icon {
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

.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
}

.theme-dark .home-content {
  color: #787b86;
}

.theme-light .home-content {
  color: #787b86;
}
</style>

