/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { AntDesignVueResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
export const AutoRegistryComponents = () => {
  return Components({
    // dirs: ['src/components'],
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'src/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [AntDesignVueResolver(),IconsResolver({ prefix: 'icon' }), VueUseComponentsResolver()],
  })
};
