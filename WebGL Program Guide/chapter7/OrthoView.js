
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'attribute vec4 a_Color;\n' +
	'uniform mat4 u_ProjMatrix;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' + 
	'	gl_Position = u_ProjMatrix * a_Position;\n' + 
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
	var nf = document.getElementById('nearfar');
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
	//指定渲染背景色
	gl.clearColor(0.0,0.0,0.0,1.0);

	var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
	if (!u_ProjMatrix) { 
    	console.log('Failed to get the storage locations or u_ProjMatrix');
    	return;
  	}
  	//指定视图矩阵
	var projMatrix = new Matrix4();
	//注册键盘事件
	document.onkeydown = function(ev){keydown(ev, gl, n, u_ProjMatrix ,projMatrix, nf);};

	draw(gl, n, u_ProjMatrix, projMatrix, nf);

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

var g_near = 0.0, g_far = 0.5;//视点
function keydown(ev, gl, n, u_ProjMatrix, projMatrix, nf){
	switch(ev.keyCode){
		case 39: g_near += 0.01;break; //right
		case 37: g_near -= 0.01;break;//left
		case 38: g_far += 0.01;break;//up
		case 40: g_far -= 0.01;break; //down
		default: break;
	}

	draw(gl, n, u_ProjMatrix, projMatrix, nf);
}

function draw(gl, n, u_ProjMatrix, projMatrix, nf){

	projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, g_near, g_far);

	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT);

	nf.innerHTML = 'near: ' + Math.round(g_near * 100)/100 + ', far: ' + Math.round(g_far * 100)/100;
	gl.drawArrays(gl.TRIANGLES, 0, n);
}