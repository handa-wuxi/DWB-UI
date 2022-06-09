/* eslint-disable no-unused-vars */
import { LoadingBarApiInjection } from 'naive-ui';

declare global {
  declare interface Window {
    $loading: LoadingBarApiInjection;
  }
}
export { };
