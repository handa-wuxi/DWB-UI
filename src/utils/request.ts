import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource,
} from 'axios';

export interface RequestInterceptors{
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsErr?: (err: AxiosError) => RawObject
  responseInterceptors?: <T = AxiosResponse>(config: T) => T,
  responseInterceptorsErr?: (err: AxiosError) => RawObject
}

export interface AxiosConfig extends AxiosRequestConfig{
  interceptors?: RequestInterceptors
}

export interface CancelRequestUrl{
  [key: string]: CancelTokenSource
}
class Request {
  instance: AxiosInstance;

  interceptorObj?: RequestInterceptors;

  requestUrlList: string[];

  cancelUrlList?: CancelRequestUrl[];

  source: CancelTokenSource | null;

  constructor(config: AxiosConfig) {
    this.instance = axios.create(config);
    this.interceptorObj = config.interceptors;
    this.requestUrlList = [];
    this.cancelUrlList = [];
    this.source = null;

    // 实际上axios的拦截器也是洋葱模型，所以在配置拦截器的时候 注意顺序

    // 请求拦截器
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => res,
      (err: AxiosError) => Promise.reject(err),
    );

    // 使用配置拦截器
    this.instance.interceptors.request.use(
      this.interceptorObj?.requestInterceptors,
      this.interceptorObj?.requestInterceptorsErr,
    );

    this.instance.interceptors.response.use(
      this.interceptorObj?.responseInterceptors,
      this.interceptorObj?.responseInterceptorsErr,
    );

    // 返回拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (err: AxiosError) => Promise.reject(err),
    );
  }

  request<T>(pc: AxiosConfig): Promise<CommonResult<T>> {
    let config = pc;
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(pc);
      }
      const { url } = pc;
      // 请求推送
      if (url) {
        this.source = axios.CancelToken.source();
        this.requestUrlList.unshift(url);
        this.cancelUrlList?.unshift({ [url]: this.source });
        config.cancelToken = this.source.token;
      }
      this.instance.request<T, CommonResult<T>>(config).then((res) => {
        if (pc.interceptors?.responseInterceptors) {
          const tempRes = pc.interceptors.responseInterceptors(res);
          resolve(tempRes);
        }
        resolve(res);
      }).catch((err: AxiosError) => {
        reject(err);
      });
    });
  }

  getIndex(url:string) {
    return this.requestUrlList.findIndex((key) => key === url);
  }

  delRequest(index: number) {
    if (index < 0) {
      return;
    }
    this.cancelUrlList?.splice(index, 1);
    this.requestUrlList?.splice(index, 1);
  }

  removeRequest(url: string) {
    const index = this.getIndex(url);
    if (index >= 0) {
      this.cancelUrlList?.[index][url].cancel(`${url}取消了请求`);
      this.delRequest(index);
    }
  }

  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      this.removeRequest(url);
    } else {
      url.forEach((key) => {
        this.removeRequest(key);
      });
    }
  }

  cancelAllRequest() {
    this.cancelUrlList?.forEach((value) => {
      const key = Object.keys(value)[0];
      value[key].cancel(`${key}取消了请求`);
    });
    this.cancelUrlList = [];
    this.requestUrlList = [];
  }
}

export default Request;
