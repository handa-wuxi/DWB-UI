/* eslint-disable no-param-reassign */
/*
 * @Author: 周顺顺 idioticzhou@foxmail.com
 * @Date: 2022-05-09 15:21:50
 * @LastEditors: Zhoushunshun541 idioticzhou@foxmail.com
 * @LastEditTime: 2022-06-10 13:01:42
 * @FilePath: /DWB-UI/src/locales/index.ts
 * @Description: 多语言模块设置
 */
import { App } from 'vue';
import { createI18n, I18nOptions } from 'vue-i18n';

export let i18n: ReturnType<typeof createI18n>;

function getTree(fileName: string, obj: Record<string, any>, target: Record<string, any>) {
  const list = fileName.split('/');
  const del = list.splice(0, 1);

  if (list.length === 0) {
    obj[del[0]] = target;
    return;
  }
  if (obj[del[0]] === undefined) {
    obj[del[0]] = {};
  }
  getTree(list.join('/'), obj[del[0]], target);
}

/**
 * @param {Record<string, Record<string, any>>} msg 文件模块
 * @param {string} prefix 指定语言类型
 * @returns Record<string, any>>
 */
export function genMessage(
  msg: Record<string, Record<string, any>>,
  prefix: string,
): Record<string, any> {
  const obj: Record<string, any> = {};
  Object.keys(msg).forEach((key) => {
    const fileModule = msg[key].default;
    const fileName = key.replace(`./${prefix}/`, '').replace('.ts', '');
    getTree(fileName, obj, fileModule);
  });
  return obj;
}

function getAllMessage() {
  const list = import.meta.globEager('./langs/**.ts');
  let messages: Record<string, any> = {};
  Object.keys(list).forEach((key) => {
    const name = key.replace('./langs/', '').replace('.ts', '');
    messages = {
      ...messages,
      [name]: list[key].default?.message ?? {},
    };
    // Object.defineProperty(message, name, { value: list[key].default?.message ?? {} });
  });
  return messages;
}

async function createI18nOptions(): Promise<I18nOptions> {
  const locale = window.navigator.language;
  // const defaultLocal = await import(`./langs/${locale}.ts`);
  const messages = getAllMessage();
  // const message = defaultLocal.default?.message ?? {};
  return {
    locale,
    messages,
  };
}

export const setupI18n = async (app: App<Element>) => {
  const option = await createI18nOptions();
  i18n = createI18n(option);
  app.use(i18n);
};
