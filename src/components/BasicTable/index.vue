<template>
  <div class="basic-table">
    <div
      v-if="titleSlot"
      class="mb-[10px] flex justify-between items-center"
    >
      <slot name="title" />
      <n-space
        :size="12"
        align="center"
      >
        <!-- 刷新 -->
        <TipIcon :tip="t('global.refresh')">
          <RedoOutlined @click="emit('refresh')" />
        </TipIcon>
        <!-- 密度 -->
        <n-dropdown
          trigger="click"
          :options="densityOption"
          :show-arrow="true"
        >
          <n-tooltip>
            <template #trigger>
              <n-icon :size="20">
                <ColumnHeightOutlined />
              </n-icon>
            </template>
            <span>{{ t('component.global.density') }}</span>
          </n-tooltip>
        </n-dropdown>
        <!-- 自定义工具栏 -->
        <CustomSettings
          :options="cols"
          @change-cols="updateCols"
        />
      </n-space>
    </div>
    <n-data-table
      v-bind="$attrs"
      :columns="cols"
    />
  </div>
</template>
<script lang="ts" setup name="BasicTable">
import {
  onBeforeMount, PropType, ref, useSlots,
} from 'vue';
import {
  RedoOutlined, ColumnHeightOutlined,
  // VerticalRightOutlined, VerticalLeftOutlined,
} from '@vicons/antd';
import { useI18n } from 'vue-i18n';
import { TableColumns } from 'naive-ui/lib/data-table/src/interface';
import { TipIcon } from '../Icon';
import CustomSettings from './CustomSettings.vue';

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumns<any>>,
    default: () => ([]),
  },
});

const { t } = useI18n(); // 引入 i18n

const emit = defineEmits(['refresh', 'column-settings', 'density']);

const cols = ref<TableColumns>([]);

const densityOption = [
  {
    label: t('component.global.compact'),
    key: 'Compact',
  },
  {
    label: t('component.global.normal'),
    key: 'Normal',
  },
  {
    label: t('component.global.loose'),
    key: 'Loose',
  },
];

const titleSlot = useSlots().title;

function init() {
  cols.value = JSON.parse(JSON.stringify(props.columns));
}

function updateCols(currentCols: TableColumns) {
  cols.value = currentCols;
}

onBeforeMount(() => {
  init();
});

</script>

<style lang="less" scoped>
.basic-table {
  width: 100%;
  .title-wrapper {
    margin-bottom: 20px;
  }
}
</style>
