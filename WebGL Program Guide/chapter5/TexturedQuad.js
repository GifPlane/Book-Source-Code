
/**
* 第一步，顶点着色器接收顶点坐标，光栅化之后传递给片段着色器
*/
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' + 
	'attribute vec2 a_TexCoord;\n' +
	'varying vec2 v_TexCoord;\n' +
	'void main() {\n' + 
	'	gl_Position = a_Position;\n' + 
	'	v_TexCoord = a_TexCoord;\n' +
	'}\n';

/**
* 根据从顶点着色器传递过来的片段纹理坐标，从纹利图像取出纹素颜色，赋给当前片段
*/
var FSHADER_SOURCE = 
	'precision mediump float;\n' +
	'uniform sampler2D u_Sampler;\n' +
	'varying vec2 v_TexCoord;\n' +
	'void main() {\n' + 
	'	gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' + 
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

	  gl.clearColor(0.0, 0.0, 0.0, 1.0);

	//配置纹理
	if(!initTextures(gl, n)) {
		console.log('Failed to intialize the texture.');
    	return;
	}

}


/**
* 第三步，设置顶点的纹理坐标
*/
function initVertexBuffers(gl){
	var verticesColors = new Float32Array([
		//顶点坐标和纹理坐标，右边纹理坐标如果是1.0的宽度的话，就满足整张图片，否则图片可能大于或者小雨填充区域。
			-0.5,0.5,  -0.3,1.7,
		   -0.5,-0.5,  -0.3,-0.2,
			0.5, 0.5,  0.7,1.7,
			0.5,-0.5,  1.7,-0.2
		]);
	var n = 4;

	var vertexTexCoordBuffer = gl.createBuffer();
	if(!vertexTexCoordBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}

	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position<0){
		console.log('Failed to get a_Position location');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
	gl.enableVertexAttribArray(a_Position);

	var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
	if(a_TexCoord<0){
		console.log('Failed to get a_TexCoord location');
		return -1;
	}

	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
	gl.enableVertexAttribArray(a_TexCoord);

	return n;
}

/*
* 准备待加载的纹理图像，让浏览器读取它
*/
function initTextures(gl, n) {
	var texture = gl.createTexture();//创建文理对象
	if (!texture) {
		console.log('Failed to create the texture object');
		return false;
	}
	var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  	if (!u_Sampler) {
    	console.log('Failed to get the storage location of u_Sampler');
    	return false;
  	}
	var image = new Image();
  	if (!image) {
    	console.log('Failed to create the image object');
    	return false;
  	}
	image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };

	image.src = '../resources/sky.jpg';

	return true;
}

/**
* 由事件调用
* 一旦图像加载完成，就在webGL系统中使用纹理
* 1、创建纹理对象
* 2、激活纹理对象
* 3、绑定纹理对象
* 4、配置纹理参数
* 5、配置纹理图像
* 6、将纹理图像传递给uniform变量gl.uniform1i(u_Sampler, 0);
*/
function loadTexture(gl, n, texture, u_Sampler, image){
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //对纹理图像进行Y轴反转
	//开启0号纹理单元
	gl.activeTexture(gl.TEXTURE0);
	//向target绑定纹理对象
	gl.bindTexture(gl.TEXTURE_2D, texture);

	//配置纹理参数
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
	//配置纹理图像
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//将0号纹理传递给着色器
	gl.uniform1i(u_Sampler, 0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}


