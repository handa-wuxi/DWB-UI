import { Menu } from '#/config';
import { resultSuccess } from '../_utils';

const menus: Menu<string>[] = [
  {
    label: 'global.home',
    key: 'adminHome',
    icon: 'DashboardOutlined',
  },
  // 角色管理
  {
    label: 'global.roleSetting',
    key: 'roleSetting',
    icon: 'user',
  },
  // 用户管理
  {
    label: 'global.userSetting',
    key: 'userSetting',
    icon: 'user',
  },
  // 菜单管理
  {
    label: 'global.menuSetting',
    key: 'menuSetting',
    icon: 'menu',
  },
];

export default [
  {
    url: '/system/getUserMenus',
    timeout: 30,
    method: 'post',
    response: () => resultSuccess(menus),
  },
];
