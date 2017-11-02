import update from 'immutability-helper';
import * as fetch from '../services/dept';

/* 列出全部级别数据 */
export function *fetchDeptTreeData(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.listTreeData, { errormsg: '科室列表加载失败', ...action }, {}, {});
  yield put({ type: 'updateDeptTreeData', payload: data });
}

/* 更新全部级别数据 */
export function updateDeptTreeData(state, action) {
  return update(state, { res: { hospitalDeptId: { $set: action.payload } } });
}
