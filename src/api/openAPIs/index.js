import Router from "koa-router";
import * as openAPI from './openAPI_ctrl';

const openAPIs = new Router();

openAPIs.get('/price', openAPI.price);

export default openAPIs;