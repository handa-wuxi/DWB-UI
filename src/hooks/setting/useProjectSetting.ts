import { computed } from 'vue';
import { useProjectSettingStore } from '@/store';

export function useProjectSetting() {
  const projectSetting = useProjectSettingStore();

  const getNavMode = computed(() => projectSetting.navMode);

  // 导航风格
  const getNavTheme = computed(() => projectSetting.navTheme);

  // 语言包列表
  const getLocales = computed(() => projectSetting.locales);

  // 当前语言
  const getLocale = computed(() => projectSetting.locale);

  const getCrumbsSetting = computed(() => projectSetting.crumbsSetting);

  const getIsPageAnimate = computed(() => projectSetting.isPageAnimate);

  const getPageAnimateType = computed(() => projectSetting.pageAnimateType);

  // 多标签
  const getMultiTabsSetting = computed(() => projectSetting.multiTabsSetting);

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
    getNavTheme,
    getLocale,
    getTheme,
    getIsMobile,
    getCrumbsSetting,
    getMultiTabsSetting,
    getIsPageAnimate,
    getPageAnimateType,
    getHeaderSetting,
    getMenuSetting,
    changeTheme,
    changeLocale,
    setIsMobile,
  };
}
