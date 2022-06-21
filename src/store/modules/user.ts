import { defineStore } from 'pinia';
import { createStorage, storage } from '@/utils/Storage';
import { GlobalStoreEnum } from '@/enums/global';
import authApi from '@/api/auth';

const Storage = createStorage({ storage: localStorage });

export interface UserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: RawObject[];
  info: RawObject;
}

const expireTime = 1 * 24 * 60 * 60;

export const UserStore = defineStore({
  id: 'userInfo',
  state: (): UserState => ({
    token: Storage.get(GlobalStoreEnum.AccessToken, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: Storage.get(GlobalStoreEnum.CurrentUser, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): RawObject[] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      Storage.set(GlobalStoreEnum.AccessToken, token, expireTime);
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo) {
      const res = await authApi.login(userInfo);
      if (res.code === 1) {
        this.setToken(res.data.token);
        return Promise.resolve('');
      }
      return Promise.reject(res.msg);
    },

    // 获取用户信息
    GetInfo() {
      // TODO
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      storage.remove(GlobalStoreEnum.AccessToken);
      storage.remove(GlobalStoreEnum.CurrentUser);
      return Promise.resolve('');
    },
  },
});
