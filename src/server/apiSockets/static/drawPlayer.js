const drawPlayer = (context, player, h, w) => {
	const playerX = player.positionX;
	const playerY = player.positionY;
	const saberPosX = player.saberEndFacePosition.x;
	const saberPosY = player.saberEndFacePosition.y;

	context.beginPath();
	context.fillStyle = "red";
	context.font = "20px sans-serif";
	context.fillText(`Player ${player.name}  health: ${player.health}`, playerX - 100, playerY - 50);
	context.closePath();

	context.beginPath();
	context.strokeStyle = "white";
	context.lineWidth = 10;
	context.arc(playerX, playerY, player._playerRadius, 0, 2 * Math.PI);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.moveTo(playerX, playerY);
	context.lineTo(saberPosX, saberPosY);
	context.strokeStyle = player.color;
	context.stroke();
};
