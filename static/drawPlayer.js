const drawPlayer = (context, player) => {
	const playerX = player.positionX;
	const playerY = player.positionY;

	context.beginPath();
	context.fillStyle = "red";
	context.font = "20px sans-serif";
	context.fillText(`Player ${player.name}  health: ${player.health}`, player.positionX - 100, player.positionY - 50);
	context.closePath();
	context.beginPath();
	context.strokeStyle = "white";
	context.lineWidth = 10;
	context.arc(playerX, playerY, player._playerRadius, 0, 2 * Math.PI);
	context.stroke();
	context.closePath();
	context.beginPath();
	context.moveTo(playerX, playerY);
	context.lineTo(player.saberEndFacePosition.x, player.saberEndFacePosition.y);
	context.strokeStyle = player.color;
	context.stroke();
}