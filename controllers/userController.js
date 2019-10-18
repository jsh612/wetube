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

export const logout = (req, res) => {
  //To Do: Process Log out
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change password" });
