import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

// s3 접근을 위한 s3초기화
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1"
});

// https://www.npmjs.com/package/multer-s3
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "sh-wetube/video"
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "sh-wetube/avatar"
  })
});

//'videoFile' : upload.pug의 input 태그의 name
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  //-res.locals.변수명
  //  특정 파일의 코드를 변수에 담아 전역적으로 사용할 수있게함.(단, view에서만 사용가능)
  //  (즉, 전역범위에 변수를 추가하는 방법임)
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; // passport가 로그인시 req에 user object를 올려준다.
  console.log("미들웨어 user.req::::", req.user);
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
