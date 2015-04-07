function Mine(scene)
{
    this.scene = scene;
    this.velocity = new THREE.Vector3(0, -10, 0);
    this.obj = null;
    this.size = 4;
    this.collisionDistance = this.size;
}

Mine.prototype.init = function()
{
	this.obj = new THREE.Object3D();
	this.obj.name = "Mine";

	var mine = this.buildMine(this.size);

	this.obj.add(mine);
	this.scene.add(this.obj);
};

Mine.prototype.update = function(deltaTime)
{
	var pos = this.obj.position;
	var distance = this.velocity.clone();
	distance.multiplyScalar(deltaTime);
	pos.add(distance);
};

Mine.prototype.getPosition = function()
{
	return(this.obj.position);
};

Mine.prototype.calcDist = function(otherObject)
{
	var dist = this.getPosition().distanceToSquared(otherObject.getPosition());
	return(dist);
};

Mine.prototype.isCollision = function(otherObject)
{
	// Use square distance to speed up calculation.
	var dist = this.getPosition().distanceTo(otherObject.getPosition());
	if(dist < this.collisionDistance + otherObject.collisionDistance)
	{
		return(true);
	}
	else
	{
		return(false);
	}
};

Mine.prototype.destroy = function()
{
	this.scene.remove(this.obj);
};

Mine.prototype.buildMine = function(size)
{
	var color = 0x000000;
	var geometry = new THREE.SphereGeometry(size, 10, 10);

	var material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
	var mesh = new THREE.Mesh(geometry, material);

	mesh.scale.x = size;
	mesh.scale.y = size;
	mesh.scale.z = size;

	return(mesh);
};