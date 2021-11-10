import Router from "koa-router";
import * as menuSaveCtrl from './menuSave_ctrl';

const menuSave = new Router();

menuSave.post('/register', menuSaveCtrl.register);

export default menuSave;