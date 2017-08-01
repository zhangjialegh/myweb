'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var searchHtml = function () {
    var search = document.querySelector('.search');
    var text = document.querySelector('.text');
    var searchBtn = document.querySelector('.searchbtn');
    var filePath = document.querySelector('.left-dis');
    var fileNum = document.querySelector('.file-num');
    var newFile = document.querySelector('.newfile');
    var listCreateFile = document.querySelector('.list-createfile');
    var value;
    var str = '',
        strPath = '',
        arr;
    searchBtn.addEventListener('click', function () {
        arr = [];
        value = text.value.toLowerCase();
        if (value === '') {
            popTips(false, '关键字不能为空！');
            return;
        };
        data = searchTargets(datauser.files);
        if (data.length === 0) {
            container.style.background = 'url(./img/searchkong.png) no-repeat center center/300px 200px';
        }
        newFile.style.display = 'none';
        listCreateFile.classList.add('active');
        createHtml(data);
        str = '';
        pageNum = 'search';
        para.search = true;
    }
    //生成索引的所有文件的结构
    );function createHtml(data) {
        var len = data.length,
            i,
            str = '';
        for (i = 0; i < len; i++) {
            str += '<div class="file-box" data-select=false data-id=' + data[i].id + '>\n               <div class="circle">\u221A</div>\n               <div class="file"></div>\n               <p class="file-name">' + data[i].name + '</p>\n               <div class="text-file">\n                 <input type="text" class="rename-text" value="\u65B0\u5EFA\u6587\u4EF6\u5939">\n                 <a href="javascript:;" class="sure">\u221A</a>\n                 <a href="javascript:;" class="cancel">\xD7</a>\n               </div>\n             </div>';
        }
        container.innerHTML = str;
        filePath.innerHTML = '<a href="javascript:;" class="prev">\u8FD4\u56DE\u4E0A\u4E00\u7EA7</a> | <a href="javascript:;" class="back-origin">\u5168\u90E8\u6587\u4EF6</a> > <span>\u641C\u7D22 : ' + text.value + '</span>';
        fileNum.innerHTML = len;
    };
    //根据关键字索引目标文件，并将索引到的文件数据存储起来
    function searchTargets(data) {
        var len = data.length,
            i,
            arr = [];
        for (i = 0; i < len; i++) {
            var targetName = data[i].name.toLowerCase();
            if (targetName.indexOf(value) != -1) {
                arr.push(getItemDataById(datauser.files, data[i].id));
            }
            if (data[i].children.length > 0) {
                arr.push.apply(arr, _toConsumableArray(searchTargets(data[i].children)));
            }
        }
        return arr;
    }
    return createHtml;
}();