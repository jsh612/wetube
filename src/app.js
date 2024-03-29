import "@babel/polyfill";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import coockieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import flash from "express-flash";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug"); //pug 설정

//views 설정
// 두번째 인자 = A directory or an array of directories for the application's views.
app.set("views", path.join(__dirname, "views"));
app.use(morgan("dev"));
app.use(coockieParser());
//로그인 등 문자를 처리할때 body-parser의 urlencoded 메소드 이용
app.use(bodyParser.urlencoded({ extended: false }));
//json 데이터 처리를 위해 body-parser의 json 메소드 이용
app.use(bodyParser.json());

//접속 주소가 /statuc일 경우  기본 경로를 statuc 디렉토리로 한다.
app.use("/static", express.static(path.join(__dirname, "static")));

//session 설정하기
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,

    // mongooseConnection: mongoose.connection: db와 저장소 연결
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(flash()); // local messages를 사용할 수 있도록한다.(main.pug 참고/ ex] messages.error)
app.use(passport.initialize()); // passport가동
app.use(passport.session()); // session을 저장

app.use(localsMiddleware); //위치 중요(적용하고자하는 router 전에 위치)

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
