<template>
  <div
    class="base-header"
    :style="{height: props.height}"
  >
    <div class="base-space">
      <n-menu
        v-if="false"
        :options="options"
        mode="horizontal"
      />
      <Icon
        class="header-item"
        name="icon-shouqi"
        :class="gs.collapsed ? 'rote-icon' : '' "
        @click="changeMenu"
      />
      <div
        class="base-space"
      >
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
<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../store';
import Icon from '../components/Icon.vue';
import { i18n } from '../locales';

const gs = useGlobalStore();
const props = defineProps({
  height: {
    type: String,
    default: '50px',
  },
  menuOptions: {
    type: Array,
    default: () => [],
  },
});

const localeLabel = ref('中文');

const { locales } = storeToRefs(gs);

const options = computed(() => props.menuOptions);

function changeMenu() {
  gs.changeCollapsed();
}

function handleSelect(key: string) {
  localeLabel.value = locales.value.filter((item) => item.key === key)[0].label;
  i18n.global.locale = key;
  gs.locale = key;
}

</script>
<style lang="less">
.base-header {

  .base-space {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .n-switch__button-icon {
    font-size: 26px !important;
  }
  .icon{
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s;
  }
  .rote-icon{
    transform: rotate(180deg);
  }
}
</style>
