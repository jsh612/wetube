import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos" });
const multerAvatar = multer({ dest: "uploads/avatars" });

export const localsMiddleware = (req, res, next) => {
  //-res.locals.변수명
  //  특정 파일의 코드를 변수에 담아 전역적으로 사용할 수있게함.(단, view에서만 사용가능)
  //  (즉, 전역범위에 변수를 추가하는 방법임)
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; // passport가 로그인시 req에 user object를 올려준다.
  console.log("user::::", req.user);
  next();
};

// 로그인 되었있지 않은 경우 next() => 즉 로그인 하지않은 사람만 보겠다
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 로그인 되어있을 경우 next() => 즉 로그인 한 사용자만 보겠다
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

//'videoFile' : upload.pug의 input 태그의 name
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
