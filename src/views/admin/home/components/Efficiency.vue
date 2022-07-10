<template>
  <n-card class="enter-y">
    <template #header>
      <n-tabs
        type="line"
        animated
        @update:value="changeTab"
      >
        <n-tab-pane
          name="customer"
          :tab="t('admin.global.efficiencyCustomer')"
        />
        <n-tab-pane
          name="style"
          :tab="t('admin.global.efficiencyDesign')"
        />
      </n-tabs>
    </template>
    <div
      ref="chartRef"
      w="100%"
      h="260px"
    />
  </n-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/event/useEcharts';

const { t } = useI18n();
const chartRef = ref();
const option: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    right: 'right',
    top: 'center',
  },
  series: [
    {
      name: 'eff',
      type: 'pie',
      radius: '60%',
      center: ['30%', '50%'],
      labelLine: {
        show: false,
      },
      label: {
        show: false,
      },
      data: [
        { value: 1048, name: '中国恒博' },
        { value: 735, name: '云南工厂' },
        { value: 580, name: '缅甸工厂' },
        { value: 484, name: '埃及工厂' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
const changeTab = (name: string) => {
  console.log(name);
};

onMounted(() => {
  const { usePieChart } = useEcharts();
  usePieChart(chartRef.value, option);
});
</script>
