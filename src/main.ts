import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './stores'

export function createApp() {
  // app 应用实例
  const app = createSSRApp(App)
  // 为 app 添加 pinia
  app.use(pinia)

  return {
    app,
  }
}
