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

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  console.log(data);
  console.log(req.body);

  await dbase.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)",
    [data[0], data[1], data[2], data[3]]
  );
  res.redirect("/posts");
});

module.exports = router;
