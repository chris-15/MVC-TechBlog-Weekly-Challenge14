const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// creating associations

//user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// post only belongs to a user not many users
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//Comments belong to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//Comments belong to posts 
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//Users can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//Posts can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };