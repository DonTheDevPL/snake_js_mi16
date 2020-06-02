var canvas, ctx;
var lost = false;
var gameInProgres = false;
window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	document.addEventListener('keydown', keyDownEvent);

	/*Renderowanie obrazu x razy na sekundę, w tym przypadku 8 czyli co 125ms */
	var x = 8;
	setInterval(draw, 1000 / x);
};

/*Tworzenie planszy i ustalanie ilości kratek, po których porusza się wąż */
var gridSize = (tileSize = 25);
var nextX = (nextY = 0);

/*Zmienne dotyczące węża*/
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

// początkowe jabłko
randomCoords();

// rysowanie węża i jabłek
function draw() {
	if (lost == false) {
		// move snake in next pos
		snakeX += nextX;
		snakeY += nextY;

		// Sprawdzenie, czy wąż nie znalazł się poza planszą
		if (snakeX < 0) {
			snakeX = gridSize - 1;
		}
		if (snakeX > gridSize - 1) {
			snakeX = 0;
		}

		if (snakeY < 0) {
			snakeY = gridSize - 1;
		}
		if (snakeY > gridSize - 1) {
			snakeY = 0;
		}

		// czy wąż ugryzł jabłko?
		if (snakeX == appleX && snakeY == appleY) {
			tailSize++;
			if (gameInProgres == false) gameInProgres = true;
			randomCoords();
		}

		// kolorowanie tła planszy
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// kolorowanie węża
		ctx.fillStyle = 'green';
		for (var i = 0; i < snakeTrail.length; i++) {
			ctx.fillRect(snakeTrail[i].x * tileSize, snakeTrail[i].y * tileSize, tileSize, tileSize);

			//czy wąż ugryz swój ogon?
			if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
				if (gameInProgres == true) {
					tailSize = endGame(tailSize);
				}
			}
		}

		//pokoloruj jabłko
		ctx.fillStyle = 'red';
		ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

		//ustawianie śladu węża
		snakeTrail.push({ x: snakeX, y: snakeY });
		while (snakeTrail.length > tailSize) {
			snakeTrail.shift();
		}
	}
}
function randomCoords() {
	appleX = Math.floor(Math.random() * gridSize);
	appleY = Math.floor(Math.random() * gridSize);
}
function endGame(tailSize) {
	lost = true;
	alert(tailSize);
	return defaultTailSize;
}
