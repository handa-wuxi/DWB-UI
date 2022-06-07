<template>
  <NLayout has-sider>
    <NLayoutSider
      bordered
      :collapsed-width="64"
      :width="collapsed ? 64 : 240"
      :collapsed="collapsed"
    >
      <BaseSider
        v-if="config.menuPos === 'left'"
        :menu-options="menuOptions"
        :collapsed="collapsed"
      />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered>
        <BaseHeader v-model:collapsed="collapsed" />
      </NLayoutHeader>
      <NLayoutContent content-style="padding: 24px;">
        <CustomKeepAlive>
          <router-view />
        </CustomKeepAlive>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { MenuOption } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import BaseSider from './BaseSider.vue';
import { BaseHeader } from './Header/index.ts';
import CustomKeepAlive from '../components/CustomKeepAlive.vue';
import { MenuConfig } from './types';
import { renderLabel, renderIcon } from '../utils/renderMenu';

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
