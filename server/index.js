import Koa from 'koa';
import staticFile from 'koa2-file-server';
import path from 'path';
import body from 'koa-body';
import passport from 'koa-passport';
import os from 'os';


import { boot as bootstrap } from './component/bootstrap';
import config from './config';
import secretKey from './component/secretKey';
// import crypto from './component/asymmetricEncryption';
import token from './component/token';
import start from './start';

try {
  secretKey.init();
  secretKey.scheduleStart();
  token.scheduleStart();
} catch (err) {
  console.error(err);
}

start();

const app = new Koa();


app.use(passport.initialize());

app.use(
  body({
    multipart: true,
    formidable: {
      uploadDir: os.tmpdir(),
    },
  }));


app.use(staticFile(path.join(__dirname, '/../apidoc'), {
  maxAge: config.staticMaxAge,
}));

app.use(async (ctr, next) => {
  const temp = ctr;
  temp.req.query = ctr.query;
  await next();
});

bootstrap.routes(app);
bootstrap.events();


app.listen(config.http.port, () => {
  console.log([new Date(), 'Server started on', config.http.port].join(' '));
});
