<template>
  <NLayout has-sider>
    <NLayoutSider
      bordered
      :collapsed-width="64"
      :width="collapsed ? 64 : 240"
      :collapsed="collapsed"
    >
      SIDER
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered>
        <BaseHeader v-model:collapsed="collapsed" />
      </NLayoutHeader>
      <NLayoutContent content-style="padding: 24px;">
        <MainView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BaseHeader } from './Header/index';
import { MainView } from './Main/index';

const collapsed = ref(false);

</script>
