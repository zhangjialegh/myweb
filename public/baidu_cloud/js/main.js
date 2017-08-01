'use strict';

var container = document.querySelector('.body');
var data,
    para = {},
    pageNum = 'root';
var datauser = JSON.parse(localStorage.getItem('baiduyun')) ? JSON.parse(localStorage.getItem('baiduyun')) : user_data;
var maxId = datauser.maxId * 1;

//初始化-------------------------------------------------------------------
turnPage(pageNum);
var hrefOrigin = window.location.href;

//页面跳转函数//------------------------------------------------------------
function turnPage(pageNum) {

    if (!para.search) {
        data = pageNum == 'root' ? datauser.files : getItemDataById(datauser, pageNum).children;
    }
    createFilesHtml(pageNum);
    checkSelectfiles();
    para.renameMark = false;
    localStorage.setItem('baiduyun', JSON.stringify(datauser));
};

//右键菜单//-------------------------------------------------------------
var contxtMenu = document.querySelector('.context-menu');
//右键小菜单//-----------------------------------------------------------
var contextList = document.querySelector('.context-list');

//弹出右键菜单或者右键小菜单
container.addEventListener('contextmenu', function (e) {
    if (data.length && !data[0].name) {
        data.shift();
    }
    contextList.style.display = 'none';
    contxtMenu.style.display = 'none';
    e.preventDefault();
    var target = e.target;
    var parent = target.classList.contains('file-box') ? target : target.parentNode;
    var children = parent.children;
    var x = e.pageX,
        y = e.pageY;
    if (parent.dataset.select === 'false') {
        for (var i = 0; i < container.children.length; i++) {
            if (container.children[i] !== parent) {
                container.children[i].classList.remove('active');
                container.children[i].dataset.select = "false";
                container.children[i].children[0].classList.remove('active');
            }
        }
    };
    if (target != container) {
        var l = window.innerWidth - contxtMenu.offsetWidth,
            t = window.innerHeight - contxtMenu.offsetHeight;
        contxtMenu.style.display = 'block';
        contxtMenu.style.left = (l < x ? l : x) + 'px';
        contxtMenu.style.top = (t < y ? t : y) + 'px';
        children[0].classList.add('active');
        parent.classList.add('active');
        parent.dataset.select = "true";
        checkSelectfiles();
    } else {
        // turnPage(pageNum);
        var l = window.innerWidth - contextList.offsetWidth,
            t = window.innerHeight - contextList.offsetHeight;
        contextList.style.display = 'block';
        contextList.style.left = (l < x ? l : x) + 'px';
        contextList.style.top = (t < y ? t : y) + 'px';
    };
});

//右键菜单对文件的操作
contxtMenu.addEventListener('mouseup', function (e) {
    contxtMenu.style.display = 'none';
});
contxtMenu.addEventListener('click', function (e) {
    var target = e.target,
        targetCls = target.classList;
    if (targetCls.contains('context-open')) {
        if (para.renameMark) return;
        if (checkSelectfiles().n > 1) {
            popTips(false, '只能打开一个文件！');
            return;
        }
        pageNum = checkSelectfiles().select[0];
        turnPage(pageNum);
    }
    if (targetCls.contains('context-copy')) {
        copyMoveTo();
    }
    if (targetCls.contains('context-delete')) {
        if (para.renameMark) return;
        tipboxDisplay('delete');
    }
    if (targetCls.contains('context-rename')) {
        reName();
    }
    if (targetCls.contains('context-move')) {
        copyMoveTo('move');
    }
});
//右键小菜单的操作//---------------------------------------------------------

contextList.addEventListener('mouseup', function (e) {
    contextList.style.display = 'none';
});
contextList.addEventListener('click', function (e) {
    var target = e.target,
        targetCls = target.classList;
    if (targetCls.contains('list-refresh')) {
        turnPage(pageNum);
    }
    if (targetCls.contains('list-reload')) {
        pageNum = 'root';
        window.location.href = hrefOrigin;
    }
    if (targetCls.contains('list-createfile')) {
        if (para.search) return;
        creatNewFiles();
    }
});

//页面文件夹的单击事件//----------------------------------------------------
container.addEventListener('click', function (e) {
    e.stopPropagation();
    var target = e.target;
    var parent = target.classList.contains('file-box') ? target : target.parentNode;
    if (target.classList.contains('circle') && !parent.children[3].classList.contains('active')) {
        if (parent.dataset.select === "true") {
            target.classList.remove('active');
            parent.classList.remove('active');
            parent.dataset.select = "false";
        } else {
            target.classList.add('active');
            parent.classList.add('active');
            parent.dataset.select = "true";
        };
        checkSelectfiles();
    } else if (target.classList.contains('file-box') || target.classList.contains('file') || target.classList.contains('file-name')) {
        if (para.renameMark) return;
        para.search = false;
        pageNum = target.dataset.id != undefined ? target.dataset.id : parent.dataset.id;
        turnPage(pageNum);
    }
});