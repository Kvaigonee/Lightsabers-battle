const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
	process.env.NAME,
	process.env.DB_USER,
	process.env.PASSWORD,
	{
		dialect: "postgres",
		host: process.env.HOST,
		port: process.env.DB_PORT,
	}
);
