import validator from 'validator';
import mongoose from 'mongoose';

import * as _ from 'lodash';


function localValidator() {
  this.notEmpty = str => !this.isEmpty(str);

  this.isDate = (str) => {
    try {
      const date = new Date(str);
      if (date.toString() === 'Invalid Date') {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  this.isMongoId = str => mongoose.Types.ObjectId.isValid(str);

}

localValidator.prototype = validator;


class validate {

  constructor() {
    this.validator = new localValidator();
  }

  dataCheck(data, prop) {
    if (_.isUndefined(data)) {
      prop.push('');
    } else {
      prop.push(data.toString());
    }
  }

  optionsCheck(check, options, prop) {
    if (!_.isEmpty(options)) {
      if (check === 'matches') {
        prop.push(options.pattern);
        if (options.modifiers) {
          prop.push(options.modifiers);
        }
      } else {
        const keys = _.keys(options);
        prop.push(options[keys[0]]);
      }
    }
  }

  check(data, constraints) {
    const errorList = [];

    for (const param in constraints) {
      for (const check in constraints[param]) {

        const prop = [];

        if (!data || !data[param]) {
          errorList.push({ param, message: constraints[param][check].message });
          continue;
        }
        this.dataCheck(data[param], prop);

        this.optionsCheck(check, _.omit(constraints[param][check], ['message']), prop);

        if (!this.validator[check](...prop)) {
          errorList.push({ param, message: constraints[param][check].message });
        }
      }
    }
    return errorList;
  }

}

export default new validate();
