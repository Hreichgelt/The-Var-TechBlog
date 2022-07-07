const userSeed = require('./userSeed');
const postSeed = require('./postSeed');
const commentSeed = require('./commentSeed');
const sequelize  = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n')
    await userSeed();
    console.log('\n----- USERS SEEDED -----\n')
    await postSeed();
    console.log('\n----- POSTS SEEDED -----\n')
    await commentSeed();
    console.log('\n----- COMMENTS SEEDED -----\n')

    process.exit(0);
};

seedAll();