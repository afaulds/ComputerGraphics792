function Spawner(scene)
{
    this.scene = scene;
    this.spawnRate = 60; // per minute
    this.maxSpawn = 500;
    this.player = null;
    this.HUD = null;
    this.boids = [];
    this.enemies = [];
}


Spawner.prototype.init = function()
{
	for(var i = 0; i < this.maxSpawn; i++)
	{
		console.log("SPAWN OBJECT");
		var enemy = new Enemy(this.scene);
		enemy.init();
		var boid = new Boid();
		boid.setAvoidWalls( true );
		boid.setWorldSize(500, 500, 500);
		boid.position = new THREE.Vector3((2 * Math.random() - 1) * 500, (2 * Math.random() - 1) * 500, (2 * Math.random() - 1) * 500);
		this.boids.push(boid);
		this.enemies.push(enemy);
	}
};

Spawner.prototype.update = function(deltaTime)
{
	var minDist = 999999999;
	for(var i = this.boids.length - 1; i >= 0; i--)
	{
		this.boids[i].run(this.boids);
		this.enemies[i].velocity = this.boids[i].velocity;
		this.enemies[i].getPosition().copy(this.boids[i].position);
		this.enemies[i].update(deltaTime);
		minDist = Math.min(minDist, this.enemies[i].calcDist(player));
		if(player != null && this.enemies[i].isCollision(player))
		{
			this.enemies[i].destroy();
			this.enemies.splice(i, 1);
			this.boids.splice(i, 1);
			this.HUD.addPoints(1);
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
