import * as _ from 'lodash';

class util {

  singleError (error) {
    let key = Object.keys(error)[0];
    return {param: key, msg: error[key]};
  }

  errorBuilder (error) {
    if (_.isArray(error)) {
      let errorArray = [];
      for (let i in error) {
        errorArray.push(this.singleError (error[i]));
      }
      return errorArray;
    }
    else {
      return [this.singleError (error)];
    }
  }

}

export default new util();