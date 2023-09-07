import './css/style.css'
import 'element-plus/es/components/message/style/css'
import { ElInfiniteScroll } from 'element-plus'
import { createApp } from 'vue'
import { router } from './router/router.js'
import App from './App.vue'
import toast from './utils/vueToast.js'

export const plugins = [ElInfiniteScroll, router, toast]

const app = createApp(App)

plugins.forEach((plugin) => {
  app.use(plugin)
})

app.mount('#app')
