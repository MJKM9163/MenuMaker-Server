import Router from "koa-router";
import * as comentCtrl from './coment_ctrl';
import checkLogin from "../../lib/checkLogin";

const coment = new Router();

coment.post('/create', checkLogin, comentCtrl.comentCreate);
coment.get('/list', comentCtrl.comentList);
coment.patch('/update', checkLogin, comentCtrl.comentUpdate)
coment.delete('/delete/:id', checkLogin, comentCtrl.comentDelete);

export default coment;