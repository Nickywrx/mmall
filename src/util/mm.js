var conf = {
	serverHost : ''
};
var Hogan = require('hogan');
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
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
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
	},
	renderHtml: function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result   = template.render(data);
			return result;
	},
	// 成功提示
	successTips : function(msg){
		alert(msg || '操作成功');
	},
	// 错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了~');
	},
	// 字段的验证，支持非空、手机、邮箱验证
	validate : function(value, type){
		var value =$.trim(value);
		// 非空验证
		if('require' === type){
			return !!value;
		};
		// 手机验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		};
		// 邮箱验证
		if('email' === type){
			return /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(value);
		};
	},
	// 回到首页
	goHome : function(){
		window.location.href = './index.html';
	}
};

module.exports = _mm;