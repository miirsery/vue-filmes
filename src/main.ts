import { createApp } from 'vue'
import { createPinia } from 'pinia'
import IconTemplate from '@/components/common/IconTemplate.vue'
import 'virtual:svg-icons-register'

import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia()).component('IconTemplate', IconTemplate).use(router).mount('#app')
