<template>
  <div class="entry-y">
    <n-card>
      <BasicTable
        :columns="columns"
        :data="data"
        :loading="loading"
      >
        <template #title>
          <n-button
            type="primary"
            @click="addUser"
          >
            添加用户
          </n-button>
        </template>
      </BasicTable>
    </n-card>
  </div>
</template>
<script lang="ts" setup name="UserSetting">
import { ref } from 'vue';
import systemApi from '@/api/system';
import { BasicTable } from '@/components/BasicTable';
import { User } from '#/api';

const columns = [
  {
    title: 'id',
    key: 'id',
    width: '60px',
  },
  {
    title: '姓名',
    key: 'username',
    width: '160px',
  },
  {
    title: '创建时间',
    key: 'createon',
    width: '160px',
  },
];

const loading = ref(false);
const data = ref<User[]>([]);

function addUser() {
  console.log('addUser');
}

async function getUsers() {
  loading.value = true;
  const res = await systemApi.getUserList();
  if (res.code === 1) {
    data.value = res.data;
  }
  loading.value = false;
}

getUsers();
</script>
