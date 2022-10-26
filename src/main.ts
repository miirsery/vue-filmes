import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import IconTemplate from '@/components/common/IconTemplate.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia())

app.component('IconTemplate', IconTemplate)

app.use(ElementPlus)

app.use(router)

app.mount('#app')
