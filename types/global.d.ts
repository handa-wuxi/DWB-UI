/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { LoadingBarApiInjection, MessageApiInjection, DialogApiInjection } from 'naive-ui';

declare global {
  declare interface Window {
    $loading: LoadingBarApiInjection;
    $message: MessageApiInjection;
    $dialog: DialogApiInjection;
  }

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ENABLE_MOCK: boolean;
    VITE_APP_API_URL: string;
  }

  declare type RawObject<T = any> = Record<string, T>

  declare interface Page {
    pageindex: number,
    pagesize: number,
    pagecount: number
  }

  declare interface CommonResult<T = any> {
    data: T,
    msg: string,
    code: 1 | 0, // 1 成功 0 失败
    page?: Page
  }

  declare type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

}
export { };
