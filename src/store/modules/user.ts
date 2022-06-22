import { defineStore } from 'pinia';
import { createStorage, storage } from '@/utils/Storage';
import { GlobalStoreEnum } from '@/enums/global';
import authApi from '@/api/auth';
import { Login } from '#/api';

const Storage = createStorage({ storage: localStorage });

export interface UserState {
  token: string;
  user: {
    username: string;
    empName: string,
    empId: string,
    userId: number,
  },
  remember: boolean;
}

export type User = Omit<UserState, 'remember' | 'token'>['user'];

const expireTime = 1 * 24 * 60 * 60;

export const UserStore = defineStore({
  id: 'userInfo',
  state: (): UserState => ({
    token: Storage.get(GlobalStoreEnum.AccessToken, ''),
    user: {
      username: '',
      empName: '',
      empId: '',
      userId: -1,
    },
    remember: Storage.get(GlobalStoreEnum.Remember, false),
  }),
  actions: {

    setToken(token: string) {
      this.token = token;
      Storage.set(GlobalStoreEnum.AccessToken, token, expireTime);
    },
    setRemember(remember: boolean) {
      this.remember = remember;
      Storage.set(GlobalStoreEnum.Remember, remember);
    },
    setUserInfo(userInfo?: Login) {
      this.user = {
        username: userInfo?.username ?? '',
        empName: userInfo?.empname ?? '',
        empId: userInfo?.empid ?? '',
        userId: userInfo?.id ?? -1,
      };
      this.setToken(userInfo?.token ?? '');
      Storage.set(GlobalStoreEnum.AccessToken, this.token);
      Storage.set(GlobalStoreEnum.CurrentUser, this.user);
    },
    // 登录
    async login(userInfo) {
      const res = await authApi.login(userInfo);
      if (res.code === 1) {
        this.setUserInfo(res.data);
        return Promise.resolve('');
      }
      return Promise.reject(res.msg);
    },
    // 登出
    async logout() {
      this.setUserInfo();
      storage.remove(GlobalStoreEnum.AccessToken);
      storage.remove(GlobalStoreEnum.CurrentUser);
      return Promise.resolve('');
    },
  },
  getters: {
    getToken(): string {
      return this.token;
    },
    getUserInfo(): User {
      this.user = Storage.get(GlobalStoreEnum.CurrentUser, {
        username: '',
        empName: '',
        empId: -1,
        userId: '',
      });
      return this.user;
    },
  },
});
