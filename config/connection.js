const Sequelize = require("sequelize");

require("dotenv").config();

//create connection to tech_blog_db
let sequelize;

// connect to jawsdb for herkou site or connnect to local mysql db
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
