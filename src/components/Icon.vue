<template>
  <svg
    class="icon"
    :style="{ fontSize: size }"
    aria-hidden="true"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '14px',
  },
});
</script>
