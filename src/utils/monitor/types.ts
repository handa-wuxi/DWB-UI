export type ErrorType = 'JSError' | 'PromiseError' | 'ResourceError' | 'RequestError' | 'WhiteScreen' | 'LongTask' | 'PV/UV';

export interface UserAgent {
  browserName: string // 浏览器名称
  browserVersion: string // 浏览器版本
  osName: string // 操作系统名称
  osVersion: string // 操作系统版本
  deviceName: string // 设备名称
}

export interface Collect {
    title?: string, // 页面标题
    url?: string, // 页面URL
    timestamp?: string | number, // 访问时间戳
    userAgent?: UserAgent, // 用户浏览器类型
    errorType?: string, // 错误类型
}

export interface JSError extends Collect {
  message?: string, // 类型详情
  filename?: string, // 访问的文件名
  position?: string, // 行列信息
  stack?: string, // 堆栈信息
  selector?: string // 选择器
}

export interface PromiseError extends Collect{
  message?: string, // 类型详情
  stack?: string, // 堆栈信息
  selector?: string, // 选择器
  baseURL?: string, // axios异常的基础地址
  requestURL?: string,
  methods?: string,
  data?: RawObject
  params?: RawObject
}

export interface ResourceError extends Collect{
  filename?: string, // 访问的文件名
  tagName?: string, // 标签名
  timeStamp?: string | number, // 时间
}

export interface LongTaskError extends Collect{
  eventType: string,
  startTime: number,
  duration: number,
  selector?: string, // 选择器
}

export type MsgError = JSError | PromiseError | ResourceError

export interface MonitorEvent{
  (msg: MsgError):void
}
