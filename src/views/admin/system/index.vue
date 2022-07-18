<template>
  <div class="enter-y">
    <n-card>
      <BasicTable
        striped
        remote
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination=" {
          ...pagination,
          onChange: changePage,
          onUpdatePageSize: changePageSize
        }"
      >
        <template #title>
          <n-date-picker
            v-model:value="selectDate"
            type="date"
            :placeholder="t('global.inputPlaceholder',[t('admin.global.date')])"
            value-format="yyyy-MM-dd"
            @update:value="getLogs"
          />
        </template>
      </BasicTable>
    </n-card>
  </div>
</template>
<script setup name="SystemLog" lang="ts">
import dayjs from 'dayjs';
import { useMessage } from 'naive-ui';
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import systemApi from '@/api/system';
import { SystemLog } from '#/api';
import { BasicTable } from '@/components/BasicTable';
import { useTableSettings } from '@/hooks/setting/useTableSettings';

const { t } = useI18n();
const { genLogColumns } = useTableSettings(t);
const message = useMessage();

const tableData = ref<Array<SystemLog>>([]);
const selectDate = ref(Date.now());
const loading = ref(false);
const columns = genLogColumns();
const pagination = reactive({
  page: 1,
  pageSize: 15,
  pageCount: 0,
});

const getLogs = () => {
  loading.value = true;
  systemApi.getLogs(
    dayjs(selectDate.value).format('YYYY-MM-DD'),
    pagination.page,
    pagination.pageSize,
  ).then((res) => {
    if (res.code === 1) {
      tableData.value = res.data?.map((item) => ({
        ...item,
        ip: item.ip.replace('::ffff:', ''),
      }));
      pagination.pageCount = res.page?.pagecount as number;
    } else {
      message.error(res.msg);
    }
    loading.value = false;
  });
};

const changePage = (page: number) => {
  pagination.page = page;
  getLogs();
};

const changePageSize = (pageSize: number) => {
  pagination.pageSize = pageSize;
  pagination.page = 1;
  getLogs();
};

onMounted(() => {
  getLogs();
});

</script>
