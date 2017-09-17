Ext.define('APP.view.hr.staff.activity.vote',{
    extend:'Ext.Panel',
    controller:'hr.staff.activity',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{split:false,border:true},
	items:[
		{xtype:'grid',region:'center',title:'活动主题',flex:.3,
			reference:'gridBase',
			id:'theme_id',
			store:{
				type:'cross',
				autoLoad:true,
				fields:[
					{name:'id',type:'int'},
					{name:'name',type:'string'},
					{name:'explain',type:'string'},
					{name:'creattime',type:'date'}
				],
				pageSize:false,
				sorters:[{property:'id',direction:'desc'}],
				proxy:{
					url:Boot.appUrl('/vote/getTheme.do'),
					extraParams:{cmd:'staff',invalid:0}
				}	
			},
			multiSelect:false,
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{iconCls:'f-mt mt-creat',text:'新增',handler:'onVoteTitleCreatClick'},
					// {iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:''},
					// '-',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'ID',dataIndex:'id',width:80,hidden:true},
				{text:'日期',dataIndex:'creattime',width:100,xtype:'datecolumn',format:'Y-m-d',summaryType:'count'},
				{text:'主题',dataIndex:'name',width:140},
				{text:'描述',flex:1,dataIndex:'explain',minWidth:100,renderer:'returnMore'},
				{xtype:'actioncolumn',text:'操作',align:'center',width:60,
					items:[
						{tooltip:'进入投票页面',iconCls:'f-mt mt-action-link',handler:'onVotingPageClick',role:'other'}
					]
				}
			],
			features:[{ftype:'grouping'},{ftype:'summary',dock:'bottom'}],
			listeners:{
				selectionchange:'onChangeVoteLoadClick'
			}
	   	},
		{xtype:'grid',region:'east',title:'活动详情',flex:.7,collapsible:true,margin:'0 0 0 3',
			reference:'gridChange',
			// bind:{title:'记录：{gridBase.selection.namecn} #{gridBase.selection.login}'},
			store:{
				type:'cross',
				fields:[
					{name:'id',type:'int'},	
					{name:'status',type:'int'},	
					{name:'control',type:'int'},
					{name:'scope',type:'int'},
					{name:'name',type:'string'},
					{name:'createtime',type:'date'},
					{name:'endtime',type:'date'},
					{name:'starttime',type:'date'},
					{name:'explain',type:'string'},
					{name:'qrcode',type:'string'},
					{name:'member_num',type:'int'}
				],
				sorters:[{property:'id',direction:'DESC'}],
				// groupField:'createtime',
				proxy:{
					url:Boot.appUrl('/vote/getVoteSection.do')
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{iconCls:'f-mt mt-creat',text:'新增',handler:'onVoteActiveCreatClick'},
					// {iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onVoteActiveRemoveClick'},
					// '-',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'名称',dataIndex:'name',minWidth:120},
				//{text:'创建时间',dataIndex:'createtime',width:180,xtype:'datecolumn',format:'Y-m-d H:i A'},
				{text:'描述',dataIndex:'remark',minWidth:120,flex:1},
				{text:'竞选人数',dataIndex:'member_num',align:'center',width:80},
				{text:'投票控制',defaults:{width:120,align:'left'},columns:[
					{text:'投票范围',dataIndex:'scope',align:'center',renderer:'returnVoteCase'},
					{text:'多选控制',dataIndex:'control',align:'center',renderer:'returnMultipleChoice'}
				]},
				{text:'启动',dataIndex:'status',minWidth:80,align:'center',renderer:'returnVoteStatus'},
				{text:'开始时间',dataIndex:'starttime',width:200,xtype:'datecolumn',format:'Y-m-d H:i A',hidden:true},
				{text:'结束时间',dataIndex:'endtime',width:200,xtype:'datecolumn',format:'Y-m-d H:i A',hidden:true},
				// {xtype:'actioncolumn',text:'启动/停止',align:'center',width:100,
				// 	items:[
				// 		{tooltip:'启动/停止',iconCls:'f-mt mt-close',handler:'onStartVotingClick',role:'other'}
				// 	]
				// },
				{xtype:'actioncolumn',text:'操作',align:'center',width:60,/*tdCls:'x-ui-actioncolumn',postRole:true,*/
					items:[
						//{tooltip:'启动',iconCls:'f-mt mt-close',handler:'onStartVotingClick',role:'update'},
						//{tooltip:'进入投票页面',iconCls:'f-mt mt-action-link',handler:'onVotingPageClick',role:'other'},
						{tooltip:'修改',iconCls:'f-mt mt-action-update',handler:'onVoteActiveUpdateClick',role:'update'}
					]
				}
			],
			features:[{ftype:'summary',dock:'bottom'}]
		}		
	]
});
