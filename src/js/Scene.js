"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");
  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);
  this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);

  //ground object
  this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);
  this.quadMaterial = new Material(gl, this.textureProgram);
  //this.quadTexture = new Texture2D(gl, 'json/ground.png');
  //this.quadMaterial.colorTexture.set(this.quadTexture.glTexture);
  this.quadMesh = new Mesh(this.TexturedQuadGeometry,this.quadMaterial); 
  this.quadObject = new GameObject(this.quadMesh);

  this.camera = new PerspectiveCamera();
  this.camera.position.set(0,0,10);
};


Scene.prototype.update = function(gl, keysPressed) {  
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  // clear the screen
  gl.clearColor(223/255, 208/255, 159/255, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}




