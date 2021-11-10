const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");

//create association User > Post
User.hasMany(Post, { foreignKey: "user_id" });

//reverse association Post > User
Post.belongsTo(User, { foreignKey: "user_id" });

Comment.belongsTo(User, { foreignKey: "user_id" });

Comment.belongsTo(Post, { foreignKey: "post_id" });

// Connect User to Votes
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

// Connect Post to votes
Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

Vote.belongsTo(User, { foreignKey: "user_id" });

Vote.belongsTo(Post, { foreignKey: "post_id" });

User.hasMany(Vote, { foreignKey: "user_id" });

Post.hasMany(Vote, { foreignKey: "post_id" });

User.hasMany(Comment, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });

module.exports = { User, Post, Vote, Comment };
