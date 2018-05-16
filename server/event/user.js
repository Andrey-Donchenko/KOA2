import eventBus from '../component/eventBus';
import { userAction }  from "../action/user";

eventBus.onSeries('userCreate', async (data, next) => {
  await userAction.createEvent(data);
  await next();
});

eventBus.onSeries('userUpdate', async (data, next) => {
  await userAction.updateEvent(data);
  await next();
});
