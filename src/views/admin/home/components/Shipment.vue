<template>
  <n-card class="enter-y">
    <template #header>
      出货情况
    </template>
    <div
      w="100%"
      h="355px"
    >
      <div class="header flex w-[100%]">
        <div w="60px">
          工厂
        </div>
        <div w="[calc(100%-60px)]">
          出厂占比
        </div>
      </div>
      <div
        v-for="item in list"
        :key="item.name"
        class="body flex mt-2 items-center w-[100%]"
      >
        <div w="60px">
          {{ item.name }}
        </div>
        <div w="[calc(100%-60px)]">
          <n-progress
            type="line"
            :stroke-width="10"
            class="progress-wrapper"
            :percentage="item.percent"
          />
        </div>
      </div>
    </div>
  </n-card>
</template>
<script setup lang="ts">
const list = [
  {
    name: '中国恒博',
    percent: 89.88,
  },
  {
    name: '云南工厂',
    percent: 65,
  },
  {
    name: '缅甸工厂',
    percent: 81.21,
  },
  {
    name: '埃及工厂',
    percent: 93.12,
  },
  {
    name: '合计',
    percent: 120,
  },
];
</script>
<style lang="less" scoped>
.progress-wrapper {
  :deep(.n-progress-icon--as-text){
    text-align: right !important;
    width: 60px !important;
  }
}
</style>
