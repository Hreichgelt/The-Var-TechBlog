
const router = require('express').Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth')

// post comment
router.post('/', withAuth, async (req, res) => {
  console.log(req.body); 
  try {
        const newComment = await comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
       return res.status(200).json(newComment);
    } catch (err) {
       return res.status(400).json(err);
    }
});

// delete comment
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      return res.status(404).json({ message: 'No comment found with this id!' });
    }

    return res.status(200).json(commentData);
  } catch (err) {
    return res.status(500).json(err);
  }
});


// edit comment
router.put('/:id', async (req, res) => {
  try {
    const commentData = await comment.update( 
        {
          comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    if (!commentData[0]) {
      return res.status(404).json({ message: 'No comment with this id!' });
    }
    return res.status(200).json(commentData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;




