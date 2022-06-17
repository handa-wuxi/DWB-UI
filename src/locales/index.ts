/* eslint-disable no-param-reassign */
/*
 * @Author: 周顺顺 idioticzhou@foxmail.com
 * @Date: 2022-05-09 15:21:50
 * @LastEditors: 周顺顺 idioticzhou@foxmail.com
 * @LastEditTime: 2022-06-17 15:29:26
 * @FilePath: /DWB-UI/src/locales/index.ts
 * @Description: 多语言模块设置
 */
import { App } from 'vue';
import { createI18n, I18nOptions } from 'vue-i18n';
import { storage } from '@/utils/Storage';

let i18n: ReturnType<typeof createI18n>;

function getTree(fileName: string, obj: RawObject, target: RawObject) {
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

export function getAllMessage() {
  const list = import.meta.globEager('./langs/**.ts');
  let messages: RawObject = {};
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
  const locale = storage.get('locale');
  const defaultLocal = await import(`./langs/${locale}.ts`);
  // const messages = getAllMessage();
  const messages = defaultLocal.default?.message ?? {};
  return {
    locale,
    messages: {
      [locale]: messages,
    },
  };
}

/**
 * @param {Record<string, RawObject>} msg 文件模块
 * @param {string} prefix 指定语言类型
 * @returns RawObject>
 */
export function genMessage(
  msg: Record<string, RawObject>,
  prefix: string,
): RawObject {
  const obj: RawObject = {};
  Object.keys(msg).forEach((key) => {
    const fileModule = msg[key].default;
    const fileName = key.replace(`./${prefix}/`, '').replace('.ts', '');
    getTree(fileName, obj, fileModule);
  });
  return obj;
}

export const setupI18n = async (app: App<Element>) => {
  const option = await createI18nOptions();
  i18n = createI18n(option);
  app.use(i18n);
};

export { i18n };
