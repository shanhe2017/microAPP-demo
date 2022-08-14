/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
// import Icons from 'unplugin-icons/vite';
// import { ConfigSvgIconsPlugin } from './svgIcons';
import { AutoRegistryComponents } from './component';
import { AutoImportDeps } from './autoImport';
import { ConfigVisualizerConfig } from './visualizer';
import { ConfigCompressPlugin } from './compress';
import { ConfigRestartPlugin } from './restart';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    // vue(),
    // vue支持 micro-app zelo
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^micro-app/.test(tag),
        },
      },
    }),
    // 自动按需引入组件
    AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 开启.gz压缩  rollup-plugin-gzip
    ConfigCompressPlugin(),
    // 监听配置文件改动重启
    ConfigRestartPlugin(),
  ];

  // @vitejs/plugin-legacy
  isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['Chrome 63'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        modernPolyfills: true,
      }),
    );

  // vite-plugin-svg-icons
  //   vitePlugins.push(ConfigSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  // vitePlugins.push(ConfigMockPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(ConfigVisualizerConfig());

  return vitePlugins;
}
