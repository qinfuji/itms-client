import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '系统管理',
    icon: 'form',
    path: 'systemMgr',
    children: [
      {
        name: '工单管理',
        path: 'workorderMgr',
        authority: 'workorderMgr',
      },
    ],
  },
  /*{
    name: '创建工单',
    icon: 'table',
    path: 'workOrderMgr',
    children: [
      {
        name: '员工入职',
        path: 'employ',
        authority: 'employ',
      },
    ],
  },*/

  {
    name: '任务管理',
    icon: 'profile',
    path: 'taskMgr',
    children: [
      {
        name: '日常巡检状态',
        authority: 'admin',
        path: 'basic',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
