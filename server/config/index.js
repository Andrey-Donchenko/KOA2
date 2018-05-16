'use strict';

import path from 'path';
import nconf from 'nconf';
import * as _ from 'lodash';
import staticConfig from './static/config.js';

nconf.env().argv();

nconf.file('local', path.join(__dirname, 'static', 'config.local.json'));
nconf.file(path.join(__dirname, 'static', 'config.json'));

export default _.extend({
    http: {
      port: process.env.PORT || 3000
    }
  },
  staticConfig,
  require(__dirname + '/env/' + (nconf.get('NODE_ENV') || 'development')),
  nconf.get() );
