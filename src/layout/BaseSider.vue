<template>
  <div class="logo-wrapper">
    <img
      class="logo-anime"
      :class="'logo' + (!collapsed? '-text' : '') "
      :src="logo"
    >
  </div>
  <n-menu
    :collapsed="collapsed"
    :options="options"
    :collapsed-width="64"
    :collapsed-icon-size="22"
  />
</template>
<script  setup lang="ts">
import { computed, ref, watch } from 'vue';
import logoImg from '../assets/logo/logo.png';
import logoTextImg from '../assets/logo/logo-text.png';

const props = defineProps({
  menuOptions: {
    type: Array,
    default: () => [],
  },
  collapsed: {
    type: Boolean,
  },
});

const logo = ref('');

const options = computed(() => props.menuOptions);

watch(() => props.collapsed, (v) => {
  logo.value = v ? logoImg : logoTextImg;
}, {
  immediate: true,
});

</script>
<style lang="less" scoped>
.logo-wrapper{
  height: 60px;
  transition: justify-content 1s;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-anime{
    transition: all 0.5s;
  }
  .logo-text{
    width: 200px;
    height: 60px;
  }
  .logo{
    width: 48px;
    height: 48px;
  }
}

</style>
