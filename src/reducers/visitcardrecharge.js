import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import * as fetch from '../services/visitcardrecharge';
import { changeDataType } from '../utils/handleData';

/* 插入 */
export function *fetchInsertRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.insertRow, { errormsg: '就诊卡充值失败', ...action }, {}, action.payload);

  action.that._reactInternalInstance._context.router.push(`/${action.that.props.locale}/visitcard/rechargerecord`);
}

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRow, { errormsg: '充值详情查询失败', ...action }, {}, {
    visitNoRecId: action.payload,
  });

  yield put({ type: 'updateViewedRow', payload: data });
}

/* 列出全部数据 */
export function *fetchAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.listAllData, { errormsg: '充值记录查询失败', ...action }, {}, {
    sysUserId: 1,
  });

  yield put({ type: 'updateAllData', payload: data });
}

/* 更新全部数据 */
export function updateAllData(state, action) {
  return update(state, { res: { rows: { $set: action.payload } } });
}

/* 更新详情数据 */
export function updateViewedRow(state, action) {
  return update(state, { res: { detail: { $set: action.payload } } });
}
