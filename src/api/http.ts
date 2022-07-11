import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { URLParams } from '@/utils/web/requestParams';
import Request from '../utils/request';
import { useUserStore } from '@/store';

const whitePath = ['/auth/login'];

const http = new Request({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_APP_API_URL,
  timeout: 2 * 60 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },

  // 请求拦截器
  interceptors: {
    requestInterceptors(config: AxiosRequestConfig) {
      const userStore = useUserStore();

      if (userStore.token !== '') {
        config.headers!.token = `${userStore.token}`;
      } else if (!whitePath.includes(config.url as string)) {
        window.location.replace('/login');
      }
      if (config.method === 'post' && config.data) {
        Object.defineProperty(config, 'data', {
          value: URLParams(config.data),
        });
      }
      return config;
    },
    responseInterceptors<T = AxiosResponse>(response: T) {
      if (isTokenInvalid(response as unknown as AxiosResponse<CommonResult>)) {
        window.location.replace('/login');
      }
      return response;
    },
  },
});

function isTokenInvalid(response: AxiosResponse<CommonResult>) {
  return response.data.msg === 'Token无效';
}

export const cancelRequest = (url: string | string[]) => {
  http.cancelRequest(url);
};

export const cancelAllRequest = () => {
  http.cancelAllRequest();
};

export default http;
