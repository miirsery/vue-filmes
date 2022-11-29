import { createApp } from 'vue'
import { createPinia } from 'pinia'
import IconTemplate from '@/components/common/IconTemplate.vue'
import 'virtual:svg-icons-register'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// @ts-ignore
import YmapPlugin from 'vue-yandex-maps'

import App from './App.vue'
import router from './router'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/index.scss'

const settings = {
  apiKey: '2cb43899-91b5-43bd-8357-2c5725d6aa60', // Индивидуальный ключ API
  lang: 'ru_RU', // Используемый язык
  coordorder: 'latlong', // Порядок задания географических координат
  debug: false, // Режим отладки
  version: '2.1', // Версия Я.Карт
}

const app = createApp(App)

app.use(createPinia()).use(YmapPlugin, settings).component('IconTemplate', IconTemplate).use(router).mount('#app')
