import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  // 配置项目插件系统
  plugins: [
    react(), // React项目必需插件
    createHtmlPlugin({ // HTML模板处理
      minify: true,
      inject: {
        data: {
          title: '航空订票系统'
        }
      }
    })
  ],
  // 开发服务器配置
  server: {
    port: 3000,
    historyApiFallback: true, // 支持前端路由
  }
})
