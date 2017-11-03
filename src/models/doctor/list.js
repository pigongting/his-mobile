import update from 'immutability-helper';
import { fetchDoctorAllData, fetchNextNoTime, updateDoctorAllData, updateNextNoTime } from '../../reducers/doctor';
import { removelocal } from '../../utils/localpath';

const pagespace = 'doctorlist';
const pagepath = '/doctor/list';
const initstate = {
  req: {},
  res: {
    nextNumber: {
      outNoTime: null,
      nextNoTime: null,
    },
  },
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    saveID: (state, action) => { return update(state, { req: { deptid: { $set: action.payload } } }); },
    updateDoctorAllData,
    updateNextNoTime,
  },

  effects: {
    fetchDoctorAllData: (action, { call, put, select }) => fetchDoctorAllData(action, { call, put, select }, pagespace),
    fetchNextNoTime: (action, { call, put, select }) => fetchNextNoTime(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'saveID', payload: query.id });
          dispatch({ type: 'fetchDoctorAllData', payload: query.id });
          dispatch({ type: 'fetchNextNoTime', payload: query.id });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
