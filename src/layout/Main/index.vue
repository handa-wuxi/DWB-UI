<template>
  <RouterView>
    <template #default=" {Component,route} ">
      <Transition
        :name="getTransitionName"
        mode="out-in"
        appear
      >
        <KeepAlive
          v-if="keepAliveComponents"
          :include="keepAliveComponents"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </KeepAlive>
        <component
          :is="Component"
          v-else
          :key="route.path"
        />
      </Transition>
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
