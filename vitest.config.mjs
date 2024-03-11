import { defineConfig } from 'vitest/config'
import { transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform (code, id) {
        if (!id.match(/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic'
        })
      }
    },
    react()
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
})
