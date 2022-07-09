const { comment } = require("../models");

const commentData = [
    {
        id: 1,
        comment_text: "good, the whiteboard should go away.",
        user_id: 4,
        post_id: 2,
        created_at: '2022-09-01T01:01:000Z'
    },
    {
        id: 2,
        comment_text: "It really is quite scary, but the toughest part is making the decision to start.",
        user_id: 2,
        post_id: 1,
        created_at: '2022-04-28T01:01:000Z'
    },
    {
        id: 3,
        comment_text: "Great ideas always come to me while near sleep-state. This reminds me of an old proverb, something like let things come to you.",
        user_id: 1,
        post_id: 3,
        created_at: '2022-12-21T01:01:000Z'
    },
    {
        id: 4,
        comment_text: "Open source apps and APIs for inclusivity and easier access to recreation.",
        user_id: 8,
        post_id: 6,
        created_at: '2021-09-15T01:01:000Z'
    },
    {
        id: 5,
        comment_text: "Are SpaceX rockets built with the same tech as tesla engines?",
        user_id: 6,
        post_id: 3,
        created_at: '2022-01-01T01:01:000Z'

    },
];
const commentSeed = () => comment.bulkCreate(commentData);
module.exports = commentSeed;