import Router from "koa-router";
import * as menuSaveCtrl from './menuSave_ctrl';

const menuSave = new Router();

menuSave.post('/register', menuSaveCtrl.register);
menuSave.post('/pricesave', menuSaveCtrl.namesave);

export default menuSave;