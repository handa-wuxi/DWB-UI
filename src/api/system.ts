import { Menu, Role, User } from '#/api';
import http, { cancelRequest, cancelAllRequest } from './http';

const systemApi = {
  cancelRequest(url: string | string[]) {
    return cancelRequest(url);
  },
  cancelAllRequest() {
    return cancelAllRequest();
  },

  // 获取用户菜单列表
  getMenuList(p: { userId: string | number }) {
    const data = {
      userid: p.userId,
    };

    return http.request <Menu[]>({
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
    return http.request<{ roleid: number}[]>({
      url: '/system/getUserRoles',
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
};

export default systemApi;
