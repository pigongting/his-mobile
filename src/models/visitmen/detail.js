import update from 'immutability-helper';
import moment from 'moment';
import { fetchViewedRow, updateViewedRow, fetchInsertRow, fetchDeleteRow } from '../../reducers/visitmen';
import { fetchVisitCardInsertRow, fetchVisitCardDeleteRow, updateVisitCardViewedRow } from '../../reducers/visitcard';
import { updateCascadAddr } from '../../reducers/cascadAddr';
import { removelocal } from '../../utils/localpath';

const pagespace = 'visitmendetail';
const pagepath = '/visitmen/detail';
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
    saveID: (state, action) => { return update(state, { req: { visitmenid: { $set: action.payload } } }); },
    saveFields: (state, action) => {
      const oldvisitmen = state.req.visitmen;
      const newvisitmen = oldvisitmen || {};

      for (const key in action.payload) {
        if (!newvisitmen[key]) { newvisitmen[key] = {}; }
        newvisitmen[key] = action.payload[key];
      }

      return update(state, { req: { visitmen: { $set: newvisitmen } } });
    },
    updateViewedRow,
    updateCascadAddr,
    updateVisitCardViewedRow,
  },

  effects: {
    fetchViewedRow: (action, { call, put, select }) => fetchViewedRow(action, { call, put, select }, pagespace),
    fetchInsertRow: (action, { call, put, select }) => fetchInsertRow(action, { call, put, select }, pagespace),
    fetchDeleteRow: (action, { call, put, select }) => fetchDeleteRow(action, { call, put, select }, pagespace),
    fetchVisitCardInsertRow: (action, { call, put, select }) => fetchVisitCardInsertRow(action, { call, put, select }, pagespace),
    fetchVisitCardDeleteRow: (action, { call, put, select }) => fetchVisitCardDeleteRow(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          if (query.id) {
            dispatch({ type: 'saveID', payload: query.id });
            dispatch({ type: 'fetchViewedRow', payload: query.id });
          }
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
