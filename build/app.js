"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _path = _interopRequireDefault(require("path"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _routes = _interopRequireDefault(require("./routes"));

var _middlewares = require("./middlewares");

require("./passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var CokieStore = (0, _connectMongo["default"])(_expressSession["default"]);
app.use((0, _helmet["default"])());
app.set("view engine", "pug"); //pug 설정

app.set("views", _path["default"].join(__dirname, "views"));
app.use((0, _morgan["default"])("dev"));
app.use((0, _cookieParser["default"])()); //로그인 등 문자를 처리할때 body-parser의 urlencoded 메소드 이용

app.use(_bodyParser["default"].urlencoded({
  extended: false
})); //json 데이터 처리를 위해 body-parser의 json 메소드 이용

app.use(_bodyParser["default"].json()); //접속 주소가 /statuc일 경우  기본 경로를 statuc 디렉토리로 한다.

app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static"))); //session 설정하기

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  // mongooseConnection: mongoose.connection: db와 저장소 연결
  store: new CokieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize()); // passport가동

app.use(_passport["default"].session()); // session을 저장

app.use(_middlewares.localsMiddleware); //위치 중요(적용하고자하는 router 전에 위치)

app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;