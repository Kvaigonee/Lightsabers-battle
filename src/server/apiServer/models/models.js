const sequelize = require("../db/dp");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	singulars: { type: DataTypes.ARRAY(DataTypes.STRING) },
	activeSungular: { type: DataTypes.STRING },
});

const Singular = sequelize.define("singular", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	price: { type: DataTypes.INTEGER },
	name: { type: DataTypes.STRING, unique: true },
	color: { type: DataTypes.STRING, unique: true },
});

User.hasOne(Singular);
Singular.belongsTo(User);

module.exports = {
	User,
	Singular,
};
