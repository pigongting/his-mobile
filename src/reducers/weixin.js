import request from '../utils/request';

/* 获取用户Token */
export function *fetchUserToken(action, { call, put, select }) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'GET', body: options, Url: `http://192.168.3.201:8080/WeixinSoft/weixin/weixinlogin?code=${action.payload}` }),
    { errormsg: 'OpenId加载失败', ...action }, {}, undefined,
  );

  if (data.userToken && data.sysUserId) {
    localStorage.setItem('userToken', data.userToken);
    localStorage.setItem('sysUserId', data.sysUserId);
  }

  action.ohistory.goBack();
}

/* 获取 jssdk 签名 */
export function *fetchJSSDK(action, { call, put, select }) {
  const { data } = yield call(
    (atp, config, options) => request(atp, config, { method: 'GET', body: options, Url: `http://192.168.3.201:8080/WeixinSoft/weixin/configuration?url=${location.href}` }),
    { errormsg: 'JSSDK加载失败', ...action }, {}, undefined,
  );

  console.log(data);
  wx.config({
    debug: false,
    appId: 'wxc4ae33dcf63a96fa',
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: ['onMenuShareAppMessage', 'openProductSpecificView'],
  });

  wx.ready(() => {
    wx.openProductSpecificView({
      productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw',
      extInfo: '123',
    });
  });

  wx.error((res) => {
    console.log(res);
  });
}

/* 得到 oauth2 地址 */
export function getOauthAddress(fromurl) {
  return (`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc4ae33dcf63a96fa&redirect_uri=${fromurl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`);
}
