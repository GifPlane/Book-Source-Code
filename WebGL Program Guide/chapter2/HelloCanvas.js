function main(){
	var canvas = document.getElementById("canvas");

	var gl = getWebGLContext(canvas, true);
	if(!gl){
		console.log('Failed to get the rendering context for webgl');
		return;
	}

	gl.clearColor(0.0,0.5,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

}

