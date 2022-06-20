<template>
  <div class="entry-y">
    <n-grid
      cols="1 s:1 m:1 l:3 xl:3 2xl:3"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item span="1">
        <n-card
          size="small"
          :segmented="{ content: true }"
          :bordered="false"
        >
          <template #header>
            <NSpace>
              <NButton
                type="info"
                ghost
                icon-placement="left"
              >
                {{ t('admin.global.addRoles') }}
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
                  :virtual-scroll="true"
                  :pattern="pattern"
                  :data="roles"
                  style="max-height: 650px; overflow: hidden"
                  @update:selected-keys="selectedTree"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="2">
        <n-card size="small">
          <template #header>
            <n-space>
              <n-icon
                size="18"
                class="flex-auto"
              >
                <UsergroupAddOutlined />
              </n-icon>
              <span>{{ t('admin.global.editRoles') }}
                {{ roleName ? `：${roleName}` : '' }}</span>
            </n-space>
          </template>
          <div class="menu-tree">
            <n-tree
              cascade
              block-line
              checkable
              :data="menus"
              :render-label="renderLabel"
              :checked-keys="selectedKeys"
            />
            <n-space>
              <NButton
                type="primary"
                :loading="subLoading"
                @click="handSubmit"
              >
                {{ t('global.submit') }}
              </NButton>
              <NButton @click="handleReset">
                {{ t('global.reset') }}
              </NButton>
            </n-space>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts" setup name="RoleSetting">
import { AlignLeftOutlined, UsergroupAddOutlined } from '@vicons/antd';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { TreeOption } from 'naive-ui';
import systemApi from '@/api/system';
import { SystemMenu } from '#/api';

const { t } = useI18n();

const roles = ref<TreeOption[]>([]);
const menus = ref<TreeOption[]>([]);
const selectedKeys = ref<number[]>([]);
const pattern = ref<string>('');
const loading = ref<boolean>(false);
const subLoading = ref<boolean>(false);
const roleName = ref<string>('');
const roleId = ref<number>(0);

async function getRolesMenu(id: number) {
  const res = await systemApi.getRoleMenu(id);
  if (res.code === 1) {
    selectedKeys.value = res.data.map((item) => item.menuid);
  }
}

async function getRoles() {
  const res = await systemApi.getRoleList();
  if (res.code === 1) {
    roles.value = res.data.map((item) => ({
      label: item.rolename,
      key: item.id,
      disabled: item.state === 0,
    }));
  }
}

async function getMenus() {
  const res = await systemApi.getMenuList();
  if (res.code === 1) {
    menus.value = res.data.map((item:SystemMenu) => ({
      label: item.locale,
      key: item.id,
    }));
  }
}

function selectedTree(keys: number[]) {
  getRolesMenu(keys[0]);
  const index = roles.value.findIndex((item) => item.key === keys[0]);
  roleName.value = roles.value[index].label as string;
  roleId.value = roles.value[index].key as number;
}

function renderLabel({ option }: { option: TreeOption }) {
  return t(option.label as string);
}

async function handSubmit() {
  const p = {
    roleId: roleId.value,
    menuIds: selectedKeys.value.join(','),
  };
  const res = await systemApi.setRoleMenu(p);
  if (res.code === 1) {
    getRolesMenu(selectedKeys.value[0]);
  }
}

function handleReset() {
  console.log(12);
}

onBeforeMount(() => {
  getRoles();
  getMenus();
});
</script>
