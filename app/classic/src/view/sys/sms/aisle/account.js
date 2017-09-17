Ext.define('APP.view.sys.sms.aisle.account',{
    extend:'Ext.grid.Panel',
	xtype:'sysSmsAisleAccount',
    controller:'sys.sms',
	store:{
		type:'sysSmsAisleAccount',
		autoLoad:true
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',
			items:[
				'->',
				{iconCls:'f-mt mt-creat',text:'新增',handler:'onSmsAccountCreatClick'},'-',
				{iconCls:'f-mt mt-action-remove',text:'删除',disabled:true,selection:true,handler:'onSmsAccountRemoveClick'},'-',
				{xtype:'refreshbutton'}
			]
		},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'名称',dataIndex:'name',width:280},
		{text:'请求地址',dataIndex:'url',minWidth:220,flex:1},
		{text:'内容最大长度',dataIndex:'textlen',width:140},
		{text:'内容类型',dataIndex:'paramContentName',width:140},
		{text:'接收对象的类型',dataIndex:'paramMobileName',width:140},
		{text:'编码',dataIndex:'charset',width:140},
		{text:'方法',dataIndex:'method',width:140},
		{text:'启用',dataIndex:'enable',align:'center',width:120,renderer:'returnAccountInvalid'},
		{xtype:'actioncolumn',text:'操作',align:'center',width:100,tooltip:'修改',iconCls:'f-mt mt-action-update',handler:'onSmsAccountUpdateClick'}
	],
	features:[{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
});















