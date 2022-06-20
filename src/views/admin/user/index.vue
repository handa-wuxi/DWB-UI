<template>
  <div class="entry-y">
    <n-card>
      <BasicTable
        striped
        :columns="columns"
        :data="data"
        :loading="loading"
      >
        <template #title>
          <n-button
            type="primary"
            @click="showModal = true"
          >
            {{ t('admin.global.addUser') }}
          </n-button>
        </template>
      </BasicTable>
    </n-card>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :title="t('admin.global.addUser')"
    >
      <n-form
        ref="formRef"
        :model="userFrom"
        :rules="rules"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item
          :label="t('admin.global.username')"
          path="username"
        >
          <n-input
            v-model:value="userFrom.username"
            :placeholder="t('global.inputPlaceholder',[t('admin.global.username')])"
          />
        </n-form-item>
        <n-form-item
          :label="t('admin.global.empid')"
          path="empid"
        >
          <n-input
            v-model:value="userFrom.empid"
            :placeholder="t('global.inputPlaceholder',[t('admin.global.empid')])"
          />
        </n-form-item>
        <n-form-item
          :label="t('admin.global.name')"
          path="empname"
        >
          <n-input
            v-model:value="userFrom.empname"
            :placeholder="t('global.inputPlaceholder',[t('admin.global.name')])"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">
            {{ t('global.cancel') }}
          </n-button>
          <n-button
            type="info"
            :loading="submitBtnLoading"
            @click="addUser"
          >
            {{ t('global.save') }}
          </n-button>
        </n-space>
      </template>
    </n-modal>
    <n-modal
      v-model:show="showRoleModal"
      preset="dialog"
      :title="t('admin.global.setUserRole')"
    >
      <n-tree
        block-line
        cascade
        checkable
        :data="roles"
        :checked-keys="checkedKeys"
        :on-update:checked-keys="updateCheckedKeys"
      />
      <template #action>
        <n-space>
          <n-button @click="selectAll">
            {{ t('global.all', {
              msg: checkedKeys.length ? t( 'global.cancel' ) : t( 'global.choose' )
            }) }}
          </n-button>
          <n-button
            type="info"
            :loading="submitBtnLoading"
            @click="updateUserRoles"
          >
            {{ t('global.submit') }}
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>
<script lang="ts" setup name="UserSetting">
import {
  onBeforeMount, reactive, ref, watch,
} from 'vue';
import {
  FormInst, FormRules, NButton, TreeOption, useMessage,
} from 'naive-ui';
import { useI18n } from 'vue-i18n';
import systemApi from '@/api/system';
import { BasicTable } from '@/components/BasicTable';
import { User } from '#/api';
import { useTableSettings } from '@/hooks/setting/useTableSettings';

const { t } = useI18n();

const tableSettings = useTableSettings(t);

const columns = tableSettings.genColumns({
  enableUser, disableUser, setUserRoles, resetPassword,
});
const message = useMessage();

const loading = ref(false);
const data = ref<User[]>([]);
const showModal = ref(false);
const showRoleModal = ref(false);
const submitBtnLoading = ref(false);
const roles = ref<TreeOption[]>([]);
const checkedKeys = ref<Array<number>>([]);
const currentUser = ref<User | null>(null);
const formRef = ref<FormInst>();

const userFrom = reactive({
  username: '',
  empid: '',
  empname: '',
});
const rules: FormRules = {
  username: [
    { required: true, message: t('global.inputPlaceholder', [t('admin.global.username')]), trigger: 'blur' },
  ],
  empid: [
    { required: true, message: t('global.inputPlaceholder', [t('admin.global.empid')]), trigger: 'blur' },
  ],
  empname: [
    { required: true, message: t('global.inputPlaceholder', [t('admin.global.name')]), trigger: 'blur' },
  ],
};

function updateCheckedKeys(list: number[]) {
  checkedKeys.value = list;
}

function selectAll() {
  if (checkedKeys.value.length === 0) {
    checkedKeys.value = roles.value.map((item) => item.key as number);
  } else {
    checkedKeys.value = [];
  }
}

async function getUsers() {
  loading.value = true;
  const res = await systemApi.getUserList();
  if (res.code === 1) {
    data.value = res.data;
  } else {
    message.error(res.msg);
  }
  loading.value = false;
}

async function enableUser(user: User) {
  const res = await systemApi.enableUser({ userId: user.id });
  if (res.code === 1) {
    message.success(t('admin.global.enableSuccess'));
    getUsers();
  } else {
    message.error(res.msg);
  }
}

async function disableUser(user: User) {
  const res = await systemApi.disableUser({ userId: user.id });
  if (res.code === 1) {
    message.success(t('admin.global.unableSuccess'));
    getUsers();
  } else {
    message.error(res.msg);
  }
}

function addUser() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      submitBtnLoading.value = true;
      const res = await systemApi.addUser(userFrom);
      if (res.code === 1) {
        message.success(t('admin.global.addSuccess'));
        getUsers();
        showModal.value = false;
      } else {
        message.error(res.msg);
      }
      submitBtnLoading.value = false;
    }
  });
}

// TODO: 菜单处理成tree结构
// function getTreeData(userMenus: SystemMenu[]) {
//   const list: Menu[] = [];
//   let hasChildren = false;
//   userMenus.forEach((menu) => {
//     list.push({
//       label: t(menu.locale),
//       key: menu.link,
//       id: menu.id,
//       menucode: menu.menucode,
//     });
//     if (menu.submenus && menu.submenus.length > 0) {
//       if (!hasChildren) hasChildren = true;
//       list[list.length - 1].children = [];
//       const target = getTreeData(menu.submenus);
//       list[list.length - 1].children = target.list;
//     }
//   });
//   return { list, hasChildren };
// }

async function setUserRoles(user: User) {
  currentUser.value = user;
  const res = await systemApi.getUserRoles({
    userId: user.id,
  });
  if (res.code === 1) {
    checkedKeys.value = res.data.map((item) => item.roleid);
  } else {
    message.error(res.msg);
  }
  showRoleModal.value = true;
}

async function getRoleList() {
  const res = await systemApi.getRoleList();
  if (res.code === 1) {
    roles.value = res.data.map((item) => ({
      key: item.id,
      label: item.rolename,
      disabled: item.state === 0,
    }));
  } else {
    message.error(res.msg);
  }
}

async function updateUserRoles() {
  const res = await systemApi.setUserRoles({
    userId: currentUser.value?.id as number,
    roleIds: checkedKeys.value,
  });
  if (res.code === 1) {
    message.success(t('admin.global.setSuccess'));
    getUsers();
  } else {
    message.error(res.msg);
  }
  showRoleModal.value = false;
}

async function resetPassword(user: User) {
  const res = await systemApi.resetPassword({ userId: user.id, password: 'Aa123456' });
  if (res.code === 1) {
    message.success(t('admin.global.resetSuccess'));
  } else {
    message.error(res.msg);
  }
}

watch(() => checkedKeys, (value) => {
  console.log(value);
});

watch(() => t, (newVal) => {
  console.log('newVal: ', newVal);
});

onBeforeMount(() => {
  getRoleList();
  getUsers();
});

</script>
