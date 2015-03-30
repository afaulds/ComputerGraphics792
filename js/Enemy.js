function Enemy(scene)
{
    this.scene = scene;
    this.velocity = new THREE.Vector3();
    this.obj = null;
    this.collisionGeometry = null;
}

Enemy.prototype.init = function()
{
	this.obj = new THREE.Object3D();
	this.obj.name = "Enemy";

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0xff0000});
	var box = new THREE.Mesh(geometry, material);

	var geometry = new THREE.SphereGeometry(3, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
	var sphere = new THREE.Mesh(geometry, material);

	this.obj.add(box);
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
	// var point = this.velocity.clone();
	// point.add(this.getPosition());
	// this.obj.lookAt(point);
};

Enemy.prototype.getPosition = function()
{
	return(this.obj.position);
}
