import app from "./app";
import { videoDetail } from "./controllers/videoController";

//- 이곳에 Router들이 사용 할 수 있도록 url들을 모아둔다
//- router들은 이곳에서 url을 가져다 쓴다.
//- 이와같이하는 이유는 동잃나 url을 여로 곳에서 쓸 경우 효율적으로 사용하기위함이다.

//GLobal
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

// API (유저가 접근가능한 url이 아니라 나와 서버간의 통신을 위한 route)
const API = "/api";
const REGISTER_VIEW = "/:id/view";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
  //global
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  //users
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
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
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return DELETE_VIDEO;
  }
};

export default routes;
