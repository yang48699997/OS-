import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia()).use(router)//.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.mount('#app')
