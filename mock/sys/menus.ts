import { Menu } from '#/config';
import { resultSuccess } from '../_utils';

const menus: Menu<string>[] = [
  {
    label: 'global.home',
    key: 'home',
    icon: 'DashboardOutlined',
  },
  // 角色管理
  {
    label: 'global.roleSetting',
    key: 'role',
    icon: 'user',
  },
  // 用户管理
  {
    label: 'global.userSetting',
    key: 'user',
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
    url: '/api/menu/list',
    timeout: 30,
    method: 'get',
    response: () => resultSuccess(menus),
  },
];
