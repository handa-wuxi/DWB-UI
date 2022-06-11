<template>
  <NMenu
    :options="menus"
    :inverted="inverted"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="collapsedWidth"
    :collapsed-icon-size="collapsedIconSize"
    :indent="indent"
    :expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>
<script lang="ts" setup name="PageSider">
import { useRoute, useRouter } from 'vue-router';
import {
  computed, onMounted, PropType, ref, unref, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useAsyncRouteStore } from '@/store';

const { t } = useI18n();
const props = defineProps({
  location: {
    // 位置
    type: String,
    default: 'left',
  },
  mode: {
    // 菜单模式
    type: String as PropType<undefined | 'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  collapsed: {
    // 是否收起
    type: Boolean,
    default: false,
  },
  collapsedWidth: {
    // 收起时的宽度
    type: Number,
    default: 64,
  },
  collapsedIconSize: {
    // 收起时的图标大小
    type: Number,
    default: 20,
  },
  indent: {
    // 层级缩进
    type: Number,
    default: 24,
  },
});
const emit = defineEmits(['update:collapse', 'clickMenuItem']);

const route = useRoute();
const router = useRouter();
const rs = useAsyncRouteStore();

const selectedKeys = ref<string>(route.name as string);
const headerMenuSelectKey = ref<string>('');
const { getNavMode, getNavTheme } = useProjectSetting();

const inverted = computed(() => ['dark', 'header-dark'].includes(getNavTheme.value));
const matched = computed(() => route.matched);

const getOpenKeys = matched.value && matched.value.length
  ? matched.value.map((item) => item.name as string)
  : [];
const openKeys = ref<Array<string | number>>(getOpenKeys);

const getSelectedKeys = computed(() => {
  const { location } = props;
  return location === 'left' || (location === 'header' && unref(getNavMode) === 'horizontal')
    ? unref(selectedKeys)
    : unref(headerMenuSelectKey);
});

// 跟随页面路由变化，切换菜单选中状态
watch(
  () => route.fullPath,
  () => {
    openKeys.value = matched.value.map((item) => item.name as string);
    const activeMenu: string = (route.meta?.activeMenu as string) || '';
    selectedKeys.value = activeMenu ? (activeMenu as string) : (route.name as string);
  },
);

const menus = computed(() => rs.menus.map((item) => ({
  ...item,
  label: t(item.label as string),
})));

async function getMenus() {
  await rs.generateMenus();
}

// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({ name: key });
  }
  emit('clickMenuItem' as any, key);
}

// 查找是否存在子路由
function findChildrenLen(latestOpenKey: string) {
  if (!latestOpenKey) return false;
  const subRouteChildren: string[] = [];
  for (let i = 0; i < menus.value.length; i += 1) {
    const item = menus.value[i];
    const { children, key } = item;
    if (children && children.length) {
      subRouteChildren.push(key as string);
    }
  }

  return subRouteChildren.includes(latestOpenKey);
}

// 展开菜单
function menuExpanded(keys: string[]) {
  if (!keys) return;
  const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1);
  const isExistChildren = findChildrenLen(latestOpenKey as string);
  if (isExistChildren) {
    openKeys.value = latestOpenKey ? [latestOpenKey] : [];
  } else {
    openKeys.value = keys;
  }
}

onMounted(() => {
  getMenus();
});
</script>
