// Global variables.
var scene;
var renderer;
var player;
var camera;
var input;

function initScene() {
	// Setup scene.
	scene = new THREE.Scene();

	// Setup render window to use entire browser window and add renderer to HTML document.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Setup scene graph.
	var obj = new THREE.Object3D();
	obj.name = "Level";
	scene.add(obj);
	var obj = new THREE.Object3D();
	obj.name = "Characters";
	scene.add(obj);
	var obj = new THREE.Object3D();
	obj.name = "Projectiles";
	scene.add(obj);

	camera = new FollowCamera(scene);
	player = new Player(scene);
	input = new GameInput();

	camera.init();
	player.init();

	// Start rendering.
	render();
}

// Render loop required to redraw each frame of animation.
function render() {
	// Update all appropriate objects.
	player.update();
	camera.update();

	requestAnimationFrame(render);
	renderer.render(this.scene, this.camera.camera);
}
