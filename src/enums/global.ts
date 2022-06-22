/* eslint-disable no-unused-vars */
export enum GlobalStoreEnum {
  // 标签页
  TabRoutes = 'TABS-ROUTES',
  // 是否锁屏
  IsLockScreen = 'IS-LOCK-SCREEN',
  // 首页默认跳转路由
  HomeDefaultRoute = '/login',

  // 首页
  BaseHome = '/admin/home',

  BaseLoginName = 'Login',
  RedirectName = 'Redirect',
  ErrorPageName = 'ErrorPage',
  AccessToken = 'ACCESS-TOKEN',
  CurrentUser = 'CURRENT-USER', // 当前用户信息
  Remember = 'REMEMBER', // 是否记住密码
}
