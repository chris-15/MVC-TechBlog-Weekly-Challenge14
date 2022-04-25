const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comment model
class Comment extends Model {}

Comment.init(
    {
        // columns
        // id column that is autoincremented number, primary key and not null values
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // comment text column that is a string no null values and is atleast 1 character long
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // user id column that references user models id
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'   
            }
        },
        // post id column that references post models id
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        //import sequilize connection
        sequelize,
        freezeTableName: true, // dont pluralize name of db table
        underscored: true, //underscores instead of camel case
        modelName: "comment", // model name stays lowercase in db
    }
);

module.exports = Comment;