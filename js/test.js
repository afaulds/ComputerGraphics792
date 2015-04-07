var scene, camera, renderer;

// Initial scene.
initScene();
setupLights();

var gameInput = new GameInput();

var player = new Player(scene, gameInput);
player.init();

// Start rendering.
renderLoop();

function initScene()
{
	var visWidth = window.innerWidth;
	var visHeight = window.innerHeight;

	// Setup scene.
	scene = new THREE.Scene();

	// Setup camera and position
	camera = new THREE.PerspectiveCamera( 75, visWidth / visHeight, 0.1, 1000 );
	camera.position.x = 5;
	camera.position.y = 5;
	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3());
	controls = new THREE.OrbitControls(camera);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(visWidth, visHeight);
	//document.body.appendChild(renderer.domElement);
	document.getElementById("visualization").appendChild( renderer.domElement );
}

// Render loop required to redraw each frame of animation.
function renderLoop()
{
	player.update(0.0001);
	requestAnimationFrame(renderLoop);
	renderer.render(scene, camera);
}

function setupLights() {
	// Add two point lights and an ambient light for shadow.

	// Point light 1
	var light = new THREE.PointLight(0xffffff, 1, 1000);
	light.position.set(5, 5, 0);
	scene.add(light);

	// Ambient light
	var ambientLight = new THREE.AmbientLight(0x222222);
	scene.add(ambientLight);
}
