Ext.define('APP.view.sd.mgr.call.no.fake',{
    extend:'Ext.grid.Panel',
    controller:'sd.call',
	store:{
		type:'call.record.fake',
		autoLoad:true,
		proxy:{
			extraParams:{month:Ext.Date.format(new Date(),'Y-m')}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
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
		]}
		//{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'号码',dataIndex:'no',minWidth:80,flex:1,summaryType:'count'},
		{text:'使用人',defaults:{sortable:true,width:100},columns:[
			{text:'姓名',xtype:'templatecolumn',tpl:'{namecn} <r>{gender} {name}</r>',width:160},
			{text:'团队',dataIndex:'team_name',width:120}
		]},
		{text:'通话属性',defaults:{sortable:true,width:100},columns:[
			{text:'日期',xtype:'datecolumn',dataIndex:'time',format:'Y-m-d',width:100},
			{text:'通话次数',dataIndex:'count',width:80,align:'right',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
			{text:'首次通话',xtype:'datecolumn',dataIndex:'firsttime',format:'Y-m-d',width:100},
			{text:'最后通话',xtype:'datecolumn',dataIndex:'lasttime',format:'Y-m-d',width:100},
			{text:'累计时长',dataIndex:'duration',width:88,tdCls:'x-ui-text-green',align:'right',renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
			{text:'最短通话时长',dataIndex:'duration_min',width:100,align:'right',renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
			{text:'最长通话时长',dataIndex:'duration_max',width:100,align:'right',renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
			//{text:'本机通话地',dataIndex:'talkhome',width:160},
			{text:'通话类型',dataIndex:'land',width:80},
			{text:'呼叫类型',xtype:'templatecolumn',tpl:'{thtype}<r>{roma}</r>',width:140},
			{text:'原因',width:120,renderer:'returnFakeReason'}
		]},
		{text:'对方',defaults:{sortable:true,width:100},columns:[
			//{text:'资源库',dataIndex:'effective',align:'center',width:80,renderer:'returnYes'},
			{text:'姓名',dataIndex:'othername',width:100},
			{text:'号码',dataIndex:'othernum',width:120},
			{text:'归属地',dataIndex:'otherhome',width:160}
		]}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
});

















