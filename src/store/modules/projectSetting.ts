import { defineStore } from 'pinia';
import projectSetting from '@/config/projectSetting';

const { navMode } = projectSetting;

interface ProjectSettingState{
  navMode: string, // 导航模式
}

export const ProjectSettingStore = defineStore<string, ProjectSettingState>('projectSetting', {
  state: () => ({
    navMode,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
  },
});
