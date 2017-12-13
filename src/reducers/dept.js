import update from 'immutability-helper';
import request from '../utils/request';

/* 列出全部级别数据 */
export function *fetchDeptTreeData(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getAllDeptList }),
    { errormsg: '科室列表加载失败', ...action }, {}, {},
  );

  yield put({ type: 'updateDeptTreeData', payload: data });
}

/* 更新全部级别数据 */
export function updateDeptTreeData(state, action) {
  return update(state, { res: { hospitalDeptId: { $set: action.payload } } });
}
