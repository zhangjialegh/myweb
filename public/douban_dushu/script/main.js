'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var btn = document.querySelector('.btn');
var text = document.querySelector('.text');
var bookLists = document.querySelector('.book-lists');
var navLists = document.querySelector('.nav-lists');
var loadingWrap = document.querySelector('.loading-wrap');
var nav = document.querySelector('.nav');

renderBook("JS");
btn.onclick = renderBook;
text.onkeydown = renderBook;
function renderBook(val) {
    text.focus();
    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
        if (val.keyCode) {
            if (val.keyCode != 13) return;
        }
        val = '';
    }

    //  if(val.target.keyCode!==13) return;
    var value = text.value.trim() || val;
    if (value === '') {
        return;
    }

    var result = fetch({
        type: 'jsonp',
        url: 'https://api.douban.com/v2/book/search',
        data: {
            "q": value,
            "count": 100
        },
        timeout: 3000
    }).init().then(function (data) {
        console.log(data);
        start(data);
    });
    text.value = '';
    loadingWrap.style.display = 'flex';
};

//生成html结构
function start(data) {
    var books = data.books;
    var limitLen = 10;
    var len = books.length;
    var pageNum = 1;
    var str = '',
        prev = 1;

    for (var i = 0; i < Math.ceil(len / limitLen); i++) {
        str += '<li class="pages-num ' + (i === 0 ? 'active' : '') + '">' + (i + 1) + '</li>';
    }
    navLists.innerHTML = str;

    createHtml(books, len, limitLen);

    nav.addEventListener('click', turnPage);
    //加载页消失，显示加载内容
    loadingWrap.style.display = '';
    bookLists.parentNode.style.display = nav.parentNode.style.display = 'block';

    function turnPage(e) {
        var target = e.target;
        if (!target.classList.contains('nav')) {
            navLists.children[pageNum - 1].classList.remove('active');
            if (target.dataset.id === 'prev') {
                pageNum = pageNum <= 1 ? 1 : --pageNum;
                navLists.children[pageNum - 1].classList.add('active');
            } else if (target.dataset.id === 'next') {
                pageNum = pageNum >= Math.ceil(len / limitLen) ? Math.ceil(len / limitLen) : ++pageNum;
                navLists.children[pageNum - 1].classList.add('active');
            } else {
                pageNum = target.innerHTML;
                target.classList.add('active');
            }
            createHtml(books, len, limitLen, pageNum);
        }
    }
};

function createHtml(books, len, limitLen) {
    var pageNum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    //搜索结果1-15   共513
    var sourceDetail = document.querySelector('.source-detail');
    var str = '',
        realLen = void 0;
    if (limitLen * pageNum <= len) {
        realLen = limitLen * pageNum;
    } else {
        realLen = len;
    }
    sourceDetail.innerHTML = '\u641C\u7D22\u7ED3\u679C' + ((pageNum - 1) * limitLen + 1) + '-' + realLen + '   \u5171' + len;

    for (var i = (pageNum - 1) * limitLen; i < realLen; i++) {
        str += '<li class="book">\n                                    <img src="' + books[i].image + '" class="img">\n                                    <div class="book-detail">\n                                        <h3 class="title">' + books[i].title + '</h3>\n                                        <div class="book-info">\n                                        <span class="author">';
        if (books[i].author && books[i].author.length != 0) {
            for (var j = 0; j < books[i].author.length; j++) {
                str += books[i].author[j] + ' ';
            };
        }

        if (books[i].translator && books[i].translator.length != 0) {
            str += '/</span><span class="translator">';
            for (var k = 0; k < books[i].translator.length; k++) {
                str += books[i].translator[k] + ' ';
            };
        }
        str += '</span><span class="publisher"></span>\n                                <span class="pubdate">' + (books[i].pubdate.length != 0 ? '/' + books[i].pubdate : '') + '</span>\n                                <span class="price">' + (books[i].price.length != 0 ? '/' + books[i].price : '') + '</span>\n                            </div>\n                            <p class="summary">' + (books[i].summary === '' ? '(未找到相关介绍)' : books[i].summary) + '</p>\n                        </div>\n                    </li>';
    }
    bookLists.innerHTML = str;
};