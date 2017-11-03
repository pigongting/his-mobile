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
          ],
        },
      ],
    },
  ];
}

export default Routes;
