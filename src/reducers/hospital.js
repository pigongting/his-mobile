import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import request from '../utils/request';
import { changeDataType } from '../utils/handleData';

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'POST', body: options, Url: iface.getHospitalById }),
    { errormsg: '医院详情查询失败', ...action }, {}, { hospitalId: action.payload },
  );

  yield put({ type: 'updateViewedRow', payload: data });
}

/* 更新详情数据 */
export function updateViewedRow(state, action) {
  return update(state, { res: { detail: { $set: action.payload } } });
}
