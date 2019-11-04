"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
} //그냥 환결설정 일뿐. 중요X
);

var db = _mongoose["default"].connection; //mongoDB와의 연결을 변수 db에 저장

var handleOpen = function handleOpen() {
  return console.log("✅__Connectd to DB");
};

var handleError = function handleError(error) {
  return console.log("\u274C Error on DB connection:".concat(error));
};

db.once("open", handleOpen);
db.on("error", handleError);