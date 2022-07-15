const router = require("express").Router();
const sequelize = require("../config/connection");
const { post, user, comment } = require("../models");


const serialize = (data) => JSON.parse(JSON.stringify(data));

// we need to render items on the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await post.findAll({
      attributes: ["id", "post_text", "title", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: user,
          attributes: ["username"],
        },
        {
          model: comment,
          attributes: ["id", "comment_text", "post_id", "created_at"],
          include: {
            model: user,
            attributes: ["username"],
          },
        },
      ],
    });
    const serPostData = serialize(postData);
    const posts = serPostData.map(post => {
      const edited = post;
      const date = new Date(post.created_at);
      edited.created_at = date.toDateString();
      return edited;
    });
    console.log(posts)
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Log in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  res.render('login');
});

// send to and render register/signin page
router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("register");
});

module.exports = router;
