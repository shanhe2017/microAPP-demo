import { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import path from 'path';
import { createVitePlugins } from './config/vite/plugins';
import proxy from './config/vite/proxy';
import { wrapperEnv } from './config/utils';
import { generateModifyVars } from './config/themeConfig';

function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return path.resolve(__dirname, paths);
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const root = process.cwd();

  const env = loadEnv(mode, root);
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_BUILD_DROP_CONSOLE, VITE_ENV, VITE_APP_APPURL } = viteEnv;
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@config': resovePath('./config'),
        '@components': resovePath('./src/components'),
        '@utils': resovePath('./src/utils'),
        '@api': resovePath('./src/api'),
      },
    },
    base: `${VITE_ENV === 'production' ? VITE_APP_APPURL : ''}/order/`,
    // plugins
    plugins: createVitePlugins(isBuild),

    // css
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
          // 这样就能全局使用 src/assets/styles/base.less 定义的 变量
          additionalData: `@import "${resovePath('src/styles/base.less')}";`,
        },
      },
    },

    // server
    server: {
      hmr: true, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy,
    },

    // build
    build: {
      minify: "terser",
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_BUILD_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
};
