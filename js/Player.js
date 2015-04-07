function Player(scene, input)
{
	this.scene = scene;
	this.input = input;
	this.velocity = new THREE.Vector3(50, 0, 0);
	this.turnRate = 0.05;
	this.obj = null;
	this.tailPoints = [];
	this.tailTime = 0;
	this.geometry = null;
	this.size = 5;
    this.collisionDistance = this.size;
}

Player.prototype.init = function()
{
	//var parent = this.scene.getObjectByName( "Characters" );
	this.obj = new THREE.Object3D();
	this.obj.name = "Player";

	var shark = this.buildShark();

	this.obj.add(shark);
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

	if(this.input.arrowUp)
	{
		if(this.velocity.y > -50)
		{
			this.velocity.y -= 1;
		}
	}
	else if(this.input.arrowDown)
	{
		if(this.velocity.y < 50)
		{
			this.velocity.y += 1;
		}
	}
	else
	{
	//	this.velocity.y /= 1.1;
	}

	if(this.input.arrowLeft)
	{
		this.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.turnRate);
	}
	else if(this.input.arrowRight)
	{
		this.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), -this.turnRate);
	}

	this.animate(deltaTime);
};

Player.prototype.animate = function(deltaTime)
{
	this.tailTime += deltaTime;
	var x = Math.sin(5 * this.tailTime);
	for(var i = 0; i < this.tailPoints.length; i++)
	{
		this.tailPoints[i].x = x;
	}
	this.geometry.verticesNeedUpdate = true;
}

Player.prototype.getForward = function()
{
	return(new THREE.Vector3(this.obj.matrix.elements[0], this.obj.matrix.elements[1], this.obj.matrix.elements[2]));
};

Player.prototype.getLeft = function()
{
	return(new THREE.Vector3(this.obj.matrix.elements[4], this.obj.matrix.elements[5], this.obj.matrix.elements[6]));
};

Player.prototype.getUp = function()
{
	return(new THREE.Vector3(this.obj.matrix.elements[8], this.obj.matrix.elements[9], this.obj.matrix.elements[10]));
}

Player.prototype.getPosition = function() {
	return(this.obj.position);
}

Player.prototype.buildShark = function()
{
	color = 0x36456a;
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0.0,  0.0,  1.0), //0
		new THREE.Vector3( 0.0,  0.5,  0.5), //1
		new THREE.Vector3( 0.0, -0.5,  0.5), //2
		new THREE.Vector3( 0.5,  0.0,  0.5), //3
		new THREE.Vector3(-0.5,  0.0,  0.5), //4
		new THREE.Vector3( 0.0,  0.5, -0.5), //5
		new THREE.Vector3( 0.0, -0.5, -0.5), //6
		new THREE.Vector3( 0.5,  0.0, -0.5), //7
		new THREE.Vector3(-0.5,  0.0, -0.5), //8
		new THREE.Vector3( 0.0,  0.0, -1.0), //9
		new THREE.Vector3( 0.0,  1.0, -0.5), //10
		new THREE.Vector3( 0.0,  0.5,  0.0), //11
		new THREE.Vector3( 0.0,  0.5, -1.5), //12
		new THREE.Vector3( 0.0, -0.5, -1.5) //13
	);

	// Add tail points to array for simple swimming animation.
	this.tailPoints.push(geometry.vertices[12]);
	this.tailPoints.push(geometry.vertices[13]);

	var lightColor = new THREE.Color(0x404f6f);
	var darkColor = new THREE.Color(0x414c66);
	var whiteColor = new THREE.Color(0xffffff);

	var face = new THREE.Face3(0, 1, 3);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(lightColor);
	geometry.faces.push(face);

	face = new THREE.Face3(0, 3, 2);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(whiteColor);
	geometry.faces.push(face);

	face = new THREE.Face3(0, 4, 1);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(0, 2, 4);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(whiteColor);
	face.vertexColors.push(lightColor);
	geometry.faces.push(face);

	face = new THREE.Face3(5, 7, 1);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(7, 3, 1);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(6, 3, 7);
	face.vertexColors.push(whiteColor);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(lightColor);
	geometry.faces.push(face);

	face = new THREE.Face3(6, 2, 3);
	face.vertexColors.push(whiteColor);
	face.vertexColors.push(whiteColor);
	face.vertexColors.push(lightColor);
	geometry.faces.push(face);

	face = new THREE.Face3(6, 4, 2);
	face.vertexColors.push(whiteColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(whiteColor);
	geometry.faces.push(face);

	face = new THREE.Face3(8, 4, 6);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(whiteColor);
	geometry.faces.push(face);

	face = new THREE.Face3(5, 1, 8);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(1, 4, 8);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(9, 7, 5);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(lightColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(9, 6, 7);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(whiteColor);
	face.vertexColors.push(lightColor);
	geometry.faces.push(face);

	face = new THREE.Face3(9, 5, 8);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(9, 8, 6);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(whiteColor);
	geometry.faces.push(face);

	face = new THREE.Face3(5, 11, 10);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	face = new THREE.Face3(9, 12, 13);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	face.vertexColors.push(darkColor);
	geometry.faces.push(face);

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	this.geometry = geometry;

	var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, side: THREE.DoubleSide});
	var mesh = new THREE.Mesh(geometry, material);

	mesh.scale.x = this.size;
	mesh.scale.y = this.size;
	mesh.scale.z = this.size;

	return(mesh);
};