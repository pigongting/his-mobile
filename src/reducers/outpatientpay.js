import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import request from '../utils/request';
import { changeDataType } from '../utils/handleData';

/* 更新 */
export function *fetchUpdateRow(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.updateDoorOrder }),
    { errormsg: '门诊缴费详情查询失败', ...action }, {}, { orderId: action.payload },
  );
}

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getDoorOrderById }),
    { errormsg: '门诊缴费详情查询失败', ...action }, {}, { orderId: action.payload },
  );

  if (data.orderStatus === 0) { yield put({ type: 'fetchDetailList', payload: data.orderNo }); }

  yield put({ type: 'updateViewedRow', payload: data });
}

/* 列出全部数据 */
export function *fetchAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getDoorOrderByVisitNo }),
    { errormsg: '门诊缴费记录查询失败', ...action }, {}, { visitNo: action.payload },
  );

  yield put({ type: 'updateAllData', payload: data });
}

/* 列出缴费明细 */
export function *fetchDetailList(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getDoorOrderDetailByOrderNo }),
    { errormsg: '门诊缴费明细查询失败', ...action }, {}, { orderNo: action.payload },
  );

  yield put({ type: 'updateDetailList', payload: data });
}

/* 更新全部数据 */
export function updateAllData(state, action) {
  return update(state, { res: { rows: { $set: action.payload } } });
}

/* 更新详情数据 */
export function updateViewedRow(state, action) {
  return update(state, { res: { detail: { $set: action.payload } } });
}

/* 更新缴费明细 */
export function updateDetailList(state, action) {
  return update(state, { res: { detaillist: { $set: action.payload } } });
}
