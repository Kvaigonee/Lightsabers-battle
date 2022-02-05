const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const getPlayers = require("./player").getPlayers;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set("port", 5000);
app.use("/static", express.static(path.dirname(__dirname) + "/static"));

app.get("/", (request, response) => {
	response.sendFile(path.join(__dirname, "index.html"));
});

server.listen(5000, () => {
	console.log("Starting server on port 5000");
});

let players = null;

io.on("connection", (socket) => {
	players = getPlayers(socket);
});

const gameLoop = (players, io) => {
	for (const id in players) {
		const checkPlayer = players[id];
		checkPlayer.saberEndFacePosition.x = checkPlayer.positionX + checkPlayer._siberRadius * Math.cos(checkPlayer.angel);
		checkPlayer.saberEndFacePosition.y = checkPlayer.positionY + checkPlayer._siberRadius * Math.sin(checkPlayer.angel);
		checkPlayer.getIntersection(players);

		if (checkPlayer.health < 0) {
			io.sockets.emit("kill", checkPlayer);
			delete players[id];
			break;
		}

		if (checkPlayer.angel > Math.PI * 2) {
			checkPlayer.angel = 0;
		} else {
			checkPlayer.angel += checkPlayer.angelKef;
		}
	}
	io.sockets.emit("state", players);
}

setInterval(() => {
	if (players && io) {
		gameLoop(players, io);
	}
}, 1000 / 60);

