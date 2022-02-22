module.exports.myMath = {
	random: (a, b) => {
		return parseInt(Math.random() * (b - a) + a);
	},
	lengthVector: (x1, y1, x2, y2) => {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	},
};
