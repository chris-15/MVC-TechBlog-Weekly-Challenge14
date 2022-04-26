const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: ["id", "title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // will loop over and map each sequalize object into serialized version of itself, into new array
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render("homepage", { 
        posts,
        loggedIn: req.session.loggedIn  
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route to display log in page
router.get("/login", (req, res) => {
  // if already logged in it will send you back to homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// route to display a single post
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", { 
        post,
      loggedIn: req.session.loggedIn
    });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
