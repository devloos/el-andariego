import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('swiper-');
          },
        },
      },
    }),
    VueI18nPlugin({
      // eslint-disable-next-line no-undef
      include: path.resolve(__dirname, './src/locales/**'),
    }),
    svgLoader({
      defaultImport: 'component',
    }),
    tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
    },
  },
  define: {
    // eslint-disable-next-line no-undef
    __VITE_APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
