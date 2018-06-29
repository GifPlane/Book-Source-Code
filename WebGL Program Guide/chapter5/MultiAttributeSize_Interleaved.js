/**
* 旋转之后的坐标(x`,y`)为
* x` = x cosb - y sinb
* y` = x sinb + y cosb
*/
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'attribute float a_PointSize;\n' +
	'void main() {\n' + 
	'	gl_Position = a_Position;\n' + 
	'	gl_PointSize = a_PointSize;\n' +
	'}\n';

var FSHADER_SOURCE = 
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +
	'void main() {\n' + 
	'	gl_FragColor = u_FragColor;\n' + 
	'}\n';

var angle_speed = 45.0;

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


	/*************************************************************/
	//向片段着色器传递颜色
	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor){
		console.log('Failed to get u_FragColor variable');
		return;
	}
	gl.uniform4f(u_FragColor, 1.0,0.0,0.0,1.0);

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
	var verticesSizes = new Float32Array([
			0.0,0.5,10.0,
			-0.5,-0.5,20.0,
			0.5,-0.5,30.0
		]);
	var n = 3;

	var vertexSizesBuffer = gl.createBuffer();
	if(!vertexSizesBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}

	var FSIZE = verticesSizes.BYTES_PER_ELEMENT;
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position<0){
		console.log('Failed to get a_Position location');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
	gl.enableVertexAttribArray(a_Position);

	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	if(a_PointSize<0){
		console.log('Failed to get a_PointSize location');
		return -1;
	}

	gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
	gl.enableVertexAttribArray(a_PointSize);

	return n;
}