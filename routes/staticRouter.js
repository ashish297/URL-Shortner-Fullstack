const express = require("express");
const url = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res)=>{
  const allUrls = await url.find({ });
  return res.render("home", {
    urls : allUrls,
  });
})

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res)=>{
  const allUrls = await url.find({ createdBy: req.user._id });
  return res.render("home", {
    urls : allUrls,
  });
})

router.get("/signup", (req, res)=>{
  return res.render("signup");
})

router.get("/login", (req, res)=>{
  return res.render("login");
})

router.get("/logout", (req, res) => {
  const userCookie = req.cookies.token;
  res.cookie("token", null);
  return res.redirect("/");
})

module.exports = router;