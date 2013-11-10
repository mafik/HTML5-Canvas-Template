
Object.prototype.make = (function(f) {
    return function(o) {
        f.prototype = o;
        return new f;
    };
})(function(){});

Number.prototype.clamp = function(min, max) {
	return Math.max(min, Math.min(max, this));
};

var canvas = document.getElementById('canvas');

canvas.oncontextmenu = function() {
	return false;
};

canvas.onclick = function(event) {
	event.stopPropagation();
	event.preventDefault();
    return false;
};

var mouse = { x: 0, y: 0 };
document.onmousemove = function(e) {
	var dx = e.x - mouse.x;
	var dy = e.y - mouse.y;
    mouse.x = e.x;
    mouse.y = e.y;
};
canvas.onmousedown = function(e) {
	if(e.button == 0) {
		mouse.forward_button = true;
	} else if(e.button == 2) {
		mouse.backward_button = true;
	}
	e.preventDefault();
	e.stopPropagation();
	return false;
	
};
canvas.onmouseup = function(e) {
	if(e.button == 0) {
		mouse.forward_button = false;
	} else if(e.button == 2) {
		mouse.backward_button = false;
	}
	e.preventDefault();
	e.stopPropagation();
	return false;
};

var ctx = canvas.getContext('2d');

var animate = window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(f) { setTimeout(f, 1000 / 30); };

var get_image = (function(cache){
    return function(url) {
	    if(!(url in cache)) {
		    cache[url] = new Image;
		    cache[url].src = url;
	    }
	    return cache[url];
    };
})({});

var last_time = 0;
var tick = function(time) {
	var function_start = +new Date;
	animate(tick);
	time /= 1000;

	var dt = time - last_time;

	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	last_time = time;
	var function_end = +new Date;
    ctx.fillText((function_end - function_start) + ' ms', 10, 10);
};
animate(tick);

(onresize = function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})();
