import { NButton, NSpace } from 'naive-ui';
import { h } from 'vue';
import { TableColumns } from 'naive-ui/lib/data-table/src/interface';
import { User } from '#/api';

interface Config {
  enableUser: (user: User) => void
  disableUser: (user: User) => void
  setUserRoles: (user: User) => void
  resetPassword: (user: User) => void
}

export function useTableSettings() {
  // 用户列表表头设置
  const genColumns = (config: Config): TableColumns<any> => [
    {
      title: '工号',
      key: 'empid',
      align: 'center',
      width: 120,
    },
    {
      title: '账户名',
      key: 'username',
      width: 120,
    },
    {
      title: '姓名',
      key: 'empname',
      width: 120,
    },
    {
      title: '用户角色',
      key: 'roles',
      width: 120,
    },
    {
      title: '创建时间',
      key: 'createon',
      width: 200,
    },
    {
      title: '状态',
      key: 'state',
      width: 160,
      align: 'center',
      render(row) {
        return [
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              type: 'success',
              secondary: row.state === 1,
              disabled: row.state === 1,
              onClick: () => config.enableUser(row),
            },
            { default: () => (row.state === 0 ? '启用' : '已启用') },
          ),
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              type: 'error',
              secondary: row.state === 0,
              disabled: row.state === 0,
              onClick: () => config.disableUser(row),
            },
            { default: () => (row.state === 1 ? '禁用' : '已禁用') },
          ),
        ];
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 160,
      render(row) {
        return h(
          NSpace,
          {
            align: 'center',
            justify: 'center',
          },
          () => [
            h(
              NButton,
              {
                strong: true,
                size: 'small',
                onClick: () => config.setUserRoles(row),
              },
              { default: () => '角色设置' },
            ),
            h(
              NButton,
              {
                strong: true,
                size: 'small',
                onClick: () => config.resetPassword(row),
              },
              { default: () => '重置密码' },
            ),
          ],
        );
      },
    },
  ];

  return {
    genColumns,
  };
}
