import { queryNotices } from '../services/api';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    orderCategories: [
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
            title: '员工到期走',
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
    urgencyType: [
      { code: 1, title: '一般' },
      { code: 2, title: '平级' },
      { code: 3, title: '紧急' },
      { code: 4, title: '加急' },
      { code: 5, title: '特急' },
      { code: 7, title: '特提' },
    ],
    consumables: [{ code: 1, title: '打印纸' }, { id: 2, title: '硒鼓' }, { id: 3, title: '光盘' }],
    device: [{ id: 1, title: '主机' }],
    orderType: [
      { code: 1, title: '人员入职', next: [2, 3, 5, 6, 7] },
      { code: 2, title: '离退休' },
      { code: 3, title: '短期出部', next: [4] },
      { code: 4, title: '短期出部回' },
      { code: 5, title: '部门调整' },
      { code: 6, title: '办公室调整' },
      { code: 7, title: '设备调整' }, //?
      { code: 8, title: '人员借调来部', next: [5, 6, 7] },
      { code: 9, title: '到期走' },
      { code: 10, title: '专项办公室', next: [11, 12, 13] },
      { code: 11, title: '增加人' },
      { code: 12, title: '减少人' },
      { code: 13, title: '解散' },
      { code: 14, title: '集中来人' },
      { code: 15, title: '上级任务', next: [15, 16, 17] }, //是否相同界面？
      { code: 16, title: '增加人' },
      { code: 17, title: '减少人' },
      { code: 18, title: '结束' },
      { code: 19, title: '上会', next: [20] },
      { code: 20, title: '结束' },
      { code: 21, title: '设备入库', next: [22, 24] },
      { code: 22, title: '上架', next: [23] },
      { code: 23, title: '下架' },
      { code: 24, title: '销毁' },
      { code: 25, title: '设备维修' },
      { code: 26, title: '安全检查' },
      { code: 27, title: '日常巡检' },
      { code: 28, title: '耗材入库' },
      { code: 29, title: '耗材发放' },
      { code: 30, title: '光盘发放', next: [31] },
      { code: 31, title: '光盘销毁' },
    ],
    taskType: [
      { code: 1, title: '配置网络' },
      { code: 2, title: 'KEY任务' },
      { code: 2, title: 'KEY回收任务' },
      { code: 3, title: '安装电话' },
      { code: 4, title: '耗材任务' },
      { code: 5, title: '系统任务' },
      { code: 6, title: '应用任务' },
      { code: 7, title: '安全状态' },
      { code: 8, title: '检查处理' },
      { code: 9, title: '状态录入' },
      { code: 10, title: '设备入库任务' },
      { code: 11, title: '设备增加任务' },
      { code: 11, title: '设备回收任务' },
    ],
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
