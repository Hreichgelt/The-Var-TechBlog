const router = require('express').Router();
const { post, user, comment } = require('../models');

// const serialize = (data) => JSON.parse(JSON.stringify(data));

// render dashboard
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


  // render existing posts on dashboard 
 // // get post by id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await post.findByPk(req.params.id, {
      order: [['date_created', 'DESC']],
      include: [
        {
          model: user,
          attributes: {
            include: ['username']
          } 
        },
        {
          model: comment,
          include: [
            {
              model: user,
              attributes: {
                include: ['username']
              }
            }
          ]
        }
      ]
    });
    const post = JSON.parse(JSON.stringify(postData));

    res.render('post', {
      post: post, 
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 


module.exports = router;


// SAVE FOR LATER
//  edit user info
// router.put('/:id', async (req, res) => {
//     try {
//  const userData = user.update(
//     {
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!userData) {
//       return res.status(404).json({ message: 'No post found.' });
//     }
//     return res.status(200).json(userData);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });


// // edit post 
// router.put('/:id', async (req, res) => {
//     try {
//       const postData = await post.update(
//       {
//         title: req.body.title,
//         post_text: req.body.post_text,
//       },
//       {
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!postData) {
//         return res.status(404).json({ message: 'No article found.' });
//       }
//       return res.status(200).json(postData);
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   });