import Router from "koa-router";
import * as comentCtrl from './coment_ctrl';

const coment = new Router();

coment.post('/create', comentCtrl.comentCreate);
coment.get('/list', comentCtrl.comentList);
coment.patch('/update', comentCtrl.comentUpdate)

export default coment;