<template>
  <div class="tabs-view my-[5px] ml-[10px] mr-[20px] w-[calc(100vw-230px)]">
    <NSpace>
      <NTag
        v-for="(item) in tabs"
        :key="item.name"
        size="large"
        closable
        :checked="item.fullPath === state.activeKey"
        class="cursor-pointer"
        :color=" {
          textColor: `var(${ item.fullPath === state.activeKey
            ? '--n-color-checked' : '--n-text-color-checkable' })`,
        } "
        @close="handleClose"
        @click.stop="toggleTab(item.fullPath as string)"
        @contextmenu="handleContextMenu($event, item)"
      >
        {{ item.name }}
      </NTag>
    </NSpace>
    <n-dropdown
      :show="state.showDropdown"
      :x="state.dropdownX"
      :y="state.dropdownY"
      placement="bottom-start"
      :options="TabsMenuOptions"
      @clickoutside="onClickOutside"
      @select="closeHandleSelect"
    />
  </div>
</template>
<script lang="ts" setup name="TabsView">
import { storeToRefs } from 'pinia';
import {
  computed, nextTick, onMounted, reactive, ref, unref, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ReloadOutlined, CloseOutlined, ColumnWidthOutlined, MinusOutlined,
} from '@vicons/antd';
import { useTabsViewStore } from '@/store';
import { storage } from '../../utils/Storage';
import { GlobalStoreEnum } from '@/enums/global';
import { RouteItem } from '@/router/types';
import { renderIcon } from '@/utils/renderMenu';

const tabStore = useTabsViewStore();

const route = useRoute();
const router = useRouter();
const { tabs } = storeToRefs(tabStore);
const isCurrent = ref(false);

const state = reactive({
  activeKey: route.fullPath,
  dropdownX: 0,
  dropdownY: 0,
  showDropdown: false,
});

function handleClose() {
  console.log('del');
}

function toggleTab(fullPath: string) {
  router.push(fullPath);
}

function handleContextMenu(e, item) {
  e.preventDefault();
  isCurrent.value = GlobalStoreEnum.HomeDefaultRoute === item.path;
  state.showDropdown = false;
  nextTick().then(() => {
    state.showDropdown = true;
    state.dropdownX = e.clientX;
    state.dropdownY = e.clientY;
  });
}

// 刷新页面
const reloadPage = () => {
  router.push({
    path: `/redirect${unref(route).fullPath}`,
  });
};

// tab 操作
const closeHandleSelect = (key) => {
  switch (key) {
    // 刷新
    case '1':
      reloadPage();
      break;
      // 关闭
    case '2':
      reloadPage();

      break;
      // 关闭其他
    case '3':
      reloadPage();

      break;
      // 关闭所有
    case '4':
      reloadPage();

      break;
    default:
      break;
  }

  state.showDropdown = false;
};

function onClickOutside() {
  state.showDropdown = false;
}

// tags 右侧下拉菜单
const TabsMenuOptions = computed(() => {
  const isDisabled = unref(tabs).length <= 1;
  return [
    {
      label: '刷新当前',
      key: '1',
      icon: renderIcon(ReloadOutlined),
    },
    {
      label: '关闭当前',
      key: '2',
      disabled: unref(isCurrent) || isDisabled,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭其他',
      key: '3',
      disabled: isDisabled,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭全部',
      key: '4',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined),
    },
  ];
});

// 获取简易的路由对象
const getSimpleRoute = (currentRoute): RouteItem => {
  const {
    fullPath, meta, hash, name, params, path, query,
  } = currentRoute;
  return {
    fullPath, meta, hash, name, params, path, query,
  };
};

function init() {
  const list = storage.get(GlobalStoreEnum.TabRoutes, []);
  tabStore.initTabs(list);
}

init();

watch(
  () => route.fullPath,
  (to) => {
    tabStore.addTab(getSimpleRoute(route));
    state.activeKey = to;
  },
  { immediate: true },
);

onMounted(() => {
  storage.remove(GlobalStoreEnum.TabRoutes);
});

// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
  storage.set(GlobalStoreEnum.TabRoutes, JSON.stringify(tabs.value));
});

</script>
<style lang="less">
.tabs-view{

}
</style>
