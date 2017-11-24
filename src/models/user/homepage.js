import update from 'immutability-helper';
import { removelocal } from '../../utils/localpath';

const pagespace = 'homepage';
const pagepath = '/user/homepage';
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
