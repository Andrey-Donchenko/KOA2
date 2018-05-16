import config from '../config';
import koaRouter from 'koa-router';
import middlewareWrapper from '../component/middlewareWrapper';

export let router = koaRouter({
  prefix: ''
});

if (config.allowCrosOrigin) {
  router.all('*', async function(req, next) {
    middlewareWrapper.headerSet(req);
    if ('OPTIONS' == req.method) {
      req.status = 200;
      req.body = 'OK';
    }
    else {
      await next();
    }
  });
}