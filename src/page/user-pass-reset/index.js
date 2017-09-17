
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
	data : {
		username : '',
		question : '',
		answer   : '',
		token    : ''
	},
    init: function(){
    	this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	this.locadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名下一步的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 用户名存在
            if(username){
            	_user.getQuestion(username, function(res){
            		_this.data.username = username;
            		_this.data.question	= res;
            		_this.locadStepQuestion();
            	}, function(errMsg){
            		formError.show(errMsg);
            	})
            	 // 用户名不存在
            }else{
            	formError.show('请输入用户名');
            }
        });
         // 输入密码问题提示答案的点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 如果密码提示答案存在
            if(answer){
            	// 检查密码提示问题答案
            	_user.checkAnswer({
            		username : _this.data.username,
            		question : _this.data.question,
            		answer	 : answer
            	}, function(res){
            		_this.data.answer = answer;
            		_this.data.token  = res;
            		_this.locadStepPassword();
            	}, function(errMsg){
            		formError.show(errMsg);
            	})
            	 //如果密码提示答案不存在
            }else{
            	formError.show('请输入密码提示问题的答案');
            }
        });
         // 输入新密码的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 如果密码不为空
            if(password && password.length >= 6){
            	// 检查密码提示问题答案
            	_user.resetPassword({
            		username 	: _this.data.username,
            		passwordNew : password,
            		forgetToken : _this.data.token 
            	}, function(res){
            		window.location.href = './result.html?type=pass-reset';
            	}, function(errMsg){
            		formError.show(errMsg);
            	})
            	 //如果密码为空
            }else{
            	formError.show('请输入不少于6位的新密码');
            }
        });
       
    },
    // 加载输入用户名的第一步
    locadStepUsername : function(){
    	$('.step-username').show();
    },
     // 加载输入密码提示问题答案的第二步
    locadStepQuestion : function(){
    	// 清除错误提示
    	// 容器的切换
    	formError.hide();
    	$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
     // 加载输入密码的第三步
    locadStepPassword : function(){
    	// 清除错误提示
    	// 容器的切换
    	formError.hide();
    	$('.step-question').hide().siblings('.step-password').show();
    },
  
};
$(function(){
    page.init();
});