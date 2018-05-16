import redis from 'redis';
import async from 'async';
import config from '../config';
import {eventBus}  from './eventBus';
// import {User}  from "../model/write/user";
let store = redis.createClient(config.redis.port, config.redis.host, { detect_buffers : true, auth_pass : config.redis.pass });

store.select(config.socketsStorageDb);
store.on('error', function (err) {
  console.error("Redis error: " + err);
});

process.on('exit', function(code) {
  console.log('Exit with code:', code);
  store.flushdb();
});

export default function Socket() {}

Socket.appId = config.app.name;
Socket.room = 'room_' + Socket.appId;

Socket.on = function(event, callback) {
  var listenerCount = eventBus.listeners(event).length;
  if (listenerCount) {
    console.log('Leak issue: ' + event + '. Count: ' + listenerCount);
    eventBus.removeAllListeners(event);
  }

  if (callback.length == 2) {
    eventBus.onSeries(event, callback);
  } else {
    eventBus.on(event, callback);
  }
  store.sadd('socketHandlers', event);
}

Socket.emitToSockets = function(userIds, event, data, callback) {
  userIds.forEach(function(userId) {
    Socket.emitToSocket(userId, event, data);
  });
  callback && callback();
};

function emitToSocket(socketIds, event, data, callback) {
  socketIds[0] && eventBus.emit('toSocket:' + socketIds[0] + ':' + event, data);
  callback && callback(err);
};


function emitToSockets(socketIds, event, data) {
  socketIds.forEach(function(socketId,index,arr){
    eventBus.emit('toSocket:' + socketId + ':' + event, data);
  });

};

Socket.emitToSocket = function(userId, events, data, callback) {
  store.smembers(userId, function(err, socketIds) {
    if (err) {
      return console.error(err);
    }

    if (events instanceof Array) {
      events.forEach(function(event) {
        emitToSockets(socketIds, event, data);
      });
    } else {
      emitToSockets(socketIds, events, data);
    }
    callback && callback();
  });
}


Socket.emitToAllSockets = function(events, data, callback) {          //отправка всем авторизованным пользователям (доработать: тем кто подписан на событие пользователя, владельцу объекта события и админам)
      var self=this;
      store.smembers(this.room,function(err, userIds){
        userIds.forEach(function(userId) {
          store.smembers(userId, function(err, socketIds) {
            if (err) {
              return console.error(err);
            }


            if (events instanceof Array) {
              events.forEach(function(event) {
                emitToSockets(socketIds, event, data);
              });
            } else
            {
              emitToSockets(socketIds, events, data);
            }
            callback && callback();
          });
        });

      });

}

Socket.removeAllListeners = function(socketId, callback) {
  store.smembers('socketHandlers', function(err, events) {
    events.forEach(function(event) {
      if (~event.indexOf(socketId)) {
        eventBus.removeAllListeners(event);
      }
    });

    callback();
  });
}

Socket.getUser = function(socketId, callback) {
  store.hgetall(socketId, function(err, data) {
    callback(err, data);
  });
}

function removeSocket(id, callback) {
  store.del(id, function(err, affected) {
    if (err || !affected) {
      console.log('Socket connection key was not removed due to error or not found');
      console.log(err);
    } else {
      affected && console.log('Socket key ' + id + ' successfully removed');
    }

    callback(err);
  });
}

Socket.init = function(socketIo, callback) {
  socketIo.on('connection', function(socket) {
    callback({
      socket : socket,
      emitToUsers : function(userIds, event, data) {
        userIds.forEach(function(userId) {
          var id = userId.toString();
          store.smembers(id, function(err, rooms) {
            if (err) {
              return console.error(err);
            }

            if (rooms && rooms.length) {
              rooms.forEach(function(room) {
                console.info('Emitting event ' + event + ' to ' + id + ' user. Room is - ' + room);
                socketIo.to(room).emit(event, data);
              });
            }
          });
        });
      },
      emitToOneRoom : function(room, event, data) {
        //id +
        console.info('Emitting event ' + event + ' to ' +  ' user. Room is - ' + room);
        socketIo.to(room).emit(event, data);
      },
      emitToRoom : function(name, event, data) {
        var self = this;
        store.smembers(name, function(err, userIds) {
          if (err) {
            return console.error(err);
          }

          self.emitToUsers(userIds, event, data);
        });
      }
    });

    socket.on('context', function(data) {
      var userId = data._id;

      //Set a hashtable for each client so we can look up
      //the user and channel when they disconnect
      store.hmset(socket.id, { userId : userId, appId : Socket.appId });

      // connect socket to app room
      socket.join(Socket.room);
      store.sadd(Socket.room, userId);

      store.smembers(userId, function(err, members) {
        if (err) {
          return console.error(err);
        }

        async.each(members, function(member, next) {
          // check do we have non-active socket connection for current user and remove it if so
          if (!socket.adapter.sids[member]) {
            store.srem(userId, member, function(err, isRemoved) {
              next(err);
            });
          } else {
            next();
          }
        }, function(err) {
          if (err) {
            return console.error(err);
          }

          store.sadd(userId, socket.id);
          // UserWriteModel.updateRow({ _id : userId }, { isOnline : true, lastLoginTime : Date.now() },
          //   function(err, user, affected) {
          //     if (!affected) {
          //       return console.error('Socket Error on context: User not found');
          //     }

          //     socket.emit('connected');
          //     console.info('User ' + userId + ' (' + socket.id + ')' + ' connected');
          //   });
        });
      });
    });

    socket.on('disconnect', function() {
      Socket.removeAllListeners(socket.id, function() {
        store.hgetall(socket.id, function(err, data) {
          if (err) {
            return console.error(err);
          }

          if (data && data.userId && data.appId) {
            // remove socket ID from user socket IDs collection
            store.srem(data.userId, socket.id, function(err, affected) {
              if (err || !affected) {
                console.log('No user connections removed or error');
                return console.error(err);
              }

              // remove socket id key
              removeSocket(socket.id, function() {

                // check does user have more connections
                store.scard(data.userId, function(err, connections) {
                  if (parseInt(connections)) {
                    return console.log('User ' + data.userId + ' still has connections');
                  }

                  // remove user id from application
                  store.srem('room_' + data.appId, data.userId, function(err, affected) {
                    if (err || !affected) {
                      console.log('User was not removed from redis application set');
                      return console.error(err);
                    }

                    // UserWriteModel.updateRow({ _id : data.userId }, { isOnline : false, lastLoginTime : Date.now() },
                    //   function(err, user, affected) {
                    //     if (!affected) {
                    //       return console.log('User was not updated with offline flag');
                    //     }

                    //     console.info('User ' + data.userId + ' (socket ID: ' + socket.id + ')' + ' successfully disconnected from redis');
                    //   });
                  });
                });
              });
            });
          } else {
            removeSocket(socket.id, function(err) {
              console.warn('User (socket ID: ' + socket.id + ') disconnected');
            });
          }
        });
      });
    });
  });
}
