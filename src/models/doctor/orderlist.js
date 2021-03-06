import update from 'immutability-helper';
import { fetchGuaHaoPre, updateGuaHaoPre } from '../../reducers/doctor';
import { removelocal } from '../../utils/localpath';

const pagespace = 'doctororderlist';
const pagepath = '/doctor/orderlist';
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
    updateGuaHaoPre,
  },

  effects: {
    fetchGuaHaoPre: (action, { call, put, select }) => fetchGuaHaoPre(action, { call, put, select }, pagespace),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === pagepath) {
          if (query.no) {
            dispatch({ type: 'saveNO', payload: query.no });
            dispatch({ type: 'fetchGuaHaoPre', payload: query.no });
          }
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
