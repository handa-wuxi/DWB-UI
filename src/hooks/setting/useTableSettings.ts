import { NButton } from 'naive-ui';
import { h } from 'vue';
import { TableColumns } from 'naive-ui/lib/data-table/src/interface';
import { User } from '#/api';

interface Config {
  enableUser: (user: User) => void
  disableUser: (user: User) => void
  getUserRoles: (user: User) => void
}

export function useTableSettings() {
  // 用户列表表头设置
  const genColumns = (config: Config): TableColumns<any> => [
    {
      title: '工号',
      key: 'empid',
      align: 'center',
      width: '120px',
    },
    {
      title: '账户名',
      key: 'username',
    },
    {
      title: '姓名',
      key: 'empname',
    },
    {
      title: '创建时间',
      key: 'createon',
    },
    {
      title: '状态',
      key: 'state',
      width: '160px',
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
      width: '160px',
      align: 'center',
      render(row) {
        return [
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              onClick: () => config.getUserRoles(row),
            },
            { default: () => '菜单权限' },
          ),
        ];
      },
    },
  ];

  return {
    genColumns,
  };
}
