function Player(scene) {
    this.scene = scene;
    this.speed = 0.1;
    this.turnRate = 1;
    this.obj = null;
}

Player.prototype.init = function() {
	var parent = this.scene.getObjectByName( "Characters" );
	this.obj = new THREE.Object3D();
	this.obj.name = "Player";

	var geometry = new THREE.BoxGeometry( 1, 1.5, 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh( geometry, material );

	this.obj.add( sphere );
	parent.add( this.obj );
};

Player.prototype.update = function() {
	console.log("Player.update")
	var pos = this.obj.position;
	if(input.arrowUp) {
		pos.x += speed;
	}
	if(input.arrowDown) {
		pos.x -= speed;
	}
	if(input.arrowLeft) {
		pos.z += speed;
	}
	if(input.arrowRight) {
		pos.z -= speed;
	}
	this.obj.position.set(pos.x, pos.y, pos.z);
	// this.obj.position.set(Math.random(), Math.random(), Math.random());
};

Player.prototype.fire = function() {
};
