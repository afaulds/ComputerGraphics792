function Spawner(scene)
{
    this.scene = scene;
    this.spawnRate = 60; // per minute
    this.maxSpawn = 300;
    this.player = null;
    this.HUD = null;
    this.boids = [];
    this.fishes = [];
    this.mines = [];
}


Spawner.prototype.init = function()
{
	for(var i = 0; i < this.maxSpawn; i++)
	{
		console.log("SPAWN OBJECT");
		var fish = new Fish(this.scene);
		fish.init();
		var boid = new Boid();
		boid.setAvoidWalls( true );
		boid.setWorldSize(500, 500, 500);
		boid.position = new THREE.Vector3((2 * Math.random() - 1) * 500, (2 * Math.random() - 1) * 500, (2 * Math.random() - 1) * 500);
		this.boids.push(boid);
		this.fishes.push(fish);

		var mine = new Mine(this.scene);
		mine.init();
		mine.getPosition().copy(new THREE.Vector3(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 500));
		this.mines.push(mine);
	}
};

Spawner.prototype.update = function(deltaTime)
{
	var minDist = 999999999;
	for(var i = this.boids.length - 1; i >= 0; i--)
	{
		this.boids[i].run(this.boids);
		this.fishes[i].velocity = this.boids[i].velocity;
		this.fishes[i].getPosition().copy(this.boids[i].position);
		this.fishes[i].update(deltaTime);
		minDist = Math.min(minDist, this.fishes[i].calcDist(player));
		if(player != null && this.fishes[i].isCollision(player))
		{
			this.fishes[i].destroy();
			this.fishes.splice(i, 1);
			this.boids.splice(i, 1);
			this.HUD.addPoints(1);
		}
	}
	for(var i = this.mines.length - 1; i >= 0; i--)
	{
		this.mines[i].update(deltaTime);
		if(player != null && this.mines[i].isCollision(player))
		{
			this.mines[i].destroy();
			this.mines.splice(i, 1);
			this.HUD.removeHealth();
		}
		if(this.mines[i].getPosition().y < -500)
		{
			this.mines[i].destroy();

			var mine = new Mine(this.scene);
			mine.init();
			mine.getPosition().copy(new THREE.Vector3(Math.random() * 1000 - 500, 500, Math.random() * 1000 - 500));
			this.mines[i] = mine;
		}
	}
};

Spawner.prototype.setPlayer = function(player)
{
	this.player = player;
};

Spawner.prototype.setHUD = function(HUD)
{
	this.HUD = HUD;
};
