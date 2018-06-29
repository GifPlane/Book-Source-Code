/**
* 旋转之后的坐标(x`,y`)为
* x` = x cosb - y sinb
* y` = x sinb + y cosb
*/
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'attribute vec4 a_Color;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' + 
	'	gl_Position = a_Position;\n' + 
	'	v_Color = a_Color;\n' +
	'	gl_PointSize = 10.0;\n' +
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

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.POINTS,0,n);

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
			0.0, 0.5,  1.0,0.0,0.0,
		   -0.5,-0.5,  0.0,1.0,0.0,
			0.5,-0.5,  0.0,0.0,1.0
		]);
	var n = 3;

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

	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position);

	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color<0){
		console.log('Failed to get a_Color location');
		return -1;
	}

	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	gl.enableVertexAttribArray(a_Color);

	return n;
}