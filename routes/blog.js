const express = require("express");

const dbase = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `
  SELECT posts.*, authors.name AS author_name FROM posts 
  INNER JOIN authors ON author_id =authors.id `;
  const [posts] = await dbase.query(query);

  res.render("posts-list", { posts: posts });
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

  // console.log(data);
  // console.log(req.body);

  await dbase.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)",
    [data[0], data[1], data[2], data[3]]
  );
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const query = `
  SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
  INNER JOIN authors ON posts.author_id= authors.id 
  
  WHERE posts.id=?
  `;
  const [posts] = await dbase.query(query, [req.params.id]);
  console.log(posts);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].time.toISOString(),
    humanReadableDate: posts[0].time.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  //console.log(postData);
  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
  SELECT FROM posts WHERE id=?
  `;
  const [posts] = await dbase.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: posts });
});

module.exports = router;
