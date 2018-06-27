
/**
* 初始化shader
* 向webgl上下文指定shder程序
*/
function initShaders(gl, vshader, fshader) {
	var program = createProgram(gl, vshader, fshader);
	if(!program) {
		console.log('Failed to create program');
		return false;
	}

	gl.useProgram(program);
	gl.program = program;

	return true;
}

/**
* 链接顶点着色器和片段着色器
* 加载vertex和fragment的shader程序 -- 创建shader程序 -- 分别像shader程序附加顶点、片段着色器 -- 链接程序
* 
*/
function createProgram(gl,vshader,fshader){
	var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
	var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
	if(!vertexShader || !fragmentShader) {
		return null;
	}

	var program = gl.createProgram();
	if(!program) {
		return null;
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);

	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(!linked) {
		var error = gl.getProgramInfoLog(program);
		console.log('Failed to link program' + error);
		gl.deleteProgram(program);
		gl.deleteShader(fragmentShader);
		gl.deleteShader(vertexShader);
		return null;
	}
	return program;
}

/**
* 加载shader源代码
* 创建shader -- 加载shader源代码 -- 编译shader源代码
* 
*/
function loadShader(gl, type, source) {
	var shader = gl.createShader(type);
	if(shader == null) {
		console.log('unable to create shader');
		return null;
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	//获取编译信息
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if(!compiled) {
		var error = gl.getShaderInfoLog(shader);
		console.log('Failed to compile shader' + error);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

/** 
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }
  return gl;
}
