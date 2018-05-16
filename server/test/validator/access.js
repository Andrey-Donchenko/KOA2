import { expect } from 'chai';
import { accessValidate } from '../../validator/access';
import { user } from '../index';


describe('validator', () => {

  let body;

  beforeEach(() => {

    body = {
      email: 'test@mail.com',
      oldPassword: 'testAdmin',
      password: 'testAdmin',
      confirm: 'testAdmin',
      firstName: 'testAdmin',
      lastName: 'testAdmin',
      city: 'testAdmin',
      isUser: true,
    };

  });

  describe('access', () => {
    describe('register', () => {

	    it('wrong email', async () => {

	    	let error;

	    	body.email = 'testmail.com';

	    	try {
		    	await accessValidate.register(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'email', message: 'Valid email is required' }]);
	    });

	    it('password too short', async () => {
	    	let error;

	    	body.password = '22';
	    	try {
		    	await accessValidate.register(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'password', message: 'Password must be between 5-20 characters long' }]);
	    });

	    it('password too long', async () => {
	    	let error;

	    	body.password = '12345678901234567890123';
	    	try {
		    	await accessValidate.register(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'password', message: 'Password must be between 5-20 characters long' }]);
	    });

	    it('firstName empty', async () => {
	    	let error;

	    	body.firstName = undefined;
	    	try {
		    	await accessValidate.register(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'firstName', message: 'First Name is required' }]);
	    });

	    it('lastName empty', async () => {
	    	let error;

	    	body.lastName = undefined;
	    	try {
		    	await accessValidate.register(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'lastName', message: 'Last Name is required' }]);
	    });

	    it('email exists', async () => {
	    	let error;

    	 	body.email = 'test1@mail.com';
	    	try {
		    	await accessValidate.register(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'email', message: 'There is an existing user connected to this email' }]);
	    });

	    it('valid data role user', async () => {
	    	expect(await accessValidate.register(body)).to.deep.equal({
	    		email: 'test@mail.com',
				  password: 'testAdmin',
				  firstName: 'testAdmin',
				  lastName: 'testAdmin',
        });
	    });

	    it('valid data role professional', async () => {
	    	body.isUser = false;
	    	body.profession = 'testAdmin';

	    	expect(await accessValidate.register(body)).to.deep.equal({
	    		email: 'test@mail.com',
				  password: 'testAdmin',
				  firstName: 'testAdmin',
				  lastName: 'testAdmin',
        });
	    });

	  });

	  describe('login', () => {

	    it('required email', async () => {
	    	let error;

	    	body.email = 'testmail.com';

	    	try {
		    	await accessValidate.login(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'email', message: 'Valid email is required' }]);
	    });

	    it('required password', async () => {
	    	let error;

	    	body.password = '';
	    	try {
		    	await accessValidate.login(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'password', message: 'Valid password is required' }]);
	    });

	    it('user not found', async () => {
	    	let error;

	    	body.email = 'p4567567456@mail.com';

	    	try {
		    	await accessValidate.login(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'email', message: 'User not found' }]);
	    });

	    it('wrong password', async () => {
	    	let error;

	    	body.password = '1111111111111111111';
	    	body.email = 'test1@mail.com';

	    	try {
		    	await accessValidate.login(body);
		    } catch (err) {
		    	error = err;
		    }

	    	expect(error).to.deep.equal([{ param: 'password', message: 'User password is not correct' }]);
	    });

	    it('valid data', async () => {

	    	body.email = 'test1@mail.com';

	    	const res = await accessValidate.login(body);

        expect(res).to.have.all.keys(['createdAt', 'updatedAt', 'isDeleted', 'roles', '_id', 'email', 'firstName', 'lastName', 'address', 'identities', 'profession']);

        expect(res).to.have.property('isDeleted', false);
        expect(res).to.have.property('email', 'test1@mail.com');
        expect(res).to.have.property('firstName', 'testAdmin');
        expect(res).to.have.property('lastName', 'testAdmin');
        expect(res.address).to.deep.equal({ city: 'testAdmin', searchLocation: 'testAdmin' });
        expect(res).to.have.property('profession', 'testAdmin');
        expect(res.roles).to.deep.equal(['professional']);
	    });

	  });

    describe('refreshToken', () => {

      it('required refresh token', async () => {

        let error;

        try {
          await accessValidate.refreshToken({});
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'refreshToken', message: 'Valid refresh token is required' }]);

      });

      it('refresh token not found', async () => {

        let error;

        try {
          await accessValidate.refreshToken({ refreshToken: '111' });
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'refreshToken', message: 'User not found' }]);

      });

      it('valid data', async () => {

        const res = await accessValidate.refreshToken({ refreshToken: user.refreshToken });

        expect(res).to.have.all.keys(['_id', 'token', 'userId', 'expire', 'updatedAt', 'createdAt']);

        expect(res).to.have.property('token', user.refreshToken);
        expect(res.userId).to.deep.equal(user._id);

      });

    });

    describe('forgot', () => {

      it('required email', async () => {
        let error;

        body.email = 'testmail.com';

        try {
          await accessValidate.forgot(body);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'email', message: 'Valid email is required' }]);
      });

      it('user not found', async () => {
        let error;

        body.email = 'p4567567456@mail.com';

        try {
          await accessValidate.forgot(body);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'email', message: 'User not found' }]);
      });

      it('valid data', async () => {

        body.email = 'test1@mail.com';

        const res = await accessValidate.forgot(body);

        expect(res).to.have.all.keys(['createdAt', 'updatedAt', 'isDeleted', 'roles', '_id', 'email', 'firstName', 'lastName', 'address', 'identities', 'profession']);

        expect(res).to.have.property('isDeleted', false);
        expect(res).to.have.property('email', 'test1@mail.com');
        expect(res).to.have.property('firstName', 'testAdmin');
        expect(res).to.have.property('lastName', 'testAdmin');
        expect(res.address).to.deep.equal({ city: 'testAdmin', searchLocation: 'testAdmin' });
        expect(res).to.have.property('profession', 'testAdmin');
        expect(res.roles).to.deep.equal(['professional']);
      });

    });

    describe('changePassword', () => {

      it('password too short', async () => {
        let error;

        body.password = '22';
        try {
          await accessValidate.changePassword(body, user);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'password', message: 'Password must be between 5-20 characters long' }]);
      });

      it('password too long', async () => {
        let error;

        body.password = '12345678901234567890123';
        try {
          await accessValidate.changePassword(body, user);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'password', message: 'Password must be between 5-20 characters long' }]);
      });

      it('user not found', async () => {
        let error;

        body.email = 'p4567567456@mail.com';

        try {
          await accessValidate.changePassword(body, { _id: '000000000000000000000000' });
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'accessToken', message: 'User not found' }]);
      });

      it('valid data', async () => {

        const res = await accessValidate.changePassword(body, user);
        expect(res).to.equal(body.password);
      });

    });
  });
});

