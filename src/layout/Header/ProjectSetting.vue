<template>
  <NDrawer
    v-model:show="isDrawer"
    :width="width"
    :placement="placement"
  >
    <NDrawerContent
      :title="title"
      :native-scrollbar="false"
    >
      <div class="drawer">
        <NDivider title-placement="center">
          主题
        </NDivider>

        <div class="justify-center drawer-setting-item dark-switch">
          <NTooltip placement="bottom">
            <template #trigger>
              <NSwitch
                v-model:value="theme"
                :on-update:value="changeTheme"
                rubber-band
                size="large"
                class="theme-switch mx-[8px]"
              >
                <template #unchecked-icon>
                  🌞
                </template>
                <template #checked-icon>
                  🌚
                </template>
              </NSwitch>
            </template>
            <span>{{ ds.darkTheme ? '深' : '浅' }}色主题</span>
          </NTooltip>
        </div>

        <NDivider title-placement="center">
          系统主题
        </NDivider>

        <div class="drawer-setting-item align-items-top">
          <span
            v-for="(item, index) in appThemeList"
            :key="index"
            class="theme-item"
            :style="{ 'background-color': item }"
            @click="togTheme(item)"
          >
            <NIcon
              v-if="item === ds.appTheme"
              size="12"
            />
          </span>
        </div>

        <NDivider title-placement="center">
          界面显示
        </NDivider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">
            显示重载页面按钮
          </div>
          <div class="drawer-setting-item-action">
            <NSwitch v-model:value="ps.headerSetting.isReload" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">
            显示面包屑导航
          </div>
          <div class="drawer-setting-item-action">
            <NSwitch v-model:value="ps.crumbsSetting.show" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">
            显示面包屑显示图标
          </div>
          <div class="drawer-setting-item-action">
            <NSwitch v-model:value="ps.crumbsSetting.showIcon" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">
            显示多页签
          </div>
          <div class="drawer-setting-item-action">
            <NSwitch v-model:value="ps.multiTabsSetting.show" />
          </div>
        </div>

        <NDivider title-placement="center">
          动画
        </NDivider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">
            禁用动画
          </div>
          <div class="drawer-setting-item-action">
            <NSwitch v-model:value="ps.isPageAnimate" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">
            动画类型
          </div>
          <div class="drawer-setting-item-select">
            <NSelect
              v-model:value="ps.pageAnimateType"
              :options="animateOptions"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <NAlert
            type="warning"
            :show-icon="false"
          >
            <p>{{ alertText }}</p>
          </NAlert>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Placement } from 'naive-ui/lib/drawer/src/DrawerBodyWrapper';
import { storeToRefs } from 'pinia';
import { animates as animateOptions } from '@/config/animateSetting';
import { useProjectSettingStore, useDesignSettingStore } from '@/store';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

const { changeTheme } = useProjectSetting();

const ps = useProjectSettingStore();
const ds = useDesignSettingStore();

defineProps({
  title: {
    type: String,
    default: '项目配置',
  },
  width: {
    type: Number,
    default: 280,
  },
});
const alertText = '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。';
const { appThemeList } = ds;

const isDrawer = ref(false);
const placement = ref<Placement>('right');
const { theme } = storeToRefs(ps);

function togTheme(color) {
  ds.appTheme = color;
}

function openDrawer() {
  isDrawer.value = true;
}

function closeDrawer() {
  isDrawer.value = false;
}

defineExpose({
  openDrawer,
  closeDrawer,
});

</script>

<style lang="less" scoped>
  .drawer {
    .NDivider:not(.NDivider--vertical) {
      margin: 10px 0;
    }

    &-setting-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      flex-wrap: wrap;

      &-style {
        display: inline-block;
        position: relative;
        margin-right: 16px;
        cursor: pointer;
        text-align: center;
      }

      &-title {
        flex: 1 1;
        font-size: 14px;
      }

      &-action {
        flex: 0 0 auto;
      }

      &-select {
        flex: 1;
      }

      .theme-item {
        width: 20px;
        min-width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 2px;
        margin: 0 5px 5px 0;
        text-align: center;
        line-height: 14px;

        .n-icon {
          color: #fff;
        }
      }
    }

    .align-items-top {
      align-items: flex-start;
      padding: 2px 0;
    }

    .justify-center {
      justify-content: center;
    }

    .dark-switch .NSwitch {
      ::v-deep(.NSwitch__rail) {
        background-color: #000e1c;
      }
    }
  }
</style>
