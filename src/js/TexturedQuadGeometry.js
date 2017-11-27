let TexturedQuadGeometry = function(gl) { 
  this.gl = gl; 
  // vertex buffer 
  this.vertexBuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 
  gl.bufferData(gl.ARRAY_BUFFER, 
    new Float32Array([ 

        -1, -1, 0, 1,
        -1, 1, 0, 1,
        1, 1, 0, 1,
        1, -1, 0, 1,
        //0, 0, -10, 0,

    ]), 
    gl.STATIC_DRAW); 

  this.vertexNormalBuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer); 
  gl.bufferData(gl.ARRAY_BUFFER, 
    new Float32Array([ 
         0, 1, 0, 
         0, 1, 0, 
         0, 1, 0, 
         0, 1, 0, 
         //0, 1, 0, 
    ]), 
    gl.STATIC_DRAW); 

  this.vertexTexCoordBuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordBuffer); 
  gl.bufferData(gl.ARRAY_BUFFER, 
    new Float32Array([ 
         -1, -1, 
         -1, 1,
         1, 0, 
         1, 1, 
         //0, -10, 
    ]), 
    gl.STATIC_DRAW);

  this.indexBuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer); 
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
    new Uint16Array([ 
      0, 1, 2, 
      0, 2, 3, 
      //0, 3, 1,
      //0, 4, 1,
    ]), 
    gl.STATIC_DRAW); 
  
};



TexturedQuadGeometry.prototype.draw = function() { 
  var gl = this.gl; 
  // set vertex buffer to pipeline input 
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer); 
  gl.enableVertexAttribArray(0); 
  gl.vertexAttribPointer(0, 
    4, gl.FLOAT, //< four pieces of float 
    false, //< do not normalize (make unit length) 
    0, //< tightly packed 
    0 //< data starts at array start 
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer); 
  gl.enableVertexAttribArray(1); 
  gl.vertexAttribPointer(1, 
    3, gl.FLOAT, //< three pieces of float 
    false, //< do not normalize (make unit length) 
    0, //< tightly packed 
    0 //< data starts at array start 
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordBuffer); 
  gl.enableVertexAttribArray(2); 
  gl.vertexAttribPointer(2, 
    2, gl.FLOAT, //< two pieces of float 
    false, //< do not normalize (make unit length) 
    0, //< tightly packed 
    0 //< data starts at array start 
  ); 

  // set index buffer to pipeline input 
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer); 
  
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0); 
    
}; 




