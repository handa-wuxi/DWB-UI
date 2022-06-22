<template>
  <div class="entry-x login-page">
    <n-grid
      cols="10 s:10 m:10 l:12 xl:24 2xl:24"
      responsive="screen"
    >
      <n-grid-item
        span="0 s:0 m:0 l:6 xl:16 2xl:16"
      >
        <div class="login-bg" />
      </n-grid-item>
      <n-grid-item
        span="8 s:8 m:6 l:4 xl:9 2xl:9"
        offset="1 s:1 m:3 l:1 xl:-1 2xl:-1"
      >
        <div class="login-content flex flex-col max-w-[540px] pt-[70px] pb-[260px]">
          <div class="title flex items-center justify-between mb-[150px]">
            <div
              class="text-[24px] l:text-[40px]"
            >
              {{ t('global.loginTitle') }}
            </div>
            <div class="logo" />
          </div>
          <div class="login-form">
            <div class="tip text-[40px] mb-[20px]">
              {{ t('global.login') }}
            </div>
            <n-form
              ref="formRef"
              :show-label="false"
              :model="loginForm"
              :rules="rules"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="loginForm.username"
                  :placeholder="t('global.inputPlaceholder',[t('global.username')])"
                  class="input-wrapper"
                />
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="loginForm.password"
                  :placeholder="t('global.inputPlaceholder',[t('global.password')])"
                  show-password-on="click"
                  type="password"
                  :input-props="{ autocomplete: (remember?'on':'new-password') }"
                  class="input-wrapper"
                />
              </n-form-item>
              <div class="flex justify-between w-[100%] mb-[40px]">
                <n-checkbox
                  v-model:checked="remember"
                  label="记住我"
                />
              </div>
              <n-form-item>
                <n-button
                  type="primary"
                  class="w-[100%] h-[54px] text-[20px]  bg-[#0960BD]"
                  :class="`tracking-[${locale === 'zh-CN'?'8px':'0'}px]`"
                  @click="toLogin"
                >
                  {{ t('global.login') }}
                </n-button>
              </n-form-item>
            </n-form>
            <n-divider
              class="text-[#B6BCC3]"
              style="--n-font-weight:300"
            >
              {{ t('global.otherLogin') }}
            </n-divider>
            <div class="other-login flex justify-around">
              <img
                v-for="src in loginImg"
                :key="src"
                :src="getAssetsFile(src)"
                class="w-[30px] h-[30px] cursor-pointer"
              >
            </div>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts" setup name="LoginPage">
import {
  reactive, ref, watch,
} from 'vue';
import { FormInst, useMessage } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useProjectSettingStore, useUserStore } from '@/store';
import { getAssetsFile } from '@/utils/web/getAssetsFile';

const loginImg = [
  'login/wechat.png',
  'login/alipay.png',
  'login/dingtalk.png',
  'login/oa.png',
];

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const ps = useProjectSettingStore();

const { locale } = storeToRefs(ps);
const { remember } = storeToRefs(userStore);
const message = useMessage();
const formRef = ref<FormInst>();

const loginForm = reactive({
  username: '',
  password: '',
});
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
};

function toLogin() {
  formRef.value?.validate(async (error) => {
    if (!error) {
      try {
        await userStore.login(loginForm);
        message.success('登录成功');
        if (route.query.redirect) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          router.push(toPath);
        } else {
          router.push('/admin');
        }
      } catch (error) {
        message.error(error as string);
      }
    }
  });
}

watch(() => remember.value, (newValue) => {
  userStore.setRemember(newValue);
});
</script>
<style lang="less">
.login-page{
  .login-bg{
    background-image: url('@/assets/login/login-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
  }

  .login-content{
    height: 100vh;
    .logo{
      width: 52px;
      height: 60px;
      background-image: url('@/assets/logo/logo.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .input-wrapper{
      .n-input__input-el{
        height: 54px;
      }
       input {
        font-size: 20px;
        background-clip: content-box;
        height: 0 !important;
        padding: 20px 0 !important;
      }
    }
  }
}

</style>
