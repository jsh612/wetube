import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import coockieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

import routes from './routes';

const app = express()

app.use(morgan('dev'));
app.use(helmet());
app.use(coockieParser());
//로그인 등 문자를 처리할때 body-parser의 urlencoded 메소드 이용
app.use(bodyParser.urlencoded({extended: false}));
//json 데이터 처리를 위해 body-parser의 json 메소드 이용
app.use(bodyParser.json());


app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;