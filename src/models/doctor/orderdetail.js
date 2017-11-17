import update from 'immutability-helper';
import { fetchOrderDetail, updateOrderDetail, fetchCancelGuaHaoPre } from '../../reducers/doctor';
import { removelocal } from '../../utils/localpath';

const pagespace = 'doctororderdetail';
const pagepath = '/doctor/orderdetail';
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
    saveID: (state, action) => { return update(state, { req: { doctorSchId: { $set: action.payload } } }); },
    updateOrderDetail,
  },

  effects: {
    fetchOrderDetail: (action, { call, put, select }) => fetchOrderDetail(action, { call, put, select }, pagespace),
    fetchCancelGuaHaoPre: (action, { call, put, select }) => fetchCancelGuaHaoPre(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'saveID', payload: query.id });
          dispatch({ type: 'fetchOrderDetail', payload: query.id });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
