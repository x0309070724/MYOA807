Ext.define('APP.view.rd.account.online',{
    extend:'Ext.grid.Panel',
    controller:'ia.account',
	userCls:'x-ui-disabled-dirty',
	store:{
		fields:[
			//{name:'regdate',type:'date'}
		]
	},
//	dockedItems:[
//		{dock:'top',xtype:'toolbar',items:[
//			{xtype:'searchbar',
//				fields:[
//					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
//					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
//					{emptyText:'特性...',xtype:'comboAccountFeature'},
//					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
//					{emptyText:'组...',xtype:'comboAccountGroup',width:120},
//					{emptyText:'账号/代理...',xtype:'textfield',name:'query',width:140}
//				]
//			},
//			'->',
//			{xtype:'refreshbutton'}
//		]},
//		//{dock:'bottom',xtype:'pagingbar'}
//	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账号',xtype:'templatecolumn',dataIndex:'login',minWidth:140,flex:1,tpl:'{login}<r>{name}</r>',summaryType:'count'},
		{text:'账户信息',defaults:{sortable:true,width:70},columns:[
			//{text:'开户日期',dataIndex:'regdate',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'代理',dataIndex:'agent_account',width:120},
			{text:'组',dataIndex:'group',width:120},					
			{text:'杠杆',dataIndex:'leverage',width:80,align:'center',renderer:'returnLeverage'},
			{text:'IP',xtype:'templatecolumn',dataIndex:'ip',width:160,tpl:'{ip:intToIp}'},					
			{text:'状态',width:40,align:'center',renderer:'returnAccountState'}
		]},
		{text:'账户资产',defaults:{sortable:true,width:140,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'持仓盈亏',dataIndex:'profit'},
			{text:'信用',dataIndex:'credit'},
			{text:'余额',dataIndex:'balance',tdCls:'x-ui-text-green'},
			{text:'已用保证金',dataIndex:'margin'},
			{text:'可用保证金',dataIndex:'margin_free'},
			{text:'净值',dataIndex:'equity',tdCls:'x-ui-active x-ui-text-red'}
		]}
	],
	//features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetail'
	},
	initComponent:function(){
		this.callParent();
		var me=this,
			store=this.getStore();
			
		PushService.ready(function(){
			var buffers=PushService.getBuffer();
			store.setData(buffers.getOnlines());
//			var data=[];
//				console.log(buffers.getOnlines())
//			Ext.Array.each(buffers.getOnlines(),function(item){
//				//delete item.refUser
//				//item.refUser=false
//				data.push(item.refUser)
//			})
//、			console.log(data)
//			Ext.TaskManager.start({
//				run:function(){
//					//console.log(buffers.getOnlines())
//					//box.setData(buffers.getSummary());
//				},
//				interval:1000
//			});				
		});
	}
});
