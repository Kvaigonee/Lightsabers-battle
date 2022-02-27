const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const createJwt = (id, email) => {
	return jwt.sign({ id, email }, process.env.SECRET_KEY, {
		expiresIn: "24h",
	});
};

class UserController {
	async registration(req, res, next) {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequest("Incorrect email or password"));
		}
		const checkEmail = await User.findOne({ where: { email } });
		if (checkEmail) {
			return next(
				ApiError.badRequest("The user with the same name already exists")
			);
		}
		const hashPassword = await bcrypt.hash(password, 4);
		const user = await User.create({ email, password: hashPassword });

		const token = createJwt(user.id, email);
		return res.json({ token });
	}
	async login(req, res) {}
	async checkAutorisation(req, res) {}
}

module.exports = new UserController();
