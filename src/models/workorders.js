import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fetchWorkOrders } from '../services/api';

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
      const response = yield call(fetchWorkOrders, payload);
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
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    list(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
