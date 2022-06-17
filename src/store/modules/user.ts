import { defineStore } from 'pinia';
import { createStorage, storage } from '@/utils/Storage';
import { GlobalStoreEnum } from '@/enums/global';

const Storage = createStorage({ storage: localStorage });

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: RawObject[];
  info: RawObject;
}

export const UserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
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
      // TODO
      console.log('userInfo: ', userInfo);
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
