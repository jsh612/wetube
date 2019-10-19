import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);

// postJoin으로 가입시키고, 가입이 성공하면 postLogin으로 로그인한다.
// 즉, postJoin에서 user정보를 생성하여 해당 정보를 postLogin에 전달
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin); // github에서 인증을 위해 사용자를 깃헙으로 보냄

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
); // 깃헙에서 인증 후 app으로 돌아오면 이부분 실행

export default globalRouter;
