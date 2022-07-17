const router = require('express').Router();
const { post, user, comment } = require('../models');

// const serialize = (data) => JSON.parse(JSON.stringify(data));

// render dashboard with posts
router.get('/dashboard', async (req, res) => {
    try {
    const postData = await post.findAll({
        where: {
            user_id: req.session.user_id
        },
       include: { model: user },
      });

      const posts = postData.map((post) =>
      post.get({ plain: true }))

    res.render('dashboard', 
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
    const posts = JSON.parse(JSON.stringify(postData));

    res.render('post', {
      post: post, 
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 


module.exports = router;

