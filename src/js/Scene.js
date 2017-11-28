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


  this.clippedQuadricArray = [];

  let board = new ClippedQuadric(new Mat4(),new Mat4(), new Mat4());
  board.setBoard();
  this.clippedQuadricArray.push(board);

  let sphere = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  sphere.setUnitSphere();
  sphere.transform(new Mat4().scale(.1,.1,.1));
  this.clippedQuadricArray.push(sphere);

  let cone = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  cone.setCone();
  this.clippedQuadricArray.push(cone);

  let bishopSphere = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  bishopSphere.setBishopSphere();
  bishopSphere.transform(new Mat4().scale(.1,.1,.1).translate(.5,0,0));
  this.clippedQuadricArray.push(bishopSphere);

  let bishopCone = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  bishopCone.setCone();
  bishopCone.transform(new Mat4().translate(.5,0,0));
  this.clippedQuadricArray.push(bishopCone);


  


  //material
  this.brdfs = new Vec4Array(3);
  this.brdfs.at(0).set(0, 0, 0, 1); 
  this.brdfs.at(1).set(.5, .5, .5, 1); 
  this.brdfs.at(2).set(.5, .5, .5, 1); 
  this.brdfs.at(3).set(.5, .5, .5, 1); 

  this.lightSource = new LightSource();

  this.camera = new PerspectiveCamera();
  this.camera.position.set(0,0,2.9);
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
  
  this.envirObject.draw(this.camera, this.lightSource, this.clippedQuadricArray, this.brdfs);


}




