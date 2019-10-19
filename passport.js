// 인증관련 사항을 여기 작성
import passport from "passport";
import GitHubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// The createStrategy is responsible to setup passport-local LocalStrategy
// with the correct options.
passport.use(User.createStrategy());

//1.serialize(직렬화)
//  : 객체를 전송가능한 형태로 변환 하는것
//  : 여기서는 로그인이 성공하면, serializeUser 메서드를 이용하여 사용자 정보를 Session에 저장할 수 있다
//2.deserialize(역직렬화)
//  : 직렬화된 데이터를 원래의 객체형태로 되돌리는것
//  : 여기선 쿠키를 서버에 보내 인증처리하려고 사용
//3.User.serializeUser() // User.deserializeUser()
//  : passport-local-mongoose의 메소드임.
//  : https://github.com/saintedlama/passport-local-mongoose#static-methods
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  // globalRouter.js 의 routes.github 에서 인증이 된경우 실행
  // 이것을 통해 나의 app에서 해당사용자의 github계정 정보를 얻을 수 있다.
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback // 깃헙에서 인증 후 app으로 돌아왔을때 실행될 함수
  )
);
