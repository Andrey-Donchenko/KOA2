import keygen from 'keygen';
import q from 'q';
import * as _ from 'lodash';

import userWrite from '../model/write/user';
import config from '../config';
import token from '../component/token';
import mailer from '../component/mailer';
import eventBus from '../component/eventBus';


const userFreeData = [
  'accessToken',
  'refreshToken',
  'createdAt',
  'updatedAt',
  'isDeleted',
  'roles',
  '_id',
  'email',
  'identities',
  'avatar',
  'firstName',
  'lastName',
];

class AccessAction {
  async forgot(user) {
    const pass = keygen.url(config.passwordLength);

    const userData = await userWrite.changePassword(user._id, pass);
    const deferred = q.defer();

    mailer.messages().send({
      from: config.mailgun.mailFrom,
      to: userData.email,
      subject: 'Pasword reset',
      html: `<h4>This letter was sent to your e-mail to verify the identity when changing the password.</h4>
        <p>New password: ${pass}</p>`,
    }, (err, body) => {
      if (err) {
        console.log(err);
        deferred.reject(err);
        return;
      }
      deferred.resolve(body);
    });

    await deferred.promise;


    return {
      result: 'success',
    };
  }

  async register(data) {
    const pass = data.password;
    data.address = {
      city: data.city,
      searchLocation: data.city,
    };
    const user = await userWrite.newUser(data);
    eventBus.emit('userCreate', user);

    mailer.messages().send({
      from: config.mailgun.mailFrom,
      to: user.email,
      subject: 'Spravno registration',
      html: `
          <h4>This letter was sent to your e-mail to verify the identity when register.</h4>
          <p>if you didn't send it, ignore</p>
          <p>First name: ${user.firstName}</p>
          <p>Last name: ${user.lastName}</p>
          <p>City: ${user.city}</p>
          <p>Password: ${pass}</p>
        `,
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return _.pick(user, userFreeData);
  }

  async socReg(profile) {
    let user = await userWrite.findByEmail(profile.email);
    if (user) {
      profile.identities.vkontakteId = profile.identities.vkontakteId ? profile.identities.vkontakteId : user.identities.vkontakteId;
      profile.identities.facebookId = profile.identities.facebookId ? profile.identities.facebookId : user.identities.facebookId;
      user = await userWrite.update({
        query: {
          _id: user._id,
        },
        data: profile,
      });

      eventBus.emit('userUpdate', user);
    } else {
      user = await userWrite.insertRow({
        data: profile,
      });
      eventBus.emit('userCreate', user);
    }

    user = _.assignIn(user, await token.genRefresh(user));
    return _.pick(user, userFreeData);
  }

  async socAuth(profile) {
    let user = await userWrite.findByEmail(profile.email);
    if (user) {
      profile.identities.vkontakteId = profile.identities.vkontakteId ? profile.identities.vkontakteId : user.identities.vkontakteId;
      profile.identities.facebookId = profile.identities.facebookId ? profile.identities.facebookId : user.identities.facebookId;
      user = await userWrite.update({
        query: {
          _id: user._id,
        },
        data: profile,
      });

      eventBus.emit('userUpdate', user);
    } else {
      throw ([{ param: 'email', message: 'User not found' }]);
    }

    user = _.assignIn(user, await token.genRefresh(user));
    return _.pick(user, userFreeData);
  }

  async login(user) {
    const userData = _.assignIn(user, await token.genRefresh(user));
    return _.pick(userData, userFreeData);
  }

  async loginConfirm(user) {
    const userData = await userWrite.findById({ id: user._id });
    return _.pick(userData, userFreeData);
  }

  async refreshToken(userToken) {
    const user = await userWrite.findById({ id: userToken.userId });
    return _.pick(_.assignIn(user, await token.genNewAccess(user)), userFreeData);
  }

  async changePassword(password, user) {
    await userWrite.changePassword(user._id, password);
    return {
      result: 'success',
    };
  }
}

export default AccessAction;

export const accessAction = new AccessAction();
