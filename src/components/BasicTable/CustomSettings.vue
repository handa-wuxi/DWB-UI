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
                v-model:checked="state.checkAll"
                @update:checked="onCheckAll"
              >
                {{ t('component.global.showCol') }}
              </n-checkbox>
              <n-checkbox
                v-model:checked="state.selection"
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
            v-model="state.checkList"
            @update:value="onChange"
          >
            <Draggable
              :list="state.columns"
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
  reactive,
  watch,
  toRaw,
  watchEffect,
} from 'vue';
import { RowData, TableColumn } from 'naive-ui/lib/data-table/src/interface';
import Draggable from 'vuedraggable';
import { DataTableColumns } from 'naive-ui';

interface State {
  columns: DataTableColumns<RowData>,
  checkList: DataTableColumns<RowData>,
  checkAll: boolean,
  selection: boolean,
}

const { t } = useI18n(); // 引入 i18n

const emit = defineEmits(['changeCols']);

const props = defineProps({
  options: {
    type: Array as PropType<DataTableColumns<RowData>>,
    default: () => ([]),
  },
});
let cacheColumns: DataTableColumns<RowData> = [];

const state = reactive<State>({
  columns: [],
  checkList: [],
  checkAll: false,
  selection: false, // 是否显示选择列
});

function init() {
  state.columns = props.options.filter((item) => item.type !== 'selection');
  cacheColumns = toRaw(state.columns);
  state.checkList = state.columns.map((item: RowData) => item.key);
  state.checkAll = true;
}

function setColumns(cols = state.columns) {
  emit('changeCols', cols.filter(
    (col: RowData) => (state.checkList.includes(col.key) || col.type === 'selection'),
  ));
}

function onCheckAll(e) {
  if (e) {
    state.checkList = state.columns.map((col: RowData) => col.key);
  } else {
    state.checkList = [];
  }
  setColumns();
}

function onSelection(e) {
  const newCols = toRaw(state.columns);
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
  state.columns = cacheColumns.map((item) => item);
  setColumns(state.columns);
}

function fixedColumn(item: TableColumn, pos: 'left' | 'right' | undefined) {
  if (item.fixed === pos) {
    item.fixed = undefined;
  } else {
    item.fixed = pos;
  }
  setColumns(state.columns);
}

function onChange(list) {
  setColumns(state.columns.filter((item: RowData) => list.includes(item.key)));
}

function draggableEnd() {
  const currentCols = toRaw(state.columns);
  setColumns(currentCols);
}

watch(() => state.checkList, (val) => {
  state.checkAll = val.length === state.columns.length;
});

watchEffect(() => {
  if (props.options.length !== state.columns.length) {
    init();
  }
});

</script>
<style lang="less" scoped>
.n-space>div{
  display: flex;
  align-items: center;
}
</style>
