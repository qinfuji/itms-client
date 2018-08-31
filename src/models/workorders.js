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
    categories: [
      {
        title: '人员类',
        value: '1',
        children: [
          {
            title: '员工入职',
            value: '1-1',
          },
          {
            title: '员工借调来部',
            value: '1-2',
          },
          {
            title: '员工出部回',
            value: '1-3',
          },
          {
            title: '员工离退休',
            value: '1-4',
          },
          {
            title: '员工借调回',
            value: '1-5',
          },
        ],
      },
      {
        title: '活动类',
        value: '2',
        children: [
          { title: '专项办公室', value: '2-1' },
          { title: '集中来人', value: '2-2' },
          { title: '上级任务', value: '2-3' },
          { title: '上会', value: '2-4' },
        ],
      },
      {
        title: '设备类',
        value: '3',
        children: [
          { title: '设备入库', value: '3-1' },
          { title: '设备上架', value: '3-2' },
          { title: '设备下架', value: '3-3' },
          { title: '设备报废', value: '3-4' },
          { title: '设备维修', value: '3-5' },
        ],
      },
      {
        title: '安全类',
        value: '4',
        children: [{ title: '安全检查', value: '4-1' }, { title: '日常巡检', value: '4-2' }],
      },
      {
        title: '耗材类',
        value: '5',
        children: [
          { title: '耗材入库', value: '5-1' },
          { title: '耗材发放', value: '5-2' },
          { title: '光盘发放', value: '5-3' },
          { title: '光盘销毁', value: '5-4' },
        ],
      },
    ],
    urgencyTypes: [
      { value: '1', title: '一般' },
      { value: '2', title: '平级' },
      { value: '3', title: '急件' },
      { value: '4', title: '加急' },
      { value: '5', title: '特急' },
      { value: '6', title: '特提' },
    ],
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
