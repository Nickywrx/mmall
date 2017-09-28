require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm           = require('util/mm.js');
var _product      = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
	data : {
		listParam : {
			keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 20
		}
	},
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            // 每次点击页码都变成第一页
            _this.data.listParam.pageNum = 1;
            _this.data.listParam.orderBy = 'price_asc';
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')){
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                         .removeClass('active asc desc');
                     _this.data.listParam.orderBy = 'default';    
                }
            }else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item')
                     .removeClass('active asc desc');
                //升序降序处理 
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                     _this.data.listParam.orderBy = 'price_desc';
                }     
            }
            //重新加载列表 
            _this.loadList();
        });
    },
    // 加载list数据
 	loadList : function(){
 		var _this	  = this,
 			listHtml  = '',
 		    listParam = this.data.listParam;
            $pListCon = $('.p-list-con');
            $pListCon.html('<div class="loading"></div>')
            // 不必要的这么多参数
            listParam.categoryId ? delete listParam.keyword : delete listParam.categoryId;
 		_product.getProductList(listParam,function(res){
 			listHtml = _mm.renderHtml(templateIndex, {
 				list : res.list
 			});
 			$pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage :res.hasPreviousPage,
                prePage         :res.prePage,
                hasNextPage     :res.hasNextPage,
                nextPage        :res.nextPage,
                pageNum         :res.pageNum,
                pages           :res.pages
            });
 			_this.loadPagination(res.pageNum, res.pages);
 		}, function(errMsg){
 			_mm.errorTips(errMsg);
 		})
 	},
 	// 加载分页信息
 	loadPagination : function(pageInfo){
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render({

        });
 	}   
};
$(function(){
    page.init();
});