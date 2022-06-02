import { MsgError } from '../utils/monitor/types';
import http, { cancelRequest, cancelAllRequest } from './http';

const globalApi = {
  cancelRequest(url: string | string[]) {
    return cancelRequest(url);
  },
  cancelAllRequest() {
    return cancelAllRequest();
  },

  delayApi() {
    return http.request({
      url: '/users/demo',
      method: 'get',
      params: {
        username: 'zss',
        password: '123456',
      },
    });
  },

  insertLogs(data: MsgError) {
    return http.request({
      url: '/logs/add',
      method: 'post',
      data,
    });
  },

  findAllLogs() {
    return http.request({
      url: 'logs/find',
      method: 'get',
    });
  },

  findAllActionLogs() {
    return http.request({
      url: 'logs/findAction',
      method: 'get',
    });
  },
};

export default globalApi;
