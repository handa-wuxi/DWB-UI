<template>
  <RouterView>
    <template #default=" {Component,route} ">
      <transition
        :name="getTransitionName"
        mode="out-in"
        appear
      >
        <keep-alive
          v-if="keepAliveComponents"
          :include="keepAliveComponents"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </keep-alive>
        <component
          :is="Component"
          v-else
          :key="route.path"
        />
      </transition>
    </template>
  </RouterView>
</template>
<script setup lang="ts" name="MainView">
import { computed, unref } from 'vue';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useRouteStore } from '@/store';

const rs = useRouteStore();
const { getPageAnimateType, getIsPageAnimate } = useProjectSetting();
defineProps({
  animate: {
    type: Boolean,
    default: true,
  },
});

// 需要缓存的路由组件
const keepAliveComponents = computed(() => rs.keepAliveComponents);
const getTransitionName = computed(() => (unref(getIsPageAnimate) ? unref(getPageAnimateType) : ''));
</script>
<style lang="less">

  .n-switch__button-icon {
    font-size: 26px !important;
  }

</style>
