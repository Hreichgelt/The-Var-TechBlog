const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');
const withAuth = require('../utils/auth');

const serialize = (data) => JSON.parse(JSON.stringify(data));



// render dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
    const postData = await post.findAll({
        where: {
            user_id: req.session.user_id
        },
       include: { model: user },
      });

      const posts = postData.map((post) =>
      post.get({ plain: true }))

    res.render('dashboard', { posts, loggedIn: true });

} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});






//  edit user info
router.put('/:id', withAuth, async (req, res) => {
    try {
 const userData = user.update(
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userData) {
      return res.status(404).json({ message: 'No post found.' });
    }
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json(err);
  }
});


// edit post 
router.put('/:id', async (req, res) => {
    try {
      const postData = await post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        return res.status(404).json({ message: 'No article found.' });
      }
      return res.status(200).json(postData);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  // render existing posts on dashboard 
  router.get ('/create/', withAuth, async (req, res) => {
    try {
      res.render('new-post');
      const postData = await post.findAll({
        where: { user_id: req.session.user_id },
        attributes: {
          exclude: ['user_id']
        },
        include: [
          {
            model: comment, 
            include: {
              model: user, 
              attributes: ['username']
            }
          },
          {
            model: user, 
            attributes: ['username']
          }
        ]
      });
      const post = serialize(postData);
      res.render('dashboard', { post, loggedIn: true });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
  });


module.exports = router;