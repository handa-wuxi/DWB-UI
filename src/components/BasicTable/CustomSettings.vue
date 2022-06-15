<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-popover
        trigger="click"
        :width="260"
        placement="bottom-end"
        content-style="padding: 0;"
      >
        <template #trigger>
          <n-icon
            size="20"
            class="hover:text-[#3c9bff]"
          >
            <SettingOutlined />
          </n-icon>
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
              :list="columns"
              animation="300"
              item-key="key"
              filter=".no-draggable"
              @end="draggableEnd"
            >
              <template #item="{element}">
                <div
                  class="
                    flex
                    items-center
                    justify-between
                    cursor-move
                    h-[40px]
                    px-[12px]
                    hover:bg-light-300
                    dark:hover:bg-dark-100"
                >
                  <div class="flex items-center">
                    <n-icon
                      size="18"
                      class="mr-[12px]"
                    >
                      <DragOutlined />
                    </n-icon>
                    <n-checkbox
                      :value="element.key"
                      :label="element.title"
                    />
                  </div>
                  <div class="flex items-center justify-end">
                    <n-tooltip
                      trigger="hover"
                      placement="bottom"
                      content-style="padding: 0;"
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
                      content-style="padding: 0;"
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
    <span>{{ t('component.global.columnSettings') }}</span>
  </n-tooltip>
</template>
<script setup lang="ts" name="CustomSettings">
import { useI18n } from 'vue-i18n';
import {
  SettingOutlined, DragOutlined, VerticalRightOutlined, VerticalLeftOutlined,
} from '@vicons/antd';
import {
  PropType,
  ref,
  toRaw,
  unref,
  watch,
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
let cacheColumns: DataTableColumns<RowData> = [];
const checkList = ref<string[]>([]);
const checkAll = ref(false);
const selection = ref(false);

function init() {
  columns.value = props.options.filter((item) => item.type !== 'selection');
  cacheColumns = toRaw(columns.value);
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
  columns.value = cacheColumns.map((item) => item);
  setColumns(unref(columns));
}

function fixedColumn(item: TableColumn, pos: 'left' | 'right' | undefined) {
  if (item.fixed === pos) {
    item.fixed = undefined;
  } else {
    item.fixed = pos;
  }
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

init();

</script>
<style lang="less" scoped>
.n-space>div{
  display: flex;
  align-items: center;
}
</style>
