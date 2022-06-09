import { MockMethod } from 'vite-plugin-mock';
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules = import.meta.globEager('/mock/**/*.ts');

const mockMethods: MockMethod[] = [];

Object.keys(modules).forEach((key) => {
  const module = modules[key];
  const mockMethod = module.default;
  if (mockMethod) {
    mockMethods.push(mockMethod);
  }
});

// 生产环境的mock服务
export function setupProdMockServer() {
  createProdMockServer([...mockMethods]);
}
