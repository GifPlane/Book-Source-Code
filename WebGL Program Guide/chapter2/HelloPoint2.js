
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'attribute float a_PointSize;\n' +
	'void main() {\n' + 
	'	gl_Position = a_Position;\n' + 
	'	gl_PointSize = a_PointSize;\n' + 
	'}\n';

var FSHADER_SOURCE = 
	'void main() {\n' + 
	'	gl_FragColor = vec4(0.0,1.0,0.0,1.0);\n' + 
	'}\n';

function main(){
	var canvas = document.getElementById('canvas');
	var gl = getWebGLContext(canvas);

	if(!gl) {
		console.log('Failed to get the rendering context for　WebGL');
		return;
	}

	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to initialize shaders');
		return;
	}
	//1、获取attribute变量的位置
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	//2、向attribute变量传值
	gl.vertexAttrib3f(a_Position, 0.0,0.0,0.0);

	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	if(a_PointSize < 0) {
		console.log('Failed to get storage location of a_PointSize');
		return;
	}

	gl.vertexAttrib1f(a_PointSize, 20.0);

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.POINTS, 0, 1);
}