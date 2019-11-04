"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _User = _interopRequireDefault(require("./models/User"));

var _userController = require("./controllers/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 인증관련 사항을 여기 작성
// The createStrategy is responsible to setup passport-local LocalStrategy
// with the correct options.
_passport["default"].use(_User["default"].createStrategy()); //1.serialize(직렬화)
//  : 객체를 전송가능한 형태로 변환 하는것
//  : 여기서는 로그인이 성공하면, serializeUser 메서드를 이용하여 사용자 정보를 Session에 저장할 수 있다
//2.deserialize(역직렬화)
//  : 직렬화된 데이터를 원래의 객체형태로 되돌리는것
//  : 여기선 쿠키를 서버에 보내 인증처리하려고 사용
//3.User.serializeUser() // User.deserializeUser()
//  : passport-local-mongoose의 메소드임.
//  : https://github.com/saintedlama/passport-local-mongoose#static-methods


_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());

_passport["default"].use( // globalRouter.js 의 routes.github경로 에서 인증 요청이 된경우 실행
// 이것을 통해 나의 app에서 해당사용자의 github계정 정보를 얻을 수 있다.
new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback // 깃헙에서 인증 후 app으로 돌아왔을때 실행될 함수
));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "https://tiny-duck-58.localtunnel.me".concat(_routes["default"].facebookCallback),
  profileFields: ["id", "displayName", "photos", "email"],
  scope: ["public_profile", "email"] // profileFields: 페북 인증후, 페북에서 보내앤 profile 객체에 보이는 내용
  // scope : 페북에 요청할 정보 기재

}, _userController.facebookLoginCallback));