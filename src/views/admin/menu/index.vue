<template>
  <div>
    <n-grid
      class="mt-4"
      cols="1 s:1 m:1 l:3 xl:3 2xl:3"
      responsive="screen"
      :x-gap="12"
    >
      <n-gi span="1">
        <n-card
          :segmented="{ content: true }"
          :bordered="false"
          size="small"
        >
          <template #header>
            <n-space>
              <n-button
                type="info"
                ghost
                icon-placement="left"
                @click="packHandle"
              >
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined />
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>
          <div class="w-full menu">
            <n-input
              v-model:value="pattern"
              type="input"
              placeholder="输入菜单名称搜索"
            >
              <template #suffix>
                <n-icon
                  size="18"
                  class="cursor-pointer"
                >
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium" />
                </div>
              </template>
              <template v-else>
                <n-tree
                  block-line
                  cascade
                  :virtual-scroll="true"
                  :pattern="pattern"
                  :data="treeData"
                  :expanded-keys="expandedKeys"
                  style="max-height: 650px; overflow: hidden"
                  @update:selected-keys="selectedTree"
                  @update:expanded-keys="onExpandedKeys"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card
          :segmented="{ content: true }"
          :bordered="false"
          size="small"
        >
          <template #header>
            <n-space>
              <n-icon
                size="18"
                class="flex-auto"
              >
                <FormOutlined />
              </n-icon>
              <span>编辑菜单{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
            </n-space>
          </template>
          <n-alert
            type="info"
            closable
          >
            从菜单列表选择一项后，进行编辑
          </n-alert>
          <n-form
            v-if="isEditMenu"
            ref="formRef"
            :model="formParams"
            :rules="rules"
            label-placement="left"
            :label-width="100"
            class="py-4"
          >
            <n-form-item
              label="类型"
              path="type"
            >
              <span>{{ formParams.type === 1 ? '侧边栏菜单' : '' }}</span>
            </n-form-item>
            <n-form-item
              label="标题"
              path="label"
            >
              <n-input
                v-model:value="formParams.label"
                placeholder="请输入标题"
              />
            </n-form-item>
            <n-form-item
              label="副标题"
              path="subtitle"
            >
              <n-input
                v-model:value="formParams.subtitle"
                placeholder="请输入副标题"
              />
            </n-form-item>
            <n-form-item
              label="路径名称"
              path="key"
            >
              <n-input
                v-model:value="formParams.key"
                placeholder="请输入路径名称"
              />
            </n-form-item>
            <n-form-item
              label="打开方式"
              path="openType"
            >
              <n-radio-group
                v-model:value="formParams.openType"
                name="openType"
              >
                <n-space>
                  <n-radio :value="1">
                    当前窗口
                  </n-radio>
                  <n-radio :value="2">
                    新窗口
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item
              label="菜单权限"
              path="auth"
            >
              <n-input
                v-model:value="formParams.auth"
                placeholder="请输入权限，多个权限用，分割"
              />
            </n-form-item>
            <n-form-item
              path="auth"
              style="margin-left: 100px"
            >
              <n-space>
                <n-button
                  type="primary"
                  :loading="subLoading"
                  @click="formSubmit"
                >
                  保存修改
                </n-button>
                <n-button @click="handleReset">
                  重置
                </n-button>
                <n-button @click="handleDel">
                  删除
                </n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
<script lang="ts" setup name="MenuSetting">
import {
  ref, unref, reactive, onMounted, computed,
} from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import {
  AlignLeftOutlined, SearchOutlined, FormOutlined,
} from '@vicons/antd';
import { useI18n } from 'vue-i18n';
import { useRouteStore } from '@/store';

const rules = {
  label: {
    required: true,
    message: '请输入标题',
    trigger: 'blur',
  },
  key: {
    required: true,
    message: '请输入路径',
    trigger: 'blur',
  },
};

const { t } = useI18n();
const rs = useRouteStore();

const formRef: any = ref(null);
const message = useMessage();
const dialog = useDialog();

const expandedKeys = ref([]);

const loading = ref(true);
const subLoading = ref(false);
const isEditMenu = ref(false);
const treeItemTitle = ref('');
const pattern = ref('');

const formParams = reactive({
  type: 1,
  label: '',
  subtitle: '',
  key: '',
  auth: '',
  openType: 1,
});

const treeData = computed(() => rs.menus.map((item) => ({
  ...item,
  label: t(item.label),
})));

function selectedTree(keys) {
  console.log('keys: ', keys);
  const selectData = treeData.value.filter((item) => item.key === keys[0])[0];
  console.log('selectData: ', selectData);
  // treeItemTitle.value = selectData.label;
  Object.assign(formParams, selectData);
  isEditMenu.value = true;
}

function handleDel() {
  dialog.info({
    title: '提示',
    content: '您确定想删除此权限吗?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除成功');
    },
    onNegativeClick: () => {
      message.error('已取消');
    },
  });
}

function handleReset() {
  Object.assign(formParams, {});
}

function formSubmit() {
  formRef.value.validate((errors: boolean) => {
    if (!errors) {
      message.error('抱歉，您没有该权限');
    } else {
      message.error('请填写完整信息');
    }
  });
}

function packHandle() {
  if (expandedKeys.value.length) {
    expandedKeys.value = [];
  } else {
    expandedKeys.value = unref(treeData).map((item: any) => item.key as string) as [];
  }
}

onMounted(async () => {
  loading.value = false;
});

function onExpandedKeys(keys) {
  expandedKeys.value = keys;
}
</script>
