/*
* @Author: Nicky_wu
* @Date:   2017-09-29 16:59:59
* @Last Modified by:   Nicky_wu
* @Last Modified time: 2017-09-29 17:03:24
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _cart        	= require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	
        this.loadCart();
    },
    bindEvent : function(){
       var _this = this;
      
    },
    // 加载购物车信息
    loadCart : function(){
       
    }
   
};
$(function(){
    page.init();
})