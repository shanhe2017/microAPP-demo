<template>
  <div>
    <micro-app
      name="order"
      :url="url"
      inline
      disablesandbox
      :data="microAppData"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
    ></micro-app>
  </div>
</template>

<script lang="ts" setup>
import { EventCenterForMicroApp } from '@micro-zoe/micro-app';

// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
(window as any).eventCenterForAppNameVite = new EventCenterForMicroApp('order');

const url = ref(import.meta.env.VITE_MICROAPP_URL)

const microAppData = ref({
  msg: '来自基座的数据',
});

const handleCreate = (): void => {
  console.log('order 创建了');
};

const handleBeforeMount = (): void => {
  console.log('order 即将被渲染');
};

const handleMount = (): void => {
  console.log('order 已经渲染完成');

  setTimeout(() => {
    // @ts-ignore
    microAppData.value = { msg: '来自基座的新数据' };
  }, 2000);
};

const handleUnmount = (): void => {
  console.log('order 卸载了');
};

const handleError = (): void => {
  console.log('order 加载出错了');
};

const handleDataChange = (e: CustomEvent): void => {
  console.log('来自子应用 order 的数据:', e.detail.data);
};
</script>

<style></style>
