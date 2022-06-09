<script setup lang="ts">
import type { NLocale, NDateLocale } from 'naive-ui';
import { ref, unref, watch } from 'vue';
import {
  darkTheme, lightTheme, zhCN, dateZhCN, enUS, dateEnUS,
} from 'naive-ui';
import { useProjectSetting } from './hooks/setting/useProjectSetting';

const { getLocale, getTheme } = useProjectSetting();

const locale = ref<NLocale | null>(null);
const dateLocale = ref<NDateLocale | null>(null);

watch(() => getLocale.value, ((v) => {
  switch (unref(v)) {
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
  <NLoadingBarProvider>
    <NConfigProvider
      :theme="getTheme ? darkTheme : lightTheme "
      :locale="locale"
      :date-locale="dateLocale"
    >
      <router-view />
    </NConfigProvider>
  </NLoadingBarProvider>
</template>

<style lang="less">
@import './styles/index.less';
</style>
