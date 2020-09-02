/* eslint-disable */
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const koaStatic = require('koa-static');

// 路由文件
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const chartRouter = require('./routes/chart');
const connectRouter = require('./routes/connect');
const demoRouter = require('./routes/demo');

const app = new Koa();
// 解析 POST 请求
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    uploadDir: path.join(__dirname, './public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
  },
}));

const router = new Router();

app.use(koaStatic(
  path.join(__dirname, './public')
))

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = 'Hello ChartFun!';
});

app.use(cors());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(chartRouter.routes()).use(chartRouter.allowedMethods());
app.use(connectRouter.routes()).use(connectRouter.allowedMethods());
app.use(demoRouter.routes()).use(demoRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
