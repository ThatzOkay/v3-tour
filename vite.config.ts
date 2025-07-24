import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import copy from 'rollup-plugin-copy'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
const commonConfig = defineConfig({
  plugins: [vue()]
});

const libConfig = defineConfig({
  publicDir: 'public-vite',
  ...commonConfig,
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'dist/vue-tour.umd.js', dest: 'public' },
        { src: 'dist/vue-tour.css', dest: 'public' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'VueTour',
      fileName: (format) => `vue-tour.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      plugins: [
        dynamicImportVars()
      ],
      output: {
        assetFileNames: 'vue-tour.css',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

const demoConfig = defineConfig({
  ...commonConfig,
  root: "./demo",
});

export default defineConfig(({ command }) => {
  const executionMode: "lib" | "demo" = (process.env.MODE as "lib" | "demo") || "lib";

  const mode = command === "build" ? "production" : "development";

  if (executionMode === "demo") {
    return { ...demoConfig, mode };
  } else if (executionMode === "lib") {
    return { ...libConfig, mode };
  }
  return commonConfig;
});
