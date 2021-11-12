require('dotenv').config(); // .env 파일에서 환경변수 불러오기
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

// 프론트 빌드파일에 사용
// import serve from 'koa-static';
// import path from 'path';
// import send from 'koa-send';

import api from './api';
//rhkrrbaud:apsbfh9163@
const URI = `mongodb://rhkrrbaud:apsbfh9163@3.144.241.82:27017/menumaker`
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

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


// 프론트 빌드에 사용
// const buildDirectory = path.resolve(__dirname,'../../menu_maker/build');
// app.use(serve(buildDirectory));
// app.use(async ctx => {
//     // Not Found이고, 주소가 /api로 시작하지 않는 경우
//     if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
//         // index 내용을 반환
//     await send(ctx, 'index.html', { root: buildDirectory });
//     }
// });

const port = PORT || 4000;
app.listen(port, () => {
    console.log('port 4000 연결');
});