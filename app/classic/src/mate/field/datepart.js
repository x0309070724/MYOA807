Ext.define('APP.mate.field.datepart',{
	extend:'Ext.form.FieldContainer',
	alias:'widget.datepartfield',
	margin:0,
	allowBlank:true,
	name:'datepart',
	value:'day',
	startName:'startdate',
	endName:'enddate',
	values:{
		startDate:'',
		endDate:''
	},
	findStore:function(){
		var me=this,
			grid=this.up('toolbar').up('panel');
		if(!grid.isXType('grid')){
			grid=grid.down('grid');
		}
		return grid?grid.getStore():false;
	},
	onChange:function(segmented,value){
		var me=segmented.up('fieldcontainer'),
			store=me.findStore(),
			params=store.proxy.extraParams,
			dateBox=segmented.next('container');
			
		dateBox.removeAll();
		switch(value){
			case 'year':{
				field.setValue(startField?new Date(params.endDate).getFullYear():new Date(params.endDate).getFullYear()-5);
				startField=true
			}break;
			case 'month':{
				var startDate=params.menu?params.enddate:Ext.Date.add(new Date(params.enddate),Ext.Date.MONTH,-5);
				dateBox.add([
					{emptyText:'月份从...',xtype:'monthfield',datepart:'month',width:75,name:me.startName,value:startDate},	
					{emptyText:'月份至...',xtype:'monthfield',datepart:'month',width:75,name:me.endName,value:params.enddate}
				])
			}break;
			case 'week':{
				var startDate=params.menu?params.enddate:Ext.Date.add(new Date(params.enddate),Ext.Date.MONTH,-1);
				dateBox.add([
					{emptyText:'月份从...',xtype:'monthfield',datepart:'week',width:75,name:me.startName,value:startDate},	
					{emptyText:'月份至...',xtype:'monthfield',datepart:'week',width:75,name:me.endName,value:params.enddate}
				])
			}break;
			case 'day':{
				dateBox.add([
					{emptyText:'日期从',xtype:'startdatefield',datepart:'day',name:me.startName,width:90,value:params.startdate},
					{emptyText:'日期至',xtype:'enddatefield',datepart:'day',name:me.endName,width:90,value:params.enddate}
//					{emptyText:'日期从',xtype:'startdatefield',datepart:'day',name:me.startName,width:90,value:Ext.Date.getFirstDateOfMonth(new Date(params.enddate))},
//					{emptyText:'日期至',xtype:'enddatefield',datepart:'day',name:me.endName,width:90,value:Ext.Date.getLastDateOfMonth(new Date(params.enddate))}
				])
			}break;
		}	
	},
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			items:[
				{xtype:'segmentedbutton',reference:'datepart',margin:'0 3 0 0',name:me.name,value:me.value,
					items:[
						//{text:'年',value:'year'},
						{text:'月',value:'month'},
						{text:'周',value:'week'},
						{text:'日',value:'day'} 
					],
					listeners:{change:me.onChange}
				},
				{xtype:'container',layout:'hbox',defaults:{hideLabel:false,margin:'0 3 0 0',minWidth:60,allowBlank:me.allowBlank},items:[
//					{emptyText:'日期从',xtype:'startdatefield',datepart:'day',name:me.startName,width:90},
//					{emptyText:'日期至',xtype:'enddatefield',datepart:'day',name:me.endName,width:90}
				]}
			]
		});  
		this.callParent();
		
	}
});
















