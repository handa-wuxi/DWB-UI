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
                @click="addRoleVisible = !addRoleVisible"
              >
                {{ addRoleVisible?t('global.cancel'):t('admin.global.addRoles') }}
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
              :placeholder="t('admin.global.sRolePlaceholder')"
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
                  :selected-keys="[roleId]"
                  :render-suffix="renderSuffix"
                  style="max-height: 650px; overflow: hidden"
                  @update:selected-keys="selectedTree"
                />
              </template>
            </div>
            <div
              v-show="addRoleVisible"
              class="add-role"
            >
              <n-input
                v-model:value="newRole"
                :placeholder="t('admin.global.rolePlaceholder')"
                style="flex-grow: 2;"
              />
              <div class="btn-group">
                <n-button
                  type="primary"
                  @click="addRoles"
                >
                  {{ t('global.confirm') }}
                </n-button>
                <n-button
                  type="default"
                  @click="addRoleVisible = false"
                >
                  {{ t('global.cancel') }}
                </n-button>
              </div>
            </div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="2">
        <n-card size="small">
          <template #header>
            <n-space align="center">
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
          <div
            class="menu-tree"
          >
            <n-tree
              cascade
              block-line
              checkable
              multiple
              :data="menus"
              :selected-keys="[]"
              :render-label="renderLabel"
              :checked-keys="selectedKeys"
              @update:checked-keys="handSelectKeys"
            />
            <n-space :item-style="{marginTop: '20px'}">
              <NButton
                type="primary"
                :loading="subLoading"
                @click="handSubmit"
              >
                {{ t('global.submit') }}
              </NButton>
              <NButton
                @click="handleReset"
              >
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
import { AlignLeftOutlined, UsergroupAddOutlined, SearchOutlined } from '@vicons/antd';
import {
  onBeforeMount, ref, unref, h,
} from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton, NSwitch, TreeOption, useMessage,
} from 'naive-ui';
import systemApi from '@/api/system';
import { SystemMenu } from '#/api';

const message = useMessage();
const { t } = useI18n();

const roles = ref<TreeOption[]>([]);
const menus = ref<TreeOption[]>([]);
const selectedKeys = ref<number[]>([]);
const cacheSelectKeys = ref<number[]>([]);
const pattern = ref<string>('');
const loading = ref<boolean>(false);
const subLoading = ref<boolean>(false);
const addRoleVisible = ref<boolean>(false);
const roleName = ref<string>('');
const newRole = ref<string>('');
const roleId = ref<number>(0);

async function getRolesMenu(id: number) {
  const res = await systemApi.getRoleMenu(id);
  if (res.code === 1) {
    selectedKeys.value = res.data.map((item) => item.menuid);
    cacheSelectKeys.value = unref(selectedKeys);
  }
}

async function getRoles() {
  const res = await systemApi.getRoleList();
  if (res.code === 1) {
    roles.value = res.data.map((item) => ({
      label: item.rolename,
      key: item.id,
      enable: item.state === 1,
    }));
    selectedTree([res.data[0].id]);
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

// 菜单树选中事件
function handSelectKeys(keys: number[]) {
  selectedKeys.value = keys;
}

// 角色树选中事件
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
  if (res.code === 0) {
    message.error(res.msg);
  }
}

function handleReset() {
  selectedKeys.value = unref(cacheSelectKeys);
}

function resetAll() {
  addRoleVisible.value = false;
  newRole.value = '';
  getRoles();
}

async function addRoles() {
  const res = await systemApi.addRole(unref(newRole));
  if (res.code === 0) {
    message.error(res.msg);
  } else {
    message.success(t('admin.global.addSuccess'));
    resetAll();
  }
}

async function enableRole(id, index) {
  const res = await systemApi.enableRole(id);
  if (res.code === 1) {
    roles.value.splice(index, 1, {
      ...roles.value[index],
      enable: true,
    });
    message.success(t('admin.global.enableSuccess'));
  } else {
    message.error(res.msg);
  }
}

async function disableRole(id, index) {
  const res = await systemApi.disableRole(id);
  if (res.code === 1) {
    roles.value.splice(index, 1, {
      ...roles.value[index],
      enable: false,
    });
    message.success(t('admin.global.unableSuccess'));
  } else {
    message.error(res.msg);
  }
}

function settingRoles(id: number, enable: boolean) {
  const index = roles.value.findIndex((item) => item.key === id);
  if (enable) {
    enableRole(id, index);
  } else {
    disableRole(id, index);
  }
}

function renderSuffix({ option }: { option: TreeOption }) {
  return h(
    NSwitch,
    {
      value: option.enable as boolean,
      'onUpdate:value': (value) => settingRoles(option.key as number, value),
    },
  );
}

onBeforeMount(() => {
  getRoles();
  getMenus();
});
</script>
<style lang="less" scoped>
.menu-tree{
  display: flex;
  flex-direction: column;
}
.add-role{
  display: flex;
  align-items: center;
  .btn-group{
    display: flex;
    margin-left: 10px;
    gap: 8px;
  }
}
</style>
