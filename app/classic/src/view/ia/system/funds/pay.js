Ext.define('APP.view.ia.system.funds.pay',{
    extend:'Ext.grid.Panel',
    controller:'ia.system.funds',
	store:{
		type:'cross',
		autoLoad:true,
		remoteSort:false,
		proxy:{
			url:Boot.appUrl('/trade/settings/getPay.do')
		}
	},
	tbar:[
		'->',
		{iconCls:'f-mt mt-creat',action:'role',text:'新增',handler:'onPayCreatClick'},
		{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onPayRemoveClick'},
		'-',
		{xtype:'refreshbutton'}
	],
	forceFit:true,
	columns:[
		{xtype:'rownumberer'},
		{text:'商户号',dataIndex:'merchantno',minWidth:160},
		{text:'通道别名',dataIndex:'aliases',minWidth:160},
		{text:'锁定',dataIndex:'locked',align:'center',minWidth:100,renderer:'returnYesNo'},
		{text:'默认',dataIndex:'default',align:'center',minWidth:100,renderer:'returnYesNo'},
		{text:'注释',dataIndex:'explain',minWidth:200,renderer:'returnMore'},
		{xtype:'actioncolumn',text:'操作',align:'center',maxWidth:60,minWidth:60,
			items:[
				{tooltip:'修改',iconCls:'f-mt mt-edit',handler:'onPayUpdateClick'}
			]
		}
	],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
})
