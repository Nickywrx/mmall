/*
* @Author: Nicky_wu
* @Date:   2017-09-15 15:57:06
* @Last Modified by:   Nicky_wu
* @Last Modified time: 2017-09-15 16:22:41
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
$(function(){
	var type 	 = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');

		//显示对应的提示元素
		$element.show();

})