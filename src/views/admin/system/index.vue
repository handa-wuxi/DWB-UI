<template>
  <div class="enter-y">
    <n-card>
      <BasicTable
        striped
        :columns="columns"
        :data="tableData"
        :loading="loading"
      >
        <template #title>
          <n-date-picker
            :default-value="Date.now()"
            :placeholder="t('global.inputPlaceholder',[t('admin.global.date')])"
            type="date"
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import systemApi from '@/api/system';
import { SystemLog } from '#/api';
import { BasicTable } from '@/components/BasicTable';
import { useTableSettings } from '@/hooks/setting/useTableSettings';

const { t } = useI18n();
const { genLogColumns } = useTableSettings(t);
const message = useMessage();

const tableData = ref<Array<SystemLog>>([]);
const loading = ref(false);
const columns = genLogColumns();

const getLogs = (_ts, date = dayjs().format('YYYY-MM-DD')) => {
  loading.value = true;
  systemApi.getLogs(date).then((res) => {
    if (res.code === 1) {
      tableData.value = res.data?.map((item) => ({
        ...item,
        ip: item.ip.replace('::ffff:', ''),
      }));
    } else {
      message.error(res.msg);
    }
    loading.value = false;
  });
};

getLogs(dayjs());

</script>
