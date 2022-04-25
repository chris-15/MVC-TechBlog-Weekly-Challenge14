const User = require('./User');
const Post = require('./Post');

// creating associations

//user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// post only belongs to a user not many users
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };