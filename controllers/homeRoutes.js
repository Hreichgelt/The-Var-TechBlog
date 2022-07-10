const router = require('express').Router();
// const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');

// we need to render items on the homepage 
router.get('/', (req, res) => {
    post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        order: [[ 'created_at', 'DESC']],
        include: [{
            model: user,
            attributes: ['username']
        },
        {
            model: comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at'],
            include: {
                model: user,
                attributes: ['username']
            }
        }
    ]
    })
    .then(storedPostData => {
        const posts = storedPostData.map(post.get({ plain: true}));
        res.render('homepage', {
            posts, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// render one item to homepage
router.get('/post/:id', (req, res) => {
    post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
                model: comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user, 
                    attributes: ['username']
                }
            }
        ]
    })
    .then(storedPostData => {
        if(!storedPostData) {
            res.status(404).json({ message: 'No post with that id'});
            return;
        }
        const post = storedPostData.get({ plain: true });
        res.render('one-post', {
            post, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// send to and render register/signin page
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('register');
});

module.exports = router;