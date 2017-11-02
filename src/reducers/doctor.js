import update from 'immutability-helper';
import * as fetch from '../services/doctor';

/* 列出分页数据 */
export function *fetchDeptAllData(action, { call, put, select }, namespace) {
  try {
    const { data } = yield call(fetch.listAllData, { errormsg: '医生列表加载失败', ...action }, {}, {
      hospitalDeptId: action.payload,
    });
    yield put({ type: 'updateDeptAllData', payload: data });
  } catch (e) {
    console.log(e);
  }
}

/* 更新分页数据 */
export function updateDeptAllData(state, action) {
  return update(state, { res: { rows: { $set: action.payload } } });
}
