<template>
  <div
    class="enter-y"
    bg="white"
  >
    <div class="px-10px">
      <n-tabs
        type="line"
        animated
        @update:value="changeTab"
      >
        <n-tab-pane
          name="customer"
          :tab="t('admin.global.efficiencyCustomer')"
        />
        <n-tab-pane
          name="style"
          :tab="t('admin.global.efficiencyDesign')"
        />
      </n-tabs>
    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      min-height="390px"
      max-height="390px"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useTableSettings } from '@/hooks/setting/useTableSettings';

const { t } = useI18n();
const { genFinanceColumns } = useTableSettings(t);
const columns = genFinanceColumns();

const data = ref([]);

const changeTab = (tab: string) => {
  console.log(tab);
};
</script>
