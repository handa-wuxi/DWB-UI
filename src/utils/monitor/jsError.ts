// @ts-nocheck
import { MsgError } from './types';
import { getSelector, getLines, lastEvent } from './monitor';

export function injectJsError(cb: (msg: MsgError) => void) {
  window.addEventListener('error', (event) => {
    // TODO 这里的类型  ts官方给的是比较宽泛的EventTarget类型，也许可以尝试贡献代码
    if (event.target && (event.target.src || event.target.href)) {
      const { target } = event;
      cb({
        title: '资源加载异常',
        errorType: 'ResourceError',
        filename: (target as HTMLImageElement).src || (target as HTMLLinkElement).href,
        tagName: (target as HTMLElement).tagName,
        timestamp: event.timeStamp,
        selector: getSelector(event.path || target),
      });
    } else {
      cb({
        title: 'js代码异常',
        errorType: 'jsError',
        message: event.error.message,
        filename: event.filename,
        position: `${event.lineno || 0}:${event.colno || 0}`, // 行列号
        stack: getLines(event.error.stack),
        selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : '', // css选择器
      });
    }
  }, true);
}

export function injectPromiseError(cb: (msg: MsgError) => void) {
  window.addEventListener('unhandledrejection', (event) => {
    let message = '';
    let file = '';
    let line = '';
    let column = '';
    let stack = '';
    if (typeof event.reason === 'string') {
      message = event.reason;
    } else if (typeof event.reason === 'object') {
      // axios请求异常
      if (event.reason.config && event.reason.name === 'AxiosError') {
        const {
          baseURL, url, method, data, params,
        } = event.reason.config;
        cb({
          // 未捕获的promise错误
          title: 'Axios请求异常',
          errorType: event.reason.name, // unhandledrejection
          baseURL,
          requestURL: url,
          method,
          data: JSON.parse(data),
          params,
          message: event.reason.response.data, // 标签名
          selector: lastEvent
            ? getSelector(lastEvent.path || lastEvent.target)
            : '',
          timeStamp: event.timeStamp,
        });
        return;
      }
      const { reason } = event;
      message = reason.message;
      if (reason.stack) {
        const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        if (matchResult) {
          [file, line, column] = matchResult;
        }
        stack = getLines(reason.stack);
      }
    }
    cb({
      // 未捕获的promise错误
      title: 'Promise异常',
      errorType: 'PromiseError', // unhandledrejection
      message, // 标签名
      filename: file,
      position: `${line}:${column}`, // 行列
      stack,
      selector: lastEvent
        ? getSelector(lastEvent.path || lastEvent.target)
        : '',
    });
  });
}
