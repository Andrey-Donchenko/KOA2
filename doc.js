const Koa = require('koa');
const staticFile = require('koa2-file-server');
const send = require('koa-send');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

const port = 3001;

const app = new Koa();
router.get('/', async (ctx, next) => {
  await send(ctx, '/apidoc/index.html');
  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(staticFile(path.join(__dirname, '/apidoc')));

app.listen(port, () => {
  console.log([new Date(), 'Server started on', port].join(' '));
});
