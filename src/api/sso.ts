import Request from '../utils/request';

const http = new Request({
  baseURL: 'http://oa.handa.com.cn',
  timeout: 2 * 60 * 1000,
});

const SSOApi = {
  getAuthCode(params: {client_id: string, redirect_uri: string}) {
    console.log('params: ', params);
    return http.request({
      url: '/sso/oauth2.0/authorize',
      method: 'get',
      params: {
        response_type: 'code',
        ...params,
      },
    });
  },
};

export default SSOApi;
