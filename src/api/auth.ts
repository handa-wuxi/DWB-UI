import { Login } from '#/api';
import http from './http';

const authApi = {
  login(data: { username: string, password: string }) {
    return http.request<Login>({
      url: '/auth/login',
      method: 'post',
      data,
    });
  },
};

export default authApi;
