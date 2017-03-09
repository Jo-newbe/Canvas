( function( g ) {
	var queue = [], // 动画队列
			timer; // 定时器id，根据其判断是否有动画正在执行

	var animate = function( option, speed ) {
		// 如果有动画正在执行，就将当期动画加入队列
		if ( timer != undefined ){
			queue.push( { 'option': option, 'speed': speed } );
			return;
		}
		var step = option.step,   // 动画步伐
				clockwise = step > 0, // 根据其正负值，来判断是否顺时针绘制 正—顺时针
				start = option.start, // 动画起始角度
				end = option.end,			// 动画终止角度
				x = option.x,         // 圆心x坐标
				y = option.y,					// 圆心y坐标
				r = option.r,					// 半径r
				color = option.color || 'rgb( 0, 0, 0 )'; // 填充颜色以及描边颜色
		// 如果顺时针绘制、保证start值小于end
		if ( clockwise ){
			if( start > end ){
				end += 2 * Math.PI;
			}
		// 如果逆时针绘制、保证start值大于end
		} else {
			if( start < end ){
				end -= 2 * Math.PI;
			}
		}
		// 初始化绘制的速度，默认为 160毫秒--定时器的相隔时间
		speed = speed || 160;
		// 如果通过字符串指定速度
		switch( speed ){
			case 'fast':
				speed = 20;
				break;
			case 'slow':
				speed = 200;
				break;
		}
		// 设置定时器，开始动画
		timer = g.setInterval( function() {
			// 动画结束临界判断，如果当前动画结束，查看动画队列是否有其他动画
			if ( clockwise ){
				if( start > end ){
					pop();
					return;
				}
			} else {
				if( start < end ){
					pop();
					return;
				}
			}

			ctx.beginPath();
			ctx.moveTo( x, y );
			ctx.arc( x, y, r, start, start + step, !clockwise);
			ctx.strokeStyle = color;
			ctx.fillStyle = color;
			ctx.stroke();
			ctx.fill();
			start += step;
		}, speed );
	};
	// 从队列中，获取下一个动画相关属性（context）
	var pop = function() {
		var context; // 动画相关属性
		// 停止之前的动画,并设置timer值为undefined
		g.clearInterval( timer );
		timer = undefined;
		// 获取下一个动画的上下文
		context = queue.shift();
		// 如果context不为 undefined，表示拿到下一个动画
		// 调用animate函数执行该动画
		if ( context ){
			animate( context.option, context.speed );
		}
	};
	// support RequireJS SeaS
	if ( typeof define === 'function' ){
		define( function() {
			return animate;
		} );
	}
	// support NodeJS
	else if ( typeof exports !== 'undefined' ){
		module.exports = animate;
	} 
	// others
	else {
		this.animate = animate;
	}
}( window ) );