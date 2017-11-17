import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import * as fetch from '../services/hospital';
import { changeDataType } from '../utils/handleData';

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRow, { errormsg: '医院详情查询失败', ...action }, {}, {
    hospitalId: action.payload,
  });

  yield put({ type: 'updateViewedRow', payload: data });
}

/* 更新详情数据 */
export function updateViewedRow(state, action) {
  return update(state, { res: { detail: { $set: action.payload } } });
}
