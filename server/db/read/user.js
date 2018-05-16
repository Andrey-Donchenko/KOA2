import mongoose from 'mongoose';
import * as _ from 'lodash';
import standardField from '../../component/db/dbStandardField';

export default new mongoose.Schema(
  _.assignIn(
    _.cloneDeep(standardField),
    {
      email: { type: String, required: true, trim: true, unique : true },

      avatar: { type: String },
      lastName: { type: String, required: true },
      firstName: { type: String, required: true },
      gender: { type: String },
      // city: { type: String},
      address: {
        region: { type: String },
        city: { type: String },
        street: { type: String },
        house: { type: String },
        flat: { type: String },
        searchLocation: { type: String },
      },
      profession: { type: String },

      salt: String,
      password: String,

      identities: {
      //   twitterId : { type : String, default : '' },
        facebookId: { type : String, default : null },
        vkontakteId : { type : String, default : null },
        // googleId: { type : String, default : null }
      },

      roles: [{ type: String, enum: ['admin', 'user', 'professional'], default: ['user'] }],

      accessCode: { type : String, default : null },

      rate: { type: Number,  default : 0 }, 

      birthday:{ type: Date, default: null },
      zip:{ type: String, default: null },
      phone:{ type: String, default: null },
      skype:{ type: String, default: null },
    }));
