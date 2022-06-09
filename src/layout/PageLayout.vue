<template>
  <NLayout
    class="layout"
    has-sider
    :position="fixedMenu"
  >
    <NLayoutSider
      show-trigger="bar"
      :position="fixedMenu"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <PageLogo :collapsed="collapsed" />
      <PageSider />
    </NLayoutSider>
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
import { computed, ref, unref } from 'vue';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { PageHeader } from './Header';
import { MainView } from './Main';
import { PageLogo } from './Logo';
import { PageSider } from './Sider';

const { getHeaderSetting, getMenuSetting, getTheme } = useProjectSetting();
const collapsed = ref(false);

const fixedMenu = computed(() => {
  const { fixed } = unref(getHeaderSetting);
  return fixed ? 'absolute' : 'static';
});

const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(getMenuSetting);
  return collapsed.value ? minMenuWidth : menuWidth;
});

const inverted = getTheme.value;

</script>
<style lang="less">
.layout{
  display: flex;
  flex-direction: row;
  flex: auto;
  .layout-sider{
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}

</style>
