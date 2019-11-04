"use strict";

require("@babel/polyfill");

require("./db");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 해당 mongoose Vidoe모델을 DB에 연결
// 해당 mongoose Comment모델을 DB에 연결
// 해당 mongoose User모델을 DB에 연결
_dotenv["default"].config();

var PORT = process.env.PORT;

var hadnleListening = function hadnleListening() {
  return console.log("\u2705Lisening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, hadnleListening);