import update from 'immutability-helper';
import { fetchViewedRow, updateViewedRow } from '../../reducers/visitmen';
import { updateCascadAddr } from '../../reducers/cascadAddr';
import { removelocal } from '../../utils/localpath';

const pagespace = 'visitmendetail';
const pagepath = '/visitmen/detail';
const initstate = {
  req: { visitmen: {} },
  res: {},
  set: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    saveID: (state, action) => { return update(state, { req: { visitmenid: { $set: action.payload } } }); },
    saveFields: (state, action) => {
      const oldvisitmen = state.req.visitmen;

      for (const key in action.payload) {
        if (!oldvisitmen[key]) { oldvisitmen[key] = {}; }
        oldvisitmen[key] = action.payload[key];
      }

      return update(state, { req: { visitmen: { $set: oldvisitmen } } });
    },
    updateViewedRow,
    updateCascadAddr,
  },

  effects: {
    fetchViewedRow: (action, { call, put, select }) => fetchViewedRow(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          // dispatch({ type: 'saveID', payload: query.id });
          // dispatch({ type: 'fetchViewedRow', payload: query.id });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
