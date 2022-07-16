// @/api/users
// dependencies
const router = require('express').Router();
const { user, post, comment } = require('../../models');


// get all users
router.get('/', async (req, res) => {
  try {
    const userData = await user.findAll({
      attributes: { exclude: ['password']}
    });
    if (!userData) {
      res.status(404).json({ message: 'No users found!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one user
// help from classmates
router.get('/:id', async (req, res) => {
  try {
    const userData = await user.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.params.id },

      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })

    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new user with password and info
router.post('/', async (req, res) => {
  try {
    // console.log(req.body)
    const userData = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a user - from ORM lesson 19
router.put('/:id', async (req, res) => {
  try {
    const userData = await user.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// user login route via email & PW
router.post('/login', async (req, res) => {
  try {
    const userData = await user.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email, maybe next time' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, maybe next time' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are logged in' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user logout from MVC miniProj
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// delete user by id from MVC miniproject
router.delete('/:id', async (req, res) => {
  try {
    const userData = await user.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
