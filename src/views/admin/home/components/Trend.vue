<template>
  <n-card class="enter-y">
    <template #header>
      盈利趋势
    </template>
    <div
      ref="chartRef"
      w="100%"
      h="300px"
    />
  </n-card>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { onMounted, ref } from 'vue';
import { useEcharts, useGenMonths } from '@/hooks/event/useEcharts';

const { useLineAndBarChart } = useEcharts();
const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    data: ['去年', '今年', '去年增长', '今年增长'],
  },
  xAxis: [
    {
      type: 'category',
      data: useGenMonths(),
      name: '月份',
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '金额',
    },
    {
      type: 'value',
      name: '增长',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      name: '去年',
      type: 'bar',
      tooltip: {
        valueFormatter(value) {
          return `${value} ml`;
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: '今年',
      type: 'bar',
      tooltip: {
        valueFormatter(value) {
          return `${value} ml`;
        },
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: '去年增长',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter(value) {
          return `${value}`;
        },
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
    {
      name: '今年增长',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter(value) {
          return `${value}`;
        },
      },
      data: [1.0, 1.2, 1.3, 1.5, 1.3, 9.2, 10.3, 22.4, 22.0, 17.5, 11.0, 6.2],
    },
  ],
};

const chartRef = ref();

onMounted(() => {
  useLineAndBarChart(chartRef.value, options);
});

</script>
