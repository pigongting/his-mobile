import update from 'immutability-helper';
import { fetchAllData, updateAllData } from '../../reducers/map';
import { removelocal } from '../../utils/localpath';

const pagespace = 'deptarticle';
const pagepath = '/dept/article';
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
    updateBuildingArray: (state, action) => {
      return update(state, {
        res: {
          idTypeArray: { $set: action.payload },
        },
      });
    },
    updateAllData,
  },

  effects: {
    fetchAllData: (action, { call, put, select }) => fetchAllData(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'fetchAllData' });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
