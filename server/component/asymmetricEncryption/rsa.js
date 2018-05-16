import config from '../../config';
import NodeRSA from 'node-rsa';
import crypto from 'crypto';

export default class RSA {

  * generateKey () {
    let that = this;
    let rsa =  new NodeRSA().generateKeyPair(config.asymmetricEncryption.bits, config.asymmetricEncryption.exp);

    let key = {};

    key.public = rsa.exportKey('components-public');
    key.public.n = key.public.n.toString('base64');

    key.private = rsa.exportKey('pkcs1-private-pem');
    // key.private.n = key.private.n.toString('binary');
    // key.private.d = key.private.d.toString('binary');
    // key.private.p = key.private.p.toString('binary');
    // key.private.q = key.private.q.toString('binary');
    // key.private.dmp1 = key.private.dmp1.toString('binary');
    // key.private.dmq1 = key.private.dmq1.toString('binary');
    // key.private.coeff = key.private.coeff.toString('binary');

    return key;
  }

  * encrypt ({privateKey, message}) {
    let rsa = new NodeRSA(privateKey);
    return rsa.encrypt(Buffer(message));
  }

  * decrypt ({privateKey, message}) {
    let rsa = new NodeRSA(privateKey);
    return rsa.decrypt(Buffer(message,'base64'));
  }


}
