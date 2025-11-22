<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <div class="app-container">
      <h1>Sanmu Dashboard</h1>
      <p>Frontend initialized successfully.</p>
    </div>
  </n-config-provider>
</template>

<style>
.app-container {
  padding: 20px;
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
</style>

