Ext.define('APP.view.sd.mgr.call.no.record',{
    extend:'Ext.grid.Panel',
    controller:'sd.call',
	store:{
		autoLoad:true,
		type:'call.record'
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'cmd',
						defaults:{minWidth:60},
						items:[
							{text:'主叫',value:1},
							{text:'被叫',value:2},
							{text:'全部',value:'',pressed:true} 
						]
					}},
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'团队...',xtype:'comboCompanyTeam',name:'teamid'},
					{emptyText:'员工...',xtype:'comboCompanyStaff',name:'staffid'},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}						
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'号码',dataIndex:'no',minWidth:80,flex:1,summaryType:'count'},
		{text:'使用人',defaults:{sortable:true,width:100},columns:[
			{text:'姓名',xtype:'templatecolumn',tpl:'{namecn} <r>{gender} {name}</r>',width:160},
			{text:'团队',dataIndex:'team_name',width:120}
		]},
		{text:'通话属性',defaults:{sortable:true,width:100},columns:[
			{text:'通话时间',xtype:'datecolumn',dataIndex:'time',format:'Y-m-d H:00 A',width:100},
			{text:'时间',xtype:'datecolumn',dataIndex:'time',format:'H:i A',width:80},
			{text:'通话时长',dataIndex:'duration',width:80,tdCls:'x-ui-text-green',align:'right',renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
			{text:'性质',dataIndex:'cmd',width:100,renderer:'returnCallRecordCmd'},
			{text:'本机通话地',dataIndex:'talkhome',width:160},
			{text:'通话类型',dataIndex:'land',width:100},
			{text:'呼叫类型',xtype:'templatecolumn',tpl:'{thtype}<r>{roma}</r>',width:160}
		]},
		{text:'对方',defaults:{sortable:true,width:100},columns:[
			{text:'资源库',dataIndex:'effective',align:'center',width:80,renderer:'returnYes'},
			{text:'姓名',dataIndex:'othername',width:100},
			{text:'号码',dataIndex:'othernum',width:120},
			{text:'归属地',dataIndex:'otherhome',width:160}
		]}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
});

















