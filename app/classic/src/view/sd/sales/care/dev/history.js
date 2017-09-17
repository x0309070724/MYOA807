Ext.define('APP.view.sd.sales.care.dev.history',{
    extend:'Ext.grid.Panel',
	alias:'widget.sd.sales.care.dev.history',
	margin:'3 0 0 0',
	border:true,
	title:'维护历史',
	store:{
		type:'sales.uerTrack',
		pageSize:false,
		proxy:{
			extraParams:{app:'care'}
		}
	},
	columns:[
		{xtype:'rownumberer'},
		{text:'日期',xtype:'datecolumn',dataIndex:'time',width:80,format:'Y-m-d'},
		{text:'销售员',dataIndex:'staffid',xtype:'templatecolumn',tpl:'{staff_namecn}',width:80},
		{text:'销售结果',dataIndex:'track',width:100,renderer:'returnTrackTime'},
		{text:'注释',dataIndex:'explain',minWidth:120,flex:1,renderer:'returnTrackExplain'}
	]
});












