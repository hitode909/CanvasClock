(function($){

    $.fn.canvasClock = function(opts){
	var container = this.eq(0);
	if(!container){
	    try{
		console.log("Invalid selector!");
	    }catch(e){}
	    return false;
	}
	if(opts == undefined) opts = {};
	var defaults = {
	    size: 300,
	    clockWise: true,
	};
	$.each(defaults,function(k,v){
	    opts[k] = (opts[k] != undefined)?
		opts[k] : defaults[k];
	});
	setUp.call(container,opts);
	return this;
    }

    function pToColor(p){
        return 'hsl(' + p * 360 + ', 100%, 50%)';
    }

    function setUp(opts){
	
	$(this).append(
	    '<canvas class="canvasClock" ' +
		'width="' + opts['size'] +
		'" height="' + opts['size'] +
		'"></canvas>'
	);

	var canvas = $(this).children('canvas.canvasClock').get(0);
	if( !canvas || ! canvas.getContext){
	    return false;
	}
	var context = canvas.getContext('2d');
	var size = opts['size'] / 2;
	
	context.translate(size, size);
	context.rotate(-Math.PI/2);
	context.translate(-size, -size);
	
	function drawCircle(r, p){
	    var lw = size / 3;
	    context.strokeStyle = pToColor(p);
	    context.beginPath();
	    context.lineWidth = lw;
	    context.arc(size, size, r - lw/2, 0, Math.PI*2*p,
			!opts['clockWise']);
	    context.stroke();
	}

	setInterval(function (){
	    date = new Date();
	    hour = date.getHours();
	    min = date.getMinutes();
	    sec = date.getSeconds();
	    context.clearRect(0, 0, size*2, size*2);
	    drawCircle(size, sec/60);
	    drawCircle(size*2/3, min/60);
	    drawCircle(size/3, (hour%12)/12);
	},1000);
    }
})(jQuery)