import { defineStore } from 'pinia';

export const RouterStore = defineStore({
  id: 'router',
  state: () => ({
    routes: [],
  }),
  actions: {
    getRoutes() {
      console.log(1);
    },
  },
});
