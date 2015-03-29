function Enemy(scene)
{
    this.scene = scene;
    this.velocity = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    this.obj = null;
    this.collisionGeometry = null;
}

Enemy.prototype.init = function()
{
	this.obj = new THREE.Object3D();
	this.obj.name = "Enemy";

	var geometry = new THREE.BoxGeometry( 1, 1.5, 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var sphere = new THREE.Mesh( geometry, material );

	this.collisionGeometry = geometry;
	this.obj.add(sphere);
	this.scene.add(this.obj);

	var axisHelper = new THREE.AxisHelper( 3 );
	this.obj.add(axisHelper);

};

Enemy.prototype.update = function(deltaTime)
{
	var pos = this.obj.position;
	var distance = this.velocity.clone();
	distance.multiplyScalar(deltaTime);
	pos.add(distance);

	// Aim along velocity.
	var point = this.velocity.clone();
	point.add(this.getPosition());
	this.obj.lookAt(point);

	if(this.getPosition().length() > 100) {
		var speed = this.velocity.length();
		this.velocity = this.getPosition().clone();
		this.velocity.normalize();
		this.velocity.multiplyScalar(-speed);
	}
};

Enemy.prototype.getPosition = function()
{
	return(this.obj.position);
}
