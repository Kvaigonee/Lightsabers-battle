const socket = io();

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HIGHT = window.innerHeight;

const canvas = document.getElementById("canvas");
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HIGHT;
const context = canvas.getContext("2d");

socket.emit("new player", context);

socket.on("state", (players) => {
	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(0, 0, 800, 600);
	context.closePath();
	for (const id in players) {
		const player = players[id];
		drawPlayer(context, player);
	}
});

const drawKillItem = (ctx, player) => {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "40px sans-serif";
	ctx.fillText(`Player ${player.damageFrom} kill player ${player.name}`, 100, 50);
	setTimeout(() => {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.clearRect(0, 0, 500, 600);
		ctx.closePath();
	}, 3000);
}

const killItem = document.getElementById("killItem");
killItem.width = 500;
killItem.height = 600;
const ctx = killItem.getContext("2d");

socket.on("kill", (player) => {
	drawKillItem(ctx, player);
});

