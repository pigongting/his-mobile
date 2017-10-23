import React from 'react';
import update from 'immutability-helper';
// 请求 服务
import * as usersService from '../services/index';
// 处理 国际化地址 的函数
import { removelocal } from '../utils/localpath';
// 处理 onError 的函数
import { retry } from '../utils/requesterror';

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
          console.log(removelocal(pathname));
        } else {
          dispatch({ type: 'resetstate' });
        }
      });
    },
  },

};
