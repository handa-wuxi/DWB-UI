<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      :collapsed-width="64"
      :width="gs.collapsed ? 64 : 240"
      :collapsed="gs.collapsed"
    >
      <BaseSider
        v-if="config.menuPos === 'left'"
        :menu-options="menuOptions"
        :collapsed="gs.collapsed"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <BaseHeader
          :show-menu="config.menuPos === 'top'"
          :menu-options="menuOptions"
        />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <CustomKeepAlive>
          <router-view />
        </CustomKeepAlive>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { MenuOption } from 'naive-ui';
import BaseSider from './BaseSider.vue';
import BaseHeader from './BaseHeader.vue';
import CustomKeepAlive from '../components/CustomKeepAlive.vue';
import { MenuConfig } from './types';
import { useGlobalStore } from '../store';
import { renderLabel, renderIcon } from '../utils/renderMenu';

const gs = useGlobalStore();
const config = reactive<MenuConfig>({
  menuPos: 'left',
});

const menuOptions: MenuOption[] = [
  {
    label: () => renderLabel('工作台', '/sys/index'),
    key: '/sys/index',
    icon: () => renderIcon('icon-shezhi'),
  },
  // {
  //   label: () => routerLabel('测试地址', '/sys/index'),
  //   key: '/sys/index',
  // },

];
</script>
