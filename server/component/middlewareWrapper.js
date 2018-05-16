import * as _ from 'lodash';
import config from '../config';

class middlewareWrapper {

  headerSet(req) {
    if (config.allowCrosOrigin) {
      /**
       * Response settings
       * @type {Object}
       */
      var responseSettings = {
          "AccessControlAllowOrigin": req.header['origin'],
          "AccessControlAllowHeaders": "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
          "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
          "AccessControlAllowCredentials": true
      };

      /**
       * Headers
       */

      req.set("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
      req.set("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
      req.set("Access-Control-Allow-Headers", (req.header['access-control-request-headers']) ? req.header['access-control-request-headers'] : responseSettings.AccessControlAllowHeaders);
      req.set("Access-Control-Allow-Methods", (req.header['access-control-request-method']) ? req.header['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
    }
  }

  singleError (error) {
    if (error instanceof Error) {
      console.log(error);
      return {message: 'Internal server error oqued'};
    }
    else if (!(error.message && error.param)) {
      console.log(error);
      return {message: 'Unknown server error oqued'};
    }
    else {
      return error
    }
  }

  errorBuilder (errors) {
    if (_.isArray(errors)) {
      let errorArray = [];
      for (let err of errors) {
        errorArray.push(this.singleError (err));
      }
      return errorArray;
    }
    else {
      return [this.singleError(errors)];
    }
  }

  async wrape (req,next,middleware) {
    try {
      req.body = await middleware();
      this.headerSet(req);
    }
    catch (err) {
      req.body = this.errorBuilder(err);
      req.status = 400;
      this.headerSet(req);
      return;
    }
    next && (await next());
  }
}

export default new middlewareWrapper();