Ext.define('APP.view.ia.system.account.property',{
    extend:'Ext.grid.Panel',
    controller:'ia.system.account',
	store:{
		type:'cross',
		sorters:[{property:'id',direction:'DESC'}],
		autoLoad:true,
		proxy:{
			url:Boot.appUrl('/sd/system/settings/getProperty.do'),
			extraParams:{typeid:0}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			'->',
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onPropertyCreatClick'},
			{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onPropertyRemoveClick'},
			'-',
			{xtype:'refreshbutton'}
		]}
	],
	forceFit:true,
	columns:[
		{xtype:'rownumberer'},
		{text:'名称',dataIndex:'name',minWidth:200},
		{text:'描述',dataIndex:'explain',minWidth:200,renderer:'returnMore'},
		{text:'模式',dataIndex:'mode',minWidth:200,renderer:'returnPropertyMode'},
		{text:'值',dataIndex:'value',align:'right',minWidth:160},
		{text:'账户',dataIndex:'counts',align:'right',minWidth:160,xtype:'templatecolumn',tpl:'{counts} 个',summaryType:'sum'},
		{xtype:'actioncolumn',text:'操作',align:'center',maxWidth:60,minWidth:60,
			items:[
				{tooltip:'更改',iconCls:'f-mt mt-update',handler:'onPropertyUpdateClick'}
			]
		}
	],
	features:[{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
});
















