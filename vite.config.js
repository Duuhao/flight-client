import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: '航空订票系统'
        }
      }
    })
  ],
  server: {
    port: 3000,
    historyApiFallback: true,
  },
  build: {
    assetsDir: 'assets/images',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/images/[name][extname]'
      }
    }
  }
})
