import { stringify } from 'qs';
import request from '../utils/request';

// export async function queryProjectNotice() {
//   return request('/api/project/notice');
// }

// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

export async function fetchWorkOrders(params) {
  return request('/api/workorders', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function createWorkOrder(params) {
  return request('/api/workorders/create', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryWorkOrder(params) {
  let id = params.id;
  return request('/api/workorder/' + id);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}
