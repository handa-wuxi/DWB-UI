<script setup lang="ts">
import type { NLocale, NDateLocale } from 'naive-ui';
import { ref, watch } from 'vue';
import {
  darkTheme, lightTheme, zhCN, dateZhCN, enUS, dateEnUS,
} from 'naive-ui';
import { storeToRefs } from 'pinia';
// import TestDemo from './components/TestDemo.vue';
import { useGlobalStore } from './store';

const gs = useGlobalStore();
const locale = ref<NLocale | null>(null);
const dateLocale = ref<NDateLocale | null>(null);
const { theme } = storeToRefs(gs);

watch(() => gs.locale, ((v) => {
  switch (v) {
    case 'zh-CN':
      locale.value = zhCN;
      dateLocale.value = dateZhCN;
      break;
    case 'en-US':
      locale.value = enUS;
      dateLocale.value = dateEnUS;
      break;
    default:
      break;
  }
}));
</script>

<template>
  <n-config-provider
    :theme="theme ? darkTheme : lightTheme "
    :locale="locale"
    :date-locale="dateLocale"
  >
    <router-view />
  </n-config-provider>
</template>

<style lang="less">
@import './styles/common.less';
</style>
