const qs = require('qs');

const TOKEN = 'pigongting';

module.exports = {
  'GET /verifyurl': (request, response) => {
    const query = require('url').parse(request.url).query;
    const params = qs.parse(query);

    console.log(params);

    // 如果请求是GET，返回 echostr 用于通过服务器有效校验
    response.end(params.echostr);

    // res.status(200).json({
    //   code: 0,
    //   msg: '',
    // });
  },
  'GET /auth': (request, response) => {
    const query = require('url').parse(request.url).query;
    const params = qs.parse(query);

    console.log(params);

    // 如果请求是GET，返回 echostr 用于通过服务器有效校验
    response.end(params.echostr);

    // res.status(200).json({
    //   code: 0,
    //   msg: '',
    // });
  },
};
