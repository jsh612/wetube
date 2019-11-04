"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var VidoeSchema = new Schema({
  fileUrl: {
    type: String,
    required: "File URL is required" //해당 내용 없을 시 이와 같은 오류 메세지 출력

  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  //다른 옵션이 없을 경우 이렇게 한 줄로 적을 수 있다.
  views: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment" //Comment 모델에서 참조

  }],
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});

var model = _mongoose["default"].model("Video", VidoeSchema);

var _default = model;
exports["default"] = _default;