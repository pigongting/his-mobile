import React from 'react';
import { removelocal } from '../utils/localpath';

const initstate = {};

export default {

  namespace: 'index',

  state: initstate,

  reducers: {},

  effects: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === '/index') {
          // console.log(removelocal(pathname));
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
