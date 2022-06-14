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
              :placeholder="t('admin.menu.menuPlaceholder')"
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
              <span>{{ t('admin.menu.editMenu') }}
                {{ treeItemTitle ? `：${t(treeItemTitle)}` : '' }}</span>
            </NSpace>
          </template>
          <NAlert
            type="info"
            closable
          >
            {{ t('admin.menu.editMenuTip') }}
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
              :label="t('global.title')"
              path="label"
            >
              <NInput
                v-model:value="formParams.label"
                :placeholder="t('global.inputPlaceholder',[t('global.title')])"
              />
            </NFormItem>
            <NFormItem
              :label="t('global.subTitle')"
              path="subtitle"
            >
              <NInput
                v-model:value="formParams.subtitle"
                :placeholder="t('global.inputPlaceholder',[t('global.subTitle')])"
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
              :label="t('admin.menu.openType')"
              path="openType"
            >
              <NRadioGroup
                v-model:value="formParams.openType"
                name="openType"
              >
                <NSpace>
                  <NRadio :value="1">
                    {{ t('admin.menu.currentWindow') }}
                  </NRadio>
                  <NRadio :value="2">
                    {{ t('admin.menu.newWindow') }}
                  </NRadio>
                </NSpace>
              </NRadioGroup>
            </NFormItem>
            <NFormItem
              :label="t('admin.menu.menuAuth')"
              path="auth"
            >
              <NInput
                v-model:value="formParams.auth"
                :placeholder="t('admin.menu.authPlaceholder')"
              />
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
import { TreeOption, useDialog, useMessage } from 'naive-ui';
import {
  AlignLeftOutlined, SearchOutlined, FormOutlined,
} from '@vicons/antd';
import { useI18n } from 'vue-i18n';
import { useAsyncRouteStore } from '@/store';

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

const rs = useAsyncRouteStore();

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
})));

function selectedTree(keys) {
  const selectData = treeData.value.filter((item) => item.key === keys[0])[0];
  treeItemTitle.value = selectData.label;
  Object.assign(formParams, selectData);
  isEditMenu.value = true;
}

function renderLabel({ option }: { option: TreeOption }) {
  return t(option.label as string);
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
