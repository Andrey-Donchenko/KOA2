'use strict';
var hostUrl = process.env.KOA_BASE_HOST_URL;

module.exports = {
  hostUrl: hostUrl,
  mongoDBTestCollectionPrefix: '098f6bcd4621d373cade4e832627b4f6',
  secretKey: {
    keepCount: 3,
    length: 256,
    lifetime: 259200000, //1000 * 60 * 60 * 24 * 3
  },
  asymmetricEncryption: {
    bits: 1024, // max 2048
    exp: 65537, // max 65537
    type: 'rsa'
  },
  allowCrosOrigin: true,
  token:{
    // accessExpired: 3000,
    accessExpired: 86400000 * 30 * 6,//1000 * 60 *  60 * 24,
    // refreshExpired: 6000,
    refreshExpired: 172800000,//1000 * 60 * 60 * 24 * 2
    refreshLength: 256,
    refreshRegenWithAccess: false,
  },
  accessCode: {
    lifetime: 900000, //1000 * 60 * 15,
  },
  passwordLength: 8,
};
