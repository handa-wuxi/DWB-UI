<template>
  <div class="layout-header">
    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => emit('update:collapsed', !collapsed)"
      >
        <n-icon
          v-if="collapsed"
          size="18"
        >
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon
          v-else
          size="18"
        >
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        v-if="state.headerSetting.isReload"
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="state.crumbsSetting.show">
        <template
          v-for="routeItem in breadcrumbList"
          :key="routeItem.name"
        >
          <n-breadcrumb-item>
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  :is="routeItem.meta.icon"
                  v-if="state.crumbsSetting.showIcon && routeItem.meta.icon"
                />
                {{ t(routeItem.label) }}
              </span>
            </n-dropdown>
            <span
              v-else
              class="link-text"
            >
              <component
                :is="routeItem.meta.icon"
                v-if="state.crumbsSetting.showIcon && routeItem.meta.icon"
              />
              {{ t( routeItem.label) }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <div
        v-for="item in iconList"
        :key="item.tips"
        class="layout-header-trigger layout-header-trigger-min"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component
                :is="item.icon"
                v-on="item.eventObject || {}"
              />
            </n-icon>
          </template>
          <span>{{ t(item.tips) }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component
                :is="fullscreenIcon"
                @click="toggleFullScreen"
              />
            </n-icon>
          </template>
          <span>{{ t('global.fullScreen') }}</span>
        </n-tooltip>
      </div>
      <!-- 中英文切换 -->
      <div>
        <n-dropdown
          trigger="hover"
          :options="locales"
          @select="handleSelect"
        >
          <span class="header-item w-65px text-center">{{ localeLabel }}</span>
        </n-dropdown>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown
          trigger="hover"
          :options="avatarOptions"
          @select="avatarSelect"
        >
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <div
        class="layout-header-trigger layout-header-trigger-min"
        @click="openSetting"
      >
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon
              size="18"
              style="font-weight: bold"
            >
              <SettingOutlined />
            </n-icon>
          </template>
          <span>{{ t('global.projectConfig') }}</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <!--项目配置-->
  <ProjectSetting ref="drawerSetting" />
</template>

<script lang="ts" setup>
import {
  reactive, ref, computed, unref, shallowRef, watchEffect,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDialog, useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import {
  MenuFoldOutlined, LockOutlined, FullscreenExitOutlined,
  FullscreenOutlined, MenuUnfoldOutlined, ReloadOutlined, SettingOutlined, UserOutlined,
} from '@vicons/antd';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useLockScreenStore, useProjectSettingStore, useUserStore } from '@/store';
import ProjectSetting from './ProjectSetting.vue';
import { GlobalStoreEnum } from '@/enums/global';
import { i18n } from '@/locales';

defineProps({
  collapsed: {
    type: Boolean,
  },
  inverted: {
    type: Boolean,
  },
});

const emit = defineEmits([
  'update:collapsed',
]);
const { t } = useI18n();
const userStore = useUserStore();
const useLockScreen = useLockScreenStore();
const ps = useProjectSettingStore();
const message = useMessage();
const dialog = useDialog();
const {
  getNavMode, getNavTheme, getHeaderSetting, getCrumbsSetting,
} = useProjectSetting();

const { username } = userStore?.user || {};
const locales = [
  {
    label: '中文',
    key: 'zh-CN',
  },
  {
    label: 'English',
    key: 'en-US',
  },
];

const drawerSetting = ref();

const localeLabel = ref('中文');
const fullscreenIcon = shallowRef(FullscreenOutlined);
const state = reactive({
  username: username || '',
  navMode: getNavMode,
  navTheme: getNavTheme,
  headerSetting: getHeaderSetting,
  crumbsSetting: getCrumbsSetting,
});

const router = useRouter();
const route = useRoute();

const generator: any = (routerMap) => routerMap.map((item) => {
  const currentMenu = {
    ...item,
    label: t(item.meta.title),
    key: item.name,
    disabled: item.path === '/',
  };
  // 是否有子菜单，并递归处理
  if (item.children && item.children.length > 0) {
    // Recursion
    currentMenu.children = generator(item.children, currentMenu);
  }
  return currentMenu;
});

const breadcrumbList = computed(() => generator(route.matched));

const dropdownSelect = (key) => {
  router.push({ name: key });
};

// 刷新页面
const reloadPage = () => {
  router.push({
    path: `/redirect${unref(route).fullPath}`,
  });
};

// 退出登录
const doLogout = () => {
  const curDialog = dialog.info({
    title: t('dialog.tip'),
    content: t('dialog.sureLogout'),
    positiveText: t('global.confirm'),
    negativeText: t('global.cancel'),
    onPositiveClick: () => {
      userStore.logout().then(() => {
        message.success(t('dialog.logoutSuccess'));
        // 移除标签页
        localStorage.removeItem(GlobalStoreEnum.TabRoutes);
        curDialog.destroy();
        setTimeout(() => {
          router
            .replace({
              name: 'login',
              query: {
                redirect: route.fullPath,
              },
            })
            .finally(() => window.location.reload());
        }, 1000);
      });
    },
  });
};

// 切换全屏图标
const toggleFullscreenIcon = () => {
  fullscreenIcon.value = document.fullscreenElement !== null
    ? FullscreenExitOutlined
    : FullscreenOutlined;
  return fullscreenIcon;
};

// 监听全屏切换事件
document.addEventListener('fullscreenchange', toggleFullscreenIcon);

// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

// 图标列表
const iconList = [
  {
    icon: LockOutlined,
    tips: 'global.lockScreen',
    eventObject: {
      click: () => useLockScreen.setLock(true),
    },
  },
];
const avatarOptions = [
  {
    label: t('global.personSetting'),
    key: 1,
  },
  {
    label: t('global.logout'),
    key: 2,
  },
];

// 头像下拉菜单
const avatarSelect = (key) => {
  switch (key) {
    case 1:
      router.push({ name: 'Setting' });
      break;
    case 2:
      doLogout();
      break;
    default:
      break;
  }
};

function openSetting() {
  const { openDrawer } = drawerSetting.value;
  openDrawer();
}

function handleSelect(key: string) {
  localeLabel.value = locales.filter((item) => item.key === key)[0].label;
  i18n.global.locale = key;
  if (key !== ps.locale) {
    window.location.reload();
  }
  ps.setLocale(key);
}

watchEffect(() => {
  const { locale } = ps;
  handleSelect(locale);
});

</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: @header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: #515a6e;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }

</style>
