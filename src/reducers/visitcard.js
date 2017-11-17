import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import * as fetch from '../services/visitcard';
import { changeDataType } from '../utils/handleData';

/* 插入 */
export function *fetchVisitCardInsertRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.insertRow, { errormsg: '就诊卡绑定失败', ...action }, {}, action.payload);
  const { dispatch, pagespace, req } = action.that.props.pagedata;

  Toast.success('绑定成功 !!!', 1, () => {
    dispatch({ type: `${pagespace}/fetchViewedRow`, payload: req.visitmenid });
  });
}

/* 删除 */
export function *fetchVisitCardDeleteRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.deleteRow, { errormsg: '就诊卡解绑失败', ...action }, {}, action.payload);
  const { dispatch, pagespace, req } = action.that.props.pagedata;

  Toast.success('解绑成功 !!!', 1, () => {
    dispatch({ type: `${pagespace}/fetchViewedRow`, payload: req.visitmenid });
  });
}

/* 查看 */
export function *fetchViewedRowByNo(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRowByNo, { errormsg: '就诊卡信息加载失败', ...action }, {}, {
    visitNo: action.payload,
  });
  yield put({ type: 'updateVisitCardInfo', payload: data[0] });
}

/* 更新就诊卡信息 */
export function updateVisitCardInfo(state, action) {
  return update(state, { res: { visitcardinfo: { $set: action.payload } } });
}
