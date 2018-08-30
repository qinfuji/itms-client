import { parse } from 'url';

/**
 
 assignUser: '指定完成人',
  orderType: '工单类型',
  orderDesc: '工单说明',
  urgencyType: '紧急程度',
  cause: '事由',
  name: '姓名',
  department: '所属部门',
  contactTelphone: '联系电话',
  sex: '性别',
  nationality: '民族',
  politicalStatus: '政治面貌',
  trustNo: '信任号',
  mobile: '手机',
  officePosition: '办公室',
  innerEmail: '内部邮箱',
  outerEmail: '外部邮箱',
  offlicTel: '座机',
  userDesc: '个人说明',
  remarks: '备注',
  attachment: '附件',

 */

const workorders = [
  {
    id: 123,
    urgencyType: { id: 1, name: '紧急' },
    orderNo: 'XXXXXXXXXXXXXX',
    category: { id: 1, name: '人员类' },
    type: { id: 1, name: '人员入职' },
    updateTime: '2017-01-01 00:00:00',
    desc: 'xxx入职',
    status: { id: 1, name: '完成' },
    createUser: '张三',
    createTime: '2017-01-01 00:00:00',
    tasks: [{ id: 1, status: { id: 1, name: '完成' }, spendTime: 2, order: 1 }],
  },
];

export function getworkorders(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: workorders,
    pagination: {
      total: workorders.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
