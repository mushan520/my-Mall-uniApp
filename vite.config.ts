import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 开启 sourcemap 映射源码
    sourcemap: process.env.NODE_ENV === 'development' ? true : false,
  },
  // 依赖优化选项
  optimizeDeps: {
    // 依赖预构建
    entries: ['@dcloudio/uni-ui'],
  },
  plugins: [
    uni({
      vueOptions: {
        // 开启响应性语法糖
        reactivityTransform: true,
      },
    }),
  ],
})
