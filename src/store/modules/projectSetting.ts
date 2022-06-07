import { defineStore } from 'pinia';
import projectSetting from '@/config/projectSetting';

const { navMode } = projectSetting;

interface ProjectSettingState{
  navMode: string, // 导航模式
  theme: boolean, // false => light  true => dark
  locale: string,
  collapsed: boolean
}

const map = new Map();
map.set('zh-CN', '中文');
map.set('en-US', 'English');

export const ProjectSettingStore = defineStore({
  id: 'projectSetting',
  state: (): ProjectSettingState => ({
    navMode,
    theme: false,
    locale: '',
    collapsed: false,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
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
