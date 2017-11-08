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
    updateVisitMenAllData,
  },

  effects: {
    fetchVisitMenAllData: (action, { call, put, select }) => fetchVisitMenAllData(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'fetchVisitMenAllData', payload: query.id });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
