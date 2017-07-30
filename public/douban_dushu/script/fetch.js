/**
 * 用来请求后端数据的js脚本文件
 * 作者：
 * 日期：
 * 版本：1.0
 */

  
function fetch(opt){
    return new CreateJsonp(opt);
}

class CreateJsonp {
  constructor(opt){
    if(!opt.url){
      throw new Error('The argument\'s object must be include url.');
    }
    
    this.data = {};
    this.timeout = 10000;
    this.cb = 'callback';
    
    Object.assign(this, opt);
  }
  init(){
    let {url, cb, timeout, data} = this;
    
    return Promise.resolve({
      then(resolve, reject){
        const script = document.createElement('script');
        
        let callbackname = 'cb' + Date.now();
        
        data[cb] = callbackname;
        
        window[callbackname] = function (resule){
          resolve(resule);
          clearTimeout(script.timer);
          window[callbackname] = null;
          document.body.removeChild(script);
        };
        url += '?' + formatData(data);
        
        // 发送请求
        script.setAttribute('src', url);
        document.body.appendChild(script);

        script.timer = setTimeout(function() {
          delete window[callbackname];
          document.body.removeChild(script);
          reject(new Error(`The request is error!`));
        }, timeout);
        
      }
    });
  }
}

function formatData(data){
  let query = [];
  for(let key in data){
    query.push(key + '=' + data[key]);
  }
  return query.join('&');
}

















































