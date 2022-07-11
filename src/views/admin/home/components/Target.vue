<template>
  <n-card class="enter-y">
    <template #header>
      本部完成及目标
    </template>
    <div class="target-body">
      <div
        class="line-chart-wrapper flex justify-between"
        w="100%"
        h="200px"
      >
        <div>总接单</div>
        <div>生产件数</div>
      </div>
      <div
        ref="chartRef"
        w="100%"
        h="200px"
        class="mt-2"
      />
      <div
        w="100%"
        h="200px"
        class="quarter mt-2"
      >
        <div class="target-header flex">
          <div
            w="60px"
            class="flex-shrink-0"
          />
          <div
            v-for="i in 4"
            :key="i"
            w="[calc(25%-13px)]"
          >
            {{ i }}本部
          </div>
        </div>
        <div class="target-body">
          <div
            v-for="item in targets"
            :key="item.name"
            class="flex items-center"
          >
            <span
              w="50px"
              class="flex-shrink-0"
            >{{ item.name }}</span>
            <n-progress
              w="![calc(25%-13px)]"
              type="line"
              :percentage="genNum()"
              indicator-placement="inside"
            />
            <n-progress
              w="![calc(25%-13px)]"
              type="line"
              :percentage="genNum()"
              indicator-placement="inside"
            />
            <n-progress
              w="![calc(25%-13px)]"
              type="line"
              :percentage="genNum()"
              indicator-placement="inside"
            />
            <n-progress
              w="![calc(25%-13px)]"
              type="line"
              :percentage="genNum()"
              indicator-placement="inside"
            />
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/event/useEcharts';

const { useLineChart } = useEcharts();
const chartRef = ref();

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['实际', '目标'],
    right: 10,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['一本部', '二本部', '三本部', '四本部'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '实际',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [120, 132, 101, 134],
    },
    {
      name: '目标',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [220, 182, 191, 234],
    },
  ],
};

const targets = [
  {
    name: '一本部',
  },
  {
    name: '二本部',

  },
  {
    name: '三本部',

  },
  {
    name: '四本部',

  },
];

function genNum() {
  return (Math.random() * 100).toFixed(1);
}
onMounted(() => {
  useLineChart(chartRef.value, options);
});
</script>
