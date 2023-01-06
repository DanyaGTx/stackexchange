import { createApp } from 'vue'
import { ElInfiniteScroll } from 'element-plus'
import router from './router'
import toast from './toast'
import App from './App.vue'
import './style.css'
import 'element-plus/es/components/message/style/css'


export const plugins = [
  ElInfiniteScroll,
  router,
  toast
]

const app = createApp(App)

plugins.forEach((plugin) => {
  app.use(plugin)
})

app.mount('#app')
