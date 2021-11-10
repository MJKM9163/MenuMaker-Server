import Router from "koa-router";
import auth from './auth';
import menuSave from './menuSave';
import menuMaker from './menuMaker';

const api = new Router();

api.use('/menusave', menuSave.routes());
api.use('/auth', auth.routes());
api.use('/menumaker', menuMaker.routes());

export default api;