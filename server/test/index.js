import { boot as bootstrap } from '../component/bootstrap';
import dbList from '../db';
import secretKey from '../component/secretKey';
import { accessAction } from '../action/access';

export let user;


before(async function() {
  await secretKey.init();
  bootstrap.events();
  user = await accessAction.register({
    email: 'test1@mail.com',
    password: 'testAdmin',
    firstName: 'testAdmin',
    lastName: 'testAdmin',
    city: 'testAdmin',
    profession: 'testAdmin',
    roles: ['professional'],
  });

  await accessAction.register({
    email: 'testRead@mail.com',
    password: 'testRead',
    firstName: 'testRead',
    lastName: 'testRead',
    city: 'testRead',
    profession: 'testRead',
    roles: ['professional'],
  });
});


after(function(done) {
  dbList.drop(()=>{
    done();
  })
});
