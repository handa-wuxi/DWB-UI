import Request from '../utils/request';

const http = new Request({
  baseURL: '/api',
  timeout: 2 * 60 * 1000,
});

export const cancelRequest = (url: string | string[]) => {
  http.cancelRequest(url);
};

export const cancelAllRequest = () => {
  http.cancelAllRequest();
};

export default http;
