// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
import { LineChart, PieChart, BarChart } from 'echarts/charts';
import {
  GridComponent, TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts';
import { VueElement, onUnmounted } from 'vue';

// 注册必须的组件
echarts.use([
  LabelLayout,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  UniversalTransition,
  CanvasRenderer,
]);

export const useEcharts = () => {
  const chartInit = (inst: VueElement, data: EChartsOption) => {
    const myChart = echarts.init(inst);
    myChart.setOption(data);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    onUnmounted(() => {
      myChart.dispose();
    });
  };

  const useLineChart = (inst:VueElement, data: EChartsOption) => {
    echarts.use([LineChart]);
    chartInit(inst, data);
  };

  // 饼图
  const usePieChart = (inst: VueElement, data: EChartsOption) => {
    echarts.use([PieChart]);
    chartInit(inst, data);
  };

  const useLineAndBarChart = (inst: VueElement, data: EChartsOption) => {
    echarts.use([LineChart, BarChart]);
    chartInit(inst, data);
  };

  return { useLineChart, usePieChart, useLineAndBarChart };
};

export const useGenMonths = () => {
  const months: string[] = [];
  for (let i = 1; i <= 12; i += 1) {
    months.push(`${i}月`);
  }
  return months;
};
