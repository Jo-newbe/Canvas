var animate = function( x, y, r, start, end, step, clockwise, speed ) {
	var timer;
	
	if( clockwise ){
		if( start > end ){
			end += 2 * Math.PI;
		}
	} else {
		if( start < end ){
			end -= 2 * Math.PI;
		}
		step = -step;
	}

	speed = speed || 160;
	switch( speed ){
		case 'fast':
			speed = 20;
			break;
		case 'slow':
			speed = 200;
			break;
	}

	timer = window.setInterval( function() {
		if( clockwise ){
			if( start > end ){
				window.clearInterval( timer );
				return;
			}
		} else {
			if( start < end ){
				window.clearInterval( timer );
				return;
			}
		}

		ctx.beginPath();
		ctx.moveTo( x, y );
		ctx.arc( x, y, r, start, start + step, !clockwise);
		ctx.stroke();
		ctx.fill();
		start += step;
	}, speed );
};