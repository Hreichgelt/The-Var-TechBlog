const userSeed = require('./userSeed');
const postSeed = require('./postSeed');
const commentSeed = require('./commentSeed');
const { sequelize } = require('../models/user');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await userSeed();
    await postSeed();
    await commentSeed();
};

seedAll();