<!--
 * index.vue
 * @Author: pangmenghan(pangmenghan@naton.cn)
 * @Date: 2022-06-28 16:23:58
 * -----
 * @Last Modified By: pangmenghan
 * @last Modified Date: 2022-06-28 16:24:21
 * @feature 个人信息展示页页面
 * -----
 * @history :
 * ------------------------------------
 * ------------------------------------
 * Copyright (c) 2022 Naton.
-->

<template>
  <a-card :style="{ width: '320px' }" :bordered="false">
    <template #cover>
      <div :style="{ height: '200px', overflow: 'hidden', width: '100%' }">
        <img
          :style="{
            width: '100%',
            height: '160px',
            position: 'absolute',
          }"
          alt="dessert"
          src="@/assets/images/infobg.png"
        />
        <img
          class="info_img"
          style="width: 83px; height: 83px; border-radius: 50%"
          :src="infoData.faceURL"
          :onerror="defaultImg()"
        />
      </div>
    </template>
    <a-card-meta :title="infoData.nickname" style="margin-top: 0px">
      <template #description>
        <!-- <a-button
            type="primary"
            block
            @click="handleBtn"
            style="background: #4e5969; height: 34px; padding-top: 5px"
          >
            <template #icon>
              <CommentOutlined :size="22" style="vertical-align: middle" />
            </template>
            发送消息
          </a-button> -->
        <div class="info_div" style="margin-top: 16px">
          <div class="info_left">职位</div>
          <div class="info_right">{{ infoData.jobTitle }}</div>
        </div>
        <div class="info_div">
          <div class="info_left">手机号</div>
          <div class="info_right">{{ infoData.telephone }}</div>
        </div>
        <div class="info_div">
          <div class="info_left">电话</div>
          <div class="info_right">{{ infoData.officePhone }}</div>
        </div>
        <div class="info_div" style="margin-bottom: 60px">
          <div class="info_left">邮箱</div>
          <div class="info_right">{{ infoData.email }}</div>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { CommentOutlined } from '@ant-design/icons-vue';
import { getUserContainFacePath } from '@/api/user';
import { events } from '@/utils';
import { TOASSIGNCVE } from '../../constants/events';
import userImg from '@/assets/images/user.png';
import { SessionType } from '../../constants/messageContentType';

const { push } = useRouter();

const props = defineProps({
  userNum: {
    type: String,
    default: '',
  },
});

const visible: Ref<boolean> = ref(false); // 显示弹窗
const infoData: any = ref([]);
const sessionType = ref('');
onMounted(() => {
  getUserContainFacePath({
    userNum: props.userNum,
  }).then(res => {
    infoData.value = res.data;
  });
});
// 默认站位图
const defaultImg = () => {
  return 'this.src="' + userImg + '"';
};
const handleBtn = () => {
  push('/openim');
  setTimeout(() => {
    events.emit(TOASSIGNCVE, infoData.value.fEmpnum, 1);
  }, 500);
  visible.value = false;
};
</script>

<style lang="less" scoped>
.info_img {
  position: relative;
  top: 110px;
  left: 10px;
  border-radius: 50%;
}
.info_div {
  line-height: 35px;
  display: flex;
  color:#666;
  .info_left {
    width: 80px;
  }
}
</style>
