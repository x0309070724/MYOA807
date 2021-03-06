﻿Ext.define('APP.view.sys.mt4.symbol.type',{
    extend:'Ext.Panel',
	xtype:'iaSystemMt4SymbolType',
    controller:'sys.mt4',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{split:false,border:true},
	items:[
		{xtype:'iaSystemMt4SymbolGroup',region:'center',flex:.5},
		{xtype:'grid',region:'east',title:'MT4 交易品种',flex:.5,collapsible:true,margin:'0 0 0 3',
			//reference:'gridChange',
			store:{
				type:'sysMt4Symbol',
				autoLoad:true
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'交易类型',xtype:'templatecolumn',dataIndex:'type',tpl:'{type_name}',width:160},
				{text:'交易品种',dataIndex:'symbol',minWidth:100,flex:1},
				{text:'合约单位',dataIndex:'currency',width:80},
				{text:'合约大小',xtype:'templatecolumn',dataIndex:'contract_size',tpl:'{contract_size:stringInteger}',align:'right',minWidth:100},
				{text:'报价单位',xtype:'templatecolumn',dataIndex:'point',tpl:'{point}<r>{digits} 位小数</r>',minWidth:160},
				{text:'交易模式',dataIndex:'exemode',width:80,renderer:'returnSymbolExemode'},
				{text:'交易许可',dataIndex:'trade',width:80,renderer:'returnSymbolTrade'}
			],
			features:[{ftype:'grouping',dock:'bottom'}]
		}		
	]
});
