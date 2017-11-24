import update from 'immutability-helper';
import moment from 'moment';
import { fetchViewedRow, updateViewedRow } from '../../reducers/inpatientinfo';
import { removelocal } from '../../utils/localpath';

const pagespace = 'inpatientpayhomepage';
const pagepath = '/inpatientpay/homepage';
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
    saveNO: (state, action) => { return update(state, { set: { no: { $set: action.payload } } }); },
    noVisitNo: (state, action) => { return update(state, { set: { notips: { $set: '无效住院号，请返回重新输入！' } } }); },
    updateViewedRow,
  },

  effects: {
    fetchViewedRow: (action, { call, put, select }) => fetchViewedRow(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          if (query.no) {
            dispatch({ type: 'saveNO', payload: query.no });
            dispatch({ type: 'fetchViewedRow', payload: query.no });
          } else {
            dispatch({ type: 'noVisitNo' });
          }
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
