<script setup lang="ts">
import { ref, computed } from 'vue'
import TopBar from '@/components/layout/TopBar.vue'
import LeftSidebar from '@/components/layout/LeftSidebar.vue'
import RightSidebar from '@/components/layout/RightSidebar.vue'
import BottomPanel from '@/components/layout/BottomPanel.vue'
import { useThemeStore } from '@/store/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.themeMode === 'dark')

// 控制右侧栏和底部栏的显示
const rightSidebarVisible = ref(true)
const bottomPanelVisible = ref(true)
</script>

<template>
  <div class="main-layout" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <!-- 顶部栏 -->
    <TopBar class="top-bar" />
    
    <div class="content-wrapper">
      <!-- 左侧工具栏 -->
      <LeftSidebar class="left-sidebar" />
      
      <!-- 中间主要内容区 -->
      <main class="main-content">
        <router-view />
      </main>
      
      <!-- 右侧工具面板 -->
      <RightSidebar 
        v-if="rightSidebarVisible"
        class="right-sidebar"
      />
    </div>
    
    <!-- 底部面板 -->
    <BottomPanel 
      v-if="bottomPanelVisible"
      class="bottom-panel"
    />
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 深色主题 */
.main-layout.theme-dark {
  background-color: #131722;
  color: #d1d4dc;
}

.main-layout.theme-dark .top-bar {
  border-bottom-color: #2a2e39;
}

.main-layout.theme-dark .left-sidebar {
  border-right-color: #2a2e39;
}

.main-layout.theme-dark .main-content {
  background-color: #131722;
}

.main-layout.theme-dark .right-sidebar {
  border-left-color: #2a2e39;
}

.main-layout.theme-dark .bottom-panel {
  border-top-color: #2a2e39;
}

/* 浅色主题 */
.main-layout.theme-light {
  background-color: #ffffff;
  color: #18181c;
}

.main-layout.theme-light .top-bar {
  border-bottom-color: #e5e5e5;
}

.main-layout.theme-light .left-sidebar {
  border-right-color: #e5e5e5;
}

.main-layout.theme-light .main-content {
  background-color: #ffffff;
}

.main-layout.theme-light .right-sidebar {
  border-left-color: #e5e5e5;
}

.main-layout.theme-light .bottom-panel {
  border-top-color: #e5e5e5;
}

.top-bar {
  flex-shrink: 0;
  height: 48px;
  border-bottom: 1px solid;
  transition: border-color 0.3s ease;
}

.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0; /* 确保 flex 子元素可以正确收缩 */
}

.left-sidebar {
  flex-shrink: 0;
  width: 48px;
  border-right: 1px solid;
  transition: border-color 0.3s ease;
  overflow-y: auto; /* 允许左侧栏滚动 */
}

.main-content {
  flex: 1;
  overflow: auto;
  transition: background-color 0.3s ease;
  min-width: 0; /* 确保 flex 子元素可以正确收缩 */
  /* 确保内容不被底部面板遮挡 */
  padding-bottom: 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.main-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.right-sidebar {
  flex-shrink: 0;
  width: 300px;
  border-left: 1px solid;
  transition: border-color 0.3s ease;
  overflow-y: auto; /* 允许右侧栏滚动 */
}

.bottom-panel {
  flex-shrink: 0;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
  border-top: 1px solid;
  transition: border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

