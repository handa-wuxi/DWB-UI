/* eslint-disable no-unused-vars */
import { LoadingBarApiInjection, MessageApiInjection, DialogApiInjection } from 'naive-ui';

declare global {
  declare interface Window {
    $loading: LoadingBarApiInjection;
    $message: MessageApiInjection;
    $dialog: DialogApiInjection;
  }
}
export { };
