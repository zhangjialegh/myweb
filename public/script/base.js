function swiCard() {
  var Tabs = function () {
	var toggler = $('.views-toggle');
	var tabs = $('li.tabs__item');
	var toggled = false;
	var transform = function (el, value) {
		el.css('transform', value);
		el.css('-webkit-transform', value);
		el.css('-ms-transform', value);
	};
	var transition = function (el, value) {
		el.css('transition', value);
		el.css('-webkit-transition', value);
		el.css('-ms-transition', value);
	};
	var moveContent = function () {
		if (!toggled) {
			toggled = true;
		} else {
			toggled = false;
		}
		moveTabs(toggled);
		return false;
	};
	var moveTabs = function (a) {
		var transY, scale;
		if (a) {
			tabs.css({
				'opacity': '1',
				'box-shadow': '0 30px 60px rgba(0,0,0,0.4)',
				'cursor': 'pointer'
			});
			tabs.each(function (index) {
				transY = index * 10;
				scale = 0.5 + index / 25;
				transform($(this), 'translate3d(0,' + transY + 'vh, 0) scale(' + scale + ')');
			});
			toggler.addClass('views-toggle--hidden');
		} else {
			transform(tabs, 'translate3d(0,0,0) scale(1)');
		}
	};
	var switchTabs = function () {
		var selected = $(this);
		var others = selected.siblings('li');
		if (toggled) {
			transition(others, 'transform 0.3s cubic-bezier(0.755, 0.05, 0.855, 0.06)');
			transform(others, 'translate3d(0, 100%, 0) scale(1)');
			transform(selected, 'translate3d(0,0,0) scale(1)');
			tabs.css({
				'box-shadow': '0 30px 60px rgba(0,0,0,0.4)',
				'cursor': 'default'
			});
			toggled = false;
			selected.on('transitionend webkitTransitionend', function () {
				toggler.removeClass('views-toggle--hidden');
				others.css({ 'opacity': '0' });
				transform(others, 'translate3d(0, 100%, 0) scale(0)');
				transition(others, 'transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)');
				selected.off('transitionend webkitTransitionend');
			});
		}
	};
	var setup = function () {
		toggled = true;
		moveTabs(toggled);
	};
	var init = function () {
		setup();
		toggler.on('click touchstart', moveContent);
        tabs.on('click touchstart', switchTabs);
        switchTabs.call($('.color5'));
	};
	return { init: init };
}();
Tabs.init();
}


function star() {
     //宇宙特效
     var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                w = canvas.width = window.innerWidth,
                h = canvas.height = window.innerHeight,

                hue = 217,
                stars = [],
                count = 0,
                maxStars = 500;//星星数量

                var canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d');
                canvas2.width = 100;
                canvas2.height = 100;
                var half = canvas2.width / 2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
                gradient2.addColorStop(0.025, '#CCC');
                gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
                gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
                gradient2.addColorStop(1, 'transparent');

                ctx2.fillStyle = gradient2;
                ctx2.beginPath();
                ctx2.arc(half, half, half, 0, Math.PI * 2);
                ctx2.fill();

                // End cache

                function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }

                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }

                return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                function maxOrbit(x, y) {
                var max = Math.max(x, y),
                    diameter = Math.round(Math.sqrt(max * max + max * max));
                return diameter / 2;
                //星星移动范围，值越大范围越小，
                }

                var Star = function() {

                this.orbitRadius = random(maxOrbit(w, h));
                this.radius = random(60, this.orbitRadius) / 10; 
                //星星大小
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 500000; 
                //星星移动速度
                this.alpha = random(2, 10) / 10;

                count++;
                stars[count] = this;
                }

                Star.prototype.draw = function() {
                var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                    twinkle = random(10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }

                ctx.globalAlpha = this.alpha;
                ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
                }

                for (var i = 0; i < maxStars; i++) {
                new Star();
                }

                function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.5; //尾巴
                ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
                ctx.fillRect(0, 0, w, h)

                ctx.globalCompositeOperation = 'lighter';
                for (var i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                };

                window.requestAnimationFrame(animation);
                }

                animation();
}


function skewDeg() {
    var h=window.innerHeight;
    var w=window.innerWidth;
    var A=90-Math.atan(h/w)*180/Math.PI;
    $('.m-boardT').css('transform','skewX('+-A+'deg)');
    $('.m-boardB').css('transform','skewX('+-A+'deg)');

    $('.music .bg').on('mouseover',function () {
        $('.music .bg').css('transform','scale(1.1)');
        $('.m-boardT').css('left','-105%');
        $('.m-boardB').css('left','105%');
        // $('.m-boardT').animate({
        //     left:'-105%',
        // },500);
        // $('.m-boardB').animate({
        //     left:'105%',
        // })
    });
    $('.music .bg').on('mouseout',function () {
        $('.music .bg').css('transform','scale(1)');
        $('.m-boardT').css('left','-100%');
        $('.m-boardB').css('left','100%');
        // $('.m-boardT').animate({
        //     left:'-100%',
        // },500);
        // $('.m-boardB').animate({
        //     left:'100%',
        // })
    })
}

function replacePath() {
    $('.arrow-link').on('mouseover',function () {
        $('.circle').attr("d","M2560 1034l-2048 0 C229.717333 1034 0 804.282667 0 522 0 239.679407 229.717333 10 512 10l2048 0C2842.358519 10 3072 239.679407 3072 522 3072 804.282667 2842.358519 1034 2560 1034z");
        $('.arrow').attr("d","M2395 522l350 0M2645 422l100 100l-100 100");
    });
    $('.arrow-link').on('mouseout',function () {
        $('.circle').attr("d","M512 1034l-0 0 C229.717333 1034 0 804.282667 0 522 0 239.679407 229.717333 10 512 10l0 0C794.358519 10 1024 239.679407 1024 522 1024 804.282667 794.358519 1034 512 1034z");
        $('.arrow').attr("d","M347 522l350 0M597 422l100 100l-100 100");
    });
}