function Spawner(scene)
{
    this.scene = scene;
    this.spawnRate = 60; // per minute
    this.maxSpawn = 100;
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
	for(var i = 0; i < this.boids.length; i++)
	{
		this.boids[i].run(this.boids);
		this.enemies[i].getPosition().copy(this.boids[i].position);
	}
};
