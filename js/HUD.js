function HUD(scene)
{
	this.score = 0;
	this.health = 3;
	this.crunchIsShowing = false;
	this.crunchTime = 0;
	this.boomIsShowing = false;
	this.boomTime = 0;
	this.healthNodes = [];

	this.healthNodes[0] = document.createElement('div');
	this.healthNodes[0].innerHTML = '<img src="img/heart.png">';
	this.healthNodes[0].style.position = "absolute";
	this.healthNodes[0].style.left = "0px";
	this.healthNodes[0].style.top = "10px";
	document.body.appendChild(this.healthNodes[0])

	this.healthNodes[1] = document.createElement('div');
	this.healthNodes[1].innerHTML = '<img src="img/heart.png">';
	this.healthNodes[1].style.position = "absolute";
	this.healthNodes[1].style.left = "50px";
	this.healthNodes[1].style.top = "10px";
	document.body.appendChild(this.healthNodes[1])

	this.healthNodes[2] = document.createElement('div');
	this.healthNodes[2].innerHTML = '<img src="img/heart.png">';
	this.healthNodes[2].style.position = "absolute";
	this.healthNodes[2].style.left = "100px";
	this.healthNodes[2].style.top = "10px";
	document.body.appendChild(this.healthNodes[2])

	this.scoreNode = document.createElement('div');
	this.scoreNode.innerHTML = this.score;
	this.scoreNode.style.position = "absolute";
	this.scoreNode.style.left = "250px";
	this.scoreNode.style.top = "10px";
	this.scoreNode.style.color = "#FFFFFF";
	this.scoreNode.style.fontSize = "50px";
	document.body.appendChild(this.scoreNode)

	this.crunchNode = document.createElement('div');
	this.crunchNode.innerHTML = '<img src="img/crunch.png">';
	this.crunchNode.style.position = "absolute";
	this.crunchNode.style.left = (window.innerWidth / 2.0 - 225) + "px";
	this.crunchNode.style.top = (window.innerHeight / 2.0 - 225) + "px";
	this.crunchNode.style.display = "none";
	document.body.appendChild(this.crunchNode)

	this.boomNode = document.createElement('div');
	this.boomNode.innerHTML = '<img src="img/boom.png">';
	this.boomNode.style.position = "absolute";
	this.boomNode.style.left = (window.innerWidth / 2.0 - 225) + "px";
	this.boomNode.style.top = (window.innerHeight / 2.0 - 225) + "px";
	this.boomNode.style.display = "none";
	document.body.appendChild(this.boomNode)

	this.gameOverNode = document.createElement('div');
	this.gameOverNode.innerHTML = '<img src="img/gameover.jpg">';
	this.gameOverNode.style.position = "absolute";
	this.gameOverNode.style.left = "0px";
	this.gameOverNode.style.top = "0px";
	this.gameOverNode.style.display = "none";
	document.body.appendChild(this.gameOverNode)
}

HUD.prototype.init = function()
{
}

HUD.prototype.update = function(deltaTime)
{
	if(this.crunchIsShowing)
	{
		this.crunchTime += deltaTime;
		if(this.crunchTime > 0.5)
		{
			this.hideCrunch();
		}
	}
	if(this.boomIsShowing)
	{
		this.boomTime += deltaTime;
		if(this.boomTime > 0.5)
		{
			this.hideBoom();
		}
	}
}

HUD.prototype.addPoints = function(points)
{
	this.score += points;
	this.scoreNode.innerHTML = this.score;
	this.showCrunch();
}

HUD.prototype.showCrunch = function(points)
{
	this.crunchNode.style.display = "inline";
	this.crunchTime = 0;
	this.crunchIsShowing = true;
}

HUD.prototype.hideCrunch = function(points)
{
	this.crunchNode.style.display = "none";
	this.crunchTime = 0;
	this.crunchIsShowing = false;
}

HUD.prototype.showBoom = function(points)
{
	this.boomNode.style.display = "inline";
	this.boomTime = 0;
	this.boomIsShowing = true;
}

HUD.prototype.hideBoom = function(points)
{
	this.boomNode.style.display = "none";
	this.boomTime = 0;
	this.boomIsShowing = false;
}
HUD.prototype.removeHealth = function()
{
	this.health--;
	this.healthNodes[this.health].style.display = "none";
	this.showBoom();
	if(this.health == 0)
	{
		this.gameOverNode.style.display = "inline";
	}
}
