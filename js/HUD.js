function HUD(scene)
{
	this.score = 0;
	this.crunchIsShowing = false;
	this.crunchTime = 0;

	for(var i = 0; i < 3; i++)
	{
		var healthNode = document.createElement('div');
		healthNode.id = "health" + i
		healthNode.innerHTML = '<img src="img/heart.png">';
		healthNode.style.position = "absolute";
		healthNode.style.left = (50 * i) + "px";
		healthNode.style.top = "10px";
		document.body.appendChild(healthNode)
	}
	this.scoreNode = document.createElement('div');
	this.scoreNode.id = "score"
	this.scoreNode.innerHTML = this.score;
	this.scoreNode.style.position = "absolute";
	this.scoreNode.style.left = "250px";
	this.scoreNode.style.top = "10px";
	this.scoreNode.style.color = "#FFFFFF";
	this.scoreNode.style.fontSize = "50px";
	document.body.appendChild(this.scoreNode)

	this.crunchNode = document.createElement('div');
	this.crunchNode.id = 'crunch'
	this.crunchNode.innerHTML = '<img src="img/crunch.png">';
	this.crunchNode.style.position = "absolute";
	this.crunchNode.style.left = (window.innerWidth / 2.0 - 225) + "px";
	this.crunchNode.style.top = (window.innerHeight / 2.0 - 225) + "px";
	this.crunchNode.style.display = "none";
	document.body.appendChild(this.crunchNode)
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
			this.hideImage();
		}
	}
}

HUD.prototype.addPoints = function(points)
{
	this.score += points;
	this.scoreNode.innerHTML = this.score;
	this.showImage();
}

HUD.prototype.showImage = function(points)
{
	this.crunchNode.style.display = "inline";
	this.crunchTime = 0;
	this.crunchIsShowing = true;
}

HUD.prototype.hideImage = function(points)
{
	this.crunchNode.style.display = "none";
	this.crunchTime = 0;
	this.crunchIsShowing = false;
}


