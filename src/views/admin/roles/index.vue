<template>
  <div class="entry-y">
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
              {{ t('admin.global.addPermission') }}
            </n-button>
          </template>
        </BasicTable>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts" setup name="RoleSetting">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { BasicTable } from '@/components/BasicTable';

const { t } = useI18n();

const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: t('global.name'),
    key: 'username',
  },
  {
    title: t('global.createOn'),
    key: 'createon',
  },
];
const data = ref([]);

function addRole() {
  console.log('addRole');
}
</script>
