var musicInfo = [{
        song: "童话镇",
        singer: "陈一发",
        src: "mp3/1童话镇.mp3",
        img: 'css/img/1.jpg',
        lyric: 'tonghuazhen'
    },
    {
        song: "以后的以后",
        singer: "庄心妍",
        src: "mp3/2以后的以后.mp3",
        img: 'css/img/2.jpg',
        lyric: 'yihoudeyihou'
    },
    {
        song: "Fade",
        singer: "Alan Walker",
        src: "mp3/3Fade.mp3",
        img: 'css/img/3.jpg',
        lyric: 'Fade'
    },
    {
        song: "默",
        singer: "那英",
        src: "mp3/4默.mp3",
        img: 'css/img/4.jpg',
        lyric: 'mo'
    },
    {
        song: "白芍花开",
        singer: "张碧晨",
        src: "mp3/5白芍花开.mp3",
        img: 'css/img/5.jpg',
        lyric: 'baishaohuakai'
    },
    {
        song: "好可惜",
        singer: "庄心妍",
        src: "mp3/6好可惜.mp3",
        img: 'css/img/6.jpg',
        lyric: 'haokexi'
    },
    {
        song: "小半",
        singer: "陈粒",
        src: "mp3/7小半.mp3",
        img: 'css/img/7.jpg',
        lyric: 'xiaoban'
    },
    {
        song: "魔鬼中的天使",
        singer: "田馥甄",
        src: "mp3/8魔鬼中的天使.mp3",
        img: 'css/img/8.jpg',
        lyric: 'moguizhongdetianshi',
    },
    {
        song: "我要你",
        singer: "任素汐",
        src: "mp3/9我要你.mp3",
        img: 'css/img/9.jpg',
        lyric: 'woyaoni'
    },
    {
        song: "告白气球",
        singer: "周杰伦",
        src: "mp3/10告白气球.mp3",
        img: "css/img/10.jpg",
        lyric: "gaobaiqiqiu"
    }
];
function add0(num) {
    return num < 10 ? "0" + num : "" + num;
}

function SecToMin(num) {
    var min = Math.floor(num / 60);
    var sec = Math.floor(num % 60);
    var str = add0(min) + ":" + add0(sec);
    return str;
}

function preLoad(src) {
    var image = new Image();
    image.src = src;
    if (image.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
        return;
    }
    image.onload = function() {
    };
}

function toggle(obj, cls) {
    var str = obj.cls;
    var arr = str.split(" ");
    var onOff = true;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === cls) {
            onOff = false;
            arr.splice(i, 1);
            i--;
        }
    }
    if (onOff) {
        arr.push(cls);
    }
    obj.cls = arr.join(" ");
    return obj.cls;
}

function hashToJson(str) {
    var json = {};

    var arr = str.match(/\w+=\w+/g);

    if (!arr) { return str.substr(1); }

    for (var i = 0; i < arr.length; i++) {
        json[arr[i].split("=")[0]] = arr[i].split("=")[1];
    }
    return json;
}

/*
audiOne.readyState
0	HAVE_NOTHING	没有关于音频/视频是否就绪的信息
1	HAVE_METADATA	关于音频/视频就绪的元数据
2	HAVE_CURRENT_DATA	关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
3	HAVE_FUTURE_DATA	当前及至少下一帧的数据是可用的
4	HAVE_ENOUGH_DATA	可用数据足以开始播放
*/

var audiOne = document.getElementById('audio1');
var oTotalTime = document.getElementById("total-time");
var oCurrentTime = document.getElementById("currentTime");
var aCtrls = document.querySelectorAll("#control span");
var oSongName = document.getElementById('songName');
var audiOnertist = document.getElementById('artist');
var oCurBtn = document.getElementById('cur-btn');
var oProcessCur = document.getElementById('process-cur');
var oBg1 = document.querySelector('.bg');
var oDisk = document.querySelector('.disk');
var oBg2 = document.querySelector('.disk .disk-album-bg');
var oCenter = document.querySelector('.center');
var oProcessBar = document.querySelector("#process-bar");
var oBufferedBar = document.querySelector("#process-ready");
var oLyric = document.querySelector(".lyric");
var lyricUl = document.querySelector(".lyric ul");
var lyricLi = lyricUl.getElementsByTagName("li");
var oPlayListCount = document.getElementById('playListCount');
var oPlayList = document.querySelector('#play-list');
var oPlayListUl = document.querySelector('#play-list ul');
var oPlayListLi = oPlayListUl.getElementsByTagName('li');
var oListMask = document.getElementById('list-mask');
var olyricLine = document.getElementById('line');
var musicList = document.querySelector('.music-list');
var rightWrapper = document.querySelector('.right-wrapper');
var Wrapper=document.getElementById('wrapper');
var flag=false;

