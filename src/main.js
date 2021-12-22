require('dotenv').config(); // .env 파일에서 환경변수 불러오기
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

//rhkrrbaud:apsbfh9163@3.144.241.82:27017
const URI = `mongodb://localhost:27017/menumaker`
const { PORT, MONGO_URI } = process.env;

mongoose
.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('몽고DB 연결');
    })
    .catch(e => {
        console.error(e);
        console.log('연결 실패!');
    });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log('port 4000 연결');
});