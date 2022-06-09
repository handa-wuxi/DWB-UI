<script setup lang="ts">
import type { NLocale, NDateLocale } from 'naive-ui';
import {
  computed, ref, unref, watch,
} from 'vue';
import {
  darkTheme, lightTheme, zhCN, dateZhCN, enUS, dateEnUS,
} from 'naive-ui';
import { useProjectSetting } from './hooks/setting/useProjectSetting';
import { useDesignSettingStore } from './store';
import { AppProvider } from '@/components/Application';

import { lighten } from './utils';

const { getLocale, getTheme } = useProjectSetting();

const locale = ref<NLocale | null>(null);
const dateLocale = ref<NDateLocale | null>(null);
const ds = useDesignSettingStore();

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

const getThemeOverrides = computed(() => {
  const { appTheme } = ds;
  const lightenStr = lighten(ds.appTheme, 6);
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  };
});
</script>

<template>
  <NConfigProvider
    :theme="getTheme ? darkTheme : lightTheme "
    :locale="locale"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateLocale"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<style lang="less">
@import './styles/index.less';
</style>
