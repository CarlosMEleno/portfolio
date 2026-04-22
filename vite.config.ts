import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

function preloadHomeImage(): Plugin {
  let base = '/'

  return {
    name: 'preload-home-image',
    enforce: 'post',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        if (bundle == null) return html

        for (const [filename, chunk] of Object.entries(bundle)) {
          if (chunk.type !== 'asset') continue
          if (
            !chunk.originalFileNames.some((name) => name.endsWith('home.jpg'))
          )
            continue

          const href = `${base}${filename}`
          return html.replace(
            '</head>',
            `  <link rel="preload" href="${href}" as="image" type="image/jpeg" />\n</head>`
          )
        }
        return html
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), preloadHomeImage()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@images': path.resolve(__dirname, './src/images'),
    },
  },
})
