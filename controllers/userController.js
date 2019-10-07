import routes from "../routes";

export const getJoin = (req, res) => {
  res.render('join', {pageTitle: "Join"});
};

export const postJoin = (req, res) => {
  const {name, email, password, password2} = req.body
  if (password !== password2) {
    res.status(400)
  } else {
    //To Do: 유저등록
    //To Do: 유저 로그인
    res.redirect(routes.home)
  }
  res.render('join', {pageTitle: "Join"});
}

export const login = (req, res) => res.render('login', {pageTitle: "Login"});
export const logout = (req, res) => res.render('logout', {pageTitle: "Logout"});
export const userDetail = (req, res) => res.render('userDetail', {pageTitle: "User detail"});
export const editProfile = (req, res) => res.render('editProfile', {pageTitle: "edit profile"});
export const changePassword = (req, res) => res.render('changePassword', {pageTitle: "Change password"});
