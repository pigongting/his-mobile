import update from 'immutability-helper';
import Toast from 'antd-mobile/lib/toast';
import * as fetch from '../services/visitmen';
import { changeDataType } from '../utils/handleData';

/* 插入 */
export function *fetchInsertRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.insertRow, { errormsg: '就诊人插入失败', ...action }, {}, action.payload);

  Toast.success('添加成功 !!!', 1, () => {
    action.that._reactInternalInstance._context.router.push(`/${action.that.props.locale}/visitmen/detail?id=${data}`);
  });
}

/* 删除 */
export function *fetchDeleteRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.deleteRow, { errormsg: '就诊人删除失败', ...action }, {}, {
    userId: action.payload,
  });

  Toast.success('删除成功 !!!', 1, () => { action.that._reactInternalInstance._context.router.goBack(); });
}

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRow, { errormsg: '就诊人加载失败', ...action }, {}, {
    userId: action.payload,
  });

  try {
    if (data) {
      const changedata = changeDataType(data, [
        {
          field: 'pcaCode',
          target: 'addrlevel',
        },
        {
          field: 'birthday',
          target: 'time2time',
        },
        {
          field: 'gender',
          target: 'number2arraystring',
        },
        {
          field: 'idType',
          target: 'number2arraystring',
        },
      ]);

      const newdata = {};

      for (const key in changedata) {
        if (key) {
          newdata[key] = {
            value: changedata[key],
          };
        }
      }

      yield put({ type: 'updateViewedRow', payload: newdata });
    }
  } catch (e) {
    console.log(e);
  }
}

/* 列出全部数据 */
export function *fetchVisitMenAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.listAllData, { errormsg: '就诊人列表加载失败', ...action }, {}, {
    sysUserId: 1,
  });
  yield put({ type: 'updateVisitMenAllData', payload: data });
}

/* 更新全部数据 */
export function updateVisitMenAllData(state, action) {
  return update(state, { res: { visitmenlist: { $set: action.payload } } });
}

/* 更新就诊人信息 */
export function updateViewedRow(state, action) {
  return update(state, { req: { visitmen: { $set: action.payload } } });
}
