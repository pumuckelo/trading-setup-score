import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import pluginrenderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared/')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          main: resolve('src/renderer/main/index.html'),
          floatingButton: resolve('src/renderer/floatingButton/index.html')
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/'),
        '@shared': resolve('src/shared/')
      }
    },
    plugins: [react(), pluginrenderer()]
  }
})
