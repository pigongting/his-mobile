import update from 'immutability-helper';
import moment from 'moment';
import { fetchViewedRow, updateViewedRow, fetchDetailList, updateDetailList } from '../../reducers/outpatientpay';
import { removelocal } from '../../utils/localpath';

const pagespace = 'outpatientpaydetail';
const pagepath = '/outpatientpay/detail';
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
    saveID: (state, action) => { return update(state, { set: { id: { $set: action.payload } } }); },
    saveStatus: (state, action) => { return update(state, { set: { status: { $set: action.payload } } }); },
    updateViewedRow,
    updateDetailList,
  },

  effects: {
    fetchViewedRow: (action, { call, put, select }) => fetchViewedRow(action, { call, put, select }, pagespace),
    fetchDetailList: (action, { call, put, select }) => fetchDetailList(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          if (query.id) {
            dispatch({ type: 'saveID', payload: query.id });
            dispatch({ type: 'saveStatus', payload: query.status });
            dispatch({ type: 'fetchViewedRow', payload: query.id });
          }
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
