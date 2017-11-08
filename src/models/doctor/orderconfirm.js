import update from 'immutability-helper';
import { fetchOrderConfirm, updateOrderConfirm, submitOrderConfirm, updateOrderID } from '../../reducers/doctor';
import { removelocal } from '../../utils/localpath';

const pagespace = 'doctororderconfirm';
const pagepath = '/doctor/orderconfirm';
const initstate = {
  req: {
    userId: 1,
  },
  res: {},
  set: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    saveID: (state, action) => { return update(state, { req: { doctorSchId: { $set: action.payload } } }); },
    updateOrderConfirm,
    updateOrderID,
  },

  effects: {
    fetchOrderConfirm: (action, { call, put, select }) => fetchOrderConfirm(action, { call, put, select }, pagespace),
    submitOrderConfirm: (action, { call, put, select }) => submitOrderConfirm(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          dispatch({ type: 'saveID', payload: query.id });
          dispatch({ type: 'fetchOrderConfirm', payload: query.id });
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
