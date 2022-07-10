<template>
  <div class="home-wrapper">
    <n-grid
      cols="2 s:2 m:2 l:4 xl:4 2xl:4"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item span="0 s:0 m:0 l:1 xl:1 2xl:1">
        <Personnel class="mb-2" />
        <Efficiency class="mb-2" />
        <Shipment />
      </n-grid-item>
      <n-grid-item :span="2">
        <Finance />
      </n-grid-item>
      <n-grid-item span="1 s:1 m:1 l:0 xl:0 2xl:0">
        <Personnel class="mb-2" />
        <Efficiency class="mb-2" />
        <Shipment />
      </n-grid-item>
      <n-grid-item>
        <Personnel />
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts" setup name="AdminHome">
import {
  Personnel, Efficiency, Shipment, Finance,
} from './components';

</script>
