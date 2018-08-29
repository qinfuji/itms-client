import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';

export default {
  namespace: 'workorders',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *createEmployeeWorkOrder({ payload }, { call }) {
      console.log(payload);
    },

    *fetchWorkOrders({ payload, callback }, { call, put }) {
      const response = yield call(fetchWorkOrders, payloda);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    save(state, action) {},
    list(state, action) {},
  },
};