var player = {
    duration: 0,
    song: '',
    singer: '',
    src: '',
    img: '',
    lyric: '',
    playing: false,
    loopmodel: 0,
    curtime: 0,
    perSecTimer: null,
    perSecArrFn: [],
    percent: 0,
    curDraging: false,
    ended: false,
    songCount: 0,
    nowSong: 0,
    buffered: 0,
    listState: false
};

//------------歌词部分变量-----------
var lyric = {
    lyricStr: '',
    unitHeight: 42,
    lyricTop: 147, //ul初始高度
    lyNum: 0,
    lyMTime: [],
    lyMtext: [],
    timer: null,
    lyPreNum: -1,
    color: '#fff',
    offset: 0,
    draging: false
};

//-------------------------------



player.init = function() {
    player.loaddata(player.nowSong);
    player.load();
    player.getTotalTime();
    player.changeHash();
};

player.perSec = function() {
    clearInterval(this.perSecTimer);
    this.perSecTimer = setInterval(function() {
        for (var i = 0; i < player.perSecArrFn.length; i++) {
            if (typeof player.perSecArrFn[i] === "function") {
                player.perSecArrFn[i].call(player);
            }
        }
    }, 1000);
};

player.getTotalTime = function() {
    var n = 0;
    var timer = setInterval(function() {
        n++;
        if (audiOne.duration && audiOne.duration > 1) {
            clearInterval(timer);
            player.duration = audiOne.duration;
            oTotalTime.innerHTML = SecToMin(player.duration);
        }
        if (n > 800) {
            n = 0;
            // clearInterval(timer);
            alert("歌曲加载超时!");
        }
    }, 20);
};

player.getCurTime = function() {
    if (!audiOne.currentTime || this.curDraging) {
        return;
    }
    player.curtime = audiOne.currentTime;
    oCurrentTime.innerHTML = SecToMin(player.curtime);
};

//从musicInfo加载数据
player.loaddata = function(num) {
    this.song = musicInfo[num].song;
    this.singer = musicInfo[num].singer + "-" + this.song;
    this.src = musicInfo[num].src;
    this.img = musicInfo[num].img;
    if (musicInfo[num].lyric) {
        this.lyric = musicInfo[num].lyric;
    }
    this.songCount = musicInfo.length;
    if (musicInfo[num].offset) {
        lyric.offset = musicInfo[num].offset;
    } else {
        lyric.offset = 0;
    }
};

//加载歌曲src,song,singer
player.load = function() {
    if (this.src && this.song && this.singer) {
        audiOne.src = this.src;
        oSongName.innerHTML = this.song;
        audiOnertist.innerHTML = this.singer;
        oBg1.style.backgroundImage = "url(" + this.img + ")";
        oBg2.src = this.img;
        oPlayListCount.innerHTML = this.songCount;
    }
    if (this.lyric) {
        loadLyric(this.lyric);
    }
};

player.playerlist = function() {
    var arrColor = ["linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)", "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)", "linear-gradient(to top, #cc208e 0%, #6713d2 100%)", "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)"];
    for (var i = 0; i < musicInfo.length; i++) {
        var li = document.createElement('li');
        var filter = document.createElement('div');
        filter.className = 'li-filter';
        filter.style.backgroundImage = "url(" + musicInfo[i].img + ")";
        var liBlack = document.createElement('div');
        liBlack.className = 'li-black';
        liBlack.style.backgroundImage = arrColor[i % arrColor.length];
        var list = document.createElement('div');
        list.className = 'li-box';
        var span = document.createElement('span');
        if (i == player.nowSong) {
            li.className = "active";
        }
        li.index = i;
        li.onclick = function() {
            oPlayListLi[player.nowSong].className = "";
            player.reset();
            player.nowSong = this.index;
            this.className = "active";
            player.init();
            lyricTimer();
            player.ifEnded();
            player.play();
            player.playing = true;
            player.getCurTime();
            aCtrls[1].style.display = "none";
            aCtrls[2].style.display = "inline-block";
            player.perSec();
            // lyReset();
            scrollToMove(oPlayListUl, 120 * (this.index - 2), 400);
        }
        span.innerHTML = musicInfo[i].song + "-" + musicInfo[i].singer;
        list.appendChild(span);
        li.appendChild(filter);
        li.appendChild(liBlack);
        li.appendChild(list);
        oPlayListUl.appendChild(li);
    }
};

