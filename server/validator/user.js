import userWrite from '../model/write/user';

import validator from '../component/validator';

import * as _ from 'lodash';
import fs from 'fs';

const userFreeData = [
  '_id',
  'email',
  'firstName',
  'lastName',
  'profession',
  'gender',
  'address',
  'identities',
  'avatar',
  'newAvatar',
  'avatarId',
  'birthday',
  'zip',
  'phone',
  'skype',
  'removeAvatar',
];

class UserValidate {
  search(body) {

    let errorList = validator.check(body, {
      search: {
        notEmpty: {
          message: 'Valid search string is required',
        },
      },
      profession: {
        notEmpty: {
          message: 'Valid profession is required',
        },
      },
      page: {
        isInt: {
          message: 'Valid page is required',
        },
      },
    });

    if (errorList.length) {
      throw (errorList);
    }

    if (body.pageSize) {

      errorList = validator.check(body, {
        pageSize: {
          isInt: {
            message: 'Valid page size is required',
          },
        },
      });

      if (errorList.length) {
        throw (errorList);
      }
    }
    return body;
  }

  async update(body, user) {

    const fullValidateObj = {
      email: {
        isEmail: {
          message: 'Valid email is required',
        },
      },
      firstName: {
        notEmpty: {
          message: 'First Name is required',
        },
      },
      lastName: {
        notEmpty: {
          message: 'Last Name is required',
        },
      },
      gender: {
        notEmpty: {
          message: 'Gender is required',
        },
      },
      profession: {
        notEmpty: {
          message: 'Profession is required',
        },
      },
      birthday: {
        isDate: {
          message: 'Valid birthday is required',
        },
      },
      removeAvatar: {
        isBoolean: {
          message: 'Valid removeAvatar is required',
        },
      },
    };

    const fieldsList = [
      'email',
      'firstName',
      'lastName',
      'gender',
      'text',
      'birthday',
      'zip',
      'phone',
      'skype',
      'removeAvatar',
    ];

    const validateObj = {};

    for (const field of fieldsList) {
      if (!_.isUndefined(body.fields[field]) && fullValidateObj[field]) {
        validateObj[field] = fullValidateObj[field];
      }
    }

    let errorList = validator.check(body.fields, validateObj);

    if (errorList.length) {
      throw (errorList);
    }

    const addressList = [
      'region',
      'city',
      'street',
      'house',
      'flat',
    ];

    const fullAddressValidate = {
      region: {
        notEmpty: {
          message: 'Valid region is required',
        },
      },
      city: {
        notEmpty: {
          message: 'Valid city is required',
        },
      },
    };

    const addressValidate = {};

    for (const field of addressList) {
      if (!_.isUndefined(body.fields[field]) && fullAddressValidate[field]) {
        addressValidate[field] = fullAddressValidate[field];
      }
    }

    errorList = validator.check(body.fields, addressValidate);

    if (errorList.length) {
      throw (errorList);
    }


    const identitiesList = [
      'facebookId',
      'vkontakteId',
    ];

    if (body.files && body.files.avatar) {
      if (!fs.existsSync(body.files.avatar.path)) {
        throw ([{ param: 'avatar', message: 'Upload error' }]);
      }
    }

    const userObj = await userWrite.findRow({
      query: {
        _id: user._id,
        isDeleted: false,
      },
    });

    if (!userObj) {
      throw ([{ param: 'email', message: 'User not found' }]);
    }

    for (const field of fieldsList) {
      if (!_.isUndefined(body.fields[field])) {
        userObj[field] = body.fields[field];
      }
    }

    for (const field of addressList) {
      if (!_.isUndefined(body.fields[field])) {
        userObj.address[field] = body.fields[field];
      }
    }

    for (const field of identitiesList) {
      if (!_.isUndefined(body.fields[field])) {
        userObj.identities[field] = body.fields[field];
      }
    }

    if (body.files && body.files.avatar) {
      userObj.newAvatar = body.files.avatar.path;
    }

    return _.pick(userObj, userFreeData);
  }
}


export default UserValidate;

export const userValidate = new UserValidate();
