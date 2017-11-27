"use strict";
let Shader = function(gl, shaderType, sourceFileName) {
  this.sourceFileName = sourceFileName;
  this.glShader = gl.createShader(shaderType);
  if(Shader.source.hasOwnProperty(sourceFileName)) {
    gl.shaderSource(this.glShader, Shader.source[sourceFileName]);
  } else {
    throw new Error('Shader ' + sourceFileName + ' not found. Check spelling, and whether the essl file is embedded into the html file.');
  }
  gl.compileShader(this.glShader);
  if (!gl.getShaderParameter(this.glShader, gl.COMPILE_STATUS)) {
    console.log(
      'Error in shader ' + sourceFileName + ':\n' +
      gl.getShaderInfoLog(this.glShader).replace(/ERROR: 0/g, Shader.sourcePathURL + sourceFileName)
    );
    throw new Error('Shader ' + sourceFileName + ' had compilation errors.');
  }
};

Shader.sourcePathURL = document.currentScript.src.split('Shader.js')[0] + 'shaders/';
Shader.source = {};

