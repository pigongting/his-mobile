import React from 'react';
import PageFrame from './routes/PageFrame';

function registerModel(app, model) {
  if (app && !(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
}

function Routes(locale, app) {
  return [
    {
      path: `/${locale}/index`,
      component: PageFrame,
      getIndexRoute(nextState, cb) {
        if (process.env.NODE_ENV === 'development') {
          import(/* webpackChunkName: "Index" */ './routes/Index')
          .then((data) => {
            registerModel(app, require('./models/index'));
            cb(null, { component: data });
          })
          .catch(err => console.log('Failed to load Index', err));
        } else {
          registerModel(app, require('./models/index'));
          cb(null, { component: require('./routes/Index') });
        }
      },
      childRoutes: [
        {
          path: `/${locale}/hospital`,
          childRoutes: [
            {
              path: 'article',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Hospital/Article" */ './routes/Hospital/Article')
                  .then((data) => {
                    registerModel(app, require('./models/hospital/article'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Hospital/Article', err));
                } else {
                  registerModel(app, require('./models/hospital/article'));
                  cb(null, require('./routes/Hospital/Article'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/dept`,
          childRoutes: [
            {
              path: 'list',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Dept/List" */ './routes/Dept/List')
                  .then((data) => {
                    registerModel(app, require('./models/dept/list'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Dept/List', err));
                } else {
                  registerModel(app, require('./models/dept/list'));
                  cb(null, require('./routes/Dept/List'));
                }
              },
            },
            {
              path: 'article',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Dept/Article" */ './routes/Dept/Article')
                  .then((data) => {
                    registerModel(app, require('./models/dept/article'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Dept/Article', err));
                } else {
                  registerModel(app, require('./models/dept/article'));
                  cb(null, require('./routes/Dept/Article'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/doctor`,
          childRoutes: [
            {
              path: 'list',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Doctor/List" */ './routes/Doctor/List')
                  .then((data) => {
                    registerModel(app, require('./models/doctor/list'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Doctor/List', err));
                } else {
                  registerModel(app, require('./models/doctor/list'));
                  cb(null, require('./routes/Doctor/List'));
                }
              },
            },
            {
              path: 'homepage',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Doctor/HomePage" */ './routes/Doctor/HomePage')
                  .then((data) => {
                    registerModel(app, require('./models/doctor/homepage'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Doctor/HomePage', err));
                } else {
                  registerModel(app, require('./models/doctor/homepage'));
                  cb(null, require('./routes/Doctor/HomePage'));
                }
              },
            },
            {
              path: 'orderconfirm',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Doctor/OrderConfirm" */ './routes/Doctor/OrderConfirm')
                  .then((data) => {
                    registerModel(app, require('./models/doctor/orderconfirm'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Doctor/OrderConfirm', err));
                } else {
                  registerModel(app, require('./models/doctor/orderconfirm'));
                  cb(null, require('./routes/Doctor/OrderConfirm'));
                }
              },
            },
            {
              path: 'orderlist',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Doctor/OrderList" */ './routes/Doctor/OrderList')
                  .then((data) => {
                    registerModel(app, require('./models/doctor/orderlist'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Doctor/OrderList', err));
                } else {
                  registerModel(app, require('./models/doctor/orderlist'));
                  cb(null, require('./routes/Doctor/OrderList'));
                }
              },
            },
            {
              path: 'orderdetail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Doctor/OrderDetail" */ './routes/Doctor/OrderDetail')
                  .then((data) => {
                    registerModel(app, require('./models/doctor/orderdetail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Doctor/OrderDetail', err));
                } else {
                  registerModel(app, require('./models/doctor/orderdetail'));
                  cb(null, require('./routes/Doctor/OrderDetail'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/visitmen`,
          childRoutes: [
            {
              path: 'list',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "VisitMen/List" */ './routes/VisitMen/List')
                  .then((data) => {
                    registerModel(app, require('./models/visitmen/list'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load VisitMen/List', err));
                } else {
                  registerModel(app, require('./models/visitmen/list'));
                  cb(null, require('./routes/VisitMen/List'));
                }
              },
            },
            {
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "VisitMen/Detail" */ './routes/VisitMen/Detail')
                  .then((data) => {
                    registerModel(app, require('./models/visitmen/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load VisitMen/Detail', err));
                } else {
                  registerModel(app, require('./models/visitmen/detail'));
                  cb(null, require('./routes/VisitMen/Detail'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/visitcard`,
          childRoutes: [
            {
              path: 'recharge',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "VisitCard/Recharge" */ './routes/VisitCard/Recharge')
                  .then((data) => {
                    registerModel(app, require('./models/visitcard/recharge'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load VisitCard/Recharge', err));
                } else {
                  registerModel(app, require('./models/visitcard/recharge'));
                  cb(null, require('./routes/VisitCard/Recharge'));
                }
              },
            },
            {
              path: 'rechargerecord',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "VisitCard/RechargeRecord" */ './routes/VisitCard/RechargeRecord')
                  .then((data) => {
                    registerModel(app, require('./models/visitcard/rechargerecord'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load VisitCard/RechargeRecord', err));
                } else {
                  registerModel(app, require('./models/visitcard/rechargerecord'));
                  cb(null, require('./routes/VisitCard/RechargeRecord'));
                }
              },
            },
            {
              path: 'rechargedetail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "VisitCard/RechargeDetail" */ './routes/VisitCard/RechargeDetail')
                  .then((data) => {
                    registerModel(app, require('./models/visitcard/rechargedetail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load VisitCard/RechargeDetail', err));
                } else {
                  registerModel(app, require('./models/visitcard/rechargedetail'));
                  cb(null, require('./routes/VisitCard/RechargeDetail'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/report`,
          childRoutes: [
            {
              path: 'list',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Report/List" */ './routes/Report/List')
                  .then((data) => {
                    registerModel(app, require('./models/report/list'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Report/List', err));
                } else {
                  registerModel(app, require('./models/report/list'));
                  cb(null, require('./routes/Report/List'));
                }
              },
            },
            {
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "Report/Detail" */ './routes/Report/Detail')
                  .then((data) => {
                    registerModel(app, require('./models/report/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load Report/Detail', err));
                } else {
                  registerModel(app, require('./models/report/detail'));
                  cb(null, require('./routes/Report/Detail'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/outpatientpay`,
          childRoutes: [
            {
              path: 'list',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "OutpatientPay/List" */ './routes/OutpatientPay/List')
                  .then((data) => {
                    registerModel(app, require('./models/outpatientpay/list'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load OutpatientPay/List', err));
                } else {
                  registerModel(app, require('./models/outpatientpay/list'));
                  cb(null, require('./routes/OutpatientPay/List'));
                }
              },
            },
            {
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "OutpatientPay/Detail" */ './routes/OutpatientPay/Detail')
                  .then((data) => {
                    registerModel(app, require('./models/outpatientpay/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load OutpatientPay/Detail', err));
                } else {
                  registerModel(app, require('./models/outpatientpay/detail'));
                  cb(null, require('./routes/OutpatientPay/Detail'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/inpatientpay`,
          childRoutes: [
            {
              path: 'inputnumber',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "InpatientPay/InputNumber" */ './routes/InpatientPay/InputNumber')
                  .then((data) => {
                    registerModel(app, require('./models/inpatientpay/inputnumber'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load InpatientPay/InputNumber', err));
                } else {
                  registerModel(app, require('./models/inpatientpay/inputnumber'));
                  cb(null, require('./routes/InpatientPay/InputNumber'));
                }
              },
            },
            {
              path: 'list',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "InpatientPay/List" */ './routes/InpatientPay/List')
                  .then((data) => {
                    registerModel(app, require('./models/inpatientpay/list'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load InpatientPay/List', err));
                } else {
                  registerModel(app, require('./models/inpatientpay/list'));
                  cb(null, require('./routes/InpatientPay/List'));
                }
              },
            },
            {
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "InpatientPay/Detail" */ './routes/InpatientPay/Detail')
                  .then((data) => {
                    registerModel(app, require('./models/inpatientpay/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load InpatientPay/Detail', err));
                } else {
                  registerModel(app, require('./models/inpatientpay/detail'));
                  cb(null, require('./routes/InpatientPay/Detail'));
                }
              },
            },
            {
              path: 'homepage',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "InpatientPay/HomePage" */ './routes/InpatientPay/HomePage')
                  .then((data) => {
                    registerModel(app, require('./models/inpatientpay/homepage'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load InpatientPay/HomePage', err));
                } else {
                  registerModel(app, require('./models/inpatientpay/homepage'));
                  cb(null, require('./routes/InpatientPay/HomePage'));
                }
              },
            },
            {
              path: 'deposit',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "InpatientPay/Deposit" */ './routes/InpatientPay/Deposit')
                  .then((data) => {
                    registerModel(app, require('./models/inpatientpay/deposit'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load InpatientPay/Deposit', err));
                } else {
                  registerModel(app, require('./models/inpatientpay/deposit'));
                  cb(null, require('./routes/InpatientPay/Deposit'));
                }
              },
            },
            {
              path: 'info',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "InpatientPay/Info" */ './routes/InpatientPay/Info')
                  .then((data) => {
                    registerModel(app, require('./models/inpatientpay/info'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load InpatientPay/Info', err));
                } else {
                  registerModel(app, require('./models/inpatientpay/info'));
                  cb(null, require('./routes/InpatientPay/Info'));
                }
              },
            },
          ],
        },
        {
          path: `/${locale}/user`,
          childRoutes: [
            {
              path: 'homepage',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === 'development') {
                  import(/* webpackChunkName: "User/HomePage" */ './routes/User/HomePage')
                  .then((data) => {
                    registerModel(app, require('./models/user/homepage'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load User/HomePage', err));
                } else {
                  registerModel(app, require('./models/user/homepage'));
                  cb(null, require('./routes/User/HomePage'));
                }
              },
            },
          ],
        },
      ],
    },
  ];
}

export default Routes;
