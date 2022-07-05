const { comment } = require("../models");

const commentData = [
    {
        comment_text: "good, the whiteboard should go away.",
        post_id: 2, 
        user_id: 4
    },
    {
        comment_text: "It really is quite scary, but the toughest part is making the decision to start.",
        post_id: 1, 
        user_id: 2
    },
    {
        comment_text: "Great ideas always come to me while near sleep-state. This reminds me of an old proverb, something like let things come to you.",
        post_id: 3, 
        user_id: 1
    },
    {
        comment_text: "Open source apps and APIs for inclusivity and easier access to recreation.",
        post_id: 6, 
        user_id: 8
    },
    {
        comment_text: "Are SpaceX rockets built with the same tech as tesla engines?",
        post_id: 3, 
        user_id: 6
    },
];
const commentSeed = () => comment.bulkCreate(commentData);
module.exports = commentSeed;