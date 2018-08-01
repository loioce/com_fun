   /* 封装ajax函数
   * @param {object}   [options]
   * @param {string}   [type] http连接的方式，包括POST和GET两种方式
   * @param {string}   [url] 发送请求的url
   * @param {boolean}  [async] 是否为异步请求，true为异步的，false为同步的
   * @param {object}   [data] 发送的参数，格式为对象类型
   * @param {function} [success] ajax发送并接收成功调用的回调函数
   * @param {function} [error] ajax发送成功但接收失败调用的回调函数
   */
     var ajax= function(options){
        let opt = options || {};
        opt.type = (opt.type || 'GET').toUpperCase();
        opt.dataType= opt.dataType || "json";
        opt.async = opt.async || true;
        /**XMLHttpRequest兼容性处理IE/其他浏览器***/
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :
                  window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP')
                  :null;
        if(xhr == null){
            console.error('您的浏览器不支持ajax请求!');
            return false;
        }
        switch(opt.type){
            case "GET": 
                var param = []
                for(var i in opt.data){
                    //encodeURIComponent(i)+ "=" + encodeURIComponent(opt.data[i])特殊字符编码处理
                    param.push(i + "=" + opt.data[i]);
                }
                param = param.join('&');
                xhr.open('GET', opt.url+param, opt.async);
                xhr.send(null);
                break;
            case "POST":
                xhr.open('POST', opt.url, opt.async);
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
                xhr.send(opt.data);
                break;
        }
        //
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 ){
                if(xhr.status >= 200 && xhr.status < 300){
                    opt.success(xhr.responseText);
                }else{
                    console.error('请求失败，失败状态码：' + xhr.status+',错误信息：'+xhr.statusText );
                    opt.error(xhr.responseText);
                }
            }
        }
        
     }