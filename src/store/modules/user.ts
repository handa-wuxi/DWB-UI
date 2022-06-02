import { defineStore } from 'pinia';

export const UserStore = defineStore({
  id: 'user',
  state: () => ({
    username: '',
  }),
  getters: {
    UserName(): string {
      return this.username || '';
    },
  },
  actions: {
    async setUserName(username: string) {
      this.username = username;
    },
  },
});
