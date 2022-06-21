import http from './http';

const authApi = {
  login(data: { username: string, password: string }) {
    return http.request<{token: string}>({
      url: '/auth/login',
      method: 'post',
      data,
    });
  },
};

export default authApi;
