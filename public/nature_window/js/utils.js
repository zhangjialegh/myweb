
function PicListBox(index, files, x, y, w, h, fadeinTime, showTime, blur) 
{
    x = getB(x);
    y = getB(y);
    w = getB(w);
    h = getB(h);
    if(files.length==0) return;
    var id = "a"+index;

    var dv = createDiv(id, x, y, w, h);
    document.body.appendChild(dv);

    var imgList = Array();
    for(var i = 0; i < files.length; i++) {
	var ig = document.createElement("img");
	ig.onload = function(ig) {
	    return function() {
		ig.onload = null;
		if(ig.width/ig.height > w/h) {
		    ig.style.marginLeft = Math.floor((w - Math.floor(h/ig.height*ig.width))/2) + "px";
		    ig.height = h;
		}
		else {
		    ig.width = w;
		}
	    }
	}(ig);
    dv.appendChild(ig);


    if(id=='a6' && i==0){
        ig.onclick=function () {
            window.open("../douban_dushu/"); 
        }
    }
	ig.id = id+i;
	ig.src = files[i];
	ig.style.position = "absolute";
	ig.style.display = "none";
	ig.style.cssText += getBlurStr(0);
    }
    
    $("#"+id+0).fadeIn(fadeinTime);

    if(files.length==1) return;
    var index = 0;
    setInterval(function() {
	if(files.length>2)
	{
	    var lastid;
	    if(index==0)
		var lastid = "#"+id+(files.length-1);
	    else
		var lastid = "#"+id+(index-1);
	    $(lastid).css("display", "none");
	}
	var curid = "#"+id+index;
	$(curid).css("z-index", 0);
	index=(index+1)%files.length;
	var nextid = "#"+id+index;
	$(nextid).css("display", "none");
	$(nextid).css("z-index", 1);
	$(nextid).fadeIn(fadeinTime);
    }, fadeinTime+showTime);
}

function setVideo(index, x, y, w, h, fadeinTime, showTime, blur) {
    x = getB(x);
    y = getB(y);
    w = getB(w);
    h = getB(h);
    var id = "a"+index;
    var dv = createDiv(id, x, y, w, h);
    document.body.appendChild(dv);
}

function createDiv(id, x, y, w, h) {
    var dv = document.createElement("div");
    dv.id = id;
    dv.style.position = "absolute";
    dv.style.left = x+"px";
    dv.style.top = y+"px";
    dv.style.overflow = "hidden";
    dv.style.width = w+"px";
    dv.style.height = h+"px";
    dv.style.borderStyle = "solid";
    dv.style.borderWidth = "5px";
    dv.style.borderColor = "#333333";
    return dv;
}

function getBlurStr(blur) {
    var s = "";
    s += "-webkit-filter: blur("+blur+"px);"
    s += "-moz-filter: blur("+blur+"px);";
    s += "-ms-filter: blur("+blur+"px);";
    s += "filter: blur("+blur+"px);";
    return s;
}

function getW() {
    return screen.width;
}

function getH() {
    return screen.height;
}

function getB(x) {
    return Math.floor(getW()/1920*x);
}
