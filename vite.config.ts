import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
        preserveSymlinks: true,
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: [],
    },
  plugins: [react()],
})
