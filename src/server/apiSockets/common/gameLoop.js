class GameLoop {
	constructor(players, io) {
		this._players = players;
		this._io = io;
	}

	loop() {
		setInterval(() => {
			this.update();
		}, 1000 / 60);
	}

	update() {
		for (const id in this._players) {
			const checkPlayer = this._players[id];

			checkPlayer.saberEndFacePosition.x =
				checkPlayer.positionX + checkPlayer._siberRadius * Math.cos(checkPlayer.angel);
			checkPlayer.saberEndFacePosition.y =
				checkPlayer.positionY + checkPlayer._siberRadius * Math.sin(checkPlayer.angel);

			checkPlayer.getIntersection(this._players);

			if (checkPlayer.health < 0) {
				this._io.sockets.emit("kill", checkPlayer);
				delete this._players[id];
				break;
			}

			if (checkPlayer.angel > Math.PI * 2) {
				checkPlayer.angel = 0;
			} else {
				checkPlayer.angel += checkPlayer.angelKef;
			}
		}
		this._io.sockets.emit("state", this._players);
	}
}

module.exports.GameLoop = GameLoop;
