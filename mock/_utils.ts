import Mock from 'mockjs';

export function resultSuccess(data, { message = 'success' } = {}) {
  return Mock.mock({
    data,
    message,
    status: 200,
  });
}

export function resultFail(data, { message = 'error' } = {}) {
  return Mock.mock({
    status: 400,
    data,
    message,
  });
}
