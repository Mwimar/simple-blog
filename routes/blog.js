const express = require("express");

const dbase = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-posts", async function (req, res) {
  const [authors] = await dbase.query("SELECT * FROM authors");
  res.render("create-posts", { authors: authors });
});

module.exports = router;
