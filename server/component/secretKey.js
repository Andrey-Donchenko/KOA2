import config from '../config';
import keygen from 'keygen';
import * as _ from 'lodash';
import aes256 from 'aes256';
import util  from 'util';
import co from 'co';
import fs from 'fs';
import path from 'path';

const lastKey = 0; //number of latest key

class SecretKey {

  get file () {
    return path.join(__dirname, '/../../key.json');
  }

  async confirmList () {
    this.secretKeyList = _.slice(this.secretKeyList.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime(); 
    }), 0, config.secretKey.keepCount);
    fs.writeFileSync(this.file, JSON.stringify(this.secretKeyList));
  }

  async init () {
    if (fs.existsSync(this.file)) {
      try {
        this.secretKeyList = JSON.parse(fs.readFileSync(this.file));
        if (!this.secretKeyList.length) {
          await this.generateNew();
        }
        else {
          for (let i in this.secretKeyList) {
            this.secretKeyList[i].createdAt = new Date(this.secretKeyList[i].createdAt);
          }
          this.confirmList();
        }
        return;
      }
      catch (e) {
        await this.generateNew();
        return;
      }
    }

    await this.generateNew();
  }

  async generateNew () {
    if (!this.secretKeyList || !_.isArray(this.secretKeyList)) {
      this.secretKeyList = [{
        key: keygen.url(config.secretKey.length),
        createdAt: new Date(),
      }];
    }
    else {
      this.secretKeyList.unshift({
        key: keygen.url(config.secretKey.length),
        createdAt: new Date(),
      });
    }

    this.confirmList();
  }

  async scheduleStart () {
    let that = this;
    setInterval(async ()=>{
          await that.generateNew();
      },config.secretKey.lifetime);
  }

  async encrypt (data) {
    let that = this;
    if (typeof data === 'object') {
      return aes256.encrypt(that.secretKeyList[lastKey].key, JSON.stringify(data));
    }
    else {
      throw 'Unable to encrypt token';
    }
  }

  async decrypt (encrypted) {
    let that = this;

    for (let i in that.secretKeyList) {
      try {
        let decrypted = aes256.decrypt(that.secretKeyList[i].key, encrypted);
        return JSON.parse(decrypted);
      }
      catch (err) {
      }
    }
    throw 'Unable to decrypt token';
  }
}

let secretKey = new SecretKey();

export default secretKey;