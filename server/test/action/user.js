import { expect, assert } from 'chai';
import { userAction } from '../../action/user';

describe('action', () => {
  let body;
  let userObj;
  let userReadObj;

  beforeEach(async () => {
    body = {
      page: 0,
      pageSize: 7,
      search: 'testRead',
      profession: 'testRead',
    };

    userObj = {
      __v: 0,
      email: 'testRead2@mail.com',
      password: 'sQ3/6WSXgItHYGaKnpJkt5CVLXB1UbpxySy3AZVxXK9n/sqUGe2qLU4dJR61QIVyTcZJWkpbwXuhfgNb+U0J6g==',
      firstName: 'testRead2',
      lastName: 'testRead2',
      address: { city: 'testRead2', searchLocation: 'testRead2' },
      profession: 'testRead2',
      salt: 'zqD0j3qHRiOh243eFlskzg==',
      accessCode: null,
      roles: ['professional'],
      identities: { vkontakteId: null, facebookId: null },
      isDeleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
      refreshToken: 'DuZZKzg5EDhsJ3Wbp2oRymRma9j7jiv3xnHhKzpt4XzVWt8Ef66xzmKmmpmThYFeVtckdoZMKvvyRkfs3SJgh53nke7uxygBtavZTzzYscBEZQm3dfK6RVErGkxNvGqAyvNkNY7vVMau3tFcLmU7WunHmFrtVngXcL7VaJsj6hrrretnoaceFYXHLbqrRVXVQnHRUQ9uoeVbddSk8m86wnv7kpHWmZwXLtDPYTf8anPY6SnWTj8xLBcw5yFV5gZi',
      accessToken: '3++iVV/94WyJ7GkbmuFqT31ymLI5BBNlf2lCz10Huud6SI1uXkbt2m1bCcufQvX84eTCeCV1ltfWOYyg33u5nyDk/6jTDTHZ4pgentf7IP0U3AzIfND60dplkvPqnB1QwgK3wWCx' };
  });

  describe('user', () => {

    describe('createEvent', () => {
      it('valid', async () => {
        userReadObj = await userAction.createEvent(userObj);

        expect(userReadObj).to.have.all.keys([
          '__v',
          'accessCode',
          'rate',
          'salt',
          'password',
          'identities',
          'createdAt',
          'updatedAt',
          'isDeleted',
          'roles',
          '_id',
          'email',
          'firstName',
          'lastName',
          'address',
          'profession',
          'birthday',
          'phone',
          'skype',
          'zip',
        ]);

        expect(userReadObj).to.have.property('isDeleted', false);
        expect(userReadObj).to.have.property('email', 'testRead2@mail.com');
        expect(userReadObj).to.have.property('firstName', 'testRead2');
        expect(userReadObj).to.have.property('lastName', 'testRead2');
        expect(userReadObj.address).to.deep.equal({ city: 'testRead2', searchLocation: 'testRead2' });
        expect(userReadObj).to.have.property('profession', 'testRead2');
        expect(userReadObj.roles).to.deep.equal(['professional']);
      });
    });

    describe('updateEvent', () => {
      it('valid', async () => {

        userReadObj.firstName = 'testRead3';
        const res = await userAction.updateEvent(userReadObj);

        expect(res).to.have.all.keys([
          '__v',
          'accessCode',
          'rate',
          'salt',
          'password',
          'identities',
          'createdAt',
          'updatedAt',
          'isDeleted',
          'roles',
          '_id',
          'email',
          'firstName',
          'lastName',
          'address',
          'profession',
          'birthday',
          'phone',
          'skype',
          'zip',
        ]);

        expect(res).to.have.property('isDeleted', false);
        expect(res).to.have.property('email', 'testRead2@mail.com');
        expect(res).to.have.property('firstName', 'testRead3');
        expect(res).to.have.property('lastName', 'testRead2');
        expect(res.address).to.deep.equal({ city: 'testRead2', searchLocation: 'testRead2' });
        expect(res).to.have.property('profession', 'testRead2');
        expect(res.roles).to.deep.equal(['professional']);
      });
    });

  });
});

