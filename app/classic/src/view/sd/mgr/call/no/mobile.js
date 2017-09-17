Ext.define('APP.view.sd.mgr.call.no.mobile',{
    extend:'Ext.grid.Panel',
    controller:'sd.call',
	store:{
		type:'call.mobile',
		autoLoad:true,
		groupField:'staffdate',
		groupDir:'DESC'
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'invalid',
						items:[
							{tooltip:'使用中',iconCls:'f-mt mt-yes',value:0,pressed:true},
							{tooltip:'已弃用',iconCls:'f-mt mt-no',value:1},
							{tooltip:'全部',iconCls:'f-mt mt-icon',value:''} 
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
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onCallNoCreatClick'},
			//{iconCls:'f-mt mt-delete',text:'删除',disabled:true,selection:true,handler:'onCallNoRemoveClick'},'-',
			{xtype:'refreshbutton'}						
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'号码',dataIndex:'no',minWidth:100,flex:1,summaryType:'count'},
		{text:'号码属性',defaults:{sortable:true,width:100},columns:[
			//{text:'开户日期',xtype:'datecolumn',dataIndex:'opendate',format:'Y-m-d',width:80},
			{text:'分配日期',dataIndex:'staffdate',width:80},
			{text:'密码',dataIndex:'password',width:80,hidden:true},
			{text:'品牌',xtype:'templatecolumn',tpl:'{brand_name} {brand}',width:130,hidden:true},
			{text:'使用人',xtype:'templatecolumn',dataIndex:'namecn',tpl:'{namecn} <s>{name}</s><r>{team_name}</r>',width:200},
			{text:'号码状态',dataIndex:'status',width:120,renderer:'returnNoStatus'},
			//{text:'说明',dataIndex:'sync_message',width:200},
			{text:'同步时间',xtype:'datecolumn',dataIndex:'synctime',format:'m-d H:i A',width:120},
			{text:'结果',dataIndex:'status',align:'center',width:60,renderer:'returnNoSync'}
		]},
		{text:'累计通话 分钟',defaults:{sortable:true,width:100,align:'right',renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},columns:[
			{text:'主叫',dataIndex:'duration_caller',tdCls:'x-ui-text-red'},
			{text:'被叫',dataIndex:'duration_called',tdCls:'x-ui-text-green'},
			{text:'转接',dataIndex:'duration_transfer',hidden:true},
			{text:'全部',dataIndex:'duration'}
		]},
		{text:'语音包 本月',defaults:{sortable:true,width:90,align:'right',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'总量',dataIndex:'voice_addupupper'},
			{text:'已用',dataIndex:'voice_used',tdCls:'x-ui-text-green'},
			{text:'剩余',dataIndex:'voice_canuse',tdCls:'x-ui-text-red'},
			{text:'超出',dataIndex:'voice_exceed',tdCls:'x-ui-text-red',hidden:true}
		]},
		{text:'短信包 本月',hidden:true,defaults:{sortable:true,width:90,align:'right',renderer:'returnT',summaryType:'sum',summaryRenderer:'returnT'},columns:[
			{text:'总量',dataIndex:'sms_addupupper'},
			{text:'已用',dataIndex:'sms_used',tdCls:'x-ui-text-green'},
			{text:'剩余',dataIndex:'sms_canuse',tdCls:'x-ui-text-red'},
			{text:'超出',dataIndex:'sms_exceed',tdCls:'x-ui-text-red'}
		]},
		{text:'流量包',hidden:true,defaults:{sortable:true,width:90,align:'right',renderer:'returnM',summaryType:'sum',summaryRenderer:'returnM'},columns:[
			{text:'总量',dataIndex:'flow_addupupper'},
			{text:'已用',dataIndex:'flow_used',tdCls:'x-ui-text-green'},
			{text:'剩余',dataIndex:'flow_canuse',tdCls:'x-ui-text-red'},
			{text:'超出',dataIndex:'flow_exceed',tdCls:'x-ui-text-red'}
		]},
		{text:'实时余额',defaults:{sortable:true,width:100,align:'right',renderer:'returnCnyMoney',summaryType:'sum',summaryRenderer:'returnCnyMoney'},columns:[
			{text:'账户余额',dataIndex:'balance',tdCls:'x-ui-text-green'},
			{text:'信用额度',dataIndex:'credit',tdCls:'x-ui-text-blue'},
			{text:'可用额度',dataIndex:'margin_free',tdCls:'x-ui-text-red'}
		]},
		{text:'修改',xtype:'actioncolumn',align:'center',width:60,iconCls:'f-mt mt-edit',handler:'onCallNoUpdateClick'}
	],
	features:[{ftype:'groupingsummary',dock:'bottom'},{ftype:'summary',dock:'bottom'}]
});














