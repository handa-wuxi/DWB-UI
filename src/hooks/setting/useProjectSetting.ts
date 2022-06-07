import { computed } from 'vue';
import { useProjectSettingStore } from '@/store';

export function useProjectSetting() {
  const projectSetting = useProjectSettingStore();

  const getNavMode = computed(() => projectSetting.navMode);

  return {
    getNavMode,
  };
}
