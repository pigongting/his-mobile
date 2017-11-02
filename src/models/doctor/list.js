import update from 'immutability-helper';
import { fetchDeptAllData, updateDeptAllData } from '../../reducers/doctor';
import { removelocal } from '../../utils/localpath';

const pagespace = 'doctorlist';
const pagepath = '/doctor/list';
const initstate = {
  res: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    updateDeptAllData,
  },

  effects: {
    fetchDeptAllData: (action, { call, put, select }) => fetchDeptAllData(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'fetchDeptAllData', payload: query.id });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
