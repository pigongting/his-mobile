import update from 'immutability-helper';
// 处理 国际化地址 的函数
import { removelocal, removelocalkeepmain, removelocalkeepsub, removelocalkeepthree } from '../utils/localpath';

const initstate = {};

export default {

  namespace: 'pageframe',

  state: initstate,

  reducers: {},

  effects: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (removelocal(pathname) === '/index') {
          // dispatch({ type: 'toggleMainSiderCollapsed', payload: false });
        } else {
          // dispatch({ type: 'toggleMainSiderCollapsed', payload: true });
        }
      });
    },
  },

};
