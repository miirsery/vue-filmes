import { fileURLToPath, URL } from 'node:url'
import EslintPlugin from 'vite-plugin-eslint'
import StyleLintPlugin from 'vite-plugin-stylelint'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const styleLintConfig = StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: true,
})

const eslintConfig = EslintPlugin({
  fix: true,
  cache: false,
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), styleLintConfig, eslintConfig],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/resources/variables/index.scss" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
