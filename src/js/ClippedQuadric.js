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

ClippedQuadric.prototype.setKingUpParaboloid = function(){
  this.surfaceCoeffMatrix.set(  
    1, 0, 0, 0,
    0, 0, 0, -.5,
    0, 0, 1, 0,
    0, 0, 0, 0);
  this.clipperCoeffMatrix.set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -.8);
  this.clipperCoeffMatrix2.set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}
ClippedQuadric.prototype.setCrossH = function(){
  this.surfaceCoeffMatrix.set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -.5);
  this.clipperCoeffMatrix.set(
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1);
   this.clipperCoeffMatrix2.set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}
ClippedQuadric.prototype.setKingSmallCircleBase = function(){
  this.surfaceCoeffMatrix.set(
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -.3);
  this.clipperCoeffMatrix.set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -.03);
   this.clipperCoeffMatrix2.set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}
ClippedQuadric.prototype.setKingMedianCircleBase = function(){
  this.surfaceCoeffMatrix.set(
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -.07);
  this.clipperCoeffMatrix.set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -.3);
   this.clipperCoeffMatrix2.set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}
ClippedQuadric.prototype.setKingDownParaboloid = function(){
  this.surfaceCoeffMatrix.set(  
    1, 0, 0, 0,
    0, 0, 0, .8,
    0, 0, 1, 0,
    0, 0, 0, 0);
  this.clipperCoeffMatrix.set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -.5);
  this.clipperCoeffMatrix2.set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}
ClippedQuadric.prototype.setKingLargeCircleBase = function(){
  this.surfaceCoeffMatrix.set(
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -.8);
  this.clipperCoeffMatrix.set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -.03);
   this.clipperCoeffMatrix2.set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0);
}





