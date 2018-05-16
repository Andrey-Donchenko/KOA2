import dbList from './../../db';
import crypto from 'crypto';
import * as _ from 'lodash';
import mongoose from 'mongoose';
import token from '../../component/token';
import {eventBus}  from '../../component/eventBus';

let userWrite = dbList.write('user');
export default userWrite;

userWrite.hashPassword =  (password) => {
  var salt = crypto.randomBytes(16).toString('base64');
  return {
    salt : salt,
    password : userWrite.saltPassword(salt,password)
  };
};

userWrite.saltPassword = (salt,password) => {
  return  crypto.pbkdf2Sync(password, salt, 10000, 64,'sha1').toString('base64');
}

userWrite.update = async ({query, data, callback}) => {
  data.updatedAt = new Date();
  let user = await userWrite.updateRow({
      query: query,
      data: data,
      callback: callback
    });

  return user;
};

userWrite.newUser = async (data) => {
  try {
    let user = await userWrite.insertRow({
      data: _.assignIn(data, userWrite.hashPassword(data.password))
    });
    return _.assignIn(user, await token.genRefresh(user));
  }
  catch (err) {
    throw(err);
  }
};

userWrite.changePassword = async (id,password) => {
  let data = userWrite.hashPassword(password);
  data.updatedAt = new Date();
  data.accessCode = null;

  return await userWrite.updateRow({
      query: {
        _id: id
      },
      data: data
    });
};

userWrite.findByEmail = async (email) => {
  try {
    return await userWrite.findRow({
      query:{
        email:email
      }
    });
  }
  catch (err) {
    throw(err);
  }
};