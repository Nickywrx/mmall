/*
* @Author: Nicky_wu
* @Date:   2017-09-15 11:13:25
* @Last Modified by:   Nicky_wu
* @Last Modified time: 2017-09-15 13:47:40
*/
require('./index.css');
var _mm = require('util/mm.js');
// 公共页面头部
var header = {
	init : function(){
		this.bindEvent();
		this.onLoad();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		// 如果keyword存在，则回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		// 点击搜索按钮，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 按下回车键，做搜索提交
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	// 搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword，正常跳到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
			// 如果keyword为空，直接返回首页
		}else{
			_mm.goHome();
		}
	}
};

header.init();