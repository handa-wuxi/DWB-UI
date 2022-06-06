import { defineStore } from 'pinia';

interface GlobalState {
  theme: boolean,
  locale: string,
  collapsed: boolean,
}

interface Getters {
  [key: string]: any,
  locales: () => ({label:string, key:string}[])
}
interface Actions {
  changeTheme: (type: boolean) => void
  changeCollapsed: () => void
}

const map = new Map();
map.set('zh-CN', '中文');
map.set('en-US', 'English');

export const GlobalStore = defineStore<string, GlobalState, Getters, Actions>('global', {
  state: () => ({
    theme: false, // false => light  true => dark
    locale: '',
    collapsed: false,
  }),
  getters: {
    locales() {
      this.locale = window.navigator.language;
      const modules = import.meta.globEager('../../locales/langs/**.ts');
      const list = Object.keys(modules).map((item) => {
        const res = item.replace('../../locales/langs/', '').replace('.ts', '');

        return { label: map.get(res), key: res };
      });
      return list;
    },
  },
  actions: {
    async changeTheme(type = false) {
      this.theme = type;
      document.documentElement.className = type ? 'dark' : 'light';
    },
    async changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
});
