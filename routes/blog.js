const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-posts", function (req, res) {
  res.render("create-posts");
});

module.exports = router;
