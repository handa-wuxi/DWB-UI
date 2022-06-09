<template>
  <div class="logo">
    <img
      src="~@/assets/logo/logo.png"
      alt=""
      :class="{ 'mr-2': !collapsed }"
    >
    <div
      v-show="!collapsed"
      class="title font-bold text-sky-700"
      :class="currentLocale === 'zh-CN'?'text-2xl':'text-sm'"
    >
      {{ t('global.companyName') }}
    </div>
  </div>
</template>
<script lang="ts" setup name="PageLogo">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t, locale } = useI18n();

const currentLocale = computed(() => locale.value);
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
