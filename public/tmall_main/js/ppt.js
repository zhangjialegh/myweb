function autoPlay() {
    if (list.timer) return;
    list.timer = setInterval(function() {
        list.style.transition = '';
        var l = list.offsetLeft;
        if (list.offsetLeft == 0) {
            l = list.offsetLeft - list.offsetWidth / 2;
            list.style.left = l + 'px';
        }
        if (list.offsetLeft == -list.offsetWidth + wrap.offsetWidth) {
            l = list.offsetLeft + list.offsetWidth / 2;
            list.style.left = l + 'px';
        }
        setTimeout(function() {
            list.style.left = l - wrap.offsetWidth + 'px';
            a[list.prev].className = '';
            list.style.transition = '0.5s';
            if (list.num >= len - 1) {
                list.num = 0;
            } else {
                list.num++;
            }
            a[list.num].className = 'active';
            list.prev = list.num;
        }, 100);
    }, 2000)
}

function autoHotspot() {
    var hotLi = hotLists.querySelectorAll('li');

    if (hotLists.timer) return;

    hotLists.timer = setInterval(function() {

       if(-hotLists.offsetTop>=hotLists.offsetHeight-2-hotBox.clientHeight){
           hotLists.style.transition = '';
           hotLists.style.top=-hotLists.offsetHeight/2+hotBox.clientHeight+'px';
       }
       setTimeout(function() {
           hotLists.style.transition = '0.5s';
           hotLists.style.top = hotLists.offsetTop-hotBox.clientHeight + 'px';
       }, 500);
    }, 1500)
}

function start(ev) {
    ev.preventDefault();
    clearInterval(list.timer);
    list.timer = null;
    list.style.transition = '';
    if (list.offsetLeft == 0) {
        list.style.left = list.offsetLeft - list.offsetWidth / 2 + 'px';
    }
    if (list.offsetLeft == -list.offsetWidth + wrap.offsetWidth) {
        list.style.left = list.offsetLeft + list.offsetWidth / 2 + 'px';
    }
    var e = ev.changedTouches[0];
    var x = e.pageX;
    var listLeft = list.offsetLeft;
    var l = list.offsetLeft;
    list.addEventListener('touchmove', function(ev) {
        var e = ev.changedTouches[0];
        l = e.pageX - x + listLeft;
        list.style.left = l + 'px';

    });
    list.addEventListener('touchend', function(e) {
        list.style.transition = '0.5s';
        var num = Math.round(l / wrap.offsetWidth);
        list.style.left = num * wrap.offsetWidth + 'px';
        //   for (var i = 0; i < a.length; i++) {
        //       a[i].className = '';
        //   };
        Array.from(a).forEach(function(item, i) {
            item.className = '';
        })
        list.num = -num % len;
        list.prev = list.num;
        a[list.num].className = 'active';
        autoPlay();
    });
}

function startLife(ev) {
    ev.preventDefault();
    var lifeContainer = document.querySelector('.life-container');
    var e = ev.changedTouches[0];
    var x = e.pageX;
    var listLeft = lifeLists.offsetLeft;
    var l = lifeLists.offsetLeft;
    lifeLists.addEventListener('touchmove', function(ev) {
        var e = ev.changedTouches[0];
        l = e.pageX - x + listLeft;
        if (l >= 0) {
            l = 0;
        }
        if (l <= (-lifeLists.offsetWidth + lifeContainer.offsetWidth)) {
            l = -lifeLists.offsetWidth + lifeContainer.offsetWidth;
        }
        lifeLists.style.left = l + 'px';

    });
    lifeLists.addEventListener('touchend', function(e) {
        //   var num = Math.round(l / wrap.offsetWidth);
        //   lifeLists.style.left = num * wrap.offsetWidth + 'px';

    });
}

//滚动条监测
var scrollBody = document.querySelector('.scroll-body');
scrollBody.addEventListener('touchstart', scrollMove);
// console.log(scrollBody.offsetHeight);
function scrollMove(ev) {
    ev.preventDefault();
    var scrollContainer = document.querySelector('.scroll-container');
    var header = document.querySelector('.header');
    var e = ev.changedTouches[0];
    var startTime = ev.timeStamp;

    var y = e.pageY;
    var scrollTopp = scrollBody.offsetTop;
    var headerHeight = header.offsetHeight;
    var t;
    scrollBody.addEventListener('touchmove', function(ev) {
        var e = ev.changedTouches[0];
        var starty = e.pageY;
        t = e.pageY - y + scrollTopp;

        if (t >= 0) {
            t = 0;
        }
        if (t <= -scrollBody.offsetHeight + scrollContainer.offsetHeight) {
            t = -scrollBody.offsetHeight + scrollContainer.offsetHeight;
        }
        var topLimit = scrollContainer.offsetHeight * 0.25;
        var returnTop = document.querySelector('.return-top');
        if (-t >= topLimit) {
            returnTop.style.display = 'block';
            returnTop.addEventListener('touchstart', function() {
                t = 0;
                scrollBody.style.top = t + 'px';
                returnTop.style.display = 'none';
                clearInterval(scrollBody.timer);
                scrollBody.timer = null;
            });
        } else {
            returnTop.style.display = 'none';
        };
        scrollBody.style.top = t + 'px';
    });
    scrollBody.addEventListener('touchend', function(ev) {
        var disTime = ev.timeStamp - startTime;
        var e = ev.changedTouches[0];
        var disY = e.pageY - y;
        var speed = disY * 100 / disTime;
        if (disTime <= 500) {
            if (scrollBody.timer) return;
            scrollBody.timer = setInterval(function() {
                t = t + speed;
                speed *= 0.8;

                // speed = speed > 0 ? (speed - 0.01) : (speed + 0.01);
                if (Math.abs(speed) <= 5) {
                    clearInterval(scrollBody.timer);
                    scrollBody.timer = null;
                }
                // console.log(disTime, t, speed, scrollBody.animate);
                if (t >= 0) {
                    t = 0;
                    clearInterval(scrollBody.timer);
                    scrollBody.timer = null;
                }
                if (t <= -scrollBody.offsetHeight + scrollContainer.offsetHeight) {
                    t = -scrollBody.offsetHeight + scrollContainer.offsetHeight;
                    clearInterval(scrollBody.timer);
                    scrollBody.timer = null;
                }
                scrollBody.style.top = t + 'px';
            }, 100)
        }

    });
}