import update from 'immutability-helper';
import moment from 'moment';
import { fetchAllData, updateAllData } from '../../reducers/inpatientpay';
import { removelocal } from '../../utils/localpath';

const pagespace = 'inpatientpaylist';
const pagepath = '/inpatientpay/list';
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
    saveStatus: (state, action) => { return update(state, { set: { status: { $set: action.payload } } }); },
    noVisitNo: (state, action) => { return update(state, { set: { notips: { $set: '您暂未绑卡，前往医院办理实体卡绑定后充值' } } }); },
    updateAllData,
  },

  effects: {
    fetchAllData: (action, { call, put, select }) => fetchAllData(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          if (query.no) {
            dispatch({ type: 'saveNO', payload: query.no });
            dispatch({ type: 'saveStatus', payload: query.status });
            dispatch({ type: 'fetchAllData', payload: query.no });
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
