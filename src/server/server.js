const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const { InitSockets } = require("./common/sockets");
const { GameLoop } = require("./common/gameLoop");

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

const players = new InitSockets(io).players;
new GameLoop(players, io).loop();
