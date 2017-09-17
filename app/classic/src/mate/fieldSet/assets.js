Ext.define('APP.mate.fieldSet.assets',{
    extend:'Ext.form.FieldSet',
	alias:'widget.assetsFieldSet',
	title:'资产信息',
	items:[
		{columnWidth:.34,defaults:{xtype:'numberfield',readOnly:true},items:[
			{fieldLabel:'入金',xtype:'fieldcontainer',layout:'hbox',defaults:{xtype:'numberfield',readOnly:true},items:[
				{emptyText:'金额',name:'funds_deposit',decimalPrecision:2,flex:.65},
				{emptyText:'笔数',name:'funds_deposit_count',decimalPrecision:0,flex:.35,margin:'0 0 0 5'}
			]},
			{fieldLabel:'余额',emptyText:'余额',name:'assets_balance'},
			{fieldLabel:'交易盈亏',xtype:'fieldcontainer',layout:'hbox',defaults:{xtype:'numberfield',readOnly:true},items:[
				{emptyText:'金额',name:'trade_profit',decimalPrecision:2,flex:.65},
				{emptyText:'交易量',name:'trade_volume',decimalPrecision:2,flex:.35,margin:'0 0 0 5'}
			]}
		]},
		{columnWidth:.33,defaults:{xtype:'numberfield',readOnly:true},items:[
			{fieldLabel:'出金',xtype:'fieldcontainer',layout:'hbox',defaults:{xtype:'numberfield',readOnly:true},items:[
				{emptyText:'金额',name:'funds_withdrawal',decimalPrecision:2,flex:.65},
				{emptyText:'笔数',name:'funds_withdrawal_count',decimalPrecision:0,flex:.4,margin:'0 0 0 5'}
			]},
			{fieldLabel:'信用',emptyText:'信用',name:'assets_credit',decimalPrecision:2},
			{fieldLabel:'已用',emptyText:'已用',name:'assets_margin',decimalPrecision:2}
		]},
		{columnWidth:.33,defaults:{xtype:'numberfield',readOnly:true},items:[
			{fieldLabel:'净入金',emptyText:'净入金',name:'funds_net_deposit',decimalPrecision:2},
			{fieldLabel:'净值',emptyText:'净值',name:'assets_equity',decimalPrecision:2},
			{fieldLabel:'可用',xtype:'fieldcontainer',layout:'hbox',defaults:{xtype:'numberfield',readOnly:true},items:[
				{emptyText:'金额',name:'assets_margin_free',decimalPrecision:2,flex:.65},
				{emptyText:'比例',name:'assets_margin_level',xtype:'textfield',flex:.35,margin:'0 0 0 5'}
			]}
		]}
	]
});
