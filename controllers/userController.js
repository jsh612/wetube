import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
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
      //To Do: 유저 로그인
      res.redirect(routes.home);
    } catch (error) {
      console.log(error);
    }
  }
  res.render("join", { pageTitle: "Join" });
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

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
