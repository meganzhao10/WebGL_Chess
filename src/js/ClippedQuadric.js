"use strict";
let ClippedQuadric =
           function(surfaceCoeffMatrix, clipperCoeffMatrix, clipperCoeffMatrix2) {
  this.surfaceCoeffMatrix = surfaceCoeffMatrix;
  this.clipperCoeffMatrix = clipperCoeffMatrix;
  this.clipperCoeffMatrix2 = clipperCoeffMatrix2;
}

ClippedQuadric.prototype.transform = function(transformMatrix){
	var preMulMatrix = transformMatrix.clone().invert();
	var mulMatrix = transformMatrix.clone().invert().transpose();
	this.surfaceCoeffMatrix.premul(preMulMatrix).mul(mulMatrix);
	this.clipperCoeffMatrix.premul(preMulMatrix).mul(mulMatrix);
	this.clipperCoeffMatrix2.premul(preMulMatrix).mul(mulMatrix);
}

ClippedQuadric.prototype.setBoard = function(){
  this.surfaceCoeffMatrix.set(
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1);
  this.clipperCoeffMatrix.set(
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1);
  this.clipperCoeffMatrix2.set(
  	  0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -1);
}

ClippedQuadric.prototype.setUnitSphere = function(){
  this.surfaceCoeffMatrix.set(
  		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, -1);
  this.clipperCoeffMatrix.set(
  		0, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, -1);
   this.clipperCoeffMatrix2.set(
  	  0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}

ClippedQuadric.prototype.setBishopSphere = function(){
  this.surfaceCoeffMatrix.set(
  		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, -1);
  this.clipperCoeffMatrix.set(
  		0, 0, 0, 0,
		0, 0, 0, 0,
		0, 0, 1, 0,
		0, 1, 0, -1);
   this.clipperCoeffMatrix2.set(
  	  0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}


ClippedQuadric.prototype.setCone = function(){
  this.surfaceCoeffMatrix.set(	
  		1, 0, 0, 0,
		0, -.2, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 0);
  this.clipperCoeffMatrix.set(
  		0, 0, 0, 0,
		0, 1, 0, .3,
		0, 0, 0, 0,
		0, 0, 0, -.0005);
  this.clipperCoeffMatrix2.set(
  	  0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}





