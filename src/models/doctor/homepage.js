import update from 'immutability-helper';
import { fetchViewedRow, fetchHaveNoDate, fetchNoTimeSlot, fetchNextNoTime, updateDoctorInfo, updateHaveNoDate, updateNoTimeSlot, updateNextNoTime } from '../../reducers/doctor';
import { removelocal } from '../../utils/localpath';

const pagespace = 'doctorhomepage';
const pagepath = '/doctor/homepage';
const initstate = {
  req: {},
  res: {},
  set: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    saveID: (state, action) => { return update(state, { req: { doctorId: { $set: action.payload } } }); },
    updateChoseDate: (state, action) => { return update(state, { set: { chosedate: { $set: action.payload } } }); },
    updateDoctorInfo,
    updateHaveNoDate,
    updateNoTimeSlot,
    updateNextNoTime,
  },

  effects: {
    fetchViewedRow: (action, { call, put, select }) => fetchViewedRow(action, { call, put, select }, pagespace),
    fetchHaveNoDate: (action, { call, put, select }) => fetchHaveNoDate(action, { call, put, select }, pagespace),
    fetchNoTimeSlot: (action, { call, put, select }) => fetchNoTimeSlot(action, { call, put, select }, pagespace),
    fetchNextNoTime: (action, { call, put, select }) => fetchNextNoTime(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'saveID', payload: query.id });
          dispatch({ type: 'fetchViewedRow', payload: query.id });
          dispatch({ type: 'fetchHaveNoDate', payload: query.id });
          dispatch({ type: 'fetchNextNoTime', payload: query.deptid });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
