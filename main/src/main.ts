import 'tailwindcss/tailwind.css';
import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/antd.variable.min.css';

import { createApp } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import router from './router';
import App from './App.vue';
import { setupStore } from '@/store';
import './styles/base.less';
import microApp from '@micro-zoe/micro-app';

microApp.start({
  plugins: {
    modules: {
      // appName即应用的name值
      order: [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(/(from|import)(\s*['"])(\/order\/)/g, all => {
                return all.replace('/order/', 'http://localhost:3001/order/');
              });
            }

            return code;
          },
        },
      ],
    },
  },
});
createApp(App)
  .use(router)
  .use(ConfigProvider)
  .use(ProLayout)
  .use(PageContainer)
  .use(setupStore)
  .mount('#app');
