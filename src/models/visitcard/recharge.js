import update from 'immutability-helper';
import moment from 'moment';
import { fetchViewedRowByNo, updateVisitCardInfo } from '../../reducers/visitcard';
import { fetchInsertRow } from '../../reducers/visitcardrecharge';
import { removelocal } from '../../utils/localpath';

const pagespace = 'visitcardrecharge';
const pagepath = '/visitcard/recharge';
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
    noVisitNo: (state, action) => { return update(state, { set: { notips: { $set: '您暂未绑卡，前往医院办理实体卡绑定后充值' } } }); },
    saveFields: (state, action) => {
      const oldvisitmen = state.set.visitmen;
      const newvisitmen = oldvisitmen || {};

      for (const key in action.payload) {
        if (!newvisitmen[key]) { newvisitmen[key] = {}; }
        newvisitmen[key] = action.payload[key];
      }

      return update(state, { set: {
        visitmen: { $set: newvisitmen },
        chooseMoney: { $set: (newvisitmen.inputmoney && newvisitmen.inputmoney.value) ? 0 : state.set.chooseMoney },
      } });
    },
    changeChooseMoney: (state, action) => {
      return update(state, { set: {
        chooseMoney: { $set: action.payload },
        visitmen: { $set: { inputmoney: { value: '' } } },
      } });
    },
    updateVisitCardInfo,
  },

  effects: {
    fetchViewedRowByNo: (action, { call, put, select }) => fetchViewedRowByNo(action, { call, put, select }, pagespace),
    fetchInsertRow: (action, { call, put, select }) => fetchInsertRow(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          console.log(query);
          if (query.no) {
            dispatch({ type: 'saveNO', payload: query.no });
            dispatch({ type: 'fetchViewedRowByNo', payload: query.no });
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
