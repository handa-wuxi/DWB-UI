## [0.3.2](https://github.com/handa-wuxi/DWB-UI/compare/v0.3.1...v0.3.2) (2022-07-07)


### ✨ Features

* **MenuSettings:** 🌟 完善菜单管理，新增菜单功能以及接口调用 ([0aaf359](https://github.com/handa-wuxi/DWB-UI/commit/0aaf359)) by: **周顺顺**


### 🐛 Bug Fixes

* **git File:** 🐛 删除自动生成的声明文件 ([04eb994](https://github.com/handa-wuxi/DWB-UI/commit/04eb994)) by: **周顺顺**



## [0.3.1](https://github.com/handa-wuxi/DWB-UI/compare/v0.3.0...v0.3.1) (2022-06-22)


### 🎫 Chores

* **release:** 🐳 v0.3.1 ([6d4984f](https://github.com/handa-wuxi/DWB-UI/commit/6d4984f)) by: **周顺顺**


### 🐛 Bug Fixes

* **assetsFile:** 🐛 新增getAssetsFile函数解决动态资源加载问题 ([fc1bef9](https://github.com/handa-wuxi/DWB-UI/commit/fc1bef9)) by: **周顺顺**
* **lockScreen:** 🐛 修复锁屏页相关字段结构错误的问题 ([cfade5a](https://github.com/handa-wuxi/DWB-UI/commit/cfade5a)) by: **周顺顺**


### 📝 Documentation

* **.gitignore:** 📝 将`components.d.ts`加入到忽略列表 ([577d5b2](https://github.com/handa-wuxi/DWB-UI/commit/577d5b2)) by: **周顺顺**



# [0.3.0](https://github.com/handa-wuxi/DWB-UI/compare/v0.2.0...v0.3.0) (2022-06-22)


### ✨ Features

* **login:** 🌟 调整响应式布局样式 ([f8adb4a](https://github.com/handa-wuxi/DWB-UI/commit/f8adb4a)) by: **周顺顺**
* **login:** 🌟 完成登录页翻译、api调整登出等功能 ([f0a73ce](https://github.com/handa-wuxi/DWB-UI/commit/f0a73ce)) by: **周顺顺**
* **login:** 🌟 login页面开发以及功能编写 ([cb9673a](https://github.com/handa-wuxi/DWB-UI/commit/cb9673a)) by: **周顺顺**


### 🎫 Chores

* **release:** 🐳 v0.3.0 ([5e965d1](https://github.com/handa-wuxi/DWB-UI/commit/5e965d1)) by: **周顺顺**


### 🐛 Bug Fixes

* **basicTable:** 🐛 修复固定列时，宽度问题 ([668c188](https://github.com/handa-wuxi/DWB-UI/commit/668c188)) by: **周顺顺**



# [0.2.0](https://github.com/handa-wuxi/DWB-UI/compare/v0.1.0...v0.2.0) (2022-06-21)


### ✨ Features

* **env:** 🌟 删除生产环境配置 ([f91a7e0](https://github.com/handa-wuxi/DWB-UI/commit/f91a7e0)) by: **周顺顺**
* **env:** 🌟 删除生产环境配置 ([c846006](https://github.com/handa-wuxi/DWB-UI/commit/c846006)) by: **周顺顺**
* **gitingron:** 🌟 生产环境配置添加如忽略名单 ([8e65ec0](https://github.com/handa-wuxi/DWB-UI/commit/8e65ec0)) by: **周顺顺**
* **gitingron:** 🌟 生产环境配置添加如忽略名单 ([d112669](https://github.com/handa-wuxi/DWB-UI/commit/d112669)) by: **周顺顺**
* **roleSetting:** 🌟 角色设置页面功能开发 ([c823116](https://github.com/handa-wuxi/DWB-UI/commit/c823116)) by: **周顺顺**
* **roleSetting:** 🌟 新增角色设置部分功能 ([086b175](https://github.com/handa-wuxi/DWB-UI/commit/086b175)) by: **周顺顺**


### 🎫 Chores

* **release:** 🐳 v0.2.0 ([168275b](https://github.com/handa-wuxi/DWB-UI/commit/168275b)) by: **周顺顺**


### 🐛 Bug Fixes

* **i18n:** 🐛 顶层await 兼容性问题，改用传递参数方式处理I18n ([c523e97](https://github.com/handa-wuxi/DWB-UI/commit/c523e97)) by: **周顺顺**
* **i18n:** 🐛 修复i18n切换相关的问题 ([fc7f88a](https://github.com/handa-wuxi/DWB-UI/commit/fc7f88a)) by: **周顺顺**
* **locale:** 🐛 拆分初始化I18n的功能，降低函数间耦合 ([51f5bc0](https://github.com/handa-wuxi/DWB-UI/commit/51f5bc0)) by: **周顺顺**
* **locale:** 🐛 修正默认的locale，避免新环境出错 ([1b6c963](https://github.com/handa-wuxi/DWB-UI/commit/1b6c963)) by: **周顺顺**
* **roleSetting:** 🐛 新增消息提醒 ([b1f3a98](https://github.com/handa-wuxi/DWB-UI/commit/b1f3a98)) by: **周顺顺**


### 📝 Documentation

* **locale:** 📝 翻译包补充 ([bbac100](https://github.com/handa-wuxi/DWB-UI/commit/bbac100)) by: **周顺顺**
* **userSetting:** 📝 调整函数名称`genColumns`=>`genUserColumns` ([b194ded](https://github.com/handa-wuxi/DWB-UI/commit/b194ded)) by: **周顺顺**



# [0.1.0](https://github.com/handa-wuxi/DWB-UI/compare/v0.0.1...v0.1.0) (2022-06-17)


### ⚡ Performance Improvements

* **typescript:** 🚀 尽可能去除any，但是组件相关泛型需要any，所以无法完全去除 ([efc8825](https://github.com/handa-wuxi/DWB-UI/commit/efc8825)) by: **周顺顺**


### ✨ Features

* **BasicTable:** 🌟 封装基础表格组件 ([af4dfc9](https://github.com/handa-wuxi/DWB-UI/commit/af4dfc9)) by: **周顺顺**
* **basicTable:** 🌟 基础表格计算屏幕熟悉 自适应高度 ([bd5e659](https://github.com/handa-wuxi/DWB-UI/commit/bd5e659)) by: **周顺顺**
* **basicTable:** 🌟 基础表格相关功能完善 ([5800e4b](https://github.com/handa-wuxi/DWB-UI/commit/5800e4b)) by: **周顺顺**
* **component:** 🌟 配置全局通知类组件 ([2d09adc](https://github.com/handa-wuxi/DWB-UI/commit/2d09adc)) by: **Zhoushunshun541**
* **header tabs:** 🌟 重新调整header组件和tabs ([435e063](https://github.com/handa-wuxi/DWB-UI/commit/435e063)) by: **Zhoushunshun541**
* **locale:** 🌟 重新调整自动读取文件的设置 ([653251b](https://github.com/handa-wuxi/DWB-UI/commit/653251b)) by: **Zhoushunshun541**
* **menu:** 🌟 补充基础路由页，配置loadingBar ([71f2855](https://github.com/handa-wuxi/DWB-UI/commit/71f2855)) by: **Zhoushunshun541**
* **menuSetting:** 🌟  菜单页功能开发 ([4276ce7](https://github.com/handa-wuxi/DWB-UI/commit/4276ce7)) by: **Zhoushunshun541**
* **tabView:** 🌟 tabView组件开发 ([f3f965b](https://github.com/handa-wuxi/DWB-UI/commit/f3f965b)) by: **Zhoushunshun541**
* **TipIcon:** 🌟 封装带有tip提示的图表组件 ([7d5e9da](https://github.com/handa-wuxi/DWB-UI/commit/7d5e9da)) by: **周顺顺**
* **user Settings:** 🌟 完善用户管理页面，对接真实数据 ([d22f4f8](https://github.com/handa-wuxi/DWB-UI/commit/d22f4f8)) by: **周顺顺**
* **userSettings:** 🌟 补充用户设置页面 ([3b3ccd1](https://github.com/handa-wuxi/DWB-UI/commit/3b3ccd1)) by: **周顺顺**
* **useSetting:** 🌟 用户设置页开发 ([0c27bf4](https://github.com/handa-wuxi/DWB-UI/commit/0c27bf4)) by: **周顺顺**


### 🎫 Chores

* **release:** 🐳 v0.1.0 ([c29105c](https://github.com/handa-wuxi/DWB-UI/commit/c29105c)) by: **周顺顺**


### 🐛 Bug Fixes

* **axios:** 🐛 生产环境请求地址修正 ([b58f987](https://github.com/handa-wuxi/DWB-UI/commit/b58f987)) by: **周顺顺**
* **axios:** 🐛 修复重置密码的地址错误问题 ([38973f9](https://github.com/handa-wuxi/DWB-UI/commit/38973f9)) by: **周顺顺**
* **configFile:** 🐛 修正生产环境网络请求配置 ([a16e4d4](https://github.com/handa-wuxi/DWB-UI/commit/a16e4d4)) by: **周顺顺**
* **header:** 🐛 更改hooks ([38cebe5](https://github.com/handa-wuxi/DWB-UI/commit/38cebe5)) by: **Zhoushunshun541**
* **locale:** 🐛 补充缺失的国际化选项 ([43cde28](https://github.com/handa-wuxi/DWB-UI/commit/43cde28)) by: **周顺顺**
* **LockScreen:** 🐛 处理国际化翻译和文件目录问题 ([7ca8d89](https://github.com/handa-wuxi/DWB-UI/commit/7ca8d89)) by: **Zhoushunshun541**
* **lockScreen:** 🐛 修改代码格式，使用`setup`语法糖 ([366d322](https://github.com/handa-wuxi/DWB-UI/commit/366d322)) by: **周顺顺**
* **Mock => Server:** 🐛 去除mock数据  对接测试服务器数据 ([6e19eeb](https://github.com/handa-wuxi/DWB-UI/commit/6e19eeb)) by: **周顺顺**
* **TabViews:** 🐛 修复主题切换的bug ([540fd11](https://github.com/handa-wuxi/DWB-UI/commit/540fd11)) by: **周顺顺**


### 💄 Styles

* **layout content:** 🌈 调整基础布局整体页面的背景色 ([46116f9](https://github.com/handa-wuxi/DWB-UI/commit/46116f9)) by: **Zhoushunshun541**
* **layout:** 🌈 修正基础布局的`tabView`层级以及layout content高度问题 ([0891463](https://github.com/handa-wuxi/DWB-UI/commit/0891463)) by: **周顺顺**
* **transition:** 🌈 配置页面切换的过渡效果以及配置windicss ([a7235ca](https://github.com/handa-wuxi/DWB-UI/commit/a7235ca)) by: **周顺顺**


### 📝 Documentation

* **菜单设置:** 📝 完成页面文字翻译工作 ([2395ec0](https://github.com/handa-wuxi/DWB-UI/commit/2395ec0)) by: **Zhoushunshun541**
* **locale:** 📝 翻译包补充 ([30fc7ce](https://github.com/handa-wuxi/DWB-UI/commit/30fc7ce)) by: **周顺顺**



## [0.0.1](https://github.com/handa-wuxi/DWB-UI/compare/f3488c7...v0.0.1) (2022-06-09)


### 🎫 Chores

* **release:** 🐳 v0.0.1 ([55569de](https://github.com/handa-wuxi/DWB-UI/commit/55569de)) by: **Zhoushunshun541**


### 🐛 Bug Fixes

* **changelog:** 🐛 调整`release-it`配置 ([46eb176](https://github.com/handa-wuxi/DWB-UI/commit/46eb176)) by: **Zhoushunshun541**
* **commitLint:** 调整git提交规范,将`emoji`调整到`scope`后面,调整`CHANGELOG.md`模板 ([0eab2f1](https://github.com/handa-wuxi/DWB-UI/commit/0eab2f1)) by: **Zhoushunshun541**


* 🌟feat(layout sider): 补充侧边栏,菜单,以及相应的mock数据 ([f3488c7](https://github.com/handa-wuxi/DWB-UI/commit/f3488c7)) by: **Zhoushunshun541**


### BREAKING CHANGES

* 完成基础布局,补充mock数据



