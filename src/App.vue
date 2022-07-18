<script setup lang="ts">
import type { NLocale, NDateLocale } from 'naive-ui';
import {
  computed, onMounted, ref, unref, watch,
} from 'vue';
import {
  darkTheme, lightTheme, zhCN, dateZhCN, enUS, dateEnUS,
} from 'naive-ui';
import { useProjectSetting } from './hooks/setting/useProjectSetting';
import { useDesignSettingStore, useLockScreenStore } from './store';
import { AppProvider } from '@/components/Application';
import { LockScreen } from '@/components/LockScreenComp';
import { lighten } from './utils';

const { getLocale, getTheme } = useProjectSetting();
const lockScreenStore = useLockScreenStore();
const locale = ref<NLocale | null>(null);
const dateLocale = ref<NDateLocale | null>(null);
const ds = useDesignSettingStore();
const isLock = computed(() => lockScreenStore.isLock);

watch(
  () => getLocale.value, (
    (v) => {
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
    }),
  { immediate: true },
);

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

onMounted(() => {
  const theme = getTheme.value;
  document.body.classList.add(theme ? 'dark' : 'light');
});

</script>

<template>
  <NConfigProvider
    v-if="!isLock"
    :theme="getTheme ? darkTheme : lightTheme "
    :locale="locale"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateLocale"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
  <transition
    v-if="isLock && $route.name !== 'login'"
    name="slide-up"
  >
    <LockScreen />
  </transition>
</template>
