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
  },
  proxy: {
    "/weixin": {
      target: "http://192.168.3.201:8080/WiseMedical",
      changeOrigin: true,
      pathRewrite: { "^/weixin" : "" }
    }
  },
};
