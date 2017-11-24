import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import * as fetch from '../services/inpatientinfo';
import { changeDataType } from '../utils/handleData';

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRow, { errormsg: '住院信息详情查询失败', ...action }, {}, {
    inpatientNo: action.payload,
  });

  yield put({ type: 'updateViewedRow', payload: data[0] });
}

/* 更新详情数据 */
export function updateViewedRow(state, action) {
  return update(state, { res: { detail: { $set: action.payload } } });
}
