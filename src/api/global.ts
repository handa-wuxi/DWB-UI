import http, { cancelRequest, cancelAllRequest } from './http';

const globalApi = {
  cancelRequest(url: string | string[]) {
    return cancelRequest(url);
  },
  cancelAllRequest() {
    return cancelAllRequest();
  },

  getMenuList() {
    return http.request({
      url: '/menu/list',
      method: 'get',
    });
  },
};

export default globalApi;
