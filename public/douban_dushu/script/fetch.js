'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 用来请求后端数据的js脚本文件
 * 作者：
 * 日期：
 * 版本：1.0
 */

function fetch(opt) {
  return new CreateJsonp(opt);
}

var CreateJsonp = function () {
  function CreateJsonp(opt) {
    _classCallCheck(this, CreateJsonp);

    if (!opt.url) {
      throw new Error('The argument\'s object must be include url.');
    }

    this.data = {};
    this.timeout = 10000;
    this.cb = 'callback';

    Object.assign(this, opt);
  }

  _createClass(CreateJsonp, [{
    key: 'init',
    value: function init() {
      var url = this.url,
          cb = this.cb,
          timeout = this.timeout,
          data = this.data;


      return Promise.resolve({
        then: function then(resolve, reject) {
          var script = document.createElement('script');

          var callbackname = 'cb' + Date.now();

          data[cb] = callbackname;

          window[callbackname] = function (resule) {
            resolve(resule);
            clearTimeout(script.timer);
            window[callbackname] = null;
            document.body.removeChild(script);
          };
          url += '?' + formatData(data);

          // 发送请求
          script.setAttribute('src', url);
          document.body.appendChild(script);

          script.timer = setTimeout(function () {
            delete window[callbackname];
            document.body.removeChild(script);
            reject(new Error('The request is error!'));
          }, timeout);
        }
      });
    }
  }]);

  return CreateJsonp;
}();

function formatData(data) {
  var query = [];
  for (var key in data) {
    query.push(key + '=' + data[key]);
  }
  return query.join('&');
}