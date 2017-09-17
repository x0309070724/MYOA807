Ext.define('APP.view.combo.account.feature',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboAccountFeature',
	store:{
		fields:['groupname','value','display'],
		data:[
			{cat:'账户资产',group:1,value:11,display:'余额大于0'},
			{cat:'账户资产',group:1,value:12,display:'余额等于0'},
			{cat:'账户资产',group:2,value:13,display:'入金大于0'},
			{cat:'账户资产',group:2,value:14,display:'入金等于0'},
			{cat:'账户资产',group:3,value:15,display:'出金大于0'},
			{cat:'账户资产',group:3,value:16,display:'出金等于0'},
			{cat:'账户资产',group:4,value:17,display:'净入金大于0'},
			{cat:'账户资产',group:4,value:18,display:'净入金等于0'},
			
			{cat:'账户状态',group:1,value:21,display:'禁用'},
			{cat:'账户状态',group:1,value:22,display:'启用'},
			{cat:'账户状态',group:2,value:23,display:'禁止更改密码'},
			{cat:'账户状态',group:2,value:24,display:'允许更改密码'},
			{cat:'账户状态',group:4,value:25,display:'只读账户'},
			{cat:'账户状态',group:4,value:26,display:'非只读账户'},
			{cat:'账户状态',group:3,value:27,display:'不发送报告'},
			{cat:'账户状态',group:3,value:28,display:'发送报告'}
		]
	},
	listConfig:{
		minWidth:360,
		tpl:[
			'<tpl for=".">',
				'<tpl if="xindex==1||this.getGroupStr(parent[xindex-2])!=this.getGroupStr(values)">',
					'<li class="x-ui-combo-l1"><span class="f-mt mt-combo-title"></span>{[this.getGroupStr(values)]}</li>',
				'</tpl>',
				'<tpl if="xindex==1||this.getGroupStrSub(parent[xindex-2])!=this.getGroupStrSub(values)">',
					'<li class="x-ui-break"></li>',
				'</tpl>',
				'<li role="option" class="x-boundlist-item x-ui-combo-column x-ui-column-3">{display}</li>',
			'</tpl>', 
			{getGroupStr:function(values){return values.cat}},
			{getGroupStrSub:function(values){return values.group}}
		]
	},
	emptyText:'特性...',
	width:120,
	value:'',
	name:'feature',
	valueField:'value',
	displayField:'display'
});