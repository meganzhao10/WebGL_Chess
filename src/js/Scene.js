"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");
  this.texturefsShadow = new Shader(gl, gl.FRAGMENT_SHADER, "shadow_fs.essl");
  this.texturefsMarble = new Shader(gl, gl.FRAGMENT_SHADER, "marble_fs.essl");
  this.texturefsWood = new Shader(gl, gl.FRAGMENT_SHADER, "wood_fs.essl");
  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);
  this.shadowProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsShadow);
  this.uvMarbleProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsMarble);
  this.uvWoodProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsWood);

  this.texturefsMap = new Shader(gl, gl.FRAGMENT_SHADER, "envirMap_fs.essl");
  this.envirvsIdle = new Shader(gl, gl.VERTEX_SHADER, "envir_idle_vs.essl");
  this.envirfsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "rayCasting_fs.essl");
  this.mapProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsMap);
  this.envirProgram = new TexturedProgram(gl,this.envirvsIdle,this.envirfsSolid);

  this.gameObjects = [];
  this.shadowMaterial = new Material(gl, this.shadowProgram);

  //envir
  this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);
  this.envirMaterial = new Material(gl, this.envirProgram);
  this.envirTexture = new Texture2D(gl, 'envmaps/milkyway.jpg');
  this.envirMaterial.probeTexture.set(this.envirTexture.glTexture);
  this.envirMesh = new Mesh(this.TexturedQuadGeometry,this.envirMaterial); 
  this.envirObject = new GameObject(this.envirMesh);
    this.envirObject.orientation = 3.14/2;
  this.envirObject.rotateAxis.set(1, 0, 0);

  this.quadrics = new Mat4Array(3);
  this.brdfs = new Vec4Array(1);
      //shape
  this.quadrics.at(0).set(
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1);
  //clipper
  this.quadrics.at(1).set(
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1); //scale(0.5, 2, 0.9);
  this.quadrics.at(2).set(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -1); //scale(0.5, 2, 0.9);
  //material
  this.brdfs.at(0).set(1, 1, 1, 0); 


  this.lightSource = new LightSource();

  this.camera = new PerspectiveCamera();
  this.camera.position.set(0,-3,10);
};


Scene.prototype.update = function(gl, keysPressed) {  
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  let speed = 0.5;

  // clear the screen
  gl.clearColor(223/255, 208/255, 159/255, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  this.camera.move(dt, keysPressed);
  
  this.envirObject.draw(this.camera, this.lightSource, this.quadrics, this.brdfs);


}




