
WebGLUtils = function(){

	/**
	 * Mesasge for need better hardware
	 * @type {string}
	 */
	var OTHER_PROBLEM = '' +
	  "It doesn't appear your computer can support WebGL.<br/>" +
	  '<a href="http://get.webgl.org">Click here for more information.</a>';

	/**
	 * Mesasge for getting a webgl browser
	 * @type {string}
	 */
	var GET_A_WEBGL_BROWSER = '' +
	  'This page requires a browser that supports WebGL.<br/>' +
	  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

	/**
	* 错误信息
	*/
	var makeFailHTML = function(msg) {
	  return '' +
	        '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
	  return '' +
	    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
	    '<td align="center">' +
	    '<div style="display: table-cell; vertical-align: middle;">' +
	    '<div style="">' + msg + '</div>' +
	    '</div>' +
	    '</td></tr></table>';
	};

	/**
	* 创建WebGL上下文
	* @param {Element} canvas 要创建的上下文
	* @param {WebGLContextCreationAttirbutes} opt_attribs 创建属性
	* @param {function:(msg)} opt_onError 如果发生错误回调函数
	* @return {WebGLRenderingContext} 返回上下文
	*/
	var setupWebGL = function(canvas, opt_attribs, opt_onError){
		function handleCreationError(msg) {
			var container = document.getElementsByTagName("body")[0];
			if(container) {
				var str = window.WebGLRenderingContext ? OTHER_PROBLEM : GET_A_WEBGL_BROWSER;
				if(msg) {
					str += "<br/><br/>Status:" + msg;
				}
				container.innerHtml = makeFailHTML(str);
			}
		};

		opt_onError = opt_onError || handleCreationError;

		if(canvas.addEventListener) {
			canvas.addEventListener("webglcontextcreationerror", function(event){
				opt_onError(event.StatusMessage);
			}, false);
		}

		var context = create3DContext(canvas, opt_attribs);
		if(!context) {
			if(!window.WebGLRenderingContext) {
				opt_onError("");
			}else {
				opt_onError("");
			}
		}
		return context;
	};

  /**
   * Creates a webgl context.
   * @param {!Canvas} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {!WebGLContext} The created context.
   */
  var create3DContext = function(canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"]; //根据不同的浏览器获取webgl context
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch(e) {}
      if (context) { //找到对应的context时，不必再检查浏览器，直接推出循环
        break;
      }
    }
    return context;
  }

  return {
    create3DContext: create3DContext,
    setupWebGL: setupWebGL
  };
}();