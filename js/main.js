// Global variables.
var clock, scene, renderer, player, camera, spawner, hud;

function initScene() {
	// Setup scene.
	scene = new THREE.Scene();

	// Setup render window to use entire browser window and add renderer to HTML document.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	setupSkyDome();

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

	// Construct objects.
	gameInput = new GameInput();

	player = new Player(scene, gameInput);
	camera = new GameCamera(scene);
	spawner = new Spawner(scene);
	hud = new HUD(scene);
	clock = new THREE.Clock();

	// Initialize objects.
	camera.init();
	player.init();
	spawner.init();
	hud.init();

	spawner.setPlayer(player);
	spawner.setHUD(hud);

	camera.setLookAt(player, new THREE.Vector3(0, 10, -10), CameraTypeEnum.THIRD);
	// camera.setLookAt(player, new THREE.Vector3(-200, 200, 0), CameraTypeEnum.WORLD);

	// Start rendering.
	render();
}


function setupSkyDome()
{
	var texture	= THREE.ImageUtils.loadTexture("img/ocean.jpg");
	texture.minFilter = THREE.NearestFilter;
	var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
	var geometry = new THREE.SphereGeometry(100000, 20, 20);
	// var material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
	skyMesh = new THREE.Mesh(geometry, material);
	scene.add(skyMesh);
}

// Render loop required to redraw each frame of animation.
function render()
{
	var deltaTime = clock.getDelta();

	// Update all appropriate objects.
	player.update(deltaTime);
	camera.update(deltaTime);
	spawner.update(deltaTime);
	hud.update(deltaTime);

	requestAnimationFrame(render);
	renderer.render(this.scene, this.camera.obj);
}
