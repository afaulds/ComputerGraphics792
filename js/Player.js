function Player(scene)
{
    this.scene = scene;
    this.velocity = new THREE.Vector3(10, 0, 0);
    this.turnRate = 0.05;
    this.obj = null;
    this.collisionGeometry = null;
}

Player.prototype.init = function()
{
	//var parent = this.scene.getObjectByName( "Characters" );
	this.obj = new THREE.Object3D();
	this.obj.name = "Player";

	var geometry = new THREE.BoxGeometry(1, 1.5, 2);
	var material = new THREE.MeshBasicMaterial({color: 0xffff00});
	var box = new THREE.Mesh(geometry, material);

	this.obj.add(box);
	this.scene.add(this.obj);

	var axisHelper = new THREE.AxisHelper( 5 );
	this.obj.add( axisHelper );
};

Player.prototype.update = function(deltaTime)
{
	var distance = this.velocity.clone();
	distance.multiplyScalar(deltaTime);
	this.getPosition().add(distance);

	// Aim along velocity.
	var point = this.velocity.clone();
	point.add(this.getPosition());
	this.obj.lookAt(point);

	if(Input.arrowUp)
	{
		this.velocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), this.turnRate);
	}
	if(Input.arrowDown)
	{
		this.velocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), -this.turnRate);
	}
	if(Input.arrowLeft)
	{
		this.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.turnRate);
	}
	if(Input.arrowRight)
	{
		this.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), -this.turnRate);
	}
};

Player.prototype.getForward = function() {
	return(new THREE.Vector3(this.obj.matrix.elements[0], this.obj.matrix.elements[1], this.obj.matrix.elements[2]));
}

Player.prototype.getLeft = function() {
	return(new THREE.Vector3(this.obj.matrix.elements[4], this.obj.matrix.elements[5], this.obj.matrix.elements[6]));
}

Player.prototype.getUp = function() {
	return(new THREE.Vector3(this.obj.matrix.elements[8], this.obj.matrix.elements[9], this.obj.matrix.elements[10]));
}

Player.prototype.getPosition = function() {
	return(this.obj.position);
}
