import { parse } from 'url';

export function getworkorders(req, res, u) {
  const result = {
    list: [],
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  return result;
}
