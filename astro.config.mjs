// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://fernandogranados.dev',
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: {
          safari: (16 << 16) | (0 << 8) | 0,
          ios_saf: (16 << 16) | (0 << 8) | 0,
        }
      }
    },
    build: {
      cssMinify: 'lightningcss',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'vendor-three';
              return 'vendor';
            }
          }
        }
      }
    }
  }
})
