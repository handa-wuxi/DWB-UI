<template>
  <keep-alive
    :include="include"
    :exclude="exclude"
    :max="max"
  >
    <slot />
  </keep-alive>
</template>
<script setup lang="ts">
const include: string[] = [];
const exclude: string[] = [];
const max = 50;
</script>
