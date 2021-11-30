import Router from "koa-router";
import auth from './auth';
import menuSave from './menuSave';
import menuMaker from './menuMaker';
import setting from './setting';
import coment from './coment';
import openAPIs from "./openAPIs/index";

const api = new Router();

api.use('/menusave', menuSave.routes());
api.use('/auth', auth.routes());
api.use('/menumaker', menuMaker.routes());
api.use('/setting', setting.routes());
api.use('/coment', coment.routes());
api.use('/openAPIs', openAPIs.routes());

export default api;