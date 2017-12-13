import React from 'react';
import { removelocal } from '../utils/localpath';

const pagespace = 'index';
const pagepath = '/index';
const initstate = {
  req: {},
  res: {},
  set: {},
};

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {},

  effects: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(query);
      });
    },
  },

};
