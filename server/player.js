const myMath = require("./math").myMath;

const players = {};
const ANGEL_KEF = Math.PI / 200;
const colorLightSibers = ["green", "red", "blue", "white"];

class Player {
	constructor(props) {
		this._siberRadius = 100;
		this._playerRadius = 30;
		this._id = props.id;

		this.health = 200;
		this.positionX = 300;
		this.positionY = 300;
		this.angel = 0;
		this.angelKef = ANGEL_KEF;

		this.color = props.color;
		this.name = props.name;

		this.saberEndFacePosition = { x: null, y: null };
		this.damageFrom = null;
	}
	getIntersection(players) {
		//check end saber position this player
		for (const id in players) {
			if (this._id === id)
				continue;

			const player2 = players[id];

			let lengthSiberVector = myMath.lengthVector(this.saberEndFacePosition.x, this.saberEndFacePosition.y, player2.positionX, player2.positionY);

			if (lengthSiberVector <= this._playerRadius) {
				players[id].health -= 5;
				players[id].damageFrom = this.name;
			}
		}
	}
}

module.exports.getPlayers = (socket) => {
	socket.on("new player", () => {
		players[socket.id] = new Player({
			id: socket.id,
			name: Object.keys(players).length,
			color: colorLightSibers[myMath.random(0, colorLightSibers.length)]
		});
	});
	socket.on("movement", (data) => {
		const player = players[socket.id] || {};
		if (data.left) {
			player.positionX -= 5;
		}
		if (data.up) {
			player.positionY -= 5;
		}
		if (data.right) {
			player.positionX += 5;
		}
		if (data.down) {
			player.positionY += 5;
		}
		if (data.kick) {
			player.angelKef *= ANGEL_KEF * 20 > player.angelKef ? 1.1 : ANGEL_KEF;
		} else {
			player.angelKef = ANGEL_KEF;
		}
	});
	socket.on("disconnect", () => {
		delete players[socket.id];
	});

	return players;
}
