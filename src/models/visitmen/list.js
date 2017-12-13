import update from 'immutability-helper';
import { fetchVisitMenAllData, updateVisitMenAllData } from '../../reducers/visitmen';
import { removelocal } from '../../utils/localpath';

const pagespace = 'visitmenlist';
const pagepath = '/visitmen/list';
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
    saveFrom: (state, action) => { return update(state, { set: { from: { $set: action.payload } } }); },
    updateVisitMenAllData,
  },

  effects: {
    fetchVisitMenAllData: (action, { call, put, select }) => fetchVisitMenAllData(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname);
        if (removelocal(pathname) === pagepath) {
          if (query.from) {
            dispatch({ type: 'saveFrom', payload: query.from });
          }

          dispatch({ type: 'fetchVisitMenAllData' });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
