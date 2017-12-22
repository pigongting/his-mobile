import { fetchUserToken, fetchJSSDK, getOauthAddress } from '../reducers/weixin';

const initstate = {};

export default {

  namespace: 'pageframe',

  state: initstate,

  reducers: {},

  effects: {
    fetchUserToken: (action, { call, put, select }) => fetchUserToken(action, { call, put, select }),
    fetchJSSDK: (action, { call, put, select }) => fetchJSSDK(action, { call, put, select }),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      localStorage.setItem('sysUserId', 1);
      return history.listen(({ pathname, query }) => {
        // dispatch({ type: 'fetchJSSDK' });

        // if (!localStorage.getItem('userToken')) {
        //   if (query.code) {
        //     dispatch({ type: 'fetchUserToken', payload: query.code, ohistory: history });
        //   } else {
        //     location.href = getOauthAddress(encodeURIComponent(location.href));
        //   }
        // }
      });
    },
  },

};
