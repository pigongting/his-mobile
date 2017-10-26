import update from 'immutability-helper';
import { fetchDeptTreeData, updateDeptTreeData } from '../../reducers/dept';
import { removelocal } from '../../utils/localpath';

const pagespace = 'deptlist';
const pagepath = '/dept/list';
const initstate = {
  res: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    updateDeptTreeData,
  },

  effects: {
    fetchDeptTreeData: (action, { call, put, select }) => fetchDeptTreeData(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'fetchDeptTreeData' });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
