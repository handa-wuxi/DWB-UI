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
        <n-switch
          :on-update:value="gs.changeTheme"
          rubber-band
          size="large"
          class="theme-switch"
        >
          <template #unchecked-icon>
            🌞
          </template>
          <template #checked-icon>
            🌚
          </template>
        </n-switch>
        <Icon
          class="header-item"
          name="icon-quanping"
        />
        <n-dropdown
          trigger="hover"
          :options="locales"
          @select="handleSelect"
        >
          <span class="header-item w-65px text-center">{{ localeLabel }}</span>
        </n-dropdown>
        <n-avatar
          class="space-x-8"
          round
        >
          admin
        </n-avatar>
        <Icon
          class="header-item"
          name="icon-shezhi"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="PageHeader">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/store';
import Icon from '@/components/Icon.vue';
import { i18n } from '@/locales';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

const emit = defineEmits(['update:collapsed']);
const { getNavMode } = useProjectSetting();

const navMode = ref(getNavMode);
const gs = useGlobalStore();
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

const { locales } = storeToRefs(gs);

// const options = computed(() => props.menuOptions);

function handleSelect(key: string) {
  localeLabel.value = locales.value.filter((item) => item.key === key)[0].label;
  i18n.global.locale = key;
  gs.locale = key;
}

</script>
<style lang="less">
.layout-header {

  &-left {
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
