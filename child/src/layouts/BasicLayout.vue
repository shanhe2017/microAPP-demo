<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :loading="loading"
    :menu-data="menuData"
    disable-content-margin
    v-bind="proConfig"
  >
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
  layout: 'side',
  navTheme: 'light',
  fixedHeader: false,
  fixSiderbar: true,
  splitMenus: true,
  headerHeight: 70,
  breadcrumb: null,
  // primaryColor: 'pink',
  headerTheme: 'light',
  headerRender: false,
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
</style>
