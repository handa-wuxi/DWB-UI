import { computed } from 'vue';
import { useProjectSettingStore } from '@/store';

export function useProjectSetting() {
  const projectSetting = useProjectSettingStore();

  const getNavMode = computed(() => projectSetting.navMode);

  // 语言包列表
  const getLocales = computed(() => projectSetting.locales);

  // 当前语言
  const getLocale = computed(() => projectSetting.locale);

  const getIsPageAnimate = computed(() => projectSetting.isPageAnimate);

  const getPageAnimateType = computed(() => projectSetting.pageAnimateType);

  // layout header设置
  const getHeaderSetting = computed(() => projectSetting.headerSetting);

  // layout menu设置
  const getMenuSetting = computed(() => projectSetting.menuSetting);

  // 主题设置
  const getTheme = computed(() => projectSetting.theme);

  // 是否是移动端
  const getIsMobile = computed(() => projectSetting.isMobile);

  const changeTheme = (type: boolean) => {
    projectSetting.changeTheme(type);
  };

  const changeLocale = (locale: string) => {
    projectSetting.locale = locale;
  };

  // 设置移动端
  const setIsMobile = (isMobile: boolean) => {
    projectSetting.setIsMobile(isMobile);
  };

  return {
    getNavMode,
    getLocales,
    getLocale,
    getTheme,
    getIsMobile,
    getIsPageAnimate,
    getPageAnimateType,
    getHeaderSetting,
    getMenuSetting,
    changeTheme,
    changeLocale,
    setIsMobile,
  };
}
