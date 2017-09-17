Ext.define('APP.view.sd.sales.field.track',{
    extend:'APP.mate.field.segmented',
	xtype:'fieldSalesTrack',
    constructor:function(config){
        config=config||{};
		var segmented={
			defaults:{minWidth:30},
			name:'track',
			value:'',
			items:[
	//			{tooltip:'未跟进',iconCls:'f-mt mt-eye-on x-ui-text-blue',value:0,sorters:{property:'staffdate',direction:'ASC'}},
	//			{tooltip:'无效',iconCls:'f-mt mt-attention x-ui-text-grey',value:-100,sorters:{property:'track_time',direction:'ASC'}},
	//			{tooltip:'无意向',iconCls:'f-mt mt-amazing x-ui-text-red',value:-1,sorters:{property:'track_time',direction:'ASC'}},
	//			{tooltip:'待跟进',iconCls:'f-mt mt-concern x-ui-text-green',value:1,sorters:[{property:'reserve_date',direction:'ASC'},{property:'reserve_time',direction:'ASC'}]},
	//			{tooltip:'全部',iconCls:'f-mt mt-icon',value:'',sorters:{property:'track_time',direction:'ASC'}} 
				{tooltip:'未跟进',iconCls:'f-mt mt-eye-on x-ui-text-blue',value:0},
				{tooltip:'无效',iconCls:'f-mt mt-attention x-ui-text-grey',value:-100},
				{tooltip:'无意向',iconCls:'f-mt mt-amazing x-ui-text-red',value:-1},
				{tooltip:'待跟进',iconCls:'f-mt mt-concern x-ui-text-green',value:1},
				{tooltip:'全部',iconCls:'f-mt mt-icon',value:''} 
			]
		}
		
		Ext.apply(segmented,config.segmented);
		config.segmented=segmented;
        this.callParent([config]);
	}
});
















