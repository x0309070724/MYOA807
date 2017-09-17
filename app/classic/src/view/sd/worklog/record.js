Ext.define('APP.view.sd.worklog.record',{
    extend:'Ext.grid.Panel',
	alias:'widget.sd.worklog.record',
	store:{	
		type:'cross',
		model:'APP.model.hr.staff.account',
		autoLoad:true,
		sorters:[{property:'time',direction:'desc'},{property:'id',direction:'ASC'}],
		proxy:{
			url:Boot.appUrl('/system/worklog/getWorkLog.do')
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',
			items:[
				{xtype:'searchbar',
					fields:[
						{xtype:'segmentedfield',segmented:{
							name:'isReply',
							items:[
								{tooltip:'已批复',iconCls:'f-mt mt-yes',value:0},
								{tooltip:'未批复',iconCls:'f-mt mt-no',value:1},
								{tooltip:'全部',iconCls:'f-mt mt-icon',value:'',pressed:true} 
							]
						}},
						{emptyText:'月份',xtype:'monthfield',name:'date',width:80},
						//{emptyText:'员工',xtype:'comboCompanyStaff',name:'staffid',width:160}
						{emptyText:'关键字...',xtype:'textfield',name:'query',width:100}
					]
				},
				'->',
				//{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'deleteWorklog',bind:{hidden:'{hiddenDelete}'}},
				{xtype:'refreshbutton'}
			]
		},
		{dock:'bottom',xtype:'pagingbar'}
	],
	viewConfig:{
		enableTextSelection:false
	},
	columns:[
		{xtype:'rownumberer',width:34},
		{text:'姓名',xtype:'templatecolumn',dataIndex:'namecn',minWidth:150,flex:1,tpl:'{namecn} <s>{name}</s> <r>{team_name}</r>'},
		{text:'日志信息',columns:[
			{text:'日期',dataIndex:'date',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'已完成',dataIndex:'completed',align:'right',width:100},
		]},
		{text:'批复人资料',columns:[
			{text:'批复人',xtype:'templatecolumn',dataIndex:'reply_namecn',width:100,tpl:'{reply_namecn} <s>{reply_name}</s>'},			
			{text:'时间',dataIndex:'reply_time',xtype:'datecolumn',format:'m-d H:i AM',width:100}
		]}
	],
	listeners:{
		selectionchange:'onRecordPreview'
	}
});















