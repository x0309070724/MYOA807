Ext.define('APP.view.sd.mgr.call.no.package',{
    extend:'Ext.grid.Panel',
    controller:'sd.call',
	store:{
		type:'call.package',
		autoLoad:true,
		proxy:{
			extraParams:{month:Ext.Date.format(new Date(),'Y-m')}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',
			items:[
				{xtype:'searchbar',
					fields:[
						{emptyText:'月份',xtype:'monthfield',name:'month',value:Ext.Date.format(new Date(),'Y-m'),allowBlank:false},
						{emptyText:'团队...',xtype:'comboCompanyTeam',name:'teamid'},
						{emptyText:'员工...',xtype:'comboCompanyStaff',name:'staffid'},
						{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
					]
				},
				'->',
				{xtype:'refreshbutton'}						
			]
		}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'号码',dataIndex:'no',minWidth:80,flex:1,summaryType:'count'},
		{text:'使用人',defaults:{sortable:true,width:100},columns:[
			{text:'姓名',xtype:'templatecolumn',tpl:'{namecn} <r>{gender} {name}</r>',width:130},
			{text:'团队',dataIndex:'team_name',width:100}
		]},
		{text:'语音包 本月',defaults:{sortable:true,width:85,align:'right',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'总量',dataIndex:'voice_addupupper'},
			{text:'已用',dataIndex:'voice_used',tdCls:'x-ui-text-green'},
			{text:'剩余',dataIndex:'voice_canuse',tdCls:'x-ui-text-red'},
			{text:'超出',dataIndex:'voice_exceed',tdCls:'x-ui-text-red'}
		]},
		{text:'短信包 本月',defaults:{sortable:true,width:85,align:'right',renderer:'returnT',summaryType:'sum',summaryRenderer:'returnT'},columns:[
			{text:'总量',dataIndex:'sms_addupupper'},
			{text:'已用',dataIndex:'sms_used',tdCls:'x-ui-text-green'},
			{text:'剩余',dataIndex:'sms_canuse',tdCls:'x-ui-text-red'},
			{text:'超出',dataIndex:'sms_exceed',tdCls:'x-ui-text-red'}
		]},
		{text:'流量包',defaults:{sortable:true,width:85,align:'right',renderer:'returnM',summaryType:'sum',summaryRenderer:'returnM'},columns:[
			{text:'总量',dataIndex:'flow_addupupper'},
			{text:'已用',dataIndex:'flow_used',tdCls:'x-ui-text-green'},
			{text:'剩余',dataIndex:'flow_canuse',tdCls:'x-ui-text-red'},
			{text:'超出',dataIndex:'flow_exceed',tdCls:'x-ui-text-red'}
		]},
		{text:'实时余额',defaults:{sortable:true,width:100,align:'right',renderer:'returnCnyMoney',summaryType:'sum',summaryRenderer:'returnCnyMoney'},columns:[
			{text:'账户余额',dataIndex:'balance',tdCls:'x-ui-text-green'},
			{text:'信用额度',dataIndex:'credit',tdCls:'x-ui-text-blue'},
			{text:'可用额度',dataIndex:'margin_free',tdCls:'x-ui-text-red'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});








