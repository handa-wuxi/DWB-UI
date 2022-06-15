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
          :on-select="onDensitySelect"
          :show-arrow="true"
        >
          <n-tooltip>
            <template #trigger>
              <n-icon
                :size="20"
                class="hover:text-[#3c9bff]"
              >
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
      :size="size"
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
const size = ref<'small' | 'medium' | 'large'>('medium');

const densityOption = [
  {
    label: t('component.global.small'),
    key: 'small',
  },
  {
    label: t('component.global.medium'),
    key: 'medium',
  },
  {
    label: t('component.global.large'),
    key: 'large',
  },
];

const titleSlot = useSlots().title;

function init() {
  cols.value = props.columns.map((item) => item);
}

function onDensitySelect(key: 'small' | 'medium' | 'large') {
  size.value = key;
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
