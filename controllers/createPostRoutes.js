const router = require('express').Router();
const { post, user, comment } = require('../models');

const withAuth = require("../utils/auth");


// const serialize = (data) => JSON.parse(JSON.stringify(data));

// render createPost 
router.get('/createPost', withAuth, async (req, res) => {
    try {
    const postData = await post.findAll({
      attributes: ["id", "post_text", "title", "created_at"],
      order: [["created_at", "DESC"]],
        where: {
            user_id: req.session.user_id
        },
       include: { model: user },
      });

      const posts = postData.map((post) =>
      post.get({ plain: true }))

    res.render('createPost', 
    {
       posts, 
       loggedIn: req.session.loggedIn,
    });

} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});


  // read post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await post.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: {
            include: ["username"],
          },
        },
        {
          model: comment,
          include: [
            {
              model: user,
              attributes: {
                include: ["username"],
              },
            },
          ],
        },
      ],
    });
    const postCopy = JSON.parse(JSON.stringify(postData));
    console.log(postCopy);

    res.render('post', {
      post: postCopy, 
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 


module.exports = router;

