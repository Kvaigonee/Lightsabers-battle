const { Player } = require("./player.js");
const { myMath } = require("./math");

const ANGEL_KEF = Math.PI / 200;
const COLOR_LIGHTSABERS = ["green", "red", "blue", "white"];

class InitSockets {
	constructor(io) {
		this.players = {};
		this._connection(io);
	}

	_connection(io) {
		io.on("connection", (socket) => {
			this._newPlayer(socket);
			this._movePlayer(socket);
			this._disconnectPlayer(socket);
		});
	}

	_newPlayer(socket) {
		socket.on("new player", () => {
			this.players[socket.id] = new Player({
				id: socket.id,
				name: Object.keys(this.players).length,
				color: COLOR_LIGHTSABERS[myMath.random(0, COLOR_LIGHTSABERS.length)],
				angelKef: ANGEL_KEF,
			});
		});
	}

	_movePlayer(socket) {
		socket.on("movement", (data) => {
			const player = this.players[socket.id] || {};
			if (data.left) {
				player.positionX -= 5;
				player.vector.x = -1;
			}
			if (data.up) {
				player.positionY -= 5;
				player.vector.y = -1;
			}
			if (data.right) {
				player.positionX += 5;
				player.vector.x = 1;
			}
			if (data.down) {
				player.positionY += 5;
				player.vector.y = 1;
			}
			if (data.kick) {
				player.angelKef *= ANGEL_KEF * 20 > player.angelKef ? 1.1 : ANGEL_KEF;
			} else {
				player.angelKef = ANGEL_KEF;
			}
		});
	}

	_disconnectPlayer(socket) {
		socket.on("disconnect", () => {
			delete this.players[socket.id];
		});
	}
}

module.exports.InitSockets = InitSockets;
