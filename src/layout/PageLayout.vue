<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      :collapsed-width="64"
      :width="collapsed ? 64 : 240"
      :collapsed="collapsed"
    >
      <PageSider
        v-if="config.menuPos === 'left'"
        :menu-options="menuOptions"
        :collapsed="collapsed"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <BaseHeader v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <MainView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { MenuOption } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import PageSider from './PageSider.vue';
import { BaseHeader } from './Header/index';
import { MenuConfig } from './types';
import { renderLabel, renderIcon } from '../utils/renderMenu';
import { MainView } from './Main/index';

const { t } = useI18n();

const config = reactive<MenuConfig>({
  menuPos: 'left',
});

const collapsed = ref(false);

const menuOptions: MenuOption[] = [
  {
    label: () => renderLabel(t('global.workSpace'), '/sys/index'),
    key: '/sys/index',
    icon: () => renderIcon('icon-shezhi'),
  },
  // {
  //   label: () => routerLabel('测试地址', '/sys/index'),
  //   key: '/sys/index',
  // },

];
</script>
