import Router from "koa-router";
import * as priceCtrl from './price_ctrl';

const openAPI = new Router();

openAPI.get('/priceAPI', priceCtrl.price);

export default openAPI;