Ext.define('APP.view.rd.shouting.qun.group',{
    extend:'Ext.grid.Panel',
    controller:'rd.shouting.qun',
	store:{
		type:'rdShoutingQunGroup',
		autoLoad:true,
		pageSize:false
	},
	viewConfig:{
		stripeRows:true,
		enableTextSelection:true
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'invalid',reference:'invalid',
						items:[
							{tooltip:'已解散',iconCls:'f-mt mt-no',value:1},
							{tooltip:'正常',iconCls:'f-mt mt-yes',value:0,pressed:true}
						]
					}},
					{xtype:'segmentedfield',segmented:{
						name:'type',defaults:{minWidth:80},
						items:[
							{text:'博弈论',value:1},
							{text:'喊单群',value:2},
							//{text:'其它',value:0},
							{text:'全部',value:'',pressed:true} 
						]
					}},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'群名称',dataIndex:'gn',width:160,renderer:'returnQunName',summaryType:'count'},
		{text:'群信息',columns:[
			{text:'群号',dataIndex:'gc',width:100},
			{text:'创建人',dataIndex:'owner',width:120,renderer:'returnQqUin'},
			{text:'管理员',dataIndex:'adm_num',xtype:'templatecolumn',width:80,tpl:'<b class="x-ui-green">{adm_num}</b> / <b class="x-ui-red">{adm_max}</b>',summaryType:'sum',summaryRenderer:'returnInt'},
			{text:'成员',dataIndex:'count',width:120,renderer:'returnGroupCount',summaryType:'sum',summaryRenderer:'returnInt'},
			//{text:'成员',dataIndex:'member_count',align:'right',width:60,renderer:'returnInt',summaryType:'count',summaryRenderer:'returnInt'},
			{text:'群等级',width:80,align:'center',renderer:'returnGroupLevel'},
			//{text:'EC',dataIndex:'ec',width:100,hidden:true},
			//{text:'VECSIZE',dataIndex:'vecsize',width:100,hidden:true},
			{text:'解散日期',xtype:'datecolumn',dataIndex:'enddate',width:80,format:'Y-m-d',hidden:true,bind:{hidden:'{!invalid.value}'}}
		]},
		{text:'发言率',defaults:{align:'right',width:80,renderer:'returnSpeakRate'},columns:[
			{text:'近一月',dataIndex:'speak_month_count'},
			{text:'近三月',dataIndex:'speak_month3_count'},
			{text:'全部',dataIndex:'speak_count'}
		]},
		{text:'附加信息',columns:[
			{text:'销售团队',dataIndex:'sd_team_name',width:100},
			{text:'交易助理',xtype:'templatecolumn',dataIndex:'rd_teamid',width:140,tpl:'{rd_user_namecn} <s>{rd_user_name}</s><r>{rd_team_name}</r>'},
			{text:'最后更新',xtype:'datecolumn',dataIndex:'svr_time',width:120,format:'m-d H:i A'}
		]},
		{text:'注释',dataIndex:'explain',minWidth:200,flex:1},
		{text:'更新',xtype:'actioncolumn',align:'center',width:60,iconCls:'f-mt mt-edit',handler:'onGroupUpdateClick'}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});

