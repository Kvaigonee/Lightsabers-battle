const { Singular, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class SingularController {
	async get(req, res) {
		const singulars = await Singular.findAll();
		return res.json(singulars);
	}

	async post(req, res) {
		const { name } = req.body;
		const singular = await Singular.create({ name });
		return res.json(singular);
	}
}

module.exports = new SingularController();
