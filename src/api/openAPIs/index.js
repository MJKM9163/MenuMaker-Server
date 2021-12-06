import Router from "koa-router";
import * as openAPI from './openAPI_ctrl';

const openAPIs = new Router();

openAPIs.get('/price100', openAPI.price100);
openAPIs.get('/price200', openAPI.price200);
openAPIs.get('/price300', openAPI.price300);
openAPIs.get('/price400', openAPI.price400);
openAPIs.get('/price500', openAPI.price500);
openAPIs.get('/price600', openAPI.price600);

export default openAPIs;