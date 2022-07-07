<template>
  <div class="entry-y">
    <NGrid
      cols="1 s:1 m:1 l:3 xl:3 2xl:3"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <NGi span="1">
        <NCard
          :segmented="{ content: true }"
          :bordered="false"
          size="small"
        >
          <template #header>
            <NSpace>
              <NButton
                type="info"
                ghost
                icon-placement="left"
                @click="packHandle"
              >
                {{ t( 'global.all',
                      { msg: expandedKeys.length ? t( 'global.collapse' ) : t( 'global.expand' ) } )
                }}
                <template #icon>
                  <div class="flex items-center">
                    <NIcon size="14">
                      <AlignLeftOutlined />
                    </NIcon>
                  </div>
                </template>
              </NButton>
            </NSpace>
          </template>
          <div class="w-full menu">
            <NInput
              v-model:value="pattern"
              :placeholder="t('admin.global.menuPlaceholder')"
            >
              <template #suffix>
                <NIcon
                  size="18"
                  class="cursor-pointer"
                >
                  <SearchOutlined />
                </NIcon>
              </template>
            </NInput>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <NSpin size="medium" />
                </div>
              </template>
              <template v-else>
                <NTree
                  block-line
                  cascade
                  :virtual-scroll="true"
                  :pattern="pattern"
                  :data="treeData"
                  :expanded-keys="expandedKeys"
                  style="max-height: 650px; overflow: hidden"
                  :render-label="renderLabel"
                  @update:selected-keys="selectedTree"
                  @update:expanded-keys="onExpandedKeys"
                />
              </template>
            </div>
          </div>
        </NCard>
      </NGi>
      <NGi span="2">
        <NCard
          :segmented="{ content: true }"
          :bordered="false"
          size="small"
        >
          <template #header>
            <NSpace>
              <NIcon
                size="18"
                class="flex-auto"
              >
                <FormOutlined />
              </NIcon>
              <span>{{ t('admin.global.editMenu') }}
                {{ treeItemTitle ? `：${t(treeItemTitle)}` : '' }}</span>
            </NSpace>
          </template>
          <NAlert
            type="info"
            closable
          >
            {{ t('admin.global.editMenuTip') }}
          </NAlert>
          <NForm
            v-if="isEditMenu"
            ref="formRef"
            :model="formParams"
            :rules="rules"
            label-placement="left"
            :label-width="100"
            class="py-4"
          >
            <NFormItem
              :label="t('global.type')"
              path="type"
            >
              <span>{{ formParams.type === 1 ? t('global.siderMenu') : '' }}</span>
            </NFormItem>
            <NFormItem
              :label="t('admin.global.menuName')"
              path="label"
            >
              <NInput
                v-model:value="formParams.label"
                :placeholder="t('global.inputPlaceholder',[t('admin.global.menuName')])"
              />
            </NFormItem>
            <NFormItem
              :label="t('admin.global.localeKey')"
              path="subtitle"
            >
              <NInput
                v-model:value="formParams.subtitle"
                :placeholder="t('global.inputPlaceholder',[t('admin.global.localeKey')])"
              />
            </NFormItem>
            <NFormItem
              :label="t('global.path')"
              path="key"
            >
              <NInput
                v-model:value="formParams.key"
                :placeholder="t('global.inputPlaceholder',[t('global.path')])"
              />
            </NFormItem>
            <NFormItem
              :label="t('admin.global.openType')"
              path="openType"
            >
              <NRadioGroup
                v-model:value="formParams.openType"
                name="openType"
              >
                <NSpace>
                  <NRadio :value="1">
                    {{ t('admin.global.currentWindow') }}
                  </NRadio>
                  <NRadio :value="2">
                    {{ t('admin.global.newWindow') }}
                  </NRadio>
                </NSpace>
              </NRadioGroup>
            </NFormItem>
            <NFormItem
              :label="t('admin.global.menubar')"
              path="auth"
            >
              <n-checkbox-group>
                <n-space>
                  <n-checkbox
                    v-for="(item) in curMenuFuncs"
                    :key="item.funccode"
                    :value="item.funccode"
                    :label="item.memo"
                  />
                </n-space>
              </n-checkbox-group>
            </NFormItem>
            <NFormItem
              path="auth"
              style="margin-left: 100px"
            >
              <NSpace>
                <NButton
                  type="primary"
                  :loading="subLoading"
                  @click="formSubmit"
                >
                  {{ t('global.submit') }}
                </NButton>
                <NButton @click="handleReset">
                  {{ t('global.reset') }}
                </NButton>
                <NButton @click="handleDel">
                  {{ t('global.delete') }}
                </NButton>
              </NSpace>
            </NFormItem>
          </NForm>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
<script lang="ts" setup name="MenuSetting">
import {
  ref, unref, reactive, onMounted, computed,
} from 'vue';
import {
  FormInst, TreeOption, useDialog, useMessage,
} from 'naive-ui';
import {
  AlignLeftOutlined, SearchOutlined, FormOutlined,
} from '@vicons/antd';
import { useI18n } from 'vue-i18n';
import { useAsyncRouteStore } from '@/store';
import systemApi from '@/api/system';
import { MenuFunc } from '#/api';

const { t } = useI18n();

const rules = {
  label: {
    required: true,
    message: t('admin.global.inputTitle'),
    trigger: 'blur',
  },
  key: {
    required: true,
    message: t('admin.global.inputPath'),
    trigger: 'blur',
  },
};

const rs = useAsyncRouteStore();

const formRef = ref<FormInst>();
const message = useMessage();
const dialog = useDialog();

const menuFuncs = new Map();

const expandedKeys = ref([]);
const loading = ref(true);
const subLoading = ref(false);
const isEditMenu = ref(false);
const treeItemTitle = ref('');
const pattern = ref('');
const curMenuFuncs = ref< MenuFunc[]>([]);

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
})));

async function getMenuFuncsByMenuId(menuId: number) {
  const res = await systemApi.getMenuFuncsByMenuId(menuId);
  if (res.code === 1) {
    return res.data;
  }
  message.error(res.msg);
  return [];
}

async function selectedTree(keys) {
  const selectData = treeData.value.filter((item) => item.key === keys[0])[0];
  if (!menuFuncs.has(selectData.id)) {
    const res = await getMenuFuncsByMenuId(selectData.id);
    menuFuncs.set(selectData.id, res);
    curMenuFuncs.value = res;
  } else {
    curMenuFuncs.value = menuFuncs.get(selectData.id);
  }
  treeItemTitle.value = selectData.label;
  Object.assign(formParams, selectData);
  isEditMenu.value = true;
}

function renderLabel({ option }: { option: TreeOption }) {
  return t(option.label as string);
}

function handleDel() {
  dialog.info({
    title: t('dialog.tip'),
    content: '您确定想删除此权限吗?',
    positiveText: t('global.confirm'),
    negativeText: t('global.cancel'),
    onPositiveClick: () => {
      message.success(t('global.delete', { msg: t('global.success') }));
    },
    onNegativeClick: () => {
      message.error(t('global.cancel', { msg: t('global.success') }));
    },
  });
}

function handleReset() {
  Object.assign(formParams, {});
}

function formSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.error(t('admin.global.noAuthTip'));
    } else {
      message.error(t('admin.global.enterAllInfo'));
    }
  });
}

function packHandle() {
  if (expandedKeys.value.length) {
    expandedKeys.value = [];
  } else {
    expandedKeys.value = unref(treeData).map((item) => item.key as string) as [];
  }
}

onMounted(async () => {
  loading.value = false;
});

function onExpandedKeys(keys) {
  expandedKeys.value = keys;
}
</script>
