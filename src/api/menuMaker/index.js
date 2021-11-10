import Router from "koa-router";
import * as menuMakerCtrl from './menuMaker_ctrl';

const menuMaker = new Router();

menuMaker.post('/rice', menuMakerCtrl.riceList);
menuMaker.post('/main', menuMakerCtrl.mainList);
menuMaker.post('/side', menuMakerCtrl.sideList);

export default menuMaker;