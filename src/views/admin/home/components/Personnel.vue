<template>
  <n-card class="enter-y">
    <template #header>
      {{ title }}
    </template>
    <div
      ref="chartRef"
      h="328px"
      w="100%"
    />
  </n-card>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { EChartsOption } from 'echarts';
import { ref, onMounted } from 'vue';
import { useEcharts, useGenMonths } from '@/hooks/event/useEcharts';

const { t } = useI18n();
const { useLineChart } = useEcharts();
const title = t('admin.global.employees');
const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['管理', '车工'],
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
    data: useGenMonths(),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '管理',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230],
    },
    {
      name: '车工',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330],
    },
  ],
};
const chartRef = ref();

onMounted(() => {
  useLineChart(chartRef.value, options);
});

</script>
