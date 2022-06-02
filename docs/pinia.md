<!--
 * @Author: 周顺顺 idioticzhou@foxmail.com
 * @Date: 2022-05-09 15:14:25
 * @LastEditors: 周顺顺 idioticzhou@foxmail.com
 * @LastEditTime: 2022-05-09 15:17:08
 * @FilePath: /DWB-front/docs/pinia.md
 * @Description: 状态管理的相关文档
 * 
-->

### pinia的规范

- 导入导出统一走`src/store/index.ts`
- 推荐导出函数以`useXxxxXxxx`方式，例如`useUserStore`

示例代码：
```typescript
// index.ts
import { createPinia } from 'pinia';
import { App } from 'vue';
import { UserStore } from './modules/user';

export const store = createPinia();

export const setupStore = (app: App<Element>) => {
  app.use(store);
};

// 所有的Store模块统一收集并导出
export const useUserStore = () => UserStore(store);


// modules/user.ts
import { defineStore } from 'pinia';

export const UserStore = defineStore({
  id: 'user',
  state: () => ({
    username: '',
  }),
  getters: {
    UserName(): string {
      return this.username || '';
    },
  },
  actions: {
    async setUserName(username: string) {
      this.username = username;
    },
  },
});


```
