import { NButton, NSpace } from 'naive-ui';
import { h } from 'vue';
import { TableColumns } from 'naive-ui/lib/data-table/src/interface';
import { User } from '#/api';
import { createI18nInst } from '@/locales';

const { t } = await createI18nInst();
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
      title: t('admin.global.empid'),
      key: 'empid',
      align: 'center',
      width: 120,
    },
    {
      title: t('admin.global.username'),
      key: 'username',
      width: 120,
    },
    {
      title: t('global.name'),
      key: 'empname',
      width: 120,
    },
    {
      title: t('admin.global.userRoles'),
      key: 'roles',
      width: 120,
    },
    {
      title: t('global.createOn'),
      key: 'createon',
      width: 200,
    },
    {
      title: t('global.state'),
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
            { default: () => t(row.state === 0 ? 'global.enable' : 'global.enabled') },
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
            { default: () => t(row.state === 1 ? 'global.disable' : 'global.disabled') },
          ),
        ];
      },
    },
    {
      title: t('global.operate'),
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
              { default: () => t('admin.global.roleSetting') },
            ),
            h(
              NButton,
              {
                strong: true,
                size: 'small',
                onClick: () => config.resetPassword(row),
              },
              { default: () => t('global.reset', [t('global.password')]) },
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
