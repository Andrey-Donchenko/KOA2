import Mailgun from 'mailgun-js';
import config from '../config';


let mailgun;

class mailgunBung {
  messages () {
    return this;
  }

  send (obj, callback) {
    callback && callback(null, obj);
    return this;
  }
}


if (config.LAUNCH_TYPE === 'test') {
  mailgun = new mailgunBung();
}
else {
  mailgun= new Mailgun({
    apiKey: config.mailgun.api_key,
    domain: config.mailgun.domain
  });
}

export default mailgun;