function getStyle (obj,attr) {
	var num=0;
	if (obj[attr]) {
		num = parseFloat(obj.currentStyle[attr]);
	}else {
		num = parseFloat(getComputedStyle(obj)[attr]);
	}
	if(attr == "opacity"){
		return Math.round(num*100);
	}
	return num;
}



function doMove (obj,attrs,time,type,fn) {
	var j={};
	for (var attr in attrs) {
		j[attr]={};
		j[attr].b=getStyle(obj,attr); // 开始位置
		j[attr].c=attrs[attr]-j[attr].b; // 目标距离
		j[attr].s=0;
	}
	var t=0;// 次数
	var d=time/20;  // 时间/20 -->次数
	clearInterval(obj.timer);
	obj.timer=setInterval(function () {
	t++;
	for (var attr in j) {
		j[attr].s=Tween[type](j[attr].b,j[attr].c,d,t);
	}

	if (t>=d) {
		for (var attr in j) {
			j[attr].s=attrs[attr];
		}
		clearInterval(obj.timer);			
	}

	for (var attr in j) {		
		if (attr=="opacity") {
			obj.style[attr]=j[attr].s/100;
			obj.style.filter='alpha(opacity='+j[attr].s+')';
		}else {
			obj.style[attr]=j[attr].s+'px';
		}
	}

	if(t>=d){
		fn&&fn.call(obj);
	}

	}, 20);
}


var Tween = {
	linear: function (b, c, d, t){
		return c*t/d + b;
	},
	easeIn: function(b, c, d, t){
		return c*(t/=d)*t + b;
	},
	easeOut: function(b, c, d, t){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(b, c, d, t){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(b, c, d, t){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(b, c, d, t){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(b, c, d, t){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(b, c, d, t, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(b, c, d, t, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(b, c, d, t, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(b, c, d, t, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(b, c, d, t, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(b, c, d, t, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(b, c, d, t){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(b, c, d, t){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(b, c, d, t){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

function scrollToMove(obj,target,time) {

	var scrollTopMax=0;
	if (document.documentElement.clientHeight<obj.offsetHeight) {
		scrollTopMax=obj.scrollHeight-document.documentElement.clientHeight;
	}else {
		scrollTopMax=obj.scrollHeight-obj.offsetHeight;
	}
	if (target<0) {
		target=0;
	}
	if (target>scrollTopMax) {
		target=scrollTopMax;
	}

	var nowScrollTop=obj.scrollTop;
	var disTop=target-nowScrollTop;
	var ci=time/20;
	var perDis=disTop/ci;
	var num=0;
	clearInterval(obj.timer);

	

	if (obj.scrollTop==scrollTopMax&&perDis>=0) {
		return;
	}
	if (obj.scrollTop==0&&perDis<=0) {
		return;
	}

	obj.timer=setInterval(function() {		
		num++;		
		var goal=nowScrollTop+Math.round(perDis*num); 
		if (goal<0) {
			goal=0;
		}else if(goal>scrollTopMax){
			goal=scrollTopMax;
		}
		obj.scrollTop=goal;		
		if (num==ci) {
			obj.scrollTop=target;
			clearInterval(obj.timer);
		}
	},20);
}