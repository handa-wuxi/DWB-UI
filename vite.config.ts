import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import dayjs from 'dayjs';
import pkg from './package.json';

const {
  dependencies, devDependencies, name, version,
} = pkg;

const APP_INFO = {
  pkg: {
    dependencies, devDependencies, name, version,
  },
  lastBuildTime: dayjs().format('yyyy-MM-dd HH:mm:ss'),
};
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// const ignoreMockFile = ['createMockServer.ts', 'utils.ts'];

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_ENABLE_MOCK } = env;
  const enableMock = JSON.parse(VITE_ENABLE_MOCK);

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
      viteMockServe({
        mockPath: 'mock',
        // ignore: (fileName: string) => ignoreMockFile.includes(fileName),
        ignore: /^_/,
        localEnabled: enableMock,
        prodEnabled: command !== 'serve' && enableMock,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from './mock/_createMockServer.ts';
          setupProdMockServer();
        `,
        logger: true,
      }),
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
    define: {
      __APP_INFO__: JSON.stringify(APP_INFO),
    },
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
        // '/api': {
        //   target: '',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
      },
    },
    build: {
      target: 'es2019',
      cssTarget: 'chrome80',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  });
};
