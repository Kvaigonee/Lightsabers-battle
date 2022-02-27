const myMath = require("./math");

class Player {
	constructor(props) {
		const { id, color, name, angelKef } = props;

		this._siberRadius = 100;
		this._playerRadius = 30;
		this._id = id;

		this.health = 200;
		this.positionX = 300;
		this.positionY = 300;
		this.angel = 0;
		this.angelKef = angelKef;
		this.vector = { x: 0, y: 0 };

		this.color = color;
		this.name = name;

		this.saberEndFacePosition = { x: null, y: null };
		this.damageFrom = null;
	}

	getIntersection(players) {
		//check end saber position this player
		for (const id in players) {
			if (this._id === id) continue;

			const player2 = players[id];

			let lengthSiberVector = myMath.lengthVector(
				this.saberEndFacePosition.x,
				this.saberEndFacePosition.y,
				player2.positionX,
				player2.positionY
			);

			if (lengthSiberVector <= this._playerRadius) {
				players[id].health -= 5;
				players[id].damageFrom = this.name;
			}
		}
	}
}

module.exports.Player = Player;
