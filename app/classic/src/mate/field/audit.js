Ext.define('APP.view.sd.sales.field.audit',{
    extend:'APP.mate.field.segmented',
	alias:'widget.fieldaudit',
	segmented:{
		defaults:{minWidth:30},
		name:'audit',
		value:'',
		items:[
			{tooltip:'待处理',iconCls:'f-mt mt-pause',value:0},
			{tooltip:'已通过',iconCls:'f-mt mt-yes',value:1},
			{tooltip:'未通过',iconCls:'f-mt mt-no',value:-1},
			{tooltip:'全部',iconCls:'f-mt mt-icon',value:''} 
		]
	}
});
















