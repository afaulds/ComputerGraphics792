CameraTypeEnum = {
    FIRST : 0,
    THIRD : 1,
    WORLD : 2
}

function GameCamera(scene)
{
	this.obj = null;
    this.scene = scene;
    this.mode = 1; // First Person, Third Person, Global
    this.lookAtObj = null;
    this.pos = null;
    this.cameraType = CameraTypeEnum.THIRD;
    this.percentLoose = 80;
    this.lastPosition = new THREE.Vector3();
}

GameCamera.prototype.init = function()
{
	this.obj = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000);
	this.obj.position.x = 0;
	this.obj.position.y = 0;
	this.obj.position.z = 0;
	this.scene.add(this.obj);
};

GameCamera.prototype.setLookAt = function(obj, pos, cameraType)
{
	this.lookAtObj = obj;
	this.pos = pos;
	this.cameraType = cameraType;
}

GameCamera.prototype.setPercentLoose = function(percentLoose)
{
	this.percentLoose = percentLoose;
}

GameCamera.prototype.update = function()
{
	for(var i = 0; i < this.obj.children.length; i++)
	{
		child = this.obj.children[i];
	}
	if(this.lookAtObj != null)
	{
		if(this.cameraType == CameraTypeEnum.FIRST)
		{
			var forward = this.lookAtObj.getForward().clone();
			var left = this.lookAtObj.getLeft().clone();
			var up = this.lookAtObj.getUp().clone();
			var desiredPos = new THREE.Vector3();

			forward.multiplyScalar(this.pos.x);
			left.multiplyScalar(this.pos.y);
			up.multiplyScalar(this.pos.z);

			desiredPos.add(forward).add(left).add(up);
			desiredPos.add(this.lookAtObj.getPosition());

			var point = this.lookAtObj.getForward().clone();
			point.multiplyScalar(500);
			this.obj.position.lerp(desiredPos, 1 - this.percentLoose / 100.0);
			this.obj.lookAt(point);
		}
		else if(this.cameraType == CameraTypeEnum.THIRD)
		{
			var forward = this.lookAtObj.getForward().clone();
			var left = this.lookAtObj.getLeft().clone();
			var up = this.lookAtObj.getUp().clone();
			var desiredPos = new THREE.Vector3();

			forward.multiplyScalar(this.pos.x);
			left.multiplyScalar(this.pos.y);
			up.multiplyScalar(this.pos.z);

			desiredPos.add(forward).add(left).add(up);
			desiredPos.add(this.lookAtObj.getPosition());

			this.obj.position.lerp(desiredPos, 1 - this.percentLoose / 100.0);
			this.obj.lookAt(this.lookAtObj.getPosition());
		}
		else
		{
			this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
			this.lastPosition.lerp(this.lookAtObj.getPosition(), 1 - this.percentLoose / 100.0);
			this.obj.lookAt(this.lastPosition);
		}
	}
};
