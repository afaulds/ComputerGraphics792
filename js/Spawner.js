function Spawner(scene)
{
    this.scene = scene;
    this.spawnRate = 60; // per minute
    this.maxSpawn = 500;
    this.spawnList = [];
    this.neighborDistance = 200;
    this.alignmentWeight = 0.8;
    this.cohesionWeight = 0.5;
    this.alignmentWeight = 0.5;
}

Spawner.prototype.init = function()
{
};

Spawner.prototype.update = function(deltaTime)
{
	if(Math.random() < 0.5 && this.spawnList.length < this.maxSpawn)
	{
		console.log("SPAWN OBJECT");
		var enemy = new Enemy(this.scene);
		enemy.init();
		this.spawnList.push(enemy);
	}
	for(var i = 0; i < this.spawnList.length; i++)
	{
		this.flock(this.spawnList[i]);
		this.spawnList[i].update(deltaTime);
	}
};

Spawner.prototype.flock = function(spawn)
{
	var alignment = new THREE.Vector3();
	var cohesion = new THREE.Vector3();
	var separation = new THREE.Vector3();
	var neighborCount = 0;

	for(var i = 0; i < this.spawnList.length; i++)
	{
		var neighbor = this.spawnList[i];
		if(neighbor != spawn)
		{
			if(neighbor.getPosition().distanceToSquared(spawn.getPosition()) < this.neighborDistance)
			{
				neighborCount++;
				alignment.add(spawn.velocity);
				cohesion.add(neighbor.getPosition());
				separation.add(spawn.getPosition());
				separation.sub(neighbor.getPosition());
			}
		}
	}

	alignment.normalize();
	alignment.multiplyScalar(this.alignmentWeight);
	if(neighborCount > 0)
	{
		cohesion.divideScalar(neighborCount);
		cohesion.sub(spawn.getPosition());
		cohesion.normalize();
	}
	cohesion.multiplyScalar(this.cohesionWeight);

	separation.normalize();

	spawn.velocity.add(alignment);
	spawn.velocity.add(cohesion);
	spawn.velocity.add(separation);
	spawn.velocity.normalize();
	spawn.velocity.multiplyScalar(10);
};
