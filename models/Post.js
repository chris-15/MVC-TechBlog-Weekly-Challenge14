const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Post model
class Post extends Model {}

//defining columns for post tabel
Post.init(
    {
        // id column that is autoincremented number, primary key and not null values
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //posts title column that is string and no null values
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // posts text column that is a string and no null
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
            //unsure if need to validate, comeback?
        },
        // user id column that references user models id
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    //import sequilize connection
    sequelize,
    timestamps: false, // dont auto create createdAt/updatedAt timestamp fields
    freezeTableName: true, // dont pluralize name of db table
    underscored: true, //underscores instead of camel case
    modelName: "user", // model name stays lowercase in db
    }
);

module.exports = Post;