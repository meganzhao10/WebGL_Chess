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
  //1
  let board = new ClippedQuadric(new Mat4(),new Mat4(), new Mat4());
  board.setBoard();
  this.clippedQuadricArray.push(board);
  //2
  let sphere = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  sphere.setUnitSphere();
  sphere.transform(new Mat4().scale(.1));
  //sphere.transform(new Mat4().translate(0,4,0));
  this.clippedQuadricArray.push(sphere);
  //3
  let cone = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  cone.setCone();
  //cone.transform(new Mat4().translate(0,4,0));
  this.clippedQuadricArray.push(cone);
  //4
  let bishopSphere = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  bishopSphere.setBishopSphere()
  bishopSphere.transform(new Mat4().scale(.1).translate(.5,0,0));
  this.clippedQuadricArray.push(bishopSphere);
  //5
  let bishopCone = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  bishopCone.setCone();
  bishopCone.transform(new Mat4().translate(.5,0,0));
  this.clippedQuadricArray.push(bishopCone);
  //6
  this.clippedQuadricArray.push(bishopSphere);
  //7th
  let kingUpParaboloid = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  kingUpParaboloid.setKingUpParaboloid();
  kingUpParaboloid.transform(new Mat4().translate(0,-3,9).scale(0.1));
  this.clippedQuadricArray.push(kingUpParaboloid);
  //8th
  // let crossH = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  // crossH.setCrossH();
  // crossH.transform(new Mat4().translate(0,1,0).scale(.1));
  // this.clippedQuadricArray.push(crossH);
  //8th
  let kingSmallCircleBase  = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  kingSmallCircleBase.setKingSmallCircleBase();
  kingSmallCircleBase.transform(new Mat4().translate(0,-3,9).scale(.1));
  this.clippedQuadricArray.push(kingSmallCircleBase);
  //9th
  let kingMedianCircleBase  = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  kingMedianCircleBase.setKingMedianCircleBase();
  kingMedianCircleBase.transform(new Mat4().translate(0,-3.7,9).scale(.1));
  this.clippedQuadricArray.push(kingMedianCircleBase);
  //10th
  let kingDownParaboloid = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  kingDownParaboloid.setKingDownParaboloid();
  kingDownParaboloid.transform(new Mat4().translate(0,-4.1,9).scale(0.1));
  this.clippedQuadricArray.push(kingDownParaboloid);
  //11th
  let kingLargeCircleBase  = new ClippedQuadric(new Mat4(),new Mat4(),new Mat4());
  kingLargeCircleBase.setKingLargeCircleBase();
  kingLargeCircleBase.transform(new Mat4().translate(0,-4.9,9).scale(.1));
  this.clippedQuadricArray.push(kingLargeCircleBase);

  //material; update #
  let quadricsObjects = 11;

  this.brdfs = new Vec4Array(quadricsObjects);
  this.brdfs.at(0).set(0, 0, 0, 1); 
  for (var i = 1; i < quadricsObjects; i++){
    this.brdfs.at(i).set(.5, .5, .5, 1); 
  }

  this.lightSource = new LightSource();
  this.lightSource.lightPos = new Vec4Array(1);
  this.lightSource.lightPos.at(0).set(0.7,-1,1,0); // the last 0 indicates that it's a directional light
  this.lightSource.lightPowerDensity = new Vec4Array(1);
  this.lightSource.lightPowerDensity.at(0).set(1,1,1,1); 
  this.lightSource.mainDir = new Vec4(); 
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




