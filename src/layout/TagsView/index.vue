<template>
  <div class="tags-view my-[5px] ml-[10px] mr-[20px] w-[calc(100vw-230px)]">
    <NSpace>
      <NTag
        v-for="(item) in tags"
        :key="item.name"
        size="large"
        closable
        @close="handleClose"
      >
        {{ item.name }}
      </NTag>
    </NSpace>
  </div>
</template>
<script lang="ts" setup name="TagsView">
import { storeToRefs } from 'pinia';
import { useTagsViewStore } from '@/store';

const tagStore = useTagsViewStore();

const { tags } = storeToRefs(tagStore);

function handleClose() {
  console.log('del');
}
</script>
<style lang="less">
.tags-view{

}
</style>
