Ext.define('APP.view.combo.trade.symbol',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboTradeSymbol',
	store:{
		fields:[{name:'symbol',type:'string'}]
	},
//	selectOnFocus:false,
//	filterPickList:true,
	emptyText:'交易品种...',
	width:120,
	name:'symbol',
	valueField:'symbol',
	displayField:'symbol',
	forceSelection:false,
	initComponent:function(){
		this.callParent();
		if(window.PushService){
			var combo=this,
				store=combo.getStore();
			PushService.ready(function(){
				var records=PushService.getBuffer().getSymbols();
				Ext.Array.each(records,function(record){
					store.add({symbol:record.symbol});
				});
			});
		}
	}
});
