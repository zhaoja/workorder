import Vue from 'vue';
   
let http={}
// nginx 作为代理服务器，解决跨域问题
// let _baseURL="vpaas"


// 用 CorsFilter 解决前台跨域
let _baseURL = 'http://192.168.0.130';
let ContentType = "application/json";
// http.baseURL = _baseURL;


http.request = function(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = _baseURL + (opt.url || '');
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    // 创建ajax 对象
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 将传入的参数转换成一个数组对象
//    var params = [];
//    for (var key in opt.data){
//        params.push(key + '=' + opt.data[key]);
//    }

//    var postData = params.join('&');
	var postData = opt.data
	console.log(postData)
//    var postData = params.join('&');
    //post 方法
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xmlHttp.withCredentials = true; //支持跨域发送cookies
        xmlHttp.send(postData);
    }
    // get 方法
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    } 
    // 读取请求相应的状态
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //请求成功时，执行这个函数
            opt.success(xmlHttp.responseText);
        }
    };
}
// 态在AJAX中共有5种，分别是。
// 0 - (未初始化)还没有调用send()方法
// 1 - (载入)已调用send()方法，正在发送请求
// 2 - (载入完成)send()方法执行完成，
// 3 - (交互)正在解析响应内容
// 4 - (完成)响应内容解析完成，可以在客户端调用了


//export与export default均可用于导出常量、函数、文件、模块等，
//你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，
//以便能够对其进行使用，但在一个文件或模块中，export、import可以有多个，export default仅有一个。 
export default http;
 