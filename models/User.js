const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User Model
class User extends Model {}

// defining clolumns for user
User.init(
    {
        // collumns

        // id column that is autoincremented number, no null values and is primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //username column that is string and no null values
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // email column 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //no duplicate email values in table
            unique: true,
            // validate data
            validate: {
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // password must be atleast 5 characters long
                len: [5]
            }
        }

    },
    {
        //import sequilize connection 
        sequelize,
        timestamps: false, // dont auto create createdAt/updatedAt timestamp fields
        freezeTableName: true, // dont pluralize name of db table
        underscored: true, //underscores instead of camel case
        modelName: 'user' // model name stays lowercase in db

    }
);

module.exports = User;
