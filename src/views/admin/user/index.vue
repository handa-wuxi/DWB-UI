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
            添加用户
          </n-button>
        </template>
      </BasicTable>
    </n-card>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="添加用户"
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
          label="账户名"
          path="username"
        >
          <n-input
            v-model:value="userFrom.username"
            placeholder="请输入账户名"
          />
        </n-form-item>
        <n-form-item
          label="工号"
          path="empid"
        >
          <n-input
            v-model:value="userFrom.empid"
            placeholder="请输入工号"
          />
        </n-form-item>
        <n-form-item
          label="姓名"
          path="empname"
        >
          <n-input
            v-model:value="userFrom.empname"
            placeholder="请输入姓名"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">
            取消
          </n-button>
          <n-button
            type="info"
            :loading="submitBtnLoading"
            @click="addUser"
          >
            确定
          </n-button>
        </n-space>
      </template>
    </n-modal>
    <n-modal
      v-model:show="showRoleModal"
      preset="dialog"
      title="编辑权限"
    >
      <n-tree
        block-line
        cascade
        checkable
        :data="roles"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
      />
    </n-modal>
  </div>
</template>
<script lang="ts" setup name="UserSetting">
import { onBeforeMount, reactive, ref } from 'vue';
import {
  FormInst, FormRules, NButton, useMessage,
} from 'naive-ui';
import systemApi from '@/api/system';
import { BasicTable } from '@/components/BasicTable';
import { Role, User } from '#/api';
import { useTableSettings } from '@/hooks/setting/useTableSettings';

const tableSettings = useTableSettings();
const columns = tableSettings.genColumns({
  enableUser, disableUser, getUserRoles,
});
const message = useMessage();

const loading = ref(false);
const data = ref<User[]>([]);
const showModal = ref(false);
const showRoleModal = ref(false);
const submitBtnLoading = ref(false);
const roles = ref<Role[]>([]);
const defaultExpandedKeys = ref<number[]>([]);
const defaultCheckedKeys = ref<number[]>([]);

const formRef = ref<FormInst>();
const userFrom = reactive({
  username: '',
  empid: '',
  empname: '',
});
const rules: FormRules = {
  username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
  ],
  empid: [
    { required: true, message: '请输入工号', trigger: 'blur' },
  ],
  empname: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
};

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
    message.success('启用成功');
    getUsers();
  } else {
    message.error(res.msg);
  }
}

async function disableUser(user: User) {
  const res = await systemApi.disableUser({ userId: user.id });
  if (res.code === 1) {
    message.success('禁用成功');
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
        message.success('添加成功');
        getUsers();
        showModal.value = false;
      } else {
        message.error(res.msg);
      }
      submitBtnLoading.value = false;
    }
  });
}

async function getUserRoles(user: User) {
  const res = await systemApi.getUserRoles({ userId: user.id });
  if (res.code === 1) {
    defaultExpandedKeys.value = res.data.map((item) => item.roleid);
    defaultCheckedKeys.value = res.data.map((item) => item.roleid);
    showRoleModal.value = true;
  } else {
    message.error(res.msg);
  }
}

// 获取角色列表
async function getRoles() {
  const res = await systemApi.getRoleList();
  if (res.code === 1) {
    roles.value = res.data;
  } else {
    message.error(res.msg);
  }
}

onBeforeMount(() => {
  getUsers();
  getRoles();
});

</script>
