/* eslint-disable */
const Router = require('koa-router');
const router = new Router();
router.prefix('/user');
const userlist = [{
  username: "123",
  password: "123",
  _id: new Date().getTime()
}]
global.userList = userlist // 不然访问不到
router.post('/login', async (ctx, next) => {
  const body = ctx.request.body;
  const user = body.user;
  const pass = body.pass;
  const u = userList.find( item => item.username === user && item.password === pass )
  if (u) {
    ctx.body = {
      errno: 0,
      data: {
        uid: u._id,
        name: u.username
      }
    }
  } else {
    ctx.body = {
      errno: 1,
      errmsg: '用户名或密码错误'
    }
  }
});

router.post('/reg', async (ctx, next) => {
  const body = ctx.request.body;

  // 检查是否存在
  const row = userList.find( item => item.username === user  )
  if (row) {
    ctx.body = {
      errno: 2,
      errmsg: '用户名已存在'
    }
  } else {
    const _id = new Date().getTime()
    const u = userlist.push({
      username: body.user,
      password: body.pass,
      _id
    })
    ctx.body = {
      errno: 0,
      data: {
        uid: u._id,
        name: u.username
      }
    }
  }
});

module.exports = router;
