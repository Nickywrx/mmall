var conf = {
	serverHost : ''
};
var _mm = {
	// 封装ajax请求函数
	request:function(param){
		var _this = this;
		$.ajax({
			type 	 : param.method || 'get',
			url  	 : param.url	|| '',
			dataType : param.type 	|| 'json',
			data 	 : param.data   || '',
			success  : function(res){
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 没有登陆状态 ，需要强制登陆
				else if(10 === res.status){
					_this.doLogin();
				}
				else if(1 === res.stauts){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error 	 :function(err){
					typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	// 统一登陆处理
	doLogin : function(){
		window.location.href = './login/html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam : function(name){
		var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}
};

module.exports = _mm;