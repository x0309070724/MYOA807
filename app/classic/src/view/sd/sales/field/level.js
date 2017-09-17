Ext.define('APP.view.sd.sales.field.level',{
    extend:'APP.mate.field.segmented',
	xtype:'fieldSalesLevel',
    constructor:function(config){
        config=config||{};
		var segmented={
			defaults:{minWidth:30},
			name:'level',
			value:'',
			items:[
				{text:'A',value:'A'},
				{text:'B',value:'B'},
				{text:'C',value:'C'},
				{text:'D',value:'D'},
				{text:'ALL',value:''} 
			]
		}
		Ext.apply(segmented,config.segmented);
		config.segmented=segmented;
        this.callParent([config]);
	}
});
















