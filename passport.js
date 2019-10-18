// 인증관련 사항을 여기 작성
import passport from "passport";
import passportLocal from "passport-local";
import User from "./models/User";

// The createStrategy is responsible to setup passport-local LocalStrategy
// with the correct options.
passport.use(User.createStrategy);
