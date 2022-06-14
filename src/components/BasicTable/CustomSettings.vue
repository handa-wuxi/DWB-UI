<template>
  <n-popover
    trigger="click"
    :width="260"
    placement="bottom-end"
    display-directive="show"
    class="toolbar-popover"
  >
    <template #trigger>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon
            size="20"
            class="hover:text-[#3c9bff]"
          >
            <SettingOutlined />
          </n-icon>
        </template>
        <span>{{ t('component.global.columnSettings') }}</span>
      </n-tooltip>
    </template>
    <template #header>
      <div>
        <n-space>
          <n-checkbox
            v-model:checked="checkAll"
            @update:checked="onCheckAll"
          >
            {{ t('component.global.showCol') }}
          </n-checkbox>
          <n-checkbox
            v-model:checked="selection"
            @update:checked="onSelection"
          >
            {{ t('component.global.selectCol') }}
          </n-checkbox>
          <n-button
            text
            type="info"
            size="small"
            class="mt-1"
            @click="resetColumns"
          >
            {{ t('global.reset') }}
          </n-button>
        </n-space>
      </div>
    </template>
    <div class="table-col-toolbar">
      <n-checkbox-group
        v-model:value="checkList"
        @update:value="onChange"
      >
        <Draggable
          v-model="columns"
          animation="200"
          item-key="key"
          @end="draggableEnd"
        >
          <template #item="{element}">
            <div
              v-show="element.type !== 'selection'"
              class="flex justify-between items-center h-[40px] cursor-pointer px-[12px]
                        hover:bg-light-300 dark:hover:bg-dark-100"
            >
              <n-space align="center">
                <n-icon size="18">
                  <DragOutlined />
                </n-icon>
                <n-checkbox
                  :value="element.key"
                  :label="element.title"
                />
              </n-space>
              <div class="flex items-center">
                <n-tooltip
                  trigger="hover"
                  placement="bottom"
                >
                  <template #trigger>
                    <n-icon
                      size="18"
                      :color="element.fixed === 'left' ? '#2080f0' : undefined"
                      class="cursor-pointer"
                      @click="fixedColumn(element, 'left')"
                    >
                      <VerticalRightOutlined />
                    </n-icon>
                  </template>
                  <span>{{ t('component.global.fixedToLeft') }}</span>
                </n-tooltip>
                <n-divider vertical />
                <n-tooltip
                  trigger="hover"
                  placement="bottom"
                >
                  <template #trigger>
                    <n-icon
                      size="18"
                      :color="element.fixed === 'right' ? '#2080f0' : undefined"
                      class="cursor-pointer"
                      @click="fixedColumn(element, 'right')"
                    >
                      <VerticalLeftOutlined />
                    </n-icon>
                  </template>
                  <span>{{ t('component.global.fixedToRight') }}</span>
                </n-tooltip>
              </div>
            </div>
          </template>
        </Draggable>
      </n-checkbox-group>
    </div>
  </n-popover>
</template>
<script setup lang="ts" name="CustomSettings">
import { useI18n } from 'vue-i18n';
import {
  SettingOutlined, DragOutlined, VerticalRightOutlined, VerticalLeftOutlined,
} from '@vicons/antd';
import {
  onBeforeMount, PropType, ref, toRaw, unref, watch,
} from 'vue';
import { RowData, TableColumn } from 'naive-ui/lib/data-table/src/interface';
import Draggable from 'vuedraggable';
import { DataTableColumns } from 'naive-ui';

const { t } = useI18n(); // 引入 i18n

const emit = defineEmits(['changeCols']);

const props = defineProps({
  options: {
    type: Array as PropType<DataTableColumns<RowData>>,
    default: () => ([]),
  },
});

const columns = ref<DataTableColumns<RowData>>([]);
const cacheColumns = ref([]);
const checkList = ref<string[]>([]);
const checkAll = ref(false);
const selection = ref(false);

function init() {
  columns.value = JSON.parse(JSON.stringify(props.options));
  cacheColumns.value = JSON.parse(JSON.stringify(props.options));
  checkList.value = columns.value.map((item: RowData) => item.key);
  checkAll.value = true;
}

function setColumns(cols = columns.value) {
  emit('changeCols', cols.filter(
    (col: RowData) => (checkList.value.includes(col.key) || col.type === 'selection'),
  ));
}

function onCheckAll(e) {
  if (e) {
    checkList.value = columns.value.map((col: RowData) => col.key);
  } else {
    checkList.value = [];
  }
  setColumns();
}

function onSelection(e) {
  const newCols = toRaw(unref(columns));
  if (e) {
    newCols.unshift({
      type: 'selection',
      // @ts-ignore
      key: 'selection',
      fixed: 'left',
      width: '60px',
    });
    setColumns(newCols);
  } else {
    newCols.splice(0, 1);
    setColumns(newCols);
  }
}

function resetColumns() {
  columns.value = JSON.parse(JSON.stringify(cacheColumns.value));
  setColumns(unref(columns));
}

function fixedColumn(item: TableColumn, pos: 'left' | 'right' | undefined) {
  item.fixed = pos;
  setColumns(unref(columns));
}

function onChange(list) {
  setColumns(columns.value.filter((item: RowData) => list.includes(item.key)));
}

function draggableEnd() {
  const currentCols = toRaw(unref(columns));
  setColumns(currentCols);
}

watch(() => checkList.value, (val) => {
  checkAll.value = val.length === columns.value.length;
});

onBeforeMount(() => {
  init();
});
</script>
<style lang="less">

.toolbar-popover {
  .n-popover__content {
    padding: 0;
  }
}
</style>
