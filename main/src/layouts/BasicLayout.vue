<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :loading="loading"
    :menu-data="menuData"
    disable-content-margin
    style="min-height: 100vh"
    v-bind="proConfig"
  >
    <template #menuHeaderRender>
      <h1>微前端-主应用</h1>
    </template>
    <template #rightContentRender></template>
    <!-- custom breadcrumb itemRender  -->
    <!-- <template #breadcrumbRender="{ route, params, routes }">
    :breadcrumb="{ routes: breadcrumb }"

      <span v-if="routes.indexOf(route) === routes.length - 1">
        <HeartOutlined />
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        <SmileOutlined />
        {{ route.breadcrumbName }}
      </router-link>
    </template> -->
    <!-- <SettingDrawer v-model="proConfig" /> -->
    <RouterView v-slot="{ Component, route }">
      <transition name="slide-left" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </pro-layout>
</template>

<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router';
import { getMenuData, clearMenuItem, type RouteContextProps } from '@ant-design-vue/pro-layout';

const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // defualt openKeys
  selectedKeys: [], // default selectedKeys
});
const loading = ref(false);
const proConfig = ref({
  layout: 'mix',
  navTheme: 'light',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: true,
  headerHeight: 64,
  breadcrumb: null,
  // primaryColor: 'pink',
  headerTheme: 'light',
  // prefixCls: 'layout',
});

watch(
  router.currentRoute,
  () => {
    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
    state.openKeys = matched
      .filter(r => r.path !== router.currentRoute.value.path)
      .map(r => r.path);
  },
  {
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
.right-imgs {
  width: 20px;
}

/* .ant-layout-header {
  background: pink !important;
  line-height: 70px !important;
} */
</style>
