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

}
export { };
