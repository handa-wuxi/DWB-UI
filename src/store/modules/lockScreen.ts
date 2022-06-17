import { defineStore } from 'pinia';
import { storage } from '@/utils/Storage';
import { GlobalStoreEnum } from '@/enums/global';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const isLock = storage.get(GlobalStoreEnum.IsLockScreen, false);

export type LockScreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const LockScreenStore = defineStore({
  id: 'lockScreen',
  state: (): LockScreenState => ({
    isLock: isLock === true, // 是否锁屏
    lockTime: isLock === 'true' ? initTime : 0,
  }),
  actions: {
    setLock(payload) {
      this.isLock = payload;
      storage.set(GlobalStoreEnum.IsLockScreen, this.isLock);
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload;
    },
  },
});
