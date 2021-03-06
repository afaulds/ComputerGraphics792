function Fish(scene)
{
	this.scene = scene;
	this.velocity = new THREE.Vector3();
	this.obj = null;
	var temp = Math.random();
	if(temp < 0.3)
	{
		this.size = 10;
	}
	else if(temp < 0.6)
	{
		this.size = 6;
	}
	else
	{
		this.size = 3;
	}
	this.collisionDistance = this.size;
}

Fish.prototype.init = function()
{
	this.obj = new THREE.Object3D();
	this.obj.name = "Fish";

	var color = new THREE.Color();
	color.setHSL(Math.random(), 1.0, 0.5);
	var fish = this.buildFish(this.size, color);

	// var geometry = new THREE.SphereGeometry(3, 10, 10);
	// var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
	// var sphere = new THREE.Mesh(geometry, material);

	this.obj.add(fish);
	// this.obj.add(sphere);
	this.scene.add(this.obj);
};

Fish.prototype.update = function(deltaTime)
{
	var pos = this.obj.position;
	var distance = this.velocity.clone();
	distance.multiplyScalar(deltaTime);
	pos.add(distance);

	// Aim along velocity.
	var point = this.velocity.clone();
	point.add(this.getPosition());
	this.obj.lookAt(point);
};

Fish.prototype.getPosition = function()
{
	return(this.obj.position);
};

Fish.prototype.calcDist = function(otherObject)
{
	var dist = this.getPosition().distanceToSquared(otherObject.getPosition());
	return(dist);
};

Fish.prototype.isCollision = function(otherObject)
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

Fish.prototype.destroy = function()
{
	this.scene.remove(this.obj);
};

Fish.prototype.buildFish = function(size, color)
{
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0.0,  0.0,  1.0), //0
		new THREE.Vector3( 0.0,  0.5,  0.0), //1
		new THREE.Vector3( 0.5,  0.0,  0.0), //2
		new THREE.Vector3( 0.0,  0.0, -1.0), //3
		new THREE.Vector3( 0.0, -0.5,  0.0), //4
		new THREE.Vector3(-0.5,  0.0,  0.0), //5
		new THREE.Vector3( 0.0,  0.5, -1.5), //6
		new THREE.Vector3( 0.0, -0.5, -1.5)  //7
	);

	geometry.faces.push(new THREE.Face3(0, 2, 1));
	geometry.faces.push(new THREE.Face3(0, 4, 2));

	geometry.faces.push(new THREE.Face3(1, 2, 3));
	geometry.faces.push(new THREE.Face3(2, 4, 3));

	geometry.faces.push(new THREE.Face3(0, 1, 5));
	geometry.faces.push(new THREE.Face3(0, 5, 4));

	geometry.faces.push(new THREE.Face3(1, 3, 5));
	geometry.faces.push(new THREE.Face3(5, 3, 4));

	geometry.faces.push(new THREE.Face3(3, 6, 7));

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
	var mesh = new THREE.Mesh(geometry, material);

	mesh.scale.x = size;
	mesh.scale.y = size;
	mesh.scale.z = size;

	return(mesh);
};