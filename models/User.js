const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create User Model
class User extends Model {
  // set up method to check password using bcrypt
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// defining clolumns for user table
User.init(
  {
    // collumns

    // id column that is autoincremented number, no null values and is primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //username column that is string and no null values
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //no duplicate email values in table
      unique: true,
      // validate data
      validate: {
        isEmail: true,
      },
    },
    //password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password must be atleast 5 characters long
        len: [5],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecylce hook functionality to hash password using bcrypt
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecylce hook functionality to hash password using bcrypt when password is updated
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    //import sequilize connection
    sequelize,
    timestamps: false, // dont auto create createdAt/updatedAt timestamp fields
    freezeTableName: true, // dont pluralize name of db table
    underscored: true, //underscores instead of camel case
    modelName: "user", // model name stays lowercase in db
  }
);

module.exports = User;
