import { Menu } from '#/config';
import http, { cancelRequest, cancelAllRequest } from './http';

const globalApi = {
  cancelRequest(url: string | string[]) {
    return cancelRequest(url);
  },
  cancelAllRequest() {
    return cancelAllRequest();
  },

  getMenuList() {
    return http.request<Menu<string>[]>({
      url: '/system/getUserMenus',
      method: 'post',
    });
  },
};

export default globalApi;
