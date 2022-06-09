<template>
  <NLayout
    class="layout"
    has-sider
    :position="fixedMenu"
  >
    <NLayoutSider
      v-if="
        !isMobile && (navMode === 'vertical' || navMode === 'horizontal-mix')
      "
      show-trigger="bar"
      :position="fixedMenu"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="getTheme"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <PageLogo :collapsed="collapsed" />
      <PageSider />
    </NLayoutSider>
    <n-drawer
      v-model:show="showSideDrawer"
      :width="menuWidth"
      :placement="'left'"
      class="layout-side-drawer"
    >
      <PageLogo :collapsed="collapsed" />
      <PageSider @click-menu-item="collapsed = false" />
    </n-drawer>
    <NLayout>
      <NLayoutHeader bordered>
        <PageHeader v-model:collapsed="collapsed" />
      </NLayoutHeader>
      <NLayoutContent content-style="padding: 24px;">
        <MainView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
<script setup lang="ts">
import {
  computed, onMounted, ref, unref,
} from 'vue';
import { useLoadingBar } from 'naive-ui';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { PageHeader } from './Header';
import { MainView } from './Main';
import { PageLogo } from './Logo';
import { PageSider } from './Sider';

const {
  getHeaderSetting, getNavMode, getMenuSetting, getTheme, getIsMobile, setIsMobile,
} = useProjectSetting();
const collapsed = ref(false);

const navMode = getNavMode;

const fixedMenu = computed(() => {
  const { fixed } = unref(getHeaderSetting);
  return fixed ? 'absolute' : 'static';
});
const { minMenuWidth, mobileWidth, menuWidth } = unref(getMenuSetting);

const leftMenuWidth = computed(() => (collapsed.value ? minMenuWidth : menuWidth));

const isMobile = computed<boolean>({
  get: () => getIsMobile.value,
  set: (val) => setIsMobile(val),
});

// 控制显示或隐藏移动端侧边栏
const showSideDrawer = computed({
  get: () => isMobile.value && collapsed.value,
  set: (val) => { collapsed.value = val; },
});

// 判断是否触发移动端模式
const checkMobileMode = () => {
  if (document.body.clientWidth <= mobileWidth) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
  collapsed.value = false;
};

const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 950) {
    collapsed.value = true;
  } else collapsed.value = false;

  checkMobileMode();
};

onMounted(() => {
  checkMobileMode();
  window.addEventListener('resize', watchWidth);
  // 挂载在 window 方便与在js中使用
  window.$loading = useLoadingBar();
  window.$loading.finish();
});

</script>
<style lang="less">
.layout{
  display: flex;
  flex-direction: row;
  flex: auto;
  background-color: rgb(0, 20, 40);

  .layout-sider{
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}

</style>
