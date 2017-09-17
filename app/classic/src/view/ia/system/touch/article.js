Ext.define('APP.view.ia.system.touch.article',{
    extend:'Ext.grid.Panel',
    controller:'system.touch',
	dockedItems:[
		{dock:'top',xtype:'toolbar',
			items:[
				'->',
				{text:'新增',iconCls:'f-mt mt-creat',handler:'onArticleCreatClick'},
				'-',
				{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onArticleRemoveClick'},
				{xtype:'refreshbutton'}
			]
		}
	],
	store:{			
		type:'cross',
		autoLoad:true,
		remoteSort:false,
		model:'APP.model.sys.touch.article',
		proxy:{
			url:Boot.appUrl('/system/touch/getArticle.do')
		}
	},
	columns:[
		{xtype:'rownumberer',maxWidth:30},
		{text:'资料名称',dataIndex:'title',renderer:'returnMore',minWidth:300,flex:1},
		//{text:'关键字',dataIndex:'keyword',renderer:'returnMore',width:120},
		{text:'描述',dataIndex:'description',renderer:'returnMore',width:300,flex:2},
//		{text:'置顶',dataIndex:'is_top',width:60,align:'center',renderer:'returnYes'},					
//		{text:'推荐',dataIndex:'is_best',width:60,align:'center',renderer:'returnYes'},		
//		{text:'锁定',dataIndex:'is_lock',width:60,align:'center',renderer:'returnYes'},
		{xtype:'actioncolumn',text:'编辑',align:'center',width:50,
			items:[
				{tooltip:'编辑',iconCls:'f-mt mt-edit',handler:'onArticleUpdateClick'}
			]
		}
	],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
});

















