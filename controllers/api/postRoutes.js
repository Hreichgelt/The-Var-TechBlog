// @/api/posts
// dependencies
const router = require('express').Router();
const { post } = require('../../models');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const withAuth = require('../../utils/auth');

// get all posts - help from classmates
router.get('/', async (req, res) => {
  try {
    const postData = await post.findAll({
      attributes: { exclude: ['user_id'] },
      order: [['date_created', 'DESC']],
      include: [
        {
          model: user,
          attributes: ['username']
        },
        {
          model: Comment,
          include: { user, attributes: ['username'] }
        },
      ]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await user.findByPk(req.params.id, {
      attributes: { exclude: ['user_id'] },
      order: [['date_created', 'DESC']],
      include: [
        {
          model: user,
          attributes: ['username']
        },
        {
          model: Comment,
          include: { user, attributes: ['username'] }
        },
      ]
    });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// post a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.body.user_id
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});
// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// edit post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await post.update({
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
