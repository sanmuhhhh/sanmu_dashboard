<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { RouterView } from 'vue-router'
import { useThemeStore } from './store/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>

