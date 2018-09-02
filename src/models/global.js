import { queryNotices } from '../services/api';

const categories = [
  { code: 100, title: '人员类' },
  { code: 200, title: '活动类' },
  { code: 300, title: '设备类' },
  { code: 400, title: '安全类' },
  { code: 500, title: '耗材类' },
];
//所有工单类型
/**
 * code  类型编码
 * title 标题
 * next 可以操作的子工单
 * start 是否是起点工单
 * category 工单大类
 */
const orderTypes = [
  { code: 1, title: '人员入职', next: [2, 3, 5, 6, 7, 8], start: true, category: 100 },
  { code: 2, title: '离退休', category: 100 },
  { code: 3, title: '短期出部', next: [4], category: 100 },
  { code: 4, title: '短期出部回', category: 100 },
  { code: 5, title: '部门调整', category: 100 },
  { code: 6, title: '办公室调整', category: 100 },
  { code: 7, title: '回收设备', category: 100 }, //?
  { code: 8, title: '发放设备', category: 100 }, //?
  { code: 9, title: '人员借调来部', next: [5, 6, 7, 8, 10], start: true, category: 100 },
  { code: 10, title: '到期走', category: 100 },
  { code: 11, title: '专项办公室', next: [12, 13, 14], start: true, category: 200 },
  { code: 12, title: '增加人', category: 200 },
  { code: 13, title: '减少人', category: 200 },
  { code: 14, title: '解散', category: 200 },
  { code: 15, title: '集中来人', category: 200, start: true },
  { code: 16, title: '上级任务', next: [17, 18, 19], start: true, category: 200 }, //是否相同界面？
  { code: 17, title: '增加人', category: 200 },
  { code: 18, title: '减少人', category: 200 },
  { code: 19, title: '结束', category: 200 },
  { code: 20, title: '上会', next: [21], start: true, category: 200 },
  { code: 21, title: '结束', category: 200 },
  { code: 22, title: '设备入库', next: [23, 24, 25], start: true, category: 300 },
  { code: 23, title: '上架', next: [23], category: 300 },
  { code: 24, title: '下架', category: 300 },
  { code: 25, title: '销毁', category: 300 },
  { code: 26, title: '设备维修', category: 300, start: true },
  { code: 27, title: '安全检查', category: 400, start: true },
  { code: 28, title: '日常巡检', category: 400, start: true },
  { code: 29, title: '耗材入库', category: 500 },
  { code: 30, title: '耗材发放', category: 500 },
  { code: 31, title: '光盘发放', next: [32], category: 500 },
  { code: 32, title: '光盘销毁', category: 500 },
];

const taskTypes = [
  { code: 1, title: '配置网络' },
  { code: 2, title: '网络回收' },
  { code: 3, title: 'KEY任务' },
  { code: 4, title: 'KEY回收任务' },
  { code: 5, title: '安装电话' },
  { code: 6, title: '电话回收' },
  { code: 7, title: '耗材任务' },
  { code: 8, title: '耗材回收' },
  { code: 9, title: '系统任务' },
  { code: 10, title: '系统回收' },
  { code: 11, title: '应用任务' },
  { code: 12, title: '应用回收' },
  { code: 13, title: '安全状态' },
  { code: 14, title: '检查处理' },
  { code: 15, title: '状态录入' },
  { code: 16, title: '设备入库任务' },
  { code: 17, title: '设备增加任务' },
  { code: 18, title: '设备回收任务' },
];

function genSearchOrderTypes(orderTypes, categorys) {
  let searchOrderTypes = [];
  if (!categorys) return searchOrderTypes;
  let categoryMap = {};
  if (orderTypes) {
    orderTypes.forEach(orderType => {
      let children = categoryMap[orderType.category];
      if (!children) {
        children = [];
        categoryMap[orderType.category] = children;
      }
      children.push({ title: orderType.title, value: orderType.code });
    });
  }
  categorys.forEach(category => {
    let children = categoryMap[category.code] || [];
    searchOrderTypes.push({
      title: category.title,
      value: category.code,
      children: children,
    });
  });
  return searchOrderTypes;
}

function genEntryOrderTypes(orderTypes, categorys) {
  try {
    if (!orderTypes) return [];
    let entryOrderTypes = [];
    let categoryMap = {};
    orderTypes.forEach(orderType => {
      if (!orderType.start) return;
      let children = categoryMap[orderType.category];
      if (!children) {
        children = [];
        categoryMap[orderType.category] = children;
      }
      children.push({ title: orderType.title, value: orderType.code });
    });
    categorys.forEach(category => {
      if (category.code == 500) return; //过滤
      let children = categoryMap[category.code] || [];
      entryOrderTypes.push({
        title: category.title,
        value: category.code,
        children: children,
        disabled: true,
      });
    });
    return entryOrderTypes;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    //查询所需的订单结构
    searchOrderTypes: [],
    //可以直接创建的工单
    entryOrderTypes: [],
    orderTypes: orderTypes,
    taskTypes: taskTypes,
    urgencyTypes: [
      { code: 1, title: '一般' },
      { code: 2, title: '平级' },
      { code: 3, title: '紧急' },
      { code: 4, title: '加急' },
      { code: 5, title: '特急' },
      { code: 6, title: '特提' },
    ],
    consumables: [{ code: 1, title: '打印纸' }, { id: 2, title: '硒鼓' }, { id: 3, title: '光盘' }],
    devices: [
      { code: 1, title: '主机' },
      { code: 2, title: '硬盘' },
      { code: 3, title: '移动硬盘' },
      { code: 4, title: '打印机' },
      { code: 5, title: '传真机' },
    ],
    applications: [
      { code: 1, title: '应用1' },
      { code: 2, title: '应用2' },
      { code: 3, title: '邮箱' },
    ],
    departments: [{ code: 1, title: '办公厅' }, { code: 1, title: '研究室' }],
    nationalitys: [{ code: 1, title: '汉族' }],
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    setOrderSelectData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      let entryOrderTypes = genEntryOrderTypes(orderTypes, categories);
      let searchOrderTypes = genSearchOrderTypes(orderTypes, categories);
      dispatch({
        type: 'setOrderSelectData',
        payload: { entryOrderTypes, searchOrderTypes },
      });
      return null;
    },
  },
};
