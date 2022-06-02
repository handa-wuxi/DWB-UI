<template>
  {{ t('global.lang') }}
  <n-button @click="toAuth">
    去授权
  </n-button>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();

function toAuth() {
  router.push({
    name: 'authorization',
  });
}
</script>
