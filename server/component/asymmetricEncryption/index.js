import config from '../../config';
import RSA from './rsa';

let crypto;

switch (config.asymmetricEncryption.type) {
  case 'rsa':
    crypto = new RSA();
    break;

  default: crypto = null;
};

export default crypto;