<template>
  <div
    class="layout-header"
    :style="{height: height}"
  >
    <!-- 顶部菜单 -->
    <div v-if="navMode === 'horizontal'" />
    <!-- 左侧菜单 -->
    <div
      v-else
      class="layout-header-left flex justify-between"
    >
      <div
        class=" base-space ml-[8px] flex inline-flex"
        @click="emit('update:collapsed', !collapsed)"
      >
        <Icon
          size="20px"
          name="icon-shouqi"
          :class="collapsed ? 'rote-icon' : '' "
        />
      </div>

      <div class="base-space mr-[8px] flex inline-flex">
        <Icon
          size="20px"
          class="mx-[8px]"
          name="icon-quanping"
        />
        <NDropdown
          trigger="hover"
          :options="locales"
          @select="handleSelect"
        >
          <span class="w-65px mx-[8px] text-center">{{ localeLabel }}</span>
        </NDropdown>
        <n-avatar
          class="mx-[8px]"
          round
        >
          admin
        </n-avatar>
        <Icon
          class="mx-[8px]"
          size="20px"
          name="icon-shezhi"
          @click="showSetting"
        />
      </div>
    </div>
  </div>
  <!-- 项目配置 -->
  <ProjectSetting ref="drawerSetting" />
</template>
<script setup lang="ts" name="PageHeader">
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import { i18n } from '@/locales';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import ProjectSetting from './ProjectSetting.vue';

const emit = defineEmits(['update:collapsed']);
const { getNavMode, getLocales } = useProjectSetting();
const drawerSetting = ref<InstanceType<typeof ProjectSetting>>();

defineProps({
  height: {
    type: String,
    default: '50px',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  menuOptions: {
    type: Array,
    default: () => [],
  },
});

const localeLabel = ref('中文');
const navMode = ref(getNavMode);
const locales = ref(getLocales);

// const options = computed(() => props.menuOptions);

function handleSelect(key: string) {
  localeLabel.value = locales.value.filter((item) => item.key === key)[0].label;
  i18n.global.locale = key;
}

function showSetting() {
  drawerSetting.value?.openDrawer();
}

</script>
<style lang="less">
.layout-header {

  &-left {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .base-space {
    height: 100%;
    align-items: center;
  }

  .n-switch__button-icon {
    font-size: 26px !important;
  }
  .icon{
    cursor: pointer;
    transition: all 0.3s;
  }
  .rote-icon{
    transform: rotate(180deg);
  }
}
</style>
