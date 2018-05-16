import path from 'path';
import fs from 'fs';
import koaRouter from 'koa-router';
import http from 'http';
// import SocketIo from 'socket.io';
// import redisIo from 'socket.io-redis';
// import redis from 'redis';
import config from '../config';
// import Socket from './socket';


let _parse = (initPath, callback) => {

  fs.readdirSync(initPath).forEach((name) => {

    let itemPath = path.join(initPath, name)
      , stat = fs.statSync(itemPath);

    if (stat && stat.isDirectory(itemPath)) {
      _parse(itemPath, callback);

    } else {
      callback(itemPath);
    }

  });
}

class bootstrap {
  routes(application) {
    if (fs.existsSync(path.join(__dirname, '..', 'route'))) {
      _parse(path.join(__dirname, '..', 'route'), (itemPath) => {
        let router = require(itemPath);
        for (let i in router) {
          if (router[i] instanceof koaRouter) {
            application
              .use(router[i].routes())
              .use(router[i].allowedMethods());
          }
        }
      });
    }
  }

  events (){
    if (fs.existsSync(path.join(__dirname, '..', 'event'))) {
      _parse(path.join(__dirname, '..', 'event'), (itemPath, name) => {
        require(itemPath);
      });
    }
  }



  // sockets () {
  //   const socketIo = new SocketIo (http);

  //   socketIo.adapter(redisIo({
  //     pubClient : redis.createClient(config.redis.port, config.redis.host, { detect_buffers : true, auth_pass : config.redis.pass }),
  //     subClient : redis.createClient(config.redis.port, config.redis.host, { detect_buffers : true, auth_pass : config.redis.pass })
  //   }));
  //   // Socket.init(socketIo, function(component) {

  //   //   // EventBus handlers with sockets
  //   //   _parse(path.join(__dirname, '..', 'handlers', 'sockets'), function(itemPath, name) {
  //   //     require(itemPath)(component);
  //   //   });
  //   // });
  // }
}

let boot = new bootstrap()

export {boot}