/* eslint-disable no-bitwise */
import {
  computed, onMounted, reactive, toRefs,
} from 'vue';

interface Battery {
  charging: boolean; // 当前电池是否正在充电
  chargingTime: number; // 距离充电完毕还需多少秒，如果为0则充电完毕
  dischargingTime: number; // 代表距离电池耗电至空且挂起需要多少秒
  level: number; // 代表电量的放大等级，这个值在 0.0 至 1.0 之间
  onChargingChange: (args: { target: Battery }) => void; // 当电池状态发生变化时触发
  onChargingTimeChange: (args: { target: Battery }) => void; // 当电池充电时间发生变化时触发
  onDisChargingTimeChange: (args: { target: Battery }) => void; // 当电池耗电时间发生变化时触发
  onLevelChange: (args: { target: Battery }) => void; // 当电池电量发生变化时触发
}

export const useBattery = (t) => {
  const state = reactive({
    battery: {
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 100,
    },
  });

  // 更新电池使用状态
  const updateBattery = (target) => {
    Object.keys(state.battery).forEach((key) => {
      state.battery[key] = target[key];
    });
    state.battery.level *= 100;
  };

  // 计算电池剩余可用时间
  const calcDischargingTime = computed(() => {
    const hour = state.battery.dischargingTime / 3600;
    const minute = (state.battery.dischargingTime / 60) % 60;
    return t('lockScreen.batteryTime', [~~hour, ~~minute]);
  });

  // 计算电池充满剩余时间
  const calcChargingTime = computed(() => {
    const hour = state.battery.chargingTime / 3600;
    const minute = (state.battery.chargingTime / 60) % 60;
    return t('lockScreen.batteryTime', [~~hour, ~~minute]);
  });

  // 电池状态
  const batteryStatus = computed(() => {
    if (state.battery.charging && state.battery.level >= 100) {
      return t('lockScreen.batteryState[1]');
    } if (state.battery.charging) {
      return t('lockScreen.batteryState[0]');
    }
    return t('lockScreen.batteryState[2]');
  });

  onMounted(async () => {
    const BatteryManager: Battery = await (window.navigator as any).getBattery();
    updateBattery(BatteryManager);

    // 电池充电状态更新时被调用
    BatteryManager.onChargingChange = ({ target }) => {
      updateBattery(target);
    };
    // 电池充电时间更新时被调用
    BatteryManager.onChargingTimeChange = ({ target }) => {
      updateBattery(target);
    };
    // 电池断开充电时间更新时被调用
    BatteryManager.onDisChargingTimeChange = ({ target }) => {
      updateBattery(target);
    };
    // 电池电量更新时被调用
    BatteryManager.onLevelChange = ({ target }) => {
      updateBattery(target);
    };

    // new Intl.DateTimeFormat('zh', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false
    // }).format(new Date())
  });

  return {
    ...toRefs(state),
    batteryStatus,
    calcDischargingTime,
    calcChargingTime,
  };
};
