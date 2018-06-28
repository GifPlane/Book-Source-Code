
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
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	if(a_PointSize < 0) {
		console.log('Failed to get storage location of a_PointSize');
		return;
	}
	gl.vertexAttrib1f(a_PointSize, 10.0);

	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor){
		console.log('Failed to get u_FragColor variable');
		return;
	}
	canvas.onmousedown = function(ev){click(ev, gl, canvas, a_Position, u_FragColor);};//绑定事件

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
var g_colors = [];
function click(ev, gl, canvas, a_Position, u_FragColor){
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();//获取点击的元素
	//将浏览器坐标转化为WebGL坐标
	x = ((x-rect.left)-canvas.width/2) / (canvas.width/2);
	y = (canvas.height/2 - (y-rect.top)) / (canvas.height/2);
	
	g_points.push([x,y]);

	if(x>=0 && y>=0){//第一象限
		g_colors.push([1.0,0.0,0.0,1.0]); 
	}else if(x<0.0 && y<0.0){ //第三象限
		g_colors.push([0.0,1.0,0.0,1.0]);
	}else {
		g_colors.push([1.0,1.0,1.0,1.0]);
	}
	
	gl.clear(gl.COLOR_BUFFER_BIT);//如果不清缓存，点击之后，画布会变成白色
	
	//如果要保存之前的点，那么需要重新绘制点数组，因为浏览器每一次都会刷新缓存，之前绘制的会丢失
	var len = g_points.length;
	for(var i=0;i<len;i++){
		gl.vertexAttrib2fv(a_Position, g_points[i],0.0);
		gl.uniform4fv(u_FragColor, g_colors[i]);
		gl.drawArrays(gl.POINTS,0,1);
	}
}