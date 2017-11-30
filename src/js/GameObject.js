"use strict"; 
let GameObject = function(mesh) { 
  this.mesh = mesh;
  this.parent = null;
  this.position = new Vec3(0, 0, 0); 
  this.orientation = 0;
  this.rotateAxis = new Vec3(0,0,0);
  this.scale = new Vec3(1, 1, 1); 
  this.angularVelocity = 0;
  this.direction = new Vec4(0,0,-1,0);  
  this.modelMatrix = new Mat4(); 
  this.ground = false;
};

GameObject.prototype.updateModelMatrix = function(){ 
// TODO: set the model matrix according to the 
// position, orientation, and scale


  this.modelMatrix.set().
    scale(this.scale).
    translate(0,0,0).
    rotate(this.angularVelocity).
    rotate(this.orientation,this.rotateAxis).
    translate(this.position);

  if (this.parent != null){
    this.modelMatrix.mul(this.parent.modelMatrix);
  }

};

GameObject.prototype.drawShadow = function(camera,material,lightDir){
  this.updateModelMatrix();
  Material.modelMatrix.set(this.modelMatrix);
  Material.modelMatrix.scale(1,0,1).translate(0, 0.01, 0);

  Material.modelMatrixInverse.set(Material.modelMatrix).invert();
  Material.modelViewProjMatrix.set(Material.modelMatrix);

  Material.modelViewProjMatrix.mul(camera.viewProjMatrix);

  this.mesh.drawShadow(material); 
};


GameObject.prototype.draw = function(camera,lightSource,clippedQuadricArray,brdfs){ 
  this.updateModelMatrix();
// TODO: Set the uniform modelViewProjMatrix (reflected in the material) to modelMatrix multiplied by the camera’s viewProjMatrix. Use Mat4 methods set() and/or mul().
  //this.mesh.setUniform("modelViewProjMatrix",this.modelMatrix.mul(camera.viewProjMatrix));
  Material.modelMatrix.set(this.modelMatrix);
  Material.modelMatrixInverse.set(this.modelMatrix).invert();

  Material.modelViewProjMatrix.set(this.modelMatrix);

  Material.modelViewProjMatrix.mul(camera.viewProjMatrix);
  Material.cameraPosition.set(camera.position);
  Material.lightPowerDensity = lightSource.lightPowerDensity;
  Material.mainDir = lightSource.mainDir;
  Material.lightPos = lightSource.lightPos;
  Material.rayDirMatrix = camera.rayDirMatrix;

  //update Number of quadrics array
  var quadricsObjects = 15;

  let quadrics = new Mat4Array(quadricsObjects * 3);
  for (var i = 0; i < quadricsObjects; i++){
    if (i != 5){
      quadrics.at(i*3).set(clippedQuadricArray[i].surfaceCoeffMatrix);
      quadrics.at(i*3+1).set(clippedQuadricArray[i].clipperCoeffMatrix);
      quadrics.at(i*3+2).set(clippedQuadricArray[i].clipperCoeffMatrix2);
    } else{
      quadrics.at(i*3).set(clippedQuadricArray[i].clipperCoeffMatrix);
      quadrics.at(i*3+1).set(clippedQuadricArray[i].surfaceCoeffMatrix);
      quadrics.at(i*3+2).set(clippedQuadricArray[i].clipperCoeffMatrix2);
    }
  }

  Material.quadrics = quadrics;
  Material.brdfs = brdfs;

  this.mesh.draw(); 
};


