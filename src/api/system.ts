import { Menu, User } from '#/api';
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

};

export default systemApi;
