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
          :options="getSettingCols(cols)"
          @change-cols="updateCols"
        />
      </n-space>
    </div>
    <n-data-table
      ref="tableElRef"
      v-bind="$attrs"
      :data="data"
      :columns="cols"
      :size="size"
      :pagination="pagination"
      :max-height="computeMaxHeight"
    />
  </div>
</template>
<script lang="ts" setup name="BasicTable">
import {
  computed,
  nextTick,
  onBeforeMount, onMounted, PropType, ref, unref, useSlots,
} from 'vue';
import {
  RedoOutlined, ColumnHeightOutlined,
  // VerticalRightOutlined, VerticalLeftOutlined,
} from '@vicons/antd';
import { useI18n } from 'vue-i18n';
import { RowData, TableColumns } from 'naive-ui/lib/data-table/src/interface';
import { PaginationProps } from 'naive-ui';
import { TipIcon } from '../Icon';
import CustomSettings from './CustomSettings.vue';
import { getViewportOffset } from '@/utils/domUtils';
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn';

const props = defineProps({
  data: {
    type: Array as PropType<RowData[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumns<any>>,
    default: () => ([]),
  },
  canResize: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: [Boolean, Object, undefined] as PropType<false | PaginationProps | undefined>,
    default: false,
  },
  resizeHeightOffset: {
    type: Number,
    default: 0,
  },
  maxHeight: {
    type: Number,
    default: 0,
  },
});

const { t } = useI18n(); // 引入 i18n

const emit = defineEmits(['refresh', 'column-settings', 'density']);

let paginationEl: HTMLElement | null;
const deviceHeight = ref(150);
const tableElRef = ref();
// const computeMaxHeight = ref('auto');
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

function getSettingCols(columns: any[]) {
  return columns.map((item) => ({
    key: item.key,
    title: item.title,
    fixed: item.fixed,
  }));
}

function onDensitySelect(key: 'small' | 'medium' | 'large') {
  size.value = key;
}

function updateCols(currentCols: TableColumns) {
  cols.value = currentCols;
}
const getCanResize = computed(() => props.canResize);
const pagination = computed(() => props.pagination);

function computeTableHeight() {
  const table = unref(tableElRef);
  if (!table) return;
  if (!unref(getCanResize)) return;
  const el = table.$el;
  const headEl = el.querySelector('.n-data-table-thead');
  const { bottomIncludeBody } = getViewportOffset(headEl);
  const headerH = 64;
  let paginationH = 2;
  const marginH = 24;
  if (!pagination.value) {
    paginationEl = el.querySelector('.n-data-table__pagination') as HTMLElement;
    if (paginationEl) {
      const { offsetHeight } = paginationEl;
      paginationH += offsetHeight || 0;
    } else {
      paginationH += 28;
    }
  }
  let height = bottomIncludeBody
    - (headerH + paginationH + marginH + (props.resizeHeightOffset || 0));
  const { maxHeight } = props;
  height = maxHeight && maxHeight < height ? maxHeight : height;
  deviceHeight.value = height;
}

const computeMaxHeight = computed(() => (props.data.length ? `${unref(deviceHeight)}px` : 'auto'));

useWindowSizeFn(computeTableHeight, 280);

onBeforeMount(() => {
  init();
});

onMounted(() => {
  nextTick(() => {
    computeTableHeight();
  });
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
