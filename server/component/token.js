import secretKey from './secretKey';
import tokenWrite  from "../model/write/token";
import config from '../config';
import * as _ from 'lodash';

class Token {
  async genRefresh (user) {
    let that = this;

    try {
      return {
        refreshToken: (await tokenWrite.genNew(user)).token,
        accessToken: await that.genAccess(user)
      }
    }
    catch (err) {
      throw (err);
    }
  }

  async genAccess(user) {
    let tokenData = _.pick (user, ['_id','roles']);

    tokenData.expireTime = new Date().getTime() + config.token.accessExpired;

    try {
      return await secretKey.encrypt(tokenData);
    }
    catch (err) {
      throw (err);
    }
  }

  async genNewAccess(user) {

    try {
      if (config.token.refreshRegenWithAccess) {
        return await this.genRefresh (user);
      }
      else {
        return {
          accessToken: await this.genAccess (user)
        }
      }
    }
    catch (err) {
      throw (err);
    }
  }

  async removeOld() {
    try {
      await tokenWrite.deleteRows({
        query: {
          expire: {
            $lt: new Date()
          }
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  async scheduleStart () {
    let that = this;
    setInterval(async ()=>{
        await that.removeOld();
      },config.token.refreshExpired);
  }
}

export default new Token();