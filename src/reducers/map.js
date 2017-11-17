import update from 'immutability-helper';
import * as fetch from '../services/map';

/* 列出全部级别数据 */
export function *fetchAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.listAllData, { errormsg: '科室列表加载失败', ...action }, {}, {});

  const buildingArray = [];
  const buildingObject = {};

  for (let i = 0; i < data.length; i++) {
    if (!buildingObject[data[i].deptAddress]) {
      buildingObject[data[i].deptAddress] = 1;
    }
  }

  for (const key in buildingObject) {
    if (key) { buildingArray.push({ value: key, label: key }); }
  }

  yield put({ type: 'updateBuildingArray', payload: buildingArray });
  yield put({ type: 'updateAllData', payload: data });
}

/* 更新全部级别数据 */
export function updateAllData(state, action) {
  return update(state, { res: { rows: { $set: action.payload } } });
}
