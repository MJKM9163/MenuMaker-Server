import Router from "koa-router";
import * as priceCtrl from './price_ctrl';

const openAPI = new Router();

openAPI.get('/priceAPI/:name?/:qkq?', priceCtrl.price);

export default openAPI;