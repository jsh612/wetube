import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import coockieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

import routes from './routes';
import { localsMiddleware } from './middlewares';

const app = express()

app.use(helmet());
app.set('view engine', 'pug');//pug 설정
app.use(morgan('dev'));
app.use(coockieParser());
//로그인 등 문자를 처리할때 body-parser의 urlencoded 메소드 이용
app.use(bodyParser.urlencoded({extended: false}));
//json 데이터 처리를 위해 body-parser의 json 메소드 이용
app.use(bodyParser.json());

app.use(localsMiddleware)//위치 중요(적용하고자하는 router 전에 위치)

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;