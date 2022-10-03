import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia()).use(ElementPlus).use(router).mount('#app')
