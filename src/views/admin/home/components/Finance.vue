<template>
  <div
    class="enter-y finance-wrapper p-20px"
    bg="white"
  >
    <header class="finance-header">
      <div class="logo mb-2 flex items-center justify-center">
        <img
          src="~@/assets/logo/logo.png"
          alt=""
          width="44"
          height="44"
        >
        <span
          class="ml-2"
          text="4xl bold"
        >主屏看板</span>
      </div>
      <div class="tip flex items-center justify-between">
        <n-avatar
          size="small"
          round
        >
          顺顺
        </n-avatar>
        <span>辅助文本14px</span>
        <span>数据更新至:2022/02/27 12:20:32</span>
        <span>辅助文本14px</span>
      </div>
    </header>
    <div class="finance-body">
      <div class="main-remind pt-[40px] flex flex-col justify-center items-center">
        <div class="mb-[10px]">
          累计盈利
        </div>
        <div text="5xl bold">
          <n-number-animation
            :from="0.0"
            :to="21307"
            :locale="locale"
            show-separator
          />
        </div>
      </div>
      <div class="flex justify-center mt-2">
        <div w="[calc(50%-1px)]">
          <div
            text="center"
            class="mb-1"
          >
            收入详情
          </div>
          <div class="body flex items-center justify-between">
            <div
              v-for="item in data"
              :key="item.name"
              class="w-[33%] flex items-center justify-center flex-col"
            >
              <div>{{ item.name }}</div>
              <div text="xl bold">
                <n-number-animation
                  :from="0.0"
                  :to="item.value"
                  :locale="locale"
                  show-separator
                />
              </div>
              <span>较去年</span>
              <div text="xl bold">
                {{ item.withLastYear > 0?'+':'-' }}
                <n-number-animation
                  :from="0.0"
                  :to="item.withLastYear"
                  :locale="locale"
                  show-separator
                />
              </div>
            </div>
          </div>
        </div>
        <n-divider
          vertical
          h="160px"
        />
        <div w="[calc(50%-1px)]">
          <div
            text="center"
            class="mb-1"
          >
            重点影响成本
          </div>
          <div class="body flex items-center justify-between flex-wrap">
            <div
              v-for="item in cost"
              :key="item.name"
              class="w-[33%] flex items-center justify-center flex-col"
            >
              <div>{{ item.name }}</div>
              <div text="xl bold">
                <n-number-animation
                  :from="0.0"
                  :to="item.value"
                  :locale="locale"
                  show-separator
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useProjectSettingStore } from '@/store';

const ps = useProjectSettingStore();
const { locale } = ps;
const data = [
  {
    name: '中国',
    value: 1922,
    withLastYear: 3335,
  },
  {
    name: '日本',
    value: 13700,
    withLastYear: 6231,
  },
  {
    name: '欧美',
    value: 3739,
    withLastYear: 3772,
  },
];
const cost = [
  {
    name: '已结束合同',
    value: 123,
  },
  {
    name: '成衣库存',
    value: 123,
  },
  {
    name: '面料库存',
    value: 123,
  },
  {
    name: '理赔费',
    value: 123,
  },
  {
    name: '延误费',
    value: 123,
  },
  {
    name: '人为损失',
    value: 123,
  },
];
</script>
