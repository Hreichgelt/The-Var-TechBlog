// round up other models for export - user/comment/post

const user = require("./user");
const comment = require("./comment");
const post = require("./post");

user.hasMany(post, {
  foreignKey: "user_id",
  onDelete: 'CASCADE'
});
post.belongsTo(user, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});
user.hasMany(comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  hooks: true,
});
comment.belongsTo(user, {
  foreignKey: "user_id",
  hooks: true,
});
post.hasMany(comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  hooks: true,
});
comment.belongsTo(post, {
  foreignKey: 'post_id'
})

module.exports = { user, post, comment };
