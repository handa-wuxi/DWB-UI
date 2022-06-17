import { Role, SystemMenu, User } from '#/api';
import http, { cancelRequest, cancelAllRequest } from './http';

const systemApi = {
  cancelRequest(url: string | string[]) {
    return cancelRequest(url);
  },
  cancelAllRequest() {
    return cancelAllRequest();
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

  // 获取角色列表
  getRoleList() {
    return http.request<Role[]>({
      url: '/system/getRoles',
      method: 'post',
    });
  },

  // 获取菜单列表
  getMenuList() {
    return http.request<SystemMenu[]>({
      url: '/system/getMenus',
      method: 'post',
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
};

export default systemApi;
