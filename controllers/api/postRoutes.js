// @/api/posts
// dependencies
// Notes : do we need to utilize inclusions/exclusions/attributes?
const router = require("express").router();
// const bcrypt = require("bcrypt"); - not being used?
const { user, post, comment } = require("../../models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const withAuth = require("../../utils/auth");

// get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await user.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// post post

// delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.post_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// edit post
router.put("/:id", async (req, res) => {
  try {
    const postData = await post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
