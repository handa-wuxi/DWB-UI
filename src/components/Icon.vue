<template>
  <svg
    class="icon"
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
});
</script>
