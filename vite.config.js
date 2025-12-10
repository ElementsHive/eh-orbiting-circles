import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
      name: 'EhOrbitingCircles',
      fileName: 'eh-orbiting-circles',
    },
  },
})