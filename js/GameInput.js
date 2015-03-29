function GameInput()
{
    this.arrowUp = false;
    this.arrowDown = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.space = false;
	document.addEventListener("keydown", this.onKeyDown.bind(this), false);
	document.addEventListener("keyup", this.onKeyUp.bind(this), false);
}

GameInput.prototype.onKeyDown = function(event)
{
	var keyCode = event.which;

	if(keyCode == 87 || keyCode == 119) { // W
		this.arrowUp = true;
	}
	if(keyCode == 83 || keyCode == 115) { // S
		this.arrowDown = true;
	}
	if(keyCode == 65 || keyCode == 97) { // A
		this.arrowLeft = true;
	}
	if(keyCode == 68 || keyCode == 100) { // D
		this.arrowRight = true;
	}

	if(keyCode == 38) { // UP
		this.arrowUp = true;
	}
	if(keyCode == 40) { // DOWN
		this.arrowDown = true;
	}
	if(keyCode == 37) { // LEFT
		this.arrowLeft = true;
	}
	if(keyCode == 39) { // RIGHT
		this.arrowRight = true;
	}
};

GameInput.prototype.onKeyUp = function(event)
{
	var keyCode = event.which;

	if(keyCode == 87 || keyCode == 119) { // W
		this.arrowUp = false;
	}
	if(keyCode == 83 || keyCode == 115) { // S
		this.arrowDown = false;
	}
	if(keyCode == 65 || keyCode == 97) { // A
		this.arrowLeft = false;
	}
	if(keyCode == 68 || keyCode == 100) { // D
		this.arrowRight = false;
	}

	if(keyCode == 38) { // UP
		this.arrowUp = false;
	}
	if(keyCode == 40) { // DOWN
		this.arrowDown = false;
	}
	if(keyCode == 37) { // LEFT
		this.arrowLeft = false;
	}
	if(keyCode == 39) { // RIGHT
		this.arrowRight = false;
	}
};