player.preloadImg = function() {
    for (var i = 0; i < musicInfo.length; i++) {
        preLoad(musicInfo[i].img);
    }
};

player.play = function() {
    audiOne.play();
    // oDisk.style.animationPlayState="running";
    oDisk.style.WebkitAnimationPlayState = "running";
};

player.pause = function() {
    audiOne.pause();
    // oDisk.style.animationPlayState="paused";
    oDisk.style.WebkitAnimationPlayState = "paused";
};

player.reset = function() {
    audiOne.currentTime = 0.001;
    oBufferedBar.style.width = "0px";
    player.buffered = 0;
    player.getCurTime();
    player.processCur();
};

player.ifEnded = function() {
    if (audiOne.ended) {
        player.ended = true;
        player.preloadImg();
        lyReset();
        player.reset();
        if (player.loopmodel == 0) {
            oPlayListLi[player.nowSong].className = "";
            player.nowSong++;
            player.nowSong %= player.songCount;
            oPlayListLi[player.nowSong].className = "active";
            player.init();
            player.play();
        } else if (player.loopmodel == 1) {
            player.play();
        } else if (player.loopmodel == 2) {
            do {
                var random = Math.round(Math.random() * player.songCount) - 1;
                if (random < 0) {
                    random = 0;
                }
            }
            while (random == player.nowSong);
            oPlayListLi[player.nowSong].className = "";
            player.nowSong = random;
            oPlayListLi[player.nowSong].className = "active";
            player.init();
            player.play();
        }

    } else {
        player.ended = false;
    }
};

player.getBuffered = function() {
    if (audiOne.readyState == 4) {
        player.buffered = audiOne.buffered.end(0);
        oBufferedBar.style.width = Math.round(player.buffered / player.duration) * 100 + "%";
    }
};

player.changeHash = function() {
    window.location.hash = "song=" + this.nowSong;
};

player.getHash = function() {
    if (window.location.hash) {
        var jsonHash = hashToJson(window.location.hash);
        if (jsonHash.song && musicInfo[jsonHash.song]) {
            player.nowSong = jsonHash.song;
        } else {
            player.nowSong = 0;

        }
    }
};

player.processCur = function() {
    if (this.curDraging) {
        return;
    }
    if (this.curtime && this.duration) {
        this.percent = this.curtime / this.duration;
        oCurBtn.style.left = this.percent * 240 + 5 + 'px';
        oProcessCur.style.width = this.percent * 100 + '%';
    }
};


audiOne.ontimeupdate = player.getBuffered;
player.perSecArrFn.push(player.getCurTime);
player.perSecArrFn.push(player.processCur);
player.perSecArrFn.push(player.ifEnded);
player.getHash();
player.playerlist();
player.init();



//------------按钮-----------

//上一首
aCtrls[0].onmousedown = function() {
    player.preloadImg();
};
aCtrls[0].onclick = function() {
    if (audiOne.readyState == 0) {
        return;
    }
    if (player.loopmodel == 2) {
        do {
            var random = Math.round(Math.random() * player.songCount) - 1;
            if (random < 0) {
                random = 0;
            }
        }
        while (random == player.nowSong);
        oPlayListLi[player.nowSong].className = "";
        player.nowSong = random;
        oPlayListLi[player.nowSong].className = "active";
        player.init();
        if (player.playing) {
            player.play();
        }
        lyReset();
        return;
    }
    player.reset();
    oPlayListLi[player.nowSong].className = "";
    player.nowSong--;
    if (player.nowSong < 0) {
        player.nowSong = player.songCount - 1;
    }
    oPlayListLi[player.nowSong].className = "active";
    player.init();
    if (player.playing) {
        player.play();
    }
    lyReset();

};

//播放按钮
aCtrls[1].onclick = function() {
    if (audiOne.readyState == 0) {
        return;
    }
    lyricTimer();
    player.ifEnded();
    player.play();
    player.playing = true;
    player.getCurTime();
    aCtrls[1].style.display = "none";
    aCtrls[2].style.display = "inline-block";
    player.perSec();
};

