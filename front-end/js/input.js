var lastCode;
function keyDownEvent(e) {
	switch (e.keyCode) {
		case 37:
			if (lastCode == 39) break;
			else {
				lastCode = 37;
				nextX = -1;
				nextY = 0;
				break;
			}
		case 38:
			if (lastCode == 40) break;
			else {
				lastCode = 38;
				nextX = 0;
				nextY = -1;
				break;
			}
		case 39:
			if (lastCode == 37) break;
			else {
				lastCode = 39;
				nextX = 1;
				nextY = 0;
				break;
			}
		case 40:
			if (lastCode == 38) break;
			else {
				lastCode = 40;
				nextX = 0;
				nextY = 1;
				break;
			}
	}
}
