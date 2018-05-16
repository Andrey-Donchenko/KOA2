import { expect } from 'chai';
import { accessAction } from '../../action/access';
import { accessValidate } from '../../validator/access';

let specialistObj;
let userObj;

const userObjConfirm = (userObj) => {
  expect(userObj).to.have.property('isDeleted', false);
  expect(userObj).to.have.property('email', 'test3@mail.com');
  expect(userObj).to.have.property('firstName', 'testAdmin');
  expect(userObj).to.have.property('lastName', 'testAdmin');
};

const specialistObjConfirm = (specialistObj) => {
  expect(specialistObj).to.have.property('isDeleted', false);
  expect(specialistObj).to.have.property('email', 'test2@mail.com');
  expect(specialistObj).to.have.property('firstName', 'testAdmin');
  expect(specialistObj).to.have.property('lastName', 'testAdmin');
};

const fieldList = [
  'identities1',
  'createdAt',
  'updatedAt',
  'isDeleted',
  'roles',
  '_id',
  'email',
  'firstName',
  'lastName',
];

let profile;

describe('action', () => {

  describe('access', () => {

    beforeEach(() => {

      profile = {
        email: 'test2@mail.com',
        name: 'test',
        avatar: 'https://scontent.xx.fbcdn.net',
        lastName: 'test',
        firstName: 'test',
        identities: {
          facebookId: '436106493430853',
        },
        roles: ['user'],
      };

    });

    describe('register', () => {
	    it('create specialist', async () => {
	    	specialistObj = await accessAction.register({
	    		email: 'test2@mail.com',
				  password: 'testAdmin',
				  firstName: 'testAdmin',
				  lastName: 'testAdmin',
				  city: 'testAdmin',
      		profession: 'testAdmin',
				  roles: ['professional'],
        });

        expect(specialistObj).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
        ]));

        specialistObjConfirm(specialistObj);
	    });

	    it('create user', async () => {

	    	userObj = await accessAction.register({
	    		email: 'test3@mail.com',
				  password: 'testAdmin',
				  firstName: 'testAdmin',
				  lastName: 'testAdmin',
				  city: 'testAdmin',
      		isUser: true,
				  roles: ['user'],
        });

        expect(userObj).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
        ]));

        userObjConfirm(userObj);

	    });

	  });

    describe('login', () => {

	    it('login specialist', async () => {

	    	const res = await accessAction.login(specialistObj);

        expect(res).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
        ]));


        specialistObjConfirm(specialistObj);
	    });


	    it('login user', async () => {
	    	const res = await accessAction.login(userObj);

        expect(res).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
        ]));

        userObjConfirm(res);

	    });

	  });

    describe('refreshToken', () => {
      it('valid', async () => {
        const token = await accessValidate.refreshToken({ refreshToken: userObj.refreshToken });
        const res = await accessAction.refreshToken(token);

        expect(res).to.have.all.keys(fieldList.concat([
          'accessToken',
        ]));

        userObjConfirm(res);

      });

    });

    describe('forgot', () => {

      it('valid', async () => {

        const res = await accessAction.forgot(specialistObj);

        expect(res).to.deep.equal({
          result: 'success',
        });

      });

    });

    describe('socAuth', () => {

      it('valid', async () => {

        const res = await accessAction.socAuth(profile);


        expect(specialistObj).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
        ]));


        specialistObjConfirm(specialistObj);

      });

      it('user not found', async () => {
        let error;

        profile.email = 'p4567567456@mail.com';

        try {
          await accessAction.socAuth(profile);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'email', message: 'User not found' }]);
      });

    });

    describe('socReg', () => {

      it('valid insert', async () => {

        profile.email = 'test4@mail.com';
        const res = await accessAction.socReg(profile);

        expect(res).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
          'avatar',
        ]));

        expect(res).to.have.property('isDeleted', false);
        expect(res).to.have.property('email', 'test4@mail.com');
        expect(res).to.have.property('firstName', 'test');
        expect(res).to.have.property('lastName', 'test');
        expect(res.roles).to.deep.equal(['user']);

      });


      it('valid update', async () => {

        const res = await accessAction.socReg(profile);


        expect(res).to.have.all.keys(fieldList.concat([
          'accessToken',
          'refreshToken',
          'avatar',
        ]));


        expect(res).to.have.property('isDeleted', false);
        expect(res).to.have.property('email', 'test2@mail.com');
        expect(res).to.have.property('firstName', 'test');
        expect(res).to.have.property('lastName', 'test');

      });

    });

  });

  describe('authAccess', () => {

    describe('loginConfirm', () => {
      it('valid', async () => {
        const res = await accessAction.loginConfirm(userObj);

        expect(res).to.have.all.keys(fieldList);

        userObjConfirm(res);
      });
    });


    describe('changePassword', () => {

      it('valid', async () => {

        const res = await accessAction.changePassword('qwerty', specialistObj);

        expect(res).to.deep.equal({
          result: 'success',
        });

      });

    });

  });
});

