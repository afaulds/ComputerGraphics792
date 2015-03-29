function ParticleSystem(scene) {
    this.scene = scene;
    this.particles = []
	for(var i = 0; i < 500; i++) {
		this.particles.push(new Particle(scene));
	}
}

ParticleSystem.prototype.init = function() {
	for(var i = 0; i < this.particles.length; i++) {
		this.particles[i].init();
	}
	this.particles[0].start();
};

ParticleSystem.prototype.update = function(delta) {
	for(var i = 0; i < this.particles.length; i++) {
		this.particles[i].update(delta);
	}
};

/************************************************************************************/
/************************************************************************************/

function Particle(scene) {
    this.scene = scene;
    this.speed = 1;
    this.isActive = false;
}

Particle.prototype.init = function() {
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/particle.png'),
		blending: THREE.AdditiveBlending,
		transparent: true,
		side: THREE.FrontSide,
	});

	// cube
	this.obj = new THREE.Mesh(new THREE.BoxGeometry(1, 0, 1), material);
	this.obj.material.visible = false;
	this.scene.add(this.obj);
};

Particle.prototype.start = function() {
	this.isActive = true;
	this.obj.position.set(0, 0, 0);
	this.obj.material.visible = true;
};

Particle.prototype.update = function(delta) {
	if(this.isActive) {
		this.obj.position.set(0, this.obj.position.y + delta * this.speed, 0);
	}
};
