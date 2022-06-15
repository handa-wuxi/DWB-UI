import { LongTaskError } from './types';
import { getSelector, lastEvent } from './monitor';

export function injectLongTask(cb: (msg: LongTaskError) => void) {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        // requestIdleCallback 实验性功能  浏览器空闲的时候进行调用
        requestIdleCallback(() => {
          cb({
            title: '卡顿记录',
            errorType: 'longTask',
            eventType: lastEvent?.type as string,
            startTime: entry.startTime, // 开始时间
            duration: entry.duration, // 持续时间
            selector: lastEvent
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
              ? getSelector(lastEvent.path || lastEvent.target)
              : '',
          });
        });
      }
    });
  }).observe({ entryTypes: ['longtask'] });
}
