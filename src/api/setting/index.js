import Router from "koa-router";
import * as settingCtrl from './setting_ctrl';

const setting = new Router();

setting.get('/find', settingCtrl.findMain);

export default setting;