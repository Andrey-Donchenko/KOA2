import dbList from './../../db';
import keygen from 'keygen';
import config from '../../config';

let tokenWrite = dbList.write('token');

export default tokenWrite;

tokenWrite.genNew = async (user) => {
  try {
    return await tokenWrite.insertRow({
      data: {
        token: keygen.url(config.token.refreshLength),
        userId: user._id,
        expire: new Date(new Date().getTime() + config.token.refreshExpired)
      }
    });
  }
  catch (err) {
    throw (err);
  }
};

tokenWrite.getUserToken = async (id) => {
  try {
    return (await tokenWrite.findRow({
      query: {
        userId: id
      }
    })).token;
  }
  catch (err) {
    throw (err);
  }
};