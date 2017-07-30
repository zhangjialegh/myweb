var searchHtml = (function() {
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
    searchBtn.addEventListener('click', function() {
            arr = [];
            value = text.value.toLowerCase();
            if (value === '') {
                popTips(false, '关键字不能为空！');
                return;
            };
            data = searchTargets(datauser.files);
            if (data.length === 0) {
                container.style.background = 'url(./image/searchkong.png) no-repeat center center/300px 200px';
            }
            newFile.style.display = 'none';
            listCreateFile.classList.add('active');
            createHtml(data);
            str = '';
            pageNum = 'search';
            para.search = true;
        })
        //生成索引的所有文件的结构
    function createHtml(data) {
        var len = data.length,
            i, str = '';
        for (i = 0; i < len; i++) {
            str +=
                `<div class="file-box" data-select=false data-id=${data[i].id}>
               <div class="circle">√</div>
               <div class="file"></div>
               <p class="file-name">${data[i].name}</p>
               <div class="text-file">
                 <input type="text" class="rename-text" value="新建文件夹">
                 <a href="javascript:;" class="sure">√</a>
                 <a href="javascript:;" class="cancel">×</a>
               </div>
             </div>`;
        }
        container.innerHTML = str;
        filePath.innerHTML = `<a href="javascript:;" class="prev">返回上一级</a> | <a href="javascript:;" class="back-origin">全部文件</a> > <span>搜索 : ${text.value}</span>`;
        fileNum.innerHTML = len;
    };
    //根据关键字索引目标文件，并将索引到的文件数据存储起来
    function searchTargets(data) {
        var len = data.length,
            i, arr = [];
        for (i = 0; i < len; i++) {
            var targetName = data[i].name.toLowerCase();
            if (targetName.indexOf(value) != -1) {
                arr.push(getItemDataById(datauser.files, data[i].id));
            }
            if (data[i].children.length > 0) {
                arr.push(...searchTargets(data[i].children));
            }
        }
        return arr;
    }
    return createHtml;
})();