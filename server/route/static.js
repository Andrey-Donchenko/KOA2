import send from 'koa-send';
import config from '../config';
import koaRouter from 'koa-router';

export let router = koaRouter({
  prefix: ''
});

router.get([
    '/',
  ], async (ctr,next) => {
    await send(ctr, config.clientMainFile);
    await next();
  });

/**
  * @apiDefine accessTokenError
  * @apiError {Object} AccessTokenIncorrect { param : 'accessToken', message : 'Access token is incorrect'}
  * @apiError {Object} AccessTokenExpired { param : 'accessToken', message : 'Access token is expired'}
  * @apiError {Object} UserNotFound { param : 'accessToken', message : 'User not found'}
*/
