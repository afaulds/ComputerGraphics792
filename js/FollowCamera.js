function FollowCamera(scene) {
	this.camera = null;
    this.scene = scene;
    this.mode = 1; // First Person, Third Person, Global
}

FollowCamera.prototype.init = function() {
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.camera.position.x = -10;
	this.camera.position.y = 10;
	this.camera.position.z = -10;
	this.camera.lookAt(new THREE.Vector3());
};

FollowCamera.prototype.update = function() {
	// Calculate the current rotation angles
	// wantedRotationAngle = target.eulerAngles.y;
	// wantedHeight = target.position.y + height;

	// currentRotationAngle = transform.eulerAngles.y;
	// currentHeight = transform.position.y;

	// Damp the rotation around the y-axis
	// currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	// Damp the height
	// currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);

	// Convert the angle into a rotation
	// currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);

	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	// transform.position = target.position;
	// transform.position -= currentRotation * Vector3.forward * distance;

	// Set the height of the camera
	// transform.position.y = currentHeight;

	// Always look at the target
	// transform.LookAt (target);
	// this.obj.position.set(Math.random(), Math.random(), Math.random());
};
