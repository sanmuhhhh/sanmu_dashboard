import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'

// 通用字体设置 (可选)
import 'vfonts/Lato.css' 

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(naive)

app.mount('#app')

