<template>
  <div class="entry-x login-page">
    <n-grid
      cols="1 s:1 m:8 l:8 xl:24 2xl:24"
      responsive="screen"
    >
      <n-grid-item
        span="0 s:0 m:3 l:4 xl:16 2xl:16"
      >
        <div class="login-bg" />
      </n-grid-item>
      <n-grid-item
        span="1 s:1 m:5 l:5 xl:9 2xl:9"
        offset="0 s:0 m:0 l:1 xl:-1 2xl:-1"
      >
        <div class="login-content flex flex-col w-[540px] pt-[70px] pb-[260px]">
          <div class="title flex justify-between mb-[150px]">
            <div class="text-[40px]">
              恒田企业数字化工作台
            </div>
            <div class="logo" />
          </div>
          <div class="login-form">
            <div class="tip text-[40px] mb-[20px]">
              登录
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
                  class="input-wrapper"
                />
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="loginForm.password"
                  show-password-on="click"
                  type="password"
                  class="input-wrapper"
                />
              </n-form-item>
              <n-form-item>
                <div class="flex justify-between w-[100%]">
                  <n-checkbox
                    v-model="loginForm.remember"
                    label="记住我"
                  />
                </div>
              </n-form-item>
              <n-form-item>
                <n-button
                  type="primary"
                  class="w-[100%] h-[54px] text-[20px] tracking-[8px] bg-[#0960BD]"
                  @click="toLogin"
                >
                  登录
                </n-button>
              </n-form-item>
            </n-form>
            <n-divider class="text-[#B6BCC3]">
              其他登录方式
            </n-divider>
            <div class="other-login flex justify-around">
              <img
                v-for="src in loginImg"
                :key="src"
                :src="src"
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
import { reactive, ref } from 'vue';
import { FormInst, useMessage } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store';

const loginImg = [
  '/src/assets/login/wechat.png',
  '/src/assets/login/alipay.png',
  '/src/assets/login/dingtalk.png',
  '/src/assets/login/oa.png',
];

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const message = useMessage();
const formRef = ref<FormInst>();
const loginForm = reactive({
  username: '',
  password: '',
  remember: false,
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
          router.push('/');
        }
      } catch (error) {
        message.error(error as string);
      }
    }
  });
}
</script>
<style lang="less">
.login-page{
  .login-bg{
    background-image: url('@/assets/login/login-bg.png');
    background-size: cover;
    background-position: center;
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
    }
    .input-wrapper{
      .n-input__input-el{
        height: 54px;
      }
    }
  }
}

</style>
