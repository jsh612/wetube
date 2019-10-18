import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);

// postJoin으로 가입시키고, 가입이 성공하면 postLogin으로 로그인한다.
// 즉, postJoin에서 user정보를 생성하여 해당 정보를 postLogin에 전달
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
