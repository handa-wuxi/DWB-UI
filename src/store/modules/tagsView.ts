import { defineStore } from 'pinia';
import { RouterRecord } from '@/router/types';

interface TagsViewState {
  tags: RouterRecord[];
  currentTagIndex: number;
}

export const TagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    tags: [],
    currentTagIndex: 0,
  }),
  getters: {
    getTags(): any[] {
      return this.tags;
    },
  },
  actions: {
    addTag(tag: RouterRecord): void {
      this.tags.push(tag);
    },
    removeTagByIndex(index: number): void {
      this.tags.splice(index, 1);
    },
  },
});
