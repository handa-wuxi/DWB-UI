import { injectJsError, injectPromiseError } from './jsError';
import { injectLongTask } from './longTask';
import { MonitorEvent, MsgError } from './types';

class Monitor {
  cb: (msg: MsgError) => void;

  constructor(callback: MonitorEvent) {
    this.cb = callback;
    injectJsError(this.cb);
    injectPromiseError(this.cb);
    injectLongTask(this.cb);
  }
}

export default Monitor;
