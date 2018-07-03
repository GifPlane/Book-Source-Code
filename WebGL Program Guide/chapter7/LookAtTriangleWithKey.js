
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'attribute vec4 a_Color;\n' +
	'uniform mat4 u_ViewMatrix;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' + 
	'	gl_Position = u_ViewMatrix * a_Position;\n' + 
	'	v_Color = a_Color;\n' +
	'}\n';

var FSHADER_SOURCE = 
	'precision mediump float;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' + 
	'	gl_FragColor = v_Color;\n' + 
	'}\n';

function main(){
	var canvas = document.getElementById('canvas');
	var gl = getWebGLContext(canvas);

	if(!gl) {
		console.log('Failed to get the rendering context for　WebGL');
		return;
	}
	//初始化着色器
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to initialize shaders');
		return;
	}

	//设置顶点位置
	var n = initVertexBuffers(gl);
	if(n<0){
		console.log('Failed to set the positions of the vertices');
		return;
	}

	var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
	if (!u_ViewMatrix) { 
    	console.log('Failed to get the storage locations or u_ViewMatrix');
    	return;
  	}
  	//指定视图矩阵
	var viewMatrix = new Matrix4();
	//注册键盘事件
	document.onkeydown = function(ev){keydown(ev, gl, n, u_ViewMatrix ,viewMatrix);};
	gl.clearColor(0.0,0.0,0.0,1.0);
}

/**
* 将顶点数组传递到顶点着色器需要5个步骤
* 1、创建缓冲对象
* 2、绑定缓冲对象到目标
* 3、将顶点数据传递到缓冲对象
* 4、将缓冲对象的数据传递到attribute变量
* 5、开启attribute变量
*/
function initVertexBuffers(gl){
  var verticesColors = new Float32Array([
    // Vertex coordinates and color(RGBA)
     0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
    -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
     0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
   
     0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
     0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

     0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
     0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
  ]);
  var n = 9;

	var vertexColorBuffer = gl.createBuffer();
	if(!vertexColorBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}

	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position<0){
		console.log('Failed to get a_Position location');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);

	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color<0){
		console.log('Failed to get a_Color location');
		return -1;
	}

	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);

	return n;
}

var g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25;//视点
function keydown(ev, gl, n, u_ViewMatrix, viewMatrix){
	if(ev.keyCode == 39) { //右键
		g_eyeX += 0.01;
	}else if(ev.keyCode == 37){ //左键
		g_eyeX -= 0.01;
	}else {return;}

	draw(gl, n, u_ViewMatrix, viewMatrix);
}

function draw(gl, n, u_ViewMatrix, viewMatrix){
	viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0,0,0, 0,1,0);

	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, n);
}