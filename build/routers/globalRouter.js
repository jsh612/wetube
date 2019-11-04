"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _passport = _interopRequireDefault(require("passport"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userController.getJoin); // postJoin으로 가입시키고, 가입이 성공하면 postLogin으로 로그인한다.
// 즉, postJoin에서 user정보를 생성하여 해당 정보를 postLogin에 전달

globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userController.postJoin, _userController.postLogin);
globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userController.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userController.postLogin);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userController.logout);
globalRouter.get(_routes["default"].search, _videoController.search);
globalRouter.get(_routes["default"].gitHub, _userController.githubLogin); // github에서 인증을 위해 사용자를 깃헙으로 보냄

globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: "/login"
}), _userController.postGithubLogIn); // 깃헙에서 인증 후 app으로 돌아오면 이부분 실행

globalRouter.get(_routes["default"].facebook, _userController.facebookLogin);
globalRouter.get(_routes["default"].facebookCallback, _passport["default"].authenticate("facebook", {
  failureRedirect: "/login"
}), _userController.postFacbookLogin);
globalRouter.get(_routes["default"].me, _userController.getMe);
var _default = globalRouter;
exports["default"] = _default;