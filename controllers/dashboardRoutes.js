const router = require('express').Router();
// const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');
const withAuth = require('../utils/auth');

// render dashboard
router.get('/', withAuth, (req, res) => {
    post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    })
    .then(storedPostData => {
        const posts = storedPostData.map(post = post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//  edit user info
router.get('/update-user', withAuth, (req, res) => {
    user.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        }
    })
    .then(storedUserData => {
        if(!storedUserData) {
            res.status(404).json({ message: 'no user found' });
            return;
        }
        const user = storedUserData.get({ plain: true });
        res.render('update-user', {user, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// edit post 
router.get('/update-post', withAuth, (req, res) => {
    post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 'post_text', 'title', 'created_at'
        ],
        include: [{
            model: comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: user,
                attributes: ['username']
            }
        }]
    })
    .then(storedPostData => {
        if (!storedPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        const post = storedPostData.get({ plain: true });
        res.render('update-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    });


module.exports = router;