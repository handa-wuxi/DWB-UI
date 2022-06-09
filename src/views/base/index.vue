<template>
  <div>
    {{ t('global.lang') }}
    <NButton @click="toAuth">
      去授权
    </NButton>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const router = useRouter();

function toAuth() {
  router.push({
    name: 'authorization',
  });
}
</script>
