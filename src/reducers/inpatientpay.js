import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import request from '../utils/request';
import { changeDataType } from '../utils/handleData';

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getInpatientOrderById }),
    { errormsg: '住院缴费详情查询失败', ...action }, {}, { orderId: action.payload },
  );

  yield put({ type: 'updateViewedRow', payload: data });
}

/* 列出全部数据 */
export function *fetchAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getInpatientOrderByVisitNo }),
    { errormsg: '住院缴费记录查询失败', ...action }, {}, { visitNo: action.payload },
  );

  yield put({ type: 'updateAllData', payload: data });
}

/* 更新详情数据 */
export function updateViewedRow(state, action) {
  return update(state, { res: { detail: { $set: action.payload } } });
}

/* 更新全部数据 */
export function updateAllData(state, action) {
  return update(state, { res: { rows: { $set: action.payload } } });
}
