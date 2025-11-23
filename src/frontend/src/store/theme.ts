import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { darkTheme, lightTheme, type GlobalTheme } from 'naive-ui'

export const useThemeStore = defineStore('theme', () => {
  // 主题模式：'dark' | 'light'
  const themeMode = ref<'dark' | 'light'>('dark')
  
  // 当前主题对象
  const theme = computed<GlobalTheme | null>(() => {
    return themeMode.value === 'dark' ? darkTheme : lightTheme
  })
  
  // 切换主题
  const toggleTheme = () => {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  }
  
  // 设置主题
  const setTheme = (mode: 'dark' | 'light') => {
    themeMode.value = mode
  }
  
  return {
    themeMode,
    theme,
    toggleTheme,
    setTheme
  }
})

