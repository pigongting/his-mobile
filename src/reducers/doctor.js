import update from 'immutability-helper';
import moment from 'moment';
import * as fetch from '../services/doctor';

/* 查看 */
export function *fetchViewedRow(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.viewedRow, { errormsg: '医生信息加载失败', ...action }, {}, {
    doctorId: action.payload,
  });
  yield put({ type: 'updateDoctorInfo', payload: data });
}

/* 列出分页数据 */
export function *fetchDoctorAllData(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.listAllData, { errormsg: '医生列表加载失败', ...action }, {}, {
    hospitalDeptId: action.payload,
  });
  yield put({ type: 'updateDoctorAllData', payload: data });
}

/* 获取下轮放号时间 */
export function *fetchNextNoTime(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.getNextNoTime, { errormsg: '下轮放号时间加载失败', ...action }, {}, {
    hospitalDeptId: action.payload,
  });
  yield put({ type: 'updateNextNoTime', payload: data });
}

/* 获取号码时间段 */
export function *fetchNoTimeSlot(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.getNoTimeSlot, { errormsg: '号码时间段加载失败', ...action }, {}, action.payload);

  const newData = {};

  for (let k = 0; k < data.length; k++) {
    const hours = parseInt(moment(data[k].startTime).format('HH'), 10);

    if (hours >= 12) {
      if (!newData.pm) { newData.pm = []; }
      newData.pm.push(data[k]);
    } else {
      if (!newData.am) { newData.am = []; }
      newData.am.push(data[k]);
    }
  }

  yield put({ type: 'updateNoTimeSlot', payload: newData });
}

/* 获取有号日期 */
export function *fetchHaveNoDate(action, { call, put, select }, namespace) {
  const { data } = yield call(fetch.getHaveNoDate, { errormsg: '有号日期加载失败', ...action }, {}, {
    doctorId: action.payload,
  });

  // 生成 10 天
  const newData = [];
  const newTimestamp = new Date().getTime();
  for (let i = 0; i < 10; i++) {
    const forTimestamp = newTimestamp + (i * 86400000);

    for (let k = 0; k < data.length; k++) {
      if (moment(forTimestamp).format('YYYY-MM-DD') === moment(data[k].schDate).format('YYYY-MM-DD')) {
        newData.push({
          date: data[k].schDate,
          text: '预约',
        });
        break;
      }

      if (k === data.length - 1) {
        newData.push({
          date: forTimestamp,
        });
      }
    }
  }

  yield put({
    type: 'updateHaveNoDate',
    payload: newData,
  });
}

/* 更新分页数据 */
export function updateDoctorAllData(state, action) {
  return update(state, { res: { rows: { $set: action.payload } } });
}

/* 更新下轮放号时间 */
export function updateNextNoTime(state, action) {
  return update(state, { res: { nextNumber: { $set: action.payload } } });
}

/* 更新有号日期 */
export function updateHaveNoDate(state, action) {
  return update(state, { res: { datelist: { $set: action.payload } } });
}

/* 更新号码时间段 */
export function updateNoTimeSlot(state, action) {
  return update(state, { res: { timeslot: { $set: action.payload } } });
}

/* 更新医生信息 */
export function updateDoctorInfo(state, action) {
  return update(state, { res: { doctor: { $set: action.payload } } });
}
