import mongoose from 'mongoose';
import passport from 'koa-passport';

import {dbList} from '../db';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as VKontakteStrategy} from 'passport-vkontakte';

import * as _ from 'lodash';
import config from '../config';
import secretKey from './secretKey';
import userWrite  from "../model/write/user";
import q  from 'q';
import access  from "../action/access";
import middlewareWrapper from './middlewareWrapper';

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

export let bearerMiddleware = async (ctr, next) => {
  let deferred = q.defer();

  passport.authenticate('bearer', ( err, user) => {

    if (err) {
      return deferred.reject(err);
    }

    if (!user) {
      return deferred.reject([{message:"User not found", param : 'accessToken'}]);
    }

    deferred.resolve(user);
  })(ctr, null);


  try {
    ctr.request.user = await deferred.promise;
    await next();
  }
  catch (err) {
    ctr.body = err;
    ctr.status = 400;
    middlewareWrapper.headerSet(ctr);
  }

}

passport.use(new BearerStrategy(
  async (token, done) => {
    let tokenEnc;
    try {
      tokenEnc = await secretKey.decrypt(token);
    }
    catch (err) {
      return done ([{message: err, param : 'accessToken'}]);
    }

    if (!tokenEnc || !tokenEnc._id || !tokenEnc.roles || !tokenEnc.expireTime) {
      return done ([{message: 'Access token is incorrect', param : 'accessToken'}]);
    }

    if (new Date(tokenEnc.expireTime) < new Date()) {
      return done ([{message: 'Access token is expired', param : 'accessToken'}]);
    }

    done(null,  _.omit(tokenEnc,['expireTime']));
  }
));



function tryToFind(query, done, callback, updateCallback) {
  userWrite.findRow({
    query: query,
    callback: function(err,user) {
      if (err) {
        return done(err);
      }

      if (user) {
        if (!updateCallback) {
          return done(null, user);
        }

        updateCallback(user);
        return userWrite.updateRow({
          query: {
            _id : user._id
          },
          data: _.pick(user, 'identities'),
          callback: function(err,item, affected) {
            if (err) {
              return done(err);
            }
            done(null, user);
          }
        });
      }

      callback && callback();
    }
  });
};

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'email',
      'id',
      'link',
      'picture.type(large)',
      'name',
      "birthday",
      "gender",
    ],
  },
  async (accessToken, ctr, token, profile,done) => {
    let data = {
      email: profile.emails[0].value,
      name: profile._json.name?profile._json.name:null,

      avatar: (profile._json.picture&&profile._json.picture.data&&profile._json.picture.data.url)?profile._json.picture.data.url:null,
      lastName: profile._json.last_name?profile._json.last_name:null,
      firstName: profile._json.first_name?profile._json.first_name:null,
      gender: profile._json.gender?profile._json.gender:null,
      identities:{
        facebookId: profile.id
      }
    }

    done(null, data);
  }
));

passport.use(new VKontakteStrategy({
    clientID: config.vk.clientID,
    clientSecret: config.vk.clientSecret,
    callbackURL: config.vk.callbackURL,
    profileFields: [
      'displayName',
      'email',
      'id',
      'link',
      'picture.type(large)',
      'name',
      "birthday",
      "gender",
    ],
  },
  async (accessToken, ctr, params, profile,done) => {
    let data = {
      email: params.email,
      name: profile._json.username?profile._json.username:null,

      avatar: (profile._json.photo)?profile._json.photo:null,
      lastName: profile._json.last_name?profile._json.last_name:null,
      firstName: profile._json.first_name?profile._json.first_name:null,
      gender: profile.gender?profile.gender:null,
      identities:{
        vkontakteId: profile.id
      }
    }

    done(null, data);
  }
));


export {passport};
