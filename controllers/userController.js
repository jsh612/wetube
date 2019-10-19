import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    res.status(400);
  } else {
    try {
      const user = await new User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = passport.authenticate("local", {
  //1. failureRedirect: 로그인 실패시 route
  //2. ssRedirect: 로그인 성공시 route
  failureRedirect: routes.login,
  successRedirect: routes.home
});

// 깃헙에 인증 요청함수
export const githubLogin = passport.authenticate("github");

// 깃헙으로 부터 내 app에 돌아왔을 때 실행 될 함수
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb //(cb는 passport에서 제공되는 콜백임.)
) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  console.log("프로필::::", avatarUrl);
  try {
    const user = await User.findOne({ email });
    if (user) {
      // 깃헙 이외의 방법으로 가입한 사람이 깃헙으로 다시 가입하고자할때 기존 유저 정보의
      // github 관련 사항만 업데이트 해준다.
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl,
      githubId: id
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home); // 로그인한 사용자를 home으로 보낸다.
};

export const logout = (req, res) => {
  req.logout(); // passport에서 제공하는 로그아웃
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User detail", user: req.user });
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change password" });
