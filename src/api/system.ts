import {
  MenuFunc, Role, SystemMenu, User,
} from '#/api';
import http, { cancelRequest, cancelAllRequest } from './http';

const systemApi = {
  cancelRequest(url: string | string[]) {
    return cancelRequest(url);
  },
  cancelAllRequest() {
    return cancelAllRequest();
  },
  // ------------------菜单管理------------------

  // 获取菜单列表
  getMenuList() {
    return http.request<SystemMenu[]>({
      url: '/system/getMenus',
      method: 'post',
    });
  },

  // 获取用户菜单列表
  getUserMenuList(p: { userId: string | number }) {
    const data = {
      userid: p.userId,
    };

    return http.request<SystemMenu[]>({
      url: '/system/getUserMenus',
      method: 'post',
      data,
    });
  },

  // 获取菜单功能
  getMenuFuncsByMenuId(menuId: string | number) {
    const data = {
      menuid: menuId,
    };
    return http.request<MenuFunc[]>({
      url: '/system/getMenuFuncs',
      method: 'post',
      data,
    });
  },

  // ------------------用户管理------------------
  // 获取用户列表
  getUserList() {
    return http.request <User[]>({
      url: '/system/getUsers',
      method: 'post',
    });
  },

  // 添加用户
  addUser(data: Partial<User>) {
    return http.request({
      url: '/system/addUser',
      method: 'post',
      data,
    });
  },

  // 启用用户
  enableUser(data: { userId: number }) {
    return http.request({
      url: '/system/enableUser',
      method: 'post',
      data,
    });
  },

  // 禁用用户
  disableUser(data: { userId: number }) {
    return http.request({
      url: '/system/disableUser',
      method: 'post',
      data,
    });
  },

  // 获取用户角色
  getUserRoles(p: { userId: number }) {
    const data = {
      userid: p.userId,
    };
    return http.request<{roleid: number}[]>({
      url: '/system/getUserRoles',
      method: 'post',
      data,
    });
  },

  // 设置用户角色
  setUserRoles(p: { userId: number, roleIds: number[] }) {
    const data = {
      userid: p.userId,
      roleids: p.roleIds,
    };
    return http.request({
      url: '/system/setUserRoles',
      method: 'post',
      data,
    });
  },

  // 更改用户密码
  resetPassword(p: { userId: number, password: string }) {
    const data = {
      id: p.userId,
      password: p.password,
    };

    return http.request({
      url: '/system/setUserPassword',
      method: 'post',
      data,
    });
  },

  // ------------------角色管理------------------
  // 获取角色列表
  getRoleList() {
    return http.request<Role[]>({
      url: '/system/getRoles',
      method: 'post',
    });
  },

  // 获取角色菜单
  getRoleMenu(id: number) {
    const data = {
      roleid: id,
    };
    return http.request<{ menuid: number}[]>({
      url: '/system/getRoleMenus',
      method: 'post',
      data,
    });
  },

  // 设置角色菜单
  setRoleMenu(p: { roleId: number, menuIds: string }) {
    const data = {
      roleid: p.roleId,
      menuids: p.menuIds,
    };
    return http.request({
      url: '/system/setRoleMenus',
      method: 'post',
      data,
    });
  },

  // 添加角色
  addRole(roleName: string) {
    const data = {
      rolename: roleName,
    };
    return http.request({
      url: '/system/addRole',
      method: 'post',
      data,
    });
  },

  // 启用角色
  enableRole(id: number) {
    const data = {
      id,
    };
    return http.request({
      url: '/system/enableRole',
      method: 'post',
      data,
    });
  },

  // 禁用角色
  disableRole(id: number) {
    const data = {
      id,
    };
    return http.request({
      url: '/system/disableRole',
      method: 'post',
      data,
    });
  },
};

export default systemApi;
