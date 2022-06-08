import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT, VITE_PUBLIC_PATH } = env;
  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // @/xxxx => src/xxxx
        {
          find: '@',
          replacement: `${pathResolve('src')}/`,
        },
        // /#/xxxx => types/xxxx
        {
          find: '#',
          replacement: `${pathResolve('types')}/`,
        },
      ],
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      WindiCSS({
        scan: {
          dirs: ['.'], // 当前目录下所有文件
          fileExtensions: ['vue', 'js', 'ts'], // 同时启用扫描vue/js/ts
        },
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnable: true,
          additionalData: `@import "${resolve(__dirname, 'src/styles/variable.less')}";`,
        },
      },
    },
    server: {
      port: Number(VITE_PORT),
      hmr: {
        overlay: false,
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3088',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
