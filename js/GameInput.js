function GameInput() {
	console.log("HERE")
    this.arrowUp = false;
    this.arrowDown = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.space = false;
	document.addEventListener("keydown", this.onKeyDown, false);
	document.addEventListener("keyup", this.onKeyUp, false);
}

GameInput.prototype.onKeyDown = function(event) {
	var keyCode = event.which;
	console.log(keyCode)

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

GameInput.prototype.onKeyUp = function(event) {
	var keyCode = event.which;

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
