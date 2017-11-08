import update from 'immutability-helper';
import moment from 'moment';
import * as fetch from '../services/visitmen';

/* 插入 */
export function *fetchInsertRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.InsertRow, { errormsg: '就诊人插入失败', ...action }, {}, {
    doctorId: action.payload,
  });
  console.log(data);
  // yield put({ type: 'updateDoctorInfo', payload: data });
}

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRow, { errormsg: '就诊人加载失败', ...action }, {}, {
    doctorId: 1,
  });
  yield put({ type: 'updateViewedRow', payload: data });
}

/* 列出分页数据 */
export function *fetchVisitMenAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.listAllData, { errormsg: '就诊人列表加载失败', ...action }, {}, {
    hospitalDeptId: action.payload,
  });
  yield put({ type: 'updateVisitMenAllData', payload: data });
}

/* 更新分页数据 */
export function updateVisitMenAllData(state, action) {
  return update(state, { res: { visitmenlist: { $set: action.payload } } });
}

/* 更新就诊人信息 */
export function updateViewedRow(state, action) {
  return update(state, { req: { visitmen: { $set: action.payload } } });
}
