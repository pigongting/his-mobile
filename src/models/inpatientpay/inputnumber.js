import update from 'immutability-helper';
import { removelocal } from '../../utils/localpath';

const pagespace = 'inpatientpayinputnumber';
const pagepath = '/inpatientpay/inputnumber';
const initstate = {
  req: {
    realName: { value: '皮宫庭' },
    inpatientNo: { value: '123456' },
  },
  res: {},
  set: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: (state) => { return update(state, { $set: initstate }); },
    saveFields: (state, action) => {
      const oldreq = state.req;
      const newreq = oldreq || {};

      for (const key in action.payload) {
        if (!newreq[key]) { newreq[key] = {}; }
        newreq[key] = action.payload[key];
      }

      return update(state, { req: { $set: newreq } });
    },
  },

  effects: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          console.log(pathname);
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
