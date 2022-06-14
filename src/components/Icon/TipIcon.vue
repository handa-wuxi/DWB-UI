<template>
  <n-tooltip
    v-bind="$attrs"
  >
    <template #trigger>
      <n-icon
        :size="iconSize"
        class="hover:text-[#3c9bff]"
      >
        <slot />
      </n-icon>
    </template>
    <span>{{ tip }}</span>
  </n-tooltip>
</template>
<script setup lang="ts" name="TipIcon">
defineProps({
  tip: {
    type: String,
    default: '',
  },
  iconSize: {
    type: String,
    default: '20',
  },
});

</script>
