// @/api/posts
// dependencies
const router = require('express').Router();
const { post, user, comment } = require('../../models');

// create a post
router.post('/', async (req, res) => {
    try {
        const newPost = await post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        })
      return res.status(200).json(newPost);
    } catch (err) {
       return res.status(400).json(err);
    }
});
// delete post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: 'No post found with this id!' });
    }
    return res.status(200).json(postData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// edit post
router.put('/:id', async (req, res) => {
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
      return res.status(404).json({ message: 'No post with this id!' });
    }
    return res.status(200).json(postData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;


// SAVE FOR LATER
// get all posts - help from classmates
// router.get('/', async (req, res) => {
//   try {
//     const postData = await post.findAll({
//       attributes: { exclude: ['user_id'] },
//       order: [['created_at', 'DESC']],
//       include: [
//         {
//           model: user,
//           attributes: ['username']
//         },
//         {
//           model: comment,
//           // include: { user, attributes: ['username'] }
//         },
//       ]
//     });
//     res.status(200).json(postData);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });