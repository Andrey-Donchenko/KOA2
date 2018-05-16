import { expect } from 'chai';

import { userValidate } from '../../validator/user';


describe('validator', () => {

  let body;

  beforeEach(() => {
    body = {
      page: '1',
      pageSize: '7',
      search: 'testAdmin',
      profession: 'testAdmin',
    };

  });

  describe('user', () => {

    describe('search', () => {

      it('required search string', async () => {
        let error;

        body.search = '';

        try {
          await userValidate.search(body);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'search', message: 'Valid search string is required' }]);
      });

      it('required profession', async () => {
        let error;

        body.profession = '';
        try {
          await userValidate.search(body);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'profession', message: 'Valid profession is required' }]);
      });

      it('invalide page number', async () => {
        let error;

        body.page = 'asd';

        try {
          await userValidate.search(body);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'page', message: 'Valid page is required' }]);
      });

      it('invalide page size', async () => {
        let error;

        body.pageSize = 'asd';

        try {
          await userValidate.search(body);
        } catch (err) {
          error = err;
        }

        expect(error).to.deep.equal([{ param: 'pageSize', message: 'Valid page size is required' }]);
      });

      it('valid data', async () => {
        expect(await userValidate.search(body)).to.deep.equal(body);
      });

    });
  });
});

