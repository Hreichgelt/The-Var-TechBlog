// @/api/users
// dependencies
const router = require('express').Router();
const { user } = require('../../models');


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

module.exports = router;
