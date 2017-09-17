Ext.define('APP.view.sd.sales.field.status',{
    extend:'APP.mate.field.segmented',
	alias:'widget.fieldSalesStatus',
    constructor:function(config){
        config=config||{};
		var segmented={
			defaults:{minWidth:30},
			name:'status',
			value:1,
			items:[
				{tooltip:'已开户',iconCls:'f-mt mt-access x-ui-text-green',value:-100},
				{tooltip:'黑名单',iconCls:'f-mt mt-filter x-ui-text-grey',value:-99},
				{tooltip:'待分配',iconCls:'f-mt mt-release x-ui-text-red',value:0},
				{tooltip:'开发中',iconCls:'f-mt mt-demand-service x-ui-text-blue',value:1,pressed:true},
				{tooltip:'全部',iconCls:'f-mt mt-icon',value:''} 
			]
		}
		Ext.apply(segmented,config.segmented);
		config.segmented=segmented;
        this.callParent([config]);
	}
});
















