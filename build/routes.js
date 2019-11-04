"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

var _videoController = require("./controllers/videoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//- 이곳에 Router들이 사용 할 수 있도록 url들을 모아둔다
//- router들은 이곳에서 url을 가져다 쓴다.
//- 이와같이하는 이유는 동잃나 url을 여로 곳에서 쓸 경우 효율적으로 사용하기위함이다.
//GLobal
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //Users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; // Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; //facebook

var FB = "/auth/facebook";
var FB_CALLBACK = "/auth/facebook/callback"; // API (유저가 접근가능한 url이 아니라 나와 서버간의 통신을 위한 route)

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var DEL_COMMENT = "/:id/comDelete/:id2"; //Videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete";
var routes = {
  //global
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  //users
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    }

    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  //github
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  //facebook
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  //videos
  videos: VIDEOS,
  upload: UPLOAD,
  //API
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  delComment: DEL_COMMENT,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    }

    return VIDEO_DETAIL;
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    }

    return EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    }

    return DELETE_VIDEO;
  }
};
var _default = routes;
exports["default"] = _default;