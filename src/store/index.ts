/*
 * @Author: 周顺顺 idioticzhou@foxmail.com
 * @Date: 2022-05-09 14:21:10
 * @LastEditors: 周顺顺 idioticzhou@foxmail.com
 * @LastEditTime: 2022-06-14 15:28:47
 * @FilePath: /DWB-UI/src/store/index.ts
 * @Description: 项目的全局状态管理
 */

import { createPinia } from 'pinia';
import { App } from 'vue';
import { UserStore } from './modules/user';
import { AsyncRouteStore } from './modules/asyncRoute';
import { ProjectSettingStore } from './modules/projectSetting';
import { DesignSettingStore } from './modules/designSetting';
import { TabsViewStore } from './modules/tagsView';
import { LockScreenStore } from './modules/lockScreen';

const store = createPinia();

export const setupStore = (app: App<Element>) => {
  app.use(store);
};

export { store };

// 所有的Store模块统一收集并导出
export const useUserStore = () => UserStore(store);
export const useAsyncRouteStore = () => AsyncRouteStore(store);
export const useProjectSettingStore = () => ProjectSettingStore(store);
export const useDesignSettingStore = () => DesignSettingStore(store);
export const useTabsViewStore = () => TabsViewStore(store);
export const useLockScreenStore = () => LockScreenStore(store);