//暂停按钮
aCtrls[2].onclick = function() {
    clearInterval(player.CurTimer);
    player.pause();
    player.playing = false;
    aCtrls[1].style.display = "inline-block";
    aCtrls[2].style.display = "none";
    clearInterval(player.perSecTimer);
};


//下一首
aCtrls[3].onmousedown = function() {
    player.preloadImg();
};
aCtrls[3].onclick = function() {
    if (audiOne.readyState == 0) {
        return;
    }
    if (player.loopmodel == 2) {
        do {
            var random = Math.round(Math.random() * player.songCount) - 1;
            if (random < 0) {
                random = 0;
            }
        }
        while (random == player.nowSong);
        oPlayListLi[player.nowSong].className = "";
        player.nowSong = random;
        oPlayListLi[player.nowSong].className = "active";
        player.init();
        if (player.playing) {
            player.play();
        }
        lyReset();
        return;
    }
    player.reset();
    oPlayListLi[player.nowSong].className = "";
    player.nowSong++;
    player.nowSong %= player.songCount;
    oPlayListLi[player.nowSong].className = "active";
    player.init();
    if (player.playing) {
        player.play();
    }
    lyReset();
};
musicList.onclick=function () {
            var l=parseInt(getComputedStyle(document.body)['width']);
            var WrapperMin=l*0.7;
            var RightMax=l*0.3;
            if(flag){
                doMove(rightWrapper,{"width":0},200,'linear');
                doMove(Wrapper,{"width":l},200,'linear');
                flag=false;
            }else{
                doMove(rightWrapper,{"width":RightMax},200,'linear');
                doMove(Wrapper,{"width":WrapperMin},200,'linear');
                flag=true;
            }
}
oProcessBar.onclick = function(ev) {
    ev = ev || window.event;
    var L1 = this.getBoundingClientRect().left;
    var dis = ev.clientX - L1;
    dis = Math.round(dis);
    dis < 0 && (dis = 0);
    dis > 240 && (dis = 240);

    var btnTime = dis / 240 * player.duration;
    oCurrentTime.innerHTML = SecToMin(btnTime);
    audiOne.currentTime = (btnTime + 0.001);
    lyMoveTo(btnTime);
    oCurBtn.style.left = dis + 'px';
    oProcessCur.style.width = dis / 240 * 100 + '%';
};

//进度按钮拖拽
oCurBtn.onclick = function(ev) {
    ev = ev || window.event;
    ev.stopPropagation();
};
oCurBtn.onmousedown = function(ev) {
    ev = ev || window.event;
    //offsetLeft从-10开始
    var L1 = oCurBtn.offsetLeft + 10;
    var ML1 = ev.clientX;
    var tar = 0;
    var btnTime = audiOne.currentTime;
    player.curDraging = true;
    document.onmousemove = function(ev) {
        ev = ev || window.event;
        var disX = ev.clientX - ML1;
        tar = L1 + disX;
        tar < 0 && (tar = 0);
        tar > 240 && (tar = 240);
        oCurBtn.style.left = tar + 'px';
        oProcessCur.style.width = tar / 240 * 100 + '%';
        btnTime = tar / 240 * player.duration;
        oCurrentTime.innerHTML = SecToMin(btnTime);
        lyMoveTo(btnTime + 0.001);
    };
    document.onmouseup = function() {
        player.curDraging = false;
        audiOne.currentTime = (btnTime + 0.001);
        document.onmousemove = document.onmouseup = null;
    };

};

