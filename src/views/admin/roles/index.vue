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
      <n-grid-item span="1">
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
              :checked-keys="checkedKeys"
              @update-selected-keys="onUpdateSelectedKeys"
              @update:checked-keys="handSelectKeys"
            />
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="1">
        <n-card size="small">
          <template #header>
            <n-space align="center">
              <n-icon
                size="18"
                class="flex-auto"
              >
                <UsergroupAddOutlined />
              </n-icon>
              <span>{{ t('admin.global.menuFunc') }}</span>
            </n-space>
          </template>
          <div
            v-if="curMenuFuncs.length > 0"
            class="menu-tree"
          >
            <n-checkbox-group v-model:value="roleFunc">
              <n-space vertical>
                <n-checkbox
                  v-for="(item) in curMenuFuncs"
                  :key="item.funccode"
                  :value="item.id"
                  :label="item.memo"
                />
              </n-space>
            </n-checkbox-group>
          </div>
          <n-empty v-else />
        </n-card>
      </n-grid-item>
    </n-grid>
    <div class="footer bg-white h-[50px] w-[calc(100%-230px)] pr-[40px]">
      <n-space align="center">
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
  </div>
</template>
<script lang="ts" setup name="RoleSetting">
import { AlignLeftOutlined, UsergroupAddOutlined, SearchOutlined } from '@vicons/antd';
import {
  onBeforeMount, ref, unref, h, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton, NSwitch, TreeOption, useMessage,
} from 'naive-ui';
import systemApi from '@/api/system';
import { MenuFunc, SystemMenu } from '#/api';

const message = useMessage();
const { t } = useI18n();

const menuFuncs = new Map();
let curSelectKey = -1;

const roles = ref<TreeOption[]>([]);
const menus = ref<TreeOption[]>([]);
const checkedKeys = ref<number[]>([]);
const cacheSelectKeys = ref<number[]>([]);
const pattern = ref<string>('');
const loading = ref<boolean>(false);
const subLoading = ref<boolean>(false);
const addRoleVisible = ref<boolean>(false);
const roleName = ref<string>('');
const newRole = ref<string>('');
const roleId = ref<number>(0);
const curMenuFuncs = ref<MenuFunc[]>([]);
const roleFunc = ref<number[]>([]);

async function getRolesMenu(id: number) {
  const res = await systemApi.getRoleMenu(id);
  if (res.code === 1) {
    checkedKeys.value = res.data.map((item) => item.menuid);
    cacheSelectKeys.value = unref(checkedKeys);
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

async function onUpdateSelectedKeys(keys: number[]) {
  [curSelectKey] = keys;
  if (menuFuncs.has(keys[0])) {
    curMenuFuncs.value = menuFuncs.get(keys[0]);
    return;
  }
  const res = await systemApi.getRoleMenuFuncs(roleId.value, keys[0]);
  if (res.code === 1) {
    roleFunc.value = res.data.map((item) => item.funcid);
  }
  const menuRes = await systemApi.getMenuFuncsByMenuId(keys[0]);
  if (menuRes.code === 1) {
    menuFuncs.set(keys[0], menuRes.data);
    curMenuFuncs.value = menuFuncs.get(keys[0]);
  }
}
// 菜单树选中事件
function handSelectKeys(keys: number[]) {
  checkedKeys.value = keys;
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

async function setRoleFunc() {
  const p = {
    roleId: roleId.value,
    menuId: curSelectKey,
    funcIds: roleFunc.value,
  };
  await systemApi.setRoleMenuFuncs(p);
}

async function handSubmit() {
  const p = {
    roleId: roleId.value,
    menuIds: checkedKeys.value.join(','),
  };
  const res = await systemApi.setRoleMenu(p);
  if (res.code === 0) {
    message.error(res.msg);
  } else {
    message.success(t('global.save', [t('global.success')]));
  }
}

function handleReset() {
  checkedKeys.value = unref(cacheSelectKeys);
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

watch(() => roleFunc.value, () => {
  setRoleFunc();
});

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
.footer{
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
