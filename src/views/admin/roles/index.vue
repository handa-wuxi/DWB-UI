<template>
  <div>
    <n-grid cols="1 s:1 m:1 l:3 xl:3 2xl:3">
      <n-grid-item>
        <BasicTable
          :columns="columns"
          :data="data"
        >
          <template #title>
            <n-button
              type="primary"
              @click="addRole"
            >
              添加权限
            </n-button>
          </template>
        </BasicTable>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts" setup name="RoleSetting">
import { ref } from 'vue';
import { BasicTable } from '@/components/BasicTable';

const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    key: 'username',
  },
  {
    title: '创建时间',
    key: 'createon',
  },
];
const data = ref([]);

function addRole() {
  console.log('addRole');
}
</script>
