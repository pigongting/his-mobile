import PxToRem from 'postcss-pxtorem';
import path from 'path';

export default {
  entry: {
    app: "./src/index.js",
    common: "./src/vendor.js"
  },
  multipage: true,
  publicPath: "/static/",
  theme: "./theme.config.js" ,
  svgSpriteDirs: [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
    path.resolve(__dirname, 'public'),
  ],
  extraPostCSSPlugins: [
    PxToRem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
  devServer: {
    disableHostCheck: true
  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        ["import", [{libraryName: "antd-mobile", libraryDirectory: "lib", style: true}]]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        ["import", [{libraryName: "antd-mobile", libraryDirectory: "lib", style: true}]]
      ]
    }
  }
};
