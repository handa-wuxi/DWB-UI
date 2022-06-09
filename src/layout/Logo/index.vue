<template>
  <div class="logo">
    <img
      src="~@/assets/logo/logo.png"
      alt=""
      :class="{ 'mr-2': !collapsed }"
    >
    <div
      v-show="!collapsed"
      class="title text-2xl font-bold text-sky-700"
    >
      {{ t('global.companyName') }}
    </div>
  </div>
</template>
<script lang="ts" setup name="PageLogo">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

</script>
<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    white-space: nowrap;

    img {
      width: auto;
      height: 40px;
    }

    .title {
      margin-bottom: 0;
    }
  }
</style>
