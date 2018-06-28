/**
* 旋转之后的坐标(x`,y`)为
* x` = x cosb - y sinb
* y` = x sinb + y cosb
*/
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'uniform float u_CosB, u_SinB;\n' +
	'void main() {\n' + 
	'	gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' + 
	'	gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' + 
	'	gl_Position.z = a_Position.z;\n' +
	'	gl_Position.w = 1.0;\n' +
	'}\n';

var FSHADER_SOURCE = 
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +
	'void main() {\n' + 
	'	gl_FragColor = u_FragColor;\n' + 
	'}\n';

var angle = 90.0; //旋转角度

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

	var radian = Math.PI * angle / 180.0;//转为弧度，用它计算cos和sin
	var cosB = Math.cos(radian);
	var sinB = Math.sin(radian);
	//获取uniform变量的位置
	var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
	var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');

	gl.uniform1f(u_CosB, cosB);
	gl.uniform1f(u_SinB, sinB);

	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor){
		console.log('Failed to get u_FragColor variable');
		return;
	}

	gl.uniform4f(u_FragColor, 1.0,0.0,0.0,1.0);
	
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, n);

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
	var vertices = new Float32Array([
			0.0,0.5,
			-0.5,-0.5,
			0.5,-0.5
		]);
	var n = 3;

	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position<0){
		console.log('Failed to get a_Position location');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(a_Position);

	return n;

}