require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm               = require('util/mm.js');
var _payment          = require('service/payment-service.js');
var templateIndex     = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 加载detail数据
        this.loadPaymentInfo();
    },
    loadPaymentInfo : function(){
        var _this           = this,
            paymentHtml     = '',
            $pageWrap       = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
           // 渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
        }, function(errMsg){
            $pageWrap.html('<div class="err-tip">'+ errMsg +'</div>');
        });   
    }
};
$(function(){
    page.init();
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm               = require('util/mm.js');
var _payment          = require('service/payment-service.js');
var templateIndex     = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 加载detail数据
        this.loadPaymentInfo();
    },
    loadPaymentInfo : function(){
        var _this           = this,
            paymentHtml     = '',
            $pageWrap       = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
           // 渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
        }, function(errMsg){
            $pageWrap.html('<div class="err-tip">'+ errMsg +'</div>');
        });   
    }
};
$(function(){
    page.init();
});