<template>
  <svg
    class="icon"
    :style="{ fontSize: size }"
    aria-hidden="true"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>
<script setup lang="ts" name="SvgIcon">
defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '1.2rem',
  },
});
</script>
