import Router from "koa-router";
import * as openAPI from './openAPI_ctrl';

const openAPIs = new Router();

openAPIs.get('/price100/:today?', openAPI.price100);
openAPIs.get('/price200/:today?', openAPI.price200);
openAPIs.get('/price300/:today?', openAPI.price300);
openAPIs.get('/price400/:today?', openAPI.price400);
openAPIs.get('/price500/:today?', openAPI.price500);
openAPIs.get('/price600/:today?', openAPI.price600);

export default openAPIs;