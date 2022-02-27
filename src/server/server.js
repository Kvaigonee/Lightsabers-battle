require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const sequelize = require("./apiServer/db/dp");
const cors = require("cors");
const router = require("./apiServer/routes/index");
const errorHandler = require("./apiServer/middleware/handlingMiddleware");
const models = require("./apiServer/models/models");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

app.set("port", PORT);
const connectToDB = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		server.listen(PORT, () => {
			console.log(`Starting server on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

connectToDB();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

app.use("/static", express.static(__dirname + "/apiSockets/static"));

app.get("/", (request, response) => {
	response.sendFile(path.join(__dirname + "/apiSockets/static", "index.html"));
});

const { InitSockets } = require("./apiSockets/common/sockets");
const { GameLoop } = require("./apiSockets/common/gameLoop");

const players = new InitSockets(io).players;
new GameLoop(players, io).loop();