oLyric.onOff = true;
oLyric.onclick = function() {
    if (oLyric.onOff) {
        oLyric.style.display = 'none';
        oCenter.style.opacity = '1';
    }
};
oCenter.onclick = function() {
    oLyric.style.display = 'block';
    oCenter.style.opacity = '0.001';
};
oLyric.onmousedown = function(ev) {
    ev = ev || window.event;
    oLyric.onOff = true;
    var T1 = ev.clientY;
    var ulTop1 = lyricUl.offsetTop;
    var finalTar = lyricUl.offsetTop;
    document.onmousemove = function(ev) {
        ev = ev || window.event;
        if (Math.abs(ev.clientY - T1) < 4) {
            return;
        }
        lyric.draging = true;
        oLyric.onOff = false;
        olyricLine.style.display = "block";
        var target = ev.clientY - T1 + ulTop1;
        if (target > lyric.lyricTop) {
            target = lyric.lyricTop;
        }
        if (target < (-lyricUl.offsetHeight + lyric.lyricTop + lyric.unitHeight)) {
            target = (-lyricUl.offsetHeight + lyric.lyricTop + lyric.unitHeight);
        }
        lyricUl.style.top = target + "px";
        var numTar = Math.round((target - lyric.lyricTop) / lyric.unitHeight);
        finalTar = numTar * lyric.unitHeight + lyric.lyricTop;
        if (lyric.lyPreNum > -1) {
            lyricLi[lyric.lyPreNum].className = "";
            lyricLi[lyric.lyPreNum].style.cssText = '';
        }
        lyric.lyNum = Math.abs(numTar);

        lyricLi[lyric.lyNum].className = "active";
        lyricLi[lyric.lyNum].style.color = lyric.color;
        lyric.lyPreNum = lyric.lyNum;
    };
    document.onmouseup = function() {
        if (lyric.draging) {
            lyric.draging = false;
            olyricLine.style.display = "none";
            audiOne.currentTime = (lyric.lyMTime[lyric.lyNum] + 0.001);
            oCurrentTime.innerHTML = SecToMin(lyric.lyMTime[lyric.lyNum]);
            oCurBtn.style.left = lyric.lyMTime[lyric.lyNum] / player.duration * 240 + 'px';
            oProcessCur.style.width = lyric.lyMTime[lyric.lyNum] / player.duration * 100 + '%';
            doMove(lyricUl, { top: finalTar }, 100, 'linear');
        }
        document.onmousemove = null;
        document.onmouseup = null;
    };

};

window.onresize=function () {
            var l=parseInt(getComputedStyle(document.body)['width']);
            var wL=parseInt(getComputedStyle(Wrapper)['width']);
            if(l-wL<=5){
                Wrapper.style.width='100%';
            }else{
                Wrapper.style.width='70%';
                rightWrapper.style.width='30%';
            }
        }



//--------歌词相关--------
function loadLyric(name) {
    lyric.lyricStr = lyrics[name];
    lyric.lyMTime = returnTimeLyric(lyric.lyricStr)[0];
    lyric.lyMtext = returnTimeLyric(lyric.lyricStr)[1];
    lyricUl.innerHTML = '';
    for (var i = 0; i < lyric.lyMtext.length; i++) {
        var li1 = document.createElement('li');
        if (lyric.lyMtext[i] == '') {
            li1.innerHTML = '&nbsp;';
        } else {
            li1.innerHTML = lyric.lyMtext[i];
        }
        lyricUl.appendChild(li1);
    }
}

//歌词清除样式,ul回到顶部
function lyReset() {
    lyric.lyPreNum = -1;
    lyricUl.style.top = lyric.lyricTop + 'px'; //ul初始高度
    for (var i = 0; i < lyricLi.length; i++) {
        lyricLi[i].className = "";
    }
}


function lyMoveTo(time) {
    var last = true;
    for (var i = 0; i < lyric.lyMTime.length; i++) {
        if (lyric.lyMTime[i] > (time - lyric.offset)) {
            lyric.lyNum = i - 1;
            last = false;
            break; //显示第i个
        }
    }

    if (last) {
        lyric.lyNum = lyric.lyMTime.length - 1;
    }

    if (lyric.lyNum < 0) {
        lyric.lyNum = 0;
    }
    if (!lyricLi[lyric.lyNum]) {
        return;
    }

    if (lyric.lyPreNum == lyric.lyNum) {
        return;
    } else {
        if (lyric.lyPreNum > -1) {
            lyricLi[lyric.lyPreNum].className = "";
            lyricLi[lyric.lyPreNum].style.cssText = '';
        }
        lyric.lyPreNum = lyric.lyNum;
    }


    lyricLi[lyric.lyNum].className = "active";
    lyricLi[lyric.lyNum].style.color = lyric.color;
    doMove(lyricUl, { top: lyric.lyricTop - lyric.unitHeight * lyric.lyNum }, 150, 'linear');
}


function lyricTimer() {
    clearInterval(lyric.timer);
    lyric.timer = setInterval(function() {
        if (lyric.draging) {
            return;
        }
        if (player.curDraging) {
            return;
        }
        if (!player.playing) {
            clearInterval(lyric.timer);
            return;
        }
        if (!audiOne.currentTime) {
            return;
        }

        lyMoveTo(audiOne.currentTime);

    }, 150);
}