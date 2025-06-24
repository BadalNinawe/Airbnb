const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  signup,
  signupForm,
  loginForm,
  login,
  logout,
} = require("../controllers/users.js");

router.route("/signup").get(signupForm).post(wrapAsync(signup));

// router.get("/signup", signupForm);

// router.post("/signup", wrapAsync(signup));

router
  .route("/login")
  .get(loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

// router.get("/login", loginForm);

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   login
// );

router.get("/logout", logout);

module.exports = router;
