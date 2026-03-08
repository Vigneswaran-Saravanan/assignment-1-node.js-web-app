import userModel from "./model.js"

//controller function for GET user page
const getUser = async (request, response) => {
    response.render("user/user", { user: request.session.user });
  
}
//controller function for GET login page
const loginForm = (request, response) => {
  response.render("user/login");
}

//controller function for POST login form
const login = async (request, response) => {
  let auth = await userModel.authenticateUser(request.body.u, request.body.pw);
  if (auth) {
    request.session.loggedIn = true; 
    request.session.user = request.body.u; 
    response.redirect("/user");
  } else {
    response.render("user/login", { err: "Credentials do not match existing user" });
  }
}

//controller function for GET logout path
const logout = (request, response) => {
  request.session.destroy(); 
  response.redirect("/"); 
}

//controller function for GET register page
const registerForm = (request, response) => {
  response.render("user/register");
}

//controller function for POST register form
const register = async (request, response) => {
  let result = await userModel.addUser(request.body.u, request.body.pw);
  if (result) {
    response.redirect("/login");
  } else {
    response.render("user/register", { err: "Username already exists"});
  }
}

export default {
  getUser,
  loginForm,
  login,
  logout,
  registerForm,
  register
};