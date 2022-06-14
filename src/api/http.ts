import { AxiosRequestConfig } from 'axios';
import { URLParams } from '@/utils/web/requestParams';
import Request from '../utils/request';

const http = new Request({
  baseURL: '/api',
  timeout: 2 * 60 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  interceptors: {
    requestInterceptors: (config: AxiosRequestConfig) => {
      if (config.method === 'post' && config.data) {
        Object.defineProperty(config, 'data', {
          value: URLParams(config.data),
        });
      }
      return config;
    },
  },
});

export const cancelRequest = (url: string | string[]) => {
  http.cancelRequest(url);
};

export const cancelAllRequest = () => {
  http.cancelAllRequest();
};

export default http;
