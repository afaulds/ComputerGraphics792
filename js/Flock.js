function Flock()
{
	this.boids = [];
}

Flock.prototype.add(Boid b)
{
	boids.add(b);
}

Flock.prototype.update = function(deltaTime)
{
	for(int i = 0; i < boids.length; i++)
	{
		Boid b = (Boid) boids.get(i);
		b.run(boids);
	}
}

